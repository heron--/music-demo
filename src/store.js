import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist'
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
                compose(
                    applyMiddleware(logger),
                    autoRehydrate()
                )
            );
        case 'production':
            return () => createStore(
                rootReducer,
                initialState,
                compose(
                    autoRehydrate()
                )
            );
        default:
            return () => createStore(
                rootReducer,
                initialState,
                compose(
                    autoRehydrate()
                )
            );
    }
};

const store = stores(process.env.NODE_ENV)();

persistStore(store);

export { store };
