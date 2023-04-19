import { ADD_USER, FETCH_USER_BY_EMAIL, FETCH_USERS } from '../../actions/app';
import { arrayToObjectByProp } from '../../../_shared/functions/util';


const defaultState = {
    current: { found: false },
    byId: {},
    byList: [],
};

const userReducer = (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_USER_BY_EMAIL.SUCCESS:
            return Object.assign({}, state, { current: { found: true, ...action.payload } });
        case FETCH_USERS.SUCCESS: {
            const byList = payload;
            return Object.assign({}, state, {
                byId: arrayToObjectByProp(byList, '_id'),
                byList,
            });
        }
        case ADD_USER.SUCCESS:
            const byList = [...state.byList, payload];
            return {
                ...state,
                byId: arrayToObjectByProp(byList, '_id'),
                byList,
                current: payload,
            };
        default:
            return state;
    }
};

export default userReducer;
