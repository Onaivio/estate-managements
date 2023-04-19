import {
    CREATE_ACCOUNT,
    DELETE_ACCOUNT,
    FETCH_ACCOUNT,
    FETCH_ACCOUNTS, RESOLVE_ACCOUNT_NUMBER,
    UPDATE_ACCOUNT, UPLOAD_ADDRESS,PROVE_OF_PAYMENT, UPLOAD_BANK_STATEMENT, UPLOAD_CURRENT_USER_AVATAR, UPLOAD_MEAN_OF_IDENTIFICATION,
} from '../../actions/app/account';
import { apiRequest, DELETE, GET, POST, PUT } from '../../actions';
import { API } from '../../../_shared/defs/_urls';


const createAccount = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === CREATE_ACCOUNT.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: API.ACCOUNTS,
                key: 'createAccount',
                onSuccess: CREATE_ACCOUNT.SUCCESS,
                ...action.meta,
            }),
        );
    }
};

const resolveAccountNumber = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === RESOLVE_ACCOUNT_NUMBER.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: `${API.ACCOUNTS}/resolve/account-number`,
                key: 'resolveAccount',
                onSuccess: data => {
                    dispatch({ type: RESOLVE_ACCOUNT_NUMBER.SUCCESS, payload: data });
                },
                ...action.meta,
            }),
        );
    }
};

const fetchAccount = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_ACCOUNT.START) {
        const { accountId, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: GET,
                url: `${API.ACCOUNTS}/${accountId}`,
                key: 'fetchAccount',
                onSuccess: (data) => {
                    dispatch({ type: FETCH_ACCOUNT.SUCCESS, payload: data });
                },
                ...rest,
            }),
        );
    }
};

const fetchAccounts = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_ACCOUNTS.START) {
        const { ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: GET,
                url: `${API.ACCOUNTS}`,
                key: 'fetchAccount',
                onSuccess: FETCH_ACCOUNTS.SUCCESS,
                ...rest,
            }),
        );
    }
};

const uploadCurrentUserAvatar = ({ dispatch }) => next => action => {
    next(action);
    const { type, key, accountId, payload, ...rest } = action;
    const formData = new FormData();
    formData.append('type', 'avatar');
    formData.append('file', payload);
    if (type === UPLOAD_CURRENT_USER_AVATAR.START) {
        dispatch(
            apiRequest({
                method: PUT,
                url: `/accounts/${accountId}/upload`,
                key: key || 'uploadCurrentUserAvatar',
                payload: formData,
                onSuccess: data => {
                    dispatch({ type: UPLOAD_CURRENT_USER_AVATAR.SUCCESS, payload: data });
                    dispatch({ type: FETCH_ACCOUNT.SUCCESS, payload: data });
                },
                ...rest,
            }),
        );
    }
};


const uploadKYC = ({ dispatch }) => next => action => {
    next(action);
    const { type, key, accountId, uploadType, payload, ...rest } = action;
    const formData = new FormData();
    formData.append('type', uploadType);
    formData.append('file', payload);
    if (type === UPLOAD_MEAN_OF_IDENTIFICATION.START) {
        dispatch(
            apiRequest({
                method: PUT,
                url: `/accounts/${accountId}/upload`,
                key: key || 'uploadKYC',
                payload: formData,
                onSuccess: data => {
                    dispatch({ type: UPLOAD_MEAN_OF_IDENTIFICATION.SUCCESS, payload: data });
                    dispatch({ type: FETCH_ACCOUNT.SUCCESS, payload: data });
                },
                ...rest,
            }),
        );
    }
};

const updateAccount = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === UPDATE_ACCOUNT.START) {
        const { accountId, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: PUT,
                url: `${API.ACCOUNTS}/${accountId}`,
                key: 'updateAccount',
                onSuccess: UPDATE_ACCOUNT.SUCCESS,
                ...rest,
            }),
        );
    }
};

const deleteAccount = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === DELETE_ACCOUNT.START) {
        const { ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: DELETE,
                url: `${API.ACCOUNTS}`,
                key: 'deleteAccount',
                onSuccess: DELETE_ACCOUNT.SUCCESS,
                ...rest,
            }),
        );
    }
};


export default [
    createAccount,
    fetchAccount,
    fetchAccounts,
    updateAccount,
    resolveAccountNumber,
    deleteAccount,
    uploadCurrentUserAvatar,
    uploadKYC,
];
