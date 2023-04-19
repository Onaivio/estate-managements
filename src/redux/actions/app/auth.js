import { createActionType, createActionString } from '../../../_shared/functions/util';

export const AUTH_USER = createActionType('AUTH_USER', 'Authentication');
export const LOGIN = createActionType('LOGIN', 'Authentication');
export const REGISTER = createActionType('REGISTER', 'Authentication');
export const VERIFY_CODE = createActionType('VERIFY_CODE', 'Authentication');
export const CREATE_PASSWORD = createActionType('CREATE_PASSWORD', 'auth');
export const RESET_PASSWORD = createActionType('RESET_PASSWORD', 'auth');
export const UPDATE_SESSION_TOKEN = createActionString('UPDATE_SESSION_TOKEN', 'auth');
export const UPDATE_PASSWORD = createActionType('UPDATE_PASSWORD', 'auth');
export const CHANGE_PASSWORD = createActionType('CHANGE_PASSWORD', 'Authentication');
export const SEND_VERIFICATION = createActionType('SEND_VERIFICATION', 'Authentication');
export const LOGOUT = createActionString('LOGOUT', 'auth');
export const FETCH_MEMBER_CATEGORIES = createActionType('FETCH_MEMBER_CATEGORIES', 'Authentication');

export const login = payload => ({
    type: LOGIN.START,
    meta: { payload },
});

export const register = payload => ({
    type: REGISTER.START,
    meta: { payload },
});

export const verifyCode = payload => ({
    type: VERIFY_CODE.START,
    meta: { payload },
});

export const logout = () => ({
    type: LOGOUT,
});

export const createPassword = payload => ({
    type: CREATE_PASSWORD.START,
    meta: { payload },
});

export const resetPassword = payload => ({
    type: RESET_PASSWORD.START,
    meta: { payload },
});

export const updateSessionToken = token => ({
    type: UPDATE_SESSION_TOKEN,
    payload: token,
});

export const updatePassword = payload => ({
    type: UPDATE_PASSWORD.START,
    meta: { payload },
});

export const changePassword = payload => ({
    type: CHANGE_PASSWORD.START,
    meta: { payload },
});

export const sendVerification = payload => ({
    type: SEND_VERIFICATION.START,
    meta: { payload },
});

export const fetchMemberCategories = params => ({
    type: FETCH_MEMBER_CATEGORIES.START,
    meta: { params },
});
