import CONST from './constants';
import { incrementCurrentNote as createIncNoteAction } from './actions';

const instrumentLookup = {
    [CONST.INSTRUMENTS.SQUARE.name]: 'square',
    [CONST.INSTRUMENTS.TRIANGLE.name]: 'triangle',
    [CONST.INSTRUMENTS.SAWTOOTH.name]: 'sawtooth',
    [CONST.INSTRUMENTS.PULSE.name]: 'custom',
    [CONST.INSTRUMENTS.NOISE.name]: 'custom'
};

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
            });

            if(localTrack.instrument !== currentTrack.instrument) {
                this.updateInstrument(localTrack, currentTrack.instrument);
            }
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
    const state = this.store.getState();

    const currentTrack = this.tracks.filter(t => t.id === state.trackControl.currentTrack)[0];
    const notePosition = state.trackControl.notePosition;
    const playLength = currentTrack.instrument === CONST.INSTRUMENTS.NOISE.name ? 10 : 75;

    currentTrack.noteLanes.forEach(nl => {
        if(nl.notes[notePosition].active) {
            nl.gain.gain.value = currentTrack.instrument === CONST.INSTRUMENTS.TRIANGLE.name ? state.controls.volume * 1.5 : state.controls.volume

            if(!nl.notes[notePosition].sustain) {
                window.setTimeout(() => {
                    nl.gain.gain.value = 0;
                }, playLength) // Make this not hard coded later
            } else {
                const sustainLength = (60 / ((state.controls.BPM * (CONST.MAX_BPM - CONST.MIN_BPM) + CONST.MIN_BPM) * 4)) * 1000; // milliseconds
                const nextNote = notePosition === nl.notes.length - 1 ? nl.notes[0] : nl.notes[notePosition + 1];
                if(!nextNote.sustain) {
                    window.setTimeout(() => {
                        nl.gain.gain.value = 0; 
                    }, sustainLength);
                }
            }
        } else {
            nl.gain.gain.value = 0;
            window.clearTimeout(nl.timeoutId);
        }
    });
};

AudioController.prototype.createWhiteNoise = function createWhiteNoise() {
    const bufferSize = 2 * this.audioContext.sampleRate,
        noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate),
        output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.audioContext.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    return whiteNoise;
};

AudioController.prototype.initTrack = function initTrack(track) {
    let trackObject = {...track};

    trackObject.noteLanes = trackObject.noteLanes.map(nl => {
        return {
            ...nl,
            oscillator: this.audioContext.createOscillator(),
            gain: this.audioContext.createGain(),
            noise: this.createWhiteNoise(),
            timeoutId: null
        }
    });

    trackObject.noteLanes.forEach(nl => {
        if(instrumentLookup[track.instrument] === 'custom') {

        } else {
            nl.oscillator.type = instrumentLookup[track.instrument];
        }

        nl.oscillator.frequency.value = nl.value;
        nl.gain.gain.value = 0;
        nl.oscillator.connect(nl.gain);
        nl.gain.connect(this.audioContext.destination);
        nl.oscillator.start();
        nl.noise.start();
    });

    this.tracks.push(trackObject)
}

AudioController.prototype.updateInstrument = function updateInstrument(track, instrument) {

    track.instrument = instrument;
    track.noteLanes.forEach(nl => {

        nl.oscillator.disconnect();
        nl.noise.disconnect();
        nl.gain.disconnect();

        if(CONST.INSTRUMENTS.NOISE.name === instrument) {

            // nl.oscillator.type = instrumentLookup[CONST.INSTRUMENTS.SQUARE.name];
            // nl.oscillator.connect(nl.noise);
            nl.noise.connect(nl.gain);
            nl.gain.connect(this.audioContext.destination);

        } else {

            nl.oscillator.type = instrumentLookup[instrument]
            nl.oscillator.connect(nl.gain);
            nl.gain.connect(this.audioContext.destination);

        }
    })

};

export default AudioController;
