import tracksReducer, { initialState, initialNoteCount } from '../trackControl';
import freq from '../../frequencies';
import { addTrack, deleteTrack, updateTrackName, updateTrackColor, updateTrackInstrument, updateCurrentTrack, updateNotePosition, cycleNote } from '../../actions';

function createAddTrackAction() {
    return addTrack();
}

function createDeleteTrackAction(id = 0) {
    return deleteTrack(id);
}

function createUpdateTrackNameAction(id = 0, name = 'test-name') {
    return updateTrackName(id, name);
}

function createUpdateTrackColorAction(id = 0, color = 'RED') {
    return updateTrackColor(id, color);
}

function createUpdateTrackInstrumentAction(id = 0, instrument = 'PULSE') {
    return updateTrackInstrument(id, instrument);
}

function createUpdateCurrentTrackAction(id = 0) {
    return updateCurrentTrack(id);
}

function createUpdateNotePositionAction(position) {
    return updateNotePosition(position);
}

function createCycleNoteAction(id = 0) {
    return cycleNote(id, 'F#', 3, 4);
}

describe('ADD_TRACK', () => {

    it('should contain n + 1 tracks', () => {
        const initializedState = {
            tracks: [{}, {}]
        };

        expect(tracksReducer(undefined, createAddTrackAction()).tracks.length).toBe(1);
        expect(tracksReducer(initializedState, createAddTrackAction()).tracks.length).toBe(initializedState.tracks.length + 1);
    });

    it('should initialize an equal number of noteLanes to the number of frequencies', () => {
        expect(tracksReducer(undefined, createAddTrackAction()).tracks[0].noteLanes.length).toBe(freq.length);
    });

    it('should contain a total of freq.length * initialLaneCount notes', () => {
        let noteCount = 0;
        const reducedState = tracksReducer(undefined, createAddTrackAction());

        reducedState.tracks.forEach(t => {
            t.noteLanes.forEach(nl => {
                noteCount += nl.notes.length
            });
        });

        expect(noteCount).toBe(freq.length * initialNoteCount);
    });

    it('should set currentTrack to the new track id if none exists', () => {
        // Intializing state and adding a track
        let state = initialState;
        state = tracksReducer(state, createAddTrackAction());

        expect(state.currentTrack).toBe(state.tracks[0].id);
    });
});

describe('DELETE_TRACK', () => {
    it('should remove the track from the tracks list', () => {
        // Intializing state and adding a track
        let state = initialState;
        state = tracksReducer(state, createAddTrackAction());

        expect(state.tracks.length).toBe(1);

        const trackId = state.tracks[0].id;
        state = tracksReducer(state, createDeleteTrackAction(trackId));

        expect(state.tracks.filter(t => t.id === trackId).length).toBe(0);
        expect(state.tracks.length).toBe(0);
    });

    it('should set currentTrack to the previous track if it exists', () => {
        // Intializing state and adding 3 tracks
        let state = initialState;
        state = tracksReducer(state, createAddTrackAction());
        state = tracksReducer(state, createAddTrackAction());
        state = tracksReducer(state, createAddTrackAction());

        const selectionIndex = 1;
        const trackId = state.tracks[selectionIndex].id;
        state = tracksReducer(state, createDeleteTrackAction(trackId));

        expect(state.currentTrack).toBe(state.tracks[selectionIndex - 1].id);
    });

    it('should set currentTrack to the next track if previous does not exist', () => {
        // Intializing state and adding 3 tracks
        let state = initialState;
        state = tracksReducer(state, createAddTrackAction());
        state = tracksReducer(state, createAddTrackAction());
        state = tracksReducer(state, createAddTrackAction());

        const selectionIndex = 0;
        const trackId = state.tracks[selectionIndex].id;
        state = tracksReducer(state, createDeleteTrackAction(trackId));

        expect(state.currentTrack).toBe(state.tracks[0].id);
    });

    it('should set currentTrack to the null if no tracks exist', () => {
        // Intializing state and adding 3 tracks
        let state = initialState;
        state = tracksReducer(state, createAddTrackAction());

        const selectionIndex = 0;
        const trackId = state.tracks[selectionIndex].id;
        state = tracksReducer(state, createDeleteTrackAction(trackId));

        expect(state.currentTrack).toBe(null);
    });
});

describe('UPDATE_TRACK_NAME', () => {
    it('should change the track name to the specified name', () => {
        const name = 'drums';

        // Intializing state and adding 3 empty tracks
        let state = initialState;
        state = tracksReducer(state, createAddTrackAction());
        state = tracksReducer(state, createAddTrackAction());
        state = tracksReducer(state, createAddTrackAction());

        // Optionally passing in the trackId so we can be sure we're referencing the same track
        const trackId = state.tracks[1].id;
        state = tracksReducer(state, createUpdateTrackNameAction(trackId, name));

        expect(state.tracks.filter(t => t.id === trackId)[0].name).toBe(name);
    });
});

describe('UPDATE_TRACK_COLOR', () => {
    it('should change the track color to the specified color', () => {
        const color = 'VIOLET';

        // Intializing state and adding 3 empty tracks
        let state = initialState;
        state = tracksReducer(state, createAddTrackAction());
        state = tracksReducer(state, createAddTrackAction());
        state = tracksReducer(state, createAddTrackAction());

        // Optionally passing in the trackId so we can be sure we're referencing the same track
        const trackId = state.tracks[1].id;
        state = tracksReducer(state, createUpdateTrackColorAction(trackId, color));

        expect(state.tracks.filter(t => t.id === trackId)[0].color).toBe(color);
    });
});

describe('UPDATE_TRACK_INSTRUMENT', () => {
    it('should change the track instrument to the specified instrument', () => {
        const instrument = 'NOISE';

        // Intializing state and adding 3 empty tracks
        let state = initialState;
        state = tracksReducer(state, createAddTrackAction());
        state = tracksReducer(state, createAddTrackAction());
        state = tracksReducer(state, createAddTrackAction());

        // Optionally passing in the trackId so we can be sure we're referencing the same track
        const trackId = state.tracks[1].id;
        state = tracksReducer(state, createUpdateTrackInstrumentAction(trackId, instrument));

        expect(state.tracks.filter(t => t.id === trackId)[0].instrument).toBe(instrument);
    });
});

describe('UPDATE_CURRENT_TRACK', () => {
    it('should change the currentTrack to the id of a selected track', () => {
        // Intializing state and adding 3 empty tracks
        let state = initialState;
        state = tracksReducer(state, createAddTrackAction());
        state = tracksReducer(state, createAddTrackAction());
        state = tracksReducer(state, createAddTrackAction());

        const trackId = state.tracks[0].id;
        state = tracksReducer(state, createUpdateCurrentTrackAction(trackId));

        expect(state.currentTrack).toBe(trackId);
    });
});

describe('UPDATE_NOTE_POSITION', () => {
    it('should change the currentTrack to the id of a selected track', () => {
        // Intializing state and adding 3 empty tracks
        let state = initialState;
        state = tracksReducer(state, createAddTrackAction());

        const trackId = state.tracks[0].id;
        const notePosition = state.notePosition + 1;
        state = tracksReducer(state, createUpdateNotePositionAction(notePosition));

        expect(state.notePosition).toBe(notePosition);
    });
});

describe('CYCLE_NOTE', () => {

    it('should set a note to active if it is inactive', () => {

        // Intializing state and adding a track
        let state = initialState;
        state = tracksReducer(state, createAddTrackAction());

        // Optionally passing in the trackId so we can be sure we're referencing the same track
        const trackId = state.tracks[0].id;
        const cycleAction = createCycleNoteAction(trackId);

        const originalNote = state.tracks.filter(t => t.id === cycleAction.id)[0].noteLanes.filter(nl => (cycleAction.name === nl.name) && (cycleAction.octave === nl.octave))[0].notes[cycleAction.index];
        expect(originalNote.active).toBe(false); // Expect to initialize to false

        state = tracksReducer(state, cycleAction)
        const updatedNote = state.tracks.filter(t => t.id === cycleAction.id)[0].noteLanes.filter(nl => (cycleAction.name === nl.name) && (cycleAction.octave === nl.octave))[0].notes[cycleAction.index];
        expect(updatedNote.active).toBe(true);
    });

    it('should set a note to sustained if it is active and not sustained', () => {
        // Intializing state and adding a track
        let state = initialState;
        state = tracksReducer(state, createAddTrackAction());

        // Optionally passing in the trackId so we can be sure we're referencing the same track
        const trackId = state.tracks[0].id;
        const cycleAction = createCycleNoteAction(trackId);

        let note = state.tracks.filter(t => t.id === cycleAction.id)[0].noteLanes.filter(nl => (cycleAction.name === nl.name) && (cycleAction.octave === nl.octave))[0].notes[cycleAction.index];
        expect(note.sustain).toBe(false); // Expect to initialize to false

        // Click 1
        state = tracksReducer(state, cycleAction)
        note = state.tracks.filter(t => t.id === cycleAction.id)[0].noteLanes.filter(nl => (cycleAction.name === nl.name) && (cycleAction.octave === nl.octave))[0].notes[cycleAction.index];
        expect(note.sustain).toBe(false);

        // Click 2
        state = tracksReducer(state, cycleAction)
        note = state.tracks.filter(t => t.id === cycleAction.id)[0].noteLanes.filter(nl => (cycleAction.name === nl.name) && (cycleAction.octave === nl.octave))[0].notes[cycleAction.index];
        expect(note.sustain).toBe(true);
        expect(note.active).toBe(true);
    });

    it('should set a note to inactive and not sustained if it is active and sustained', () => {
        // Intializing state and adding a track
        let state = initialState;
        state = tracksReducer(state, createAddTrackAction());

        // Optionally passing in the trackId so we can be sure we're referencing the same track
        const trackId = state.tracks[0].id;
        const cycleAction = createCycleNoteAction(trackId);

        let note = state.tracks.filter(t => t.id === cycleAction.id)[0].noteLanes.filter(nl => (cycleAction.name === nl.name) && (cycleAction.octave === nl.octave))[0].notes[cycleAction.index];
        expect(note.sustain).toBe(false); // Expect to initialize to false

        // Click 1
        state = tracksReducer(state, cycleAction)
        note = state.tracks.filter(t => t.id === cycleAction.id)[0].noteLanes.filter(nl => (cycleAction.name === nl.name) && (cycleAction.octave === nl.octave))[0].notes[cycleAction.index];
        expect(note.sustain).toBe(false);

        // Click 2
        state = tracksReducer(state, cycleAction)
        note = state.tracks.filter(t => t.id === cycleAction.id)[0].noteLanes.filter(nl => (cycleAction.name === nl.name) && (cycleAction.octave === nl.octave))[0].notes[cycleAction.index];
        expect(note.sustain).toBe(true);
        expect(note.active).toBe(true);

        // Click 3
        state = tracksReducer(state, cycleAction)
        note = state.tracks.filter(t => t.id === cycleAction.id)[0].noteLanes.filter(nl => (cycleAction.name === nl.name) && (cycleAction.octave === nl.octave))[0].notes[cycleAction.index];
        expect(note.sustain).toBe(false);
        expect(note.active).toBe(false);
    });
});
