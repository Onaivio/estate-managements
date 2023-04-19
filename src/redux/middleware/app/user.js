import { API } from '../../../_shared/defs/_urls';
import { ADD_USER, FETCH_USER_BY_EMAIL, FETCH_USERS, UPDATE_USER_BY_ID } from '../../actions/app';
import { apiRequest, GET, POST, PUT } from '../../actions';


const { USERS } = API;


const addUser = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === ADD_USER.START) {
        const { key, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: POST,
                url: `${USERS}`,
                key: key || 'addUser',
                onSuccess: data => {
                    dispatch({
                        type: ADD_USER.SUCCESS,
                        payload: data,
                    });
                },
                ...rest,
            }),
        );
    }
};

const fetchUsers = ({ dispatch }) => next => action => {
    next(action);
    const { type, key, ...rest } = action;
    if (type === FETCH_USERS.START) {
        dispatch(
            apiRequest({
                method: GET,
                url: `${USERS}`,
                key: key || 'fetchUsers',
                onSuccess: FETCH_USERS.SUCCESS,
                ...rest,
            }),
        );
    }
};

const fetchUserByEmail = ({ dispatch }) => next => action => {
    next(action);
    const { type, email } = action;
    if (type === FETCH_USER_BY_EMAIL.START) {
        dispatch(
            apiRequest({
                method: GET,
                url: `${USERS}/${email}/find-by-email`,
                key: 'fetchUserByEmail',
                onSuccess: FETCH_USER_BY_EMAIL.SUCCESS,
            }),
        );
    }
};

const updateUserById = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === UPDATE_USER_BY_ID.START) {
        const { key, userId, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: PUT,
                url: `${USERS}/${userId}`,
                key: key || 'updateUserById',
                onSuccess: UPDATE_USER_BY_ID.SUCCESS,
                ...rest,
            }),
        );
    }
};

export default [
    fetchUserByEmail,
    updateUserById,
    addUser,
    fetchUsers,
];
