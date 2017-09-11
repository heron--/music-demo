import CONST from './constants';
import { incrementCurrentNote as createIncNoteAction } from './actions';

function AudioController(store) {
    this.store = store;
    this.unsubscribe = this.store.subscribe(this.handleStateChange.bind(this));
    this.timeoutId = null;
    this.playing = false;
    this.lastStep = null;
}

AudioController.prototype.handleStateChange = function handleStateChange() {
    const currentState = this.store.getState();

    const {
        playstate 
    } = currentState.controls

    if(playstate === 'PLAYING') {
        if(!this.playing) {
            this.step();
        }
    } else {
        if(this.timeoutId !== null) {
            window.clearTimeout(this.timeoutId);
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
        this.lastStep = window.Date.now();
        window.requestAnimationFrame(this.step.bind(this));
    }
};

AudioController.prototype.incrementCurrentNote = function incrementCurrentNote() {
    this.store.dispatch(createIncNoteAction());
};

export default AudioController;
