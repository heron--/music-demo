import CONST from './constants';
import { incrementCurrentNote as createIncNoteAction } from './actions';

function AudioController(store) {
    this.store = store;
    this.unsubscribe = this.store.subscribe(this.handleStateChange.bind(this));
    this.playing = false;
    this.lastStep = null;
    this.tracks = [];
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

AudioController.prototype.handleStateChange = function handleStateChange() {
    const currentState = this.store.getState();

    const {
        playstate 
    } = currentState.controls

    const currentTrack = currentState.trackControl.tracks.filter(t => t.id === currentState.trackControl.currentTrack)[0];

    if(playstate === 'PLAYING') {
        if(!this.playing) {
            this.step();
        }
    }

    if(typeof currentTrack !== 'undefined') {
        if(this.tracks.filter(t => t.id  === currentTrack.id).length === 0) {
            this.initTrack(currentTrack);
        } else {
            const localTrack = this.tracks.filter(t => t.id === currentTrack.id)[0];

            localTrack.noteLanes.forEach((nl,i) => {
                if(nl.notes !== currentTrack.noteLanes[i].notes) {
                    nl.notes = currentTrack.noteLanes[i].notes;
                }
            })
        }
    }
};

AudioController.prototype.step = function step() {
    const currentState = this.store.getState();

    const {
        BPM,
        playstate
    } = currentState.controls;

    const timeIncrement = (60 / ((BPM * (CONST.MAX_BPM - CONST.MIN_BPM) + CONST.MIN_BPM) * 4)) * 1000; // milliseconds
    this.playing = playstate === 'PLAYING';

    if(!this.playing) {
        return;
    }

    if(window.Date.now() < this.lastStep + timeIncrement) {
        // Skip this step
        window.requestAnimationFrame(this.step.bind(this));
    } else {
        this.incrementCurrentNote();
        this.playNotes();
        this.lastStep = window.Date.now();
        window.requestAnimationFrame(this.step.bind(this));
    }
};

AudioController.prototype.incrementCurrentNote = function incrementCurrentNote() {
    this.store.dispatch(createIncNoteAction());
};

AudioController.prototype.playNotes = function playNotes() {
    const currentState = this.store.getState();

    const currentTrack = this.tracks.filter(t => t.id === currentState.trackControl.currentTrack)[0];
    const notePosition = currentState.trackControl.notePosition;

    currentTrack.noteLanes.forEach(nl => {
        if(nl.notes[notePosition].active) {
            nl.gain.gain.value = currentState.controls.volume

            if(!nl.notes[notePosition].sustain) {
                window.setTimeout(() => {
                    nl.gain.gain.value = 0;
                }, 100) // Make this not hard coded later
            }
        } else {
            nl.gain.gain.value = 0;
            window.clearTimeout(nl.timeoutId);
        }
    });
};

AudioController.prototype.initTrack = function initTrack(track){
    let trackObject = {...track};

    const instrumentLookup = {
        [CONST.INSTRUMENTS.SQUARE.name]: 'square',
        [CONST.INSTRUMENTS.TRIANGLE.name]: 'triangle',
        [CONST.INSTRUMENTS.SAWTOOTH.name]: 'sawtooth',
        [CONST.INSTRUMENTS.PULSE.name]: 'custom',
        [CONST.INSTRUMENTS.NOISE.name]: 'custom'
    };

    trackObject.noteLanes = trackObject.noteLanes.map(nl => {
        return {
            ...nl,
            oscillator: this.audioContext.createOscillator(),
            gain: this.audioContext.createGain(),
            timeoutId: null
        }
    });

    trackObject.noteLanes.forEach(nl => {
        nl.oscillator.type = instrumentLookup[track.instrument];
        nl.oscillator.frequency.value = nl.value;
        nl.gain.gain.value = 0;
        nl.oscillator.connect(nl.gain);
        nl.gain.connect(this.audioContext.destination);
        nl.oscillator.start();
    });

    this.tracks.push(trackObject)
}

export default AudioController;
