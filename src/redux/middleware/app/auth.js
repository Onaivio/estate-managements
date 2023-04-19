import * as urls from '../../../_shared/defs/_urls';
import {
    apiRequest,
    navigateTo,
    CHANGE_PASSWORD, LOGIN,
    POST,
    FETCH_LOGGED_IN_USER_ACCOUNT, RESET_PASSWORD, REGISTER,
    logout, VERIFY_CODE, CREATE_PASSWORD, UPDATE_PASSWORD, SEND_VERIFICATION,
    FETCH_MEMBER_CATEGORIES,
} from '../../actions/index';
import _ from 'lodash';

import { API } from '../../../_shared/defs/_urls';
import { GET, updateUIError } from '../../actions/index';
import { uiRemoveLocalData, uiSaveLocalData } from '../../actions';


const { MEMBER_CATEGORIES } = API;

const login = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === LOGIN.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: urls.API.LOGIN,
                key: 'login',
                noErrorToast: true,
                onSuccess: data => {
                    dispatch(uiSaveLocalData('user-data', {..._.omit(data, 'verification_code')} ));
                    if (!data.account_verified) {
                        dispatch(navigateTo(urls.APP.DASHBOARD));
                    }
                    else {
                        dispatch({ type: LOGIN.SUCCESS, payload: data });
                        dispatch({ type: FETCH_LOGGED_IN_USER_ACCOUNT.START, payload: { params: {} } });
                    }
                },
                ...action.meta,
            }),
        );
    }
};

const register = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === REGISTER.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: urls.API.REGISTER,
                key: 'register',
                noErrorToast: true,
                onSuccess: data => {
                    dispatch({ type: REGISTER.SUCCESS, payload: data });
                    dispatch(uiSaveLocalData('user-data', data));
                    if (!data.account_verified) {
                        dispatch(navigateTo(urls.APP.VERIFY_CODE));
                    }
                },
                ...action.meta,
            }),
        );
    }
};

const verifyCode = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === VERIFY_CODE.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: urls.API.VERIFY_CODE,
                key: 'verifyCode',
                noErrorToast: true,
                onSuccess: data => {
                    if (!data.account_verified) {
                        dispatch(navigateTo(urls.APP.VERIFY_CODE));
                    }
                    else {
                        dispatch(uiRemoveLocalData('user-data'));
                        dispatch({ type: VERIFY_CODE.SUCCESS, payload: data });
                        // dispatch(navigateTo(`${data.current_profile_type.toLowerCase()}${urls.APP.DASHBOARD}`));
                        dispatch(navigateTo(`${data.current_profile_type.toLowerCase()}${urls.APP.DASHBOARD}`));
                    }
                },
                ...action.meta,
            }),
        );
    }
};

const createPassword = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === CREATE_PASSWORD.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: urls.API.CREATE_PASSWORD,
                key: 'createPassword',
                noErrorToast: true,
                onSuccess: data => {
                    if (!data.account_verified) {
                        dispatch(navigateTo(urls.APP.VERIFY_CODE));
                    }
                    else {
                        dispatch({ type: CREATE_PASSWORD.SUCCESS, payload: data });
                        // dispatch({ type: FETCH_LOGGED_IN_USER_ACCOUNT.START, payload: { params: {} } });
                        dispatch(navigateTo(`${data.current_profile_type.toLowerCase()}${urls.APP.SETTINGS}`));
                    }
                },
                ...action.meta,
            }),
        );
    }
};


const fetchLoggedInUserAccount = ({ dispatch, getState }) => next => action => {
    next(action);
    if (action.type === FETCH_LOGGED_IN_USER_ACCOUNT.START) {
        dispatch(
            apiRequest({
                method: GET,
                url: `${API.AUTH_USER}`,
                key: 'fetchLoggedInUserAccount',
                ...action.meta,
                onSuccess: userAccount => {
                    dispatch({
                        type: FETCH_LOGGED_IN_USER_ACCOUNT.SUCCESS,
                        payload: userAccount,
                    });
                    const { app } = getState();
                    const data = app.user.data;
                    dispatch(navigateTo(`${data.current_profile_type.toLowerCase()}${urls.APP.DASHBOARD}`));
                },
            }),
        );
    }
};

const resetPassword = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === RESET_PASSWORD.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: urls.API.RESET_PASSWORD,
                key: 'resetPassword',
                onSuccess: (data) => {
                    dispatch({ type: RESET_PASSWORD.SUCCESS, payload: data });
                },
                ...action.meta,
            }),
        );
    }
};
const sendVerification = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === SEND_VERIFICATION.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: urls.API.SEND_VERIFICATION,
                key: 'sendVerification',
                nextRoute: urls.APP.VERIFY_CODE,
                ...action.meta,
            }),
        );
    }
};

const updatePassword = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === UPDATE_PASSWORD.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: urls.API.UPDATE_PASSWORD,
                key: 'updatePassword',
                nextRoute: urls.APP.LOGIN,
                ...action.meta,
            }),
        );
    }
};

const changePassword = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === CHANGE_PASSWORD.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: urls.API.CHANGE_PASSWORD,
                key: 'changePassword',
                onSuccess: CHANGE_PASSWORD.SUCCESS,
                successMessage: 'Password changed',
                ...action.meta,
            }),
        );
    }
};

const fetchMemberCategories = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_MEMBER_CATEGORIES.START) {
        const { params } = action.meta.params;
        dispatch(
            apiRequest({
                method: GET,
                url: `${MEMBER_CATEGORIES}`,
                key: 'fetchMemberCategories',
                onSuccess: (data) => {
                    dispatch({ type: FETCH_MEMBER_CATEGORIES.SUCCESS, payload: data });
                },
                params,
            }),
        );
    }
};

export default [
    login,
    register,
    fetchLoggedInUserAccount,
    createPassword,
    resetPassword,
    verifyCode,
    updatePassword,
    changePassword,
    sendVerification,
    fetchMemberCategories,
];
