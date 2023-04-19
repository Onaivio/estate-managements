import { createActionType } from '../../../_shared/functions/util';


export const CREATE_ROLE = createActionType('CREATE_ROLE', 'Role');
export const FETCH_ROLE = createActionType('FETCH_ROLE', 'Role');
export const FETCH_ROLES = createActionType('FETCH_ROLES', 'Role');
export const UPDATE_ROLE = createActionType('UPDATE_ROLE', 'Role');
export const UPDATE_ROLE_STATUS = createActionType('UPDATE_ROLE_STATUS', 'Role');
export const DELETE_ROLE = createActionType('DELETE_ROLE', 'Role');


export const fetchRoles = params => ({
    type: FETCH_ROLES.START,
    meta: { params },
});

export const createRole = (payload, params = {}) => ({
    type: CREATE_ROLE.START,
    meta: { payload, params },
});

export const fetchRole = (roleId, params = {}) => ({
    type: FETCH_ROLE.START,
    meta: { roleId, params },
});

export const updateRole = (roleId, payload, params = {}) => ({
    type: UPDATE_ROLE.START,
    meta: { payload, roleId, params },
});

export const updateRoleStatus = (roleId, key, status, params = {}) => ({
    type: UPDATE_ROLE_STATUS.START,
    meta: { roleId, params, status, key },
});

export const deleteRole = (roleId, params = {}) => ({
    type: DELETE_ROLE.START,
    meta: { roleId, params },
});
