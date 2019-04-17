import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './App.jsx';
import './index.css';
import * as serviceWorker from './serviceWorker';

window.API_URL = 'http://localhost:5150/api/v1';

ReactDOM.render(
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    , document.getElementById('root'));


serviceWorker.register();
