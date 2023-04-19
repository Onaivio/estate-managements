import { arrayToById, byIdToByCreatedAt } from '../../../_shared/functions/util';
import { FETCH_PRODUCTS, FETCH_PRODUCT, ORDER_PRODUCT, DELETE_PRODUCT } from '../../actions/app/product';
import { FETCH_CLIENTS } from '../../actions/app';


const defaultState = {
    current: null,
    byId: {},
    byList: [],
};


const clientReducer = (state = defaultState, action) => {
    const { payload } = action;
    switch (action.type) {
        case FETCH_CLIENTS.SUCCESS:
            const byId = arrayToById(payload);
            const byList = byIdToByCreatedAt(byId);
            return Object.assign({}, state, { byId, byList });
        default:
            return state;
    }
};

export default clientReducer;
