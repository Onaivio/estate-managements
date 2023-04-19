import { createActionType } from '../../../_shared/functions/util';


export const ADD_USER = createActionType('ADD_USER', 'User');
export const FETCH_USERS = createActionType('FETCH_USERS', 'User');
export const UPDATE_USER_BY_ID = createActionType('UPDATE_USER_BY_ID', 'User');
export const FETCH_USER_BY_EMAIL = createActionType('FETCH_USER_BY_EMAIL', 'User');

export const fetchUsers = (params = {}) => ({
    type: FETCH_USERS.START,
    params,
});

export const fetchUserByEmail = (email) => ({
    type: FETCH_USER_BY_EMAIL.START,
    email,
});

export const addUser = (payload, params = {}) => ({
    type: ADD_USER.START,
    meta: {
        payload,
        params,
    },
});

export const updateUserById = (userId, payload, params = {}) => ({
    type: UPDATE_USER_BY_ID.START,
    meta: {
        userId,
        payload,
        params,
    }
});



