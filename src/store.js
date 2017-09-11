import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers/';
import CONST from './constants';
import { initialState as trackControl } from './reducers/trackControl';

// 🌲
const logger = createLogger();

const initialState = {
    controls: {
        BPM: 0.55,
        volume: 0.7,
        mode: CONST.MODES.SEQUENCE,
        playstate: 'none'
    },
    trackControl
};

const stores = () => {
    switch(process.env.NODE_ENV) {
        case 'development':
            return () => createStore(
                rootReducer,
                initialState,
                applyMiddleware(logger)
            );
        case 'production':
            return () => createStore(
                rootReducer,
                initialState
            );
        default:
            return () => createStore(
                rootReducer,
                initialState
            );
    }
};

export const store = stores(process.env.NODE_ENV)();
