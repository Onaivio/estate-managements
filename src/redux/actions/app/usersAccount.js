import { createActionType } from '../../../_shared/functions/util';


export const CREATE_USER_ACCOUNT = createActionType('CREATE_USER_ACCOUNT');
export const UPDATE_USER_ACCOUNT = createActionType('UPDATE_USER_ACCOUNT');
export const DELETE_USER_ACCOUNT = createActionType('DELETE_USER_ACCOUNT');
export const FETCH_USER_ACCOUNT = createActionType('FETCH_USER_ACCOUNT');
export const FETCH_LOGGED_IN_USER_ACCOUNT = createActionType('FETCH_LOGGED_IN_USER_ACCOUNT');
export const FETCH_USER_ACCOUNTS = createActionType('FETCH_USER_ACCOUNTS');


export const createUserAccount = (payload, params = {}) => ({
  type: CREATE_USER_ACCOUNT.START,
  meta: {
    payload,
    params,
  },
});

export const updateUserAccount = (userId, payload, params) => ({
  type: UPDATE_USER_ACCOUNT.START,
  meta: {
    userId,
    payload,
    params,
  },
});
