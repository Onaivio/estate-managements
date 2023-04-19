import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store, { history } from './redux/store';
import { ConnectedRouter } from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

// const app = (
//     <Provider store={store}>
//         <ConnectedRouter history={history}>
//             <App/>
//         </ConnectedRouter>
//     </Provider>
// );

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
