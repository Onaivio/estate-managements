import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'connected-react-router';
import {createLogger} from 'redux-logger';
import {createBrowserHistory} from 'history';
import customMiddleWares from '../redux/middleware';
import appReducers from '../redux/reducers';

export const history = createBrowserHistory();

const rootReducer = (state, action) => {
    if (action.type === 'RESET_APP_STATE') {
        state = undefined;
    }
    return appReducers(history)(state, action);
};

// add the middlewares
const middleWares = [...customMiddleWares, routerMiddleware(history)];

if (process.env.NODE_ENV !== 'production') {
    middleWares.push(createLogger());
}
// apply the middleware

const sagaMiddleware = createSagaMiddleware();
let middleWare = applyMiddleware(...middleWares, sagaMiddleware);

if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    middleWare = compose(middleWare, window.__REDUX_DEVTOOLS_EXTENSION__());
}

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, middleWare);




// create the store
// const store = createStore(rootReducer, persistedState, middleWare);
store.subscribe(() => {
    saveState({app: store.getState().app});
});

export default store;

function loadState() {
    try {
        const serializedState = localStorage.getItem('t-access-com');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
}

function saveState(state) {
    try {
        localStorage.setItem('t-access-com', JSON.stringify(state));
    } catch (e) {}
}


