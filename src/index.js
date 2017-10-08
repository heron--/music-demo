import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/App';
import AudioController from './audioController';
import registerServiceWorker from './registerServiceWorker';
import ua from 'universal-analytics';

const visitor = ua('UA-107756414-1');

if(process.env.NODE_ENV === 'production') {
    visitor.pageview('/').send();
}

new AudioController(store);

ReactDOM.render(
    <Provider store={ store } >
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
