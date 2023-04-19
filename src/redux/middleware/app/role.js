import {
    apiRequest,
    CREATE_ROLE,
    DELETE,
    DELETE_ROLE,
    FETCH_ROLE,
    FETCH_ROLES,
    GET, POST, PUT, UPDATE_ROLE,
} from '../../actions/index';
import { API } from '../../../_shared/defs/_urls';


const createRole = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === CREATE_ROLE.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: API.ROLES,
                key: 'createRole',
                onSuccess: CREATE_ROLE.SUCCESS,
                ...action.meta,
            }),
        );
    }
};

const fetchRole = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_ROLE.START) {
        const { roleId, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: GET,
                url: `${API.ROLES}/${roleId}`,
                key: 'fetchRole',
                onSuccess: (data) => {
                    console.log('role-data:', data);
                    dispatch({ type: FETCH_ROLE.SUCCESS, payload: data });
                },
                ...rest,
            }),
        );
    }
};

const fetchRoles = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_ROLES.START) {
        const { ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: GET,
                url: `${API.ROLES}`,
                key: 'fetchRoles',
                onSuccess: (data) => {
                    console.log('roles-data:', data);
                    dispatch({ type: FETCH_ROLES.SUCCESS, payload: data });
                },
                ...rest,
            }),
        );
    }
};


const updateRole = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === UPDATE_ROLE.START) {
        const { roleId, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: PUT,
                url: `${API.ROLES}/${roleId}`,
                key: 'updateRole',
                onSuccess: UPDATE_ROLE.SUCCESS,
                ...rest,
            }),
        );
    }
};

const deleteRole = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === DELETE_ROLE.START) {
        const { roleId, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: DELETE,
                url: `${API.ROLES}/${roleId}`,
                key: 'deleteRole',
                onSuccess: DELETE_ROLE.SUCCESS,
                ...rest,
            }),
        );
    }
};


export default [
    createRole,
    fetchRole,
    fetchRoles,
    updateRole,
    deleteRole,
];

