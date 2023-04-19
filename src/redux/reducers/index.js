import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { connectRouter } from 'connected-react-router';
import ui from './ui';
import app from './app';
import Layout from '../actions/layout/reducer';

const appReducers = history =>
    combineReducers({
        router: connectRouter(history),
        form: formReducer,
        toastr: toastrReducer,
        ui,
        Layout,
        ...app,
    });

export default appReducers;
