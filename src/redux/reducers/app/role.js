import _ from 'lodash';
import { arrayToById, byIdToByCreatedAt } from '../../../_shared/functions/util';
import { CREATE_ROLE, DELETE_ROLE, FETCH_ROLE, FETCH_ROLES, UPDATE_ROLE } from '../../actions/app';

const defaultState = {
    current: null,
    byId: {},
    byList: [],
};

const roleReducer = (state = defaultState, action) => {
    const { payload } = action;
    switch (action.type) {
        case CREATE_ROLE.SUCCESS:
            return _.assign({}, state, {
                current: payload,
                byId: { ...state.byId, [payload['_id']]: payload },
                byList: [payload, ...state.byList],
            });
        case FETCH_ROLE.SUCCESS:
            return _.assign({}, state, { current: action.payload });
        case FETCH_ROLES.SUCCESS:
            const byId = arrayToById(payload);
            const byList = byIdToByCreatedAt(byId);
            return _.assign({}, state, { byId, byList });
        case UPDATE_ROLE.SUCCESS:
            const current = state.current ? { ...state.current, ...payload } : payload;
            if (state.byId[current['_id']]) {
                current.byId = { ...state.byId, [current['_id']]: current };
                current.byList = byIdToByCreatedAt(current.byId);
            }
            return _.assign({}, state, current);
        case DELETE_ROLE.SUCCESS: {
            const deleteId = payload['_id'];
            if (deleteId && state.byId[deleteId]) {
                const update = {
                    byId: { ...state.byId },
                    byList: { ...state.byList },
                };
                delete update.byId[deleteId];
                update.byList = state.byList.filter(role => role['_id'] !== deleteId);
                return _.assign({}, state, update);
            }
            return _.assign({}, state);
        }
        default:
            return state;
    }
};

export default roleReducer;
