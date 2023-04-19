import { createActionType } from '../../../_shared/functions/util';


export const CREATE_ACCOUNT = createActionType('CREATE_ACCOUNT', 'Account');
export const FETCH_ACCOUNTS = createActionType('FETCH_ACCOUNTS', 'Account');
export const FETCH_ACCOUNT = createActionType('FETCH_ACCOUNT', 'Account');
export const UPDATE_ACCOUNT = createActionType('UPDATE_ACCOUNT', 'Account');
export const RESOLVE_ACCOUNT_NUMBER = createActionType('RESOLVE_ACCOUNT_NUMBER', 'Account');
export const DELETE_ACCOUNT = createActionType('DELETE_ACCOUNT', 'Account');
export const UPLOAD_CURRENT_USER_AVATAR = createActionType('UPLOAD_CURRENT_USER_AVATAR', 'User');
export const UPLOAD_BANK_STATEMENT = createActionType('UPLOAD_BANK_STATEMENT', 'User');
export const UPLOAD_MEAN_OF_IDENTIFICATION = createActionType('UPLOAD_MEAN_OF_IDENTIFICATION', 'User');
export const PROVE_OF_PAYMENT = createActionType('PROVE_OF_PAYMENT', 'User');
export const UPLOAD_ADDRESS = createActionType('UPLOAD_ADDRESS', 'User');

export const createAccount = (payload, params) => ({
    type: CREATE_ACCOUNT.START,
    meta: { payload, params },
});

export const resolveAccountNumber = (payload, params) => ({
    type: RESOLVE_ACCOUNT_NUMBER.START,
    meta: { payload, params },
});

export const uploadCurrentUserAvatar = (accountId, payload, params = {}) => ({
    type: UPLOAD_CURRENT_USER_AVATAR.START,
    accountId,
    payload,
    params,
});

export const uploadBankStatement = (accountId, payload, params = {}) => ({
    type: UPLOAD_BANK_STATEMENT.START,
    accountId,
    payload,
    params,
});
export const uploadAddress = (accountId, payload, params = {}) => ({
    type: UPLOAD_ADDRESS.START,
    accountId,
    payload,
    params,
});

export const uploadKYC = (accountId, uploadType, payload, params = {}) => ({
    type: UPLOAD_MEAN_OF_IDENTIFICATION.START,
    accountId,
    uploadType,
    payload,
    params,
});

export const uploadProveOfPayment = (accountId, payload, params = {}) => ({
    type: PROVE_OF_PAYMENT.START,
    accountId,
    payload,
    params,
});

export const fetchAccounts = (params) => ({
    type: FETCH_ACCOUNTS.START,
    meta: { params },
});

export const fetchAccount = (accountId, params = {}) => ({
    type: FETCH_ACCOUNT.START,
    meta: { accountId, params },
});

export const updateAccount = (accountId, payload, params = {}) => ({
    type: UPDATE_ACCOUNT.START,
    meta: { accountId, payload, params },
});

export const deleteAccount = (accountId, params = {}) => ({
    type: DELETE_ACCOUNT.START,
    meta: { accountId, params },
});
