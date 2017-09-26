import roundTo from 'round-to';

export function setBPM(value) {
    return {
        type: 'SET_BPM',
        value
    }
}

export function setVolume(percentValue) {
    const value = roundTo(percentValue, 3);

    return {
        type: 'SET_VOLUME',
        value: value < 0.05 ? 0 : value
    }
}

export function setMode(mode) {
    return {
        type: 'SET_MODE',
        mode
    };
}

export function addTrack() {
    return {
        type: 'ADD_TRACK' 
    };
}

export function deleteTrack(id) {
    return {
        type: 'DELETE_TRACK',
        id
    };
}

export function updateTrackName(id, name) {
    return {
        type: 'UPDATE_TRACK_NAME',
        id,
        name
    };
}

export function updateTrackColor(id, color) {
    return {
        type: 'UPDATE_TRACK_COLOR',
        id,
        color
    };
}

export function updateTrackInstrument(id, instrument) {
    return {
        type: 'UPDATE_TRACK_INSTRUMENT',
        id,
        instrument
    }
}

export function updateCurrentTrack(id) {
    return {
        type: 'UPDATE_CURRENT_TRACK',
        id
    };
}

export function cycleNote(id, name, octave, index) {
    return {
        type: 'CYCLE_NOTE',
        id,
        name,
        octave,
        index
    };
}

export function setModalMode(mode) {
    return {
        type: 'SET_MODAL_MODE',
        mode
    };
}

export function closeModal() {
    return {
        type: 'CLOSE_MODAL'
    };
}

export function triggerPhonyNote(id, name, octave, index) {
    return {
        type: 'TRIGGER_PHONY_NOTE',
        id,
        name,
        octave,
        index
    };
}

export function setPlaystate(playstate) {
    return {
        type: 'SET_PLAYSTATE',
        playstate
    };
}

export function incrementCurrentNote() {
    return {
        type: 'INCREMENT_CURRENT_NOTE'
    };
}
