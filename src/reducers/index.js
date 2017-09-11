import { combineReducers } from 'redux';
import trackControl from './trackControl';
import modal from './modal';

const controls = (state = {}, action) => {
    switch(action.type) {
        case 'SET_BPM':
            return Object.assign({}, state, {
                BPM: action.value
            });
        case 'SET_VOLUME':
            return Object.assign({}, state, {
                volume: action.value
            });
        case 'SET_MODE':
            return Object.assign({}, state, {
                mode: action.mode
            });
        case 'SET_PLAYSTATE':
            return Object.assign({}, state, {
                playstate: action.playstate
            });
        default: 
            return state;
    }
};

const rootReducer = combineReducers({
    controls,
    trackControl,
    modal
});

export { rootReducer as default };
