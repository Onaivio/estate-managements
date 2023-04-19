import {
    CREATE_ACCOUNT,
    DELETE_ACCOUNT,
    FETCH_ACCOUNT,
    FETCH_ACCOUNTS, RESOLVE_ACCOUNT_NUMBER,
    UPDATE_ACCOUNT
} from "../../actions/app/account";
import _ from "lodash";
import { arrayToById, byIdToByCreatedAt } from "../../../_shared/functions/util";

const defaultState = {
    current: null,
    byId: {},
    byList: [],
    resolvedAccountNumber: {},
};

const accountReducer = (state = defaultState, action) => {
    const { payload } = action;
    switch (action.type) {
        case CREATE_ACCOUNT.SUCCESS:
            return _.assign({}, state, {
                current: payload,
                byId: { ...state.byId, [payload["_id"]]: payload },
                byList: [payload, ...state.byList]
            });
        case FETCH_ACCOUNT.SUCCESS:
            return _.assign({}, state, { current: action.payload });
        case FETCH_ACCOUNTS.SUCCESS:
            const byId = arrayToById(payload);
            const byList = byIdToByCreatedAt(byId);
            return _.assign({}, state, { byId, byList });
        case UPDATE_ACCOUNT.SUCCESS:
            const current = state.current ? { ...state.current, ...payload } : payload;
            if (state.byId[current["_id"]]) {
                current.byId = { ...state.byId, [current["_id"]]: current };
                current.byList = byIdToByCreatedAt(current.byId);
            }
            return _.assign({}, state, current);
        case RESOLVE_ACCOUNT_NUMBER.SUCCESS:
            return _.assign({}, state, { resolvedAccountNumber: payload });
        case DELETE_ACCOUNT.SUCCESS: {
            const deleteId = payload["_id"];
            if (deleteId && state.byId[deleteId]) {
                const update = {
                    byId: { ...state.byId },
                    byList: { ...state.byList }
                };
                delete update.byId[deleteId];
                update.byList = state.byList.filter(account => account["_id"] !== deleteId);
                return _.assign({}, state, update);
            }
            return _.assign({}, state);
        }
        default:
            return state;
    }
};

export default accountReducer;
