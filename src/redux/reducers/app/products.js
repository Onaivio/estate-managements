import { arrayToById, byIdToByCreatedAt } from '../../../_shared/functions/util';
import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT,
    UPDATE_ORDER_PRODUCT,
    ORDER_PRODUCT,
    DELETE_PRODUCT,
    FETCH_APPROVED_ORDERS, REQUEST_PRODUCT,
    ASSIGN_REQUEST_PRODUCT,
    ACTIVATE_REQUEST_PRODUCT, FETCH_ORDERS,
} from '../../actions/app/product';


const defaultState = {
    current: null,
    byId: {},
    byList: [],
    orders: [],
    activatedProduct: null,
    assignedProduct: null,
};


const productReducer = (state = defaultState, action) => {
    const { payload } = action;
    switch (action.type) {
        case ORDER_PRODUCT.SUCCESS:
        case UPDATE_ORDER_PRODUCT.SUCCESS:
            return Object.assign({}, state, {
                current: payload,
                byId: { ...state.byId, [payload._id]: payload },
                byList: [payload, ...state.byList],
            });
        case FETCH_PRODUCT.SUCCESS:
            return Object.assign({}, state, { current: payload });
        case FETCH_APPROVED_ORDERS.SUCCESS:
        case FETCH_ORDERS.SUCCESS:
            return Object.assign({}, state, { orders: payload });
        case ASSIGN_REQUEST_PRODUCT.SUCCESS:
            return Object.assign({}, state, { assignedProduct: payload });
        case ACTIVATE_REQUEST_PRODUCT.SUCCESS:
            return Object.assign({}, state, { activatedProduct: payload });
        case FETCH_PRODUCTS.SUCCESS:
            const byId = arrayToById(payload);
            const byList = byIdToByCreatedAt(byId);
            return Object.assign({}, state, { byId, byList });
        case DELETE_PRODUCT.SUCCESS: {
            const deletedId = payload._id;
            if (deletedId && state.byId[deletedId]) {
                const update = { byId: { ...state.byId }, byList: [...state.byList] };
                delete  update.byId[deletedId];
                update.byList = state.byList.filter(leaves => leaves._id !== deletedId);
                return Object.assign({}, state, update);
            }
            return Object.assign({}, state);
        }
        default:
            return state;
    }
};

export default productReducer;
