import freqs from '../frequencies';
import CONST from '../constants';

export const initialState = {
    currentTrack: null,
    notePosition: null,
    tracks: [] 
};

export const initialNoteCount = 32;
let trackIdAccumulator = 0;

const trackControl = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_TRACK':
        case 'CYCLE_NOTE':
        case 'UPDATE_TRACK_NAME':
        case 'UPDATE_TRACK_COLOR':
        case 'UPDATE_TRACK_INSTRUMENT':
            return Object.assign({}, state, {
                currentTrack: state.currentTrack === null ? trackIdAccumulator : state.currentTrack,
                tracks: tracks(state.tracks, action)
            });
        case 'DELETE_TRACK':

            let deleteIndex = null;
            let newCurrentTrackId = null;

            state.tracks.forEach((t, i) => {
                if(t.id === action.id) { 
                    deleteIndex = i;
                }
            });

            // Set the newCurrentTrack to the closest relative if they exist
            if(typeof state.tracks[deleteIndex - 1] !== 'undefined') {
                newCurrentTrackId = state.tracks[deleteIndex - 1].id;
            } else if(typeof state.tracks[deleteIndex + 1] !== 'undefined') {
                newCurrentTrackId = state.tracks[deleteIndex + 1].id;
            }

            return Object.assign({}, state, {
                currentTrack: state.currentTrack === action.id ? newCurrentTrackId : state.currentTrack,
                tracks: state.tracks.filter(t => t.id !== action.id)
            });
        case 'UPDATE_CURRENT_TRACK':
            return Object.assign({}, state, {
                currentTrack: action.id,
                notePosition: null
            });
        case 'INCREMENT_CURRENT_NOTE':
            
            let nextPosition = state.notePosition === null ? 0 : state.notePosition + 1;
            const currentTrackObj = state.tracks.filter(t => t.id === state.currentTrack)[0];

            if(nextPosition >= currentTrackObj.noteCount) {
                nextPosition = 0;
            }

            return Object.assign({}, state, {
                notePosition: nextPosition
            });
        default:
            return state;
    }
};

const tracks = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TRACK':
            return [...state, track(undefined, action)]
        case 'CYCLE_NOTE':
        case 'UPDATE_TRACK_NAME':
        case 'UPDATE_TRACK_COLOR':
        case 'UPDATE_TRACK_INSTRUMENT':
            return state.map(t => t.id === action.id ? track(t, action) : t);
        default:
            return state;
    }
};

const track = (state = {}, action) => {
    switch(action.type) {
        case 'ADD_TRACK':
            return {
                name: `Track ${ trackIdAccumulator }`,
                id: trackIdAccumulator++,
                color: CONST.COLORS.YELLOW.name,
                instrument: CONST.INSTRUMENTS.SQUARE.name,
                noteCount: initialNoteCount,
                noteLanes: noteLanes(undefined, Object.assign({}, action, { noteCount: initialNoteCount }))
            };
        case 'UPDATE_TRACK_NAME':
            return Object.assign({}, state, {
                name: action.name
            });
        case 'UPDATE_TRACK_COLOR':
            return Object.assign({}, state, {
                color: action.color
            });
        case 'UPDATE_TRACK_INSTRUMENT':
            return Object.assign({}, state, {
                instrument: action.instrument
            });
        case 'CYCLE_NOTE':
            return Object.assign({}, state, {
                noteLanes: noteLanes(state.noteLanes, action)
            });
        default:
            return state; 
    }
};

const noteLanes = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TRACK':
            return [...state, ...freqs.map(f => noteLane(null, Object.assign({}, action, {frequency: f})))]
        case 'CYCLE_NOTE':
            return state.map(nl => (nl.name === action.name && nl.octave === action.octave) ? noteLane(nl, action) : nl)
        default:
            return state;
    }
};

const noteLane = (state = {}, action) => {
    switch(action.type) {
        case 'ADD_TRACK':
            const {
                value,
                name,
                octave
            } = action.frequency;

            return {
                value,
                name,
                octave,
                notes: notes(undefined, action)
            };
        case 'CYCLE_NOTE':
            return Object.assign({}, state, {
                notes: notes(state.notes, action)
            });
        default:
            return state;
    }
};

const notes = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TRACK':
            // initial noteCount many pristine notes
            return [...new Array(action.noteCount)].map(() => note(undefined, action))
        case 'CYCLE_NOTE':
            return state.map((n, i) => i === action.index ? note(n, action) : n);
        default:
            return state;
    }
};

const note = (state = {}, action) => {
    switch(action.type) {
        case 'ADD_TRACK':
            return {
                active: false,
                sustain: false
            };
        case 'CYCLE_NOTE':
            return {
                active: (state.active && !state.sustain) || (!state.active && !state.sustain),
                sustain: state.active && !state.sustain
            };
        default:
            return state;
    }
};

export { trackControl as default };
