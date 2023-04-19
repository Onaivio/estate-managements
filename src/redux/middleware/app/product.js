import { API } from '../../../_shared/defs/_urls';
import {
    DELETE_PRODUCT, FETCH_APPROVED_ORDERS, FETCH_PRODUCT,
    UPDATE_ORDER_PRODUCT,
    FETCH_PRODUCTS, ORDER_PRODUCT, REQUEST_PRODUCT, ASSIGN_REQUEST_PRODUCT, ACTIVATE_REQUEST_PRODUCT, FETCH_ORDERS,
} from '../../actions/app/product';
import { apiRequest, DELETE, GET, POST, PUT } from '../../actions';

const { PRODUCTS, ORDERS } = API;

const orderProduct = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === ORDER_PRODUCT.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: ORDERS,
                key: 'orderProduct',
                onSuccess: ORDER_PRODUCT.SUCCESS,
                ...action.meta,
            }),
        );
    }
};

const requestProduct = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === REQUEST_PRODUCT.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: `${ORDERS}/request`,
                key: 'requestProduct',
                onSuccess: REQUEST_PRODUCT.SUCCESS,
                ...action.meta,
            }),
        );
    }
};

const assignedProduct = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === ASSIGN_REQUEST_PRODUCT.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: `${ORDERS}/assign`,
                key: 'assignedProduct',
                onSuccess: data => {
                    dispatch({ type: ASSIGN_REQUEST_PRODUCT.SUCCESS, payload: data });
                },
                ...action.meta,
            }),
        );
    }
};

const activateProduct = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === ACTIVATE_REQUEST_PRODUCT.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: `${ORDERS}/activate`,
                key: 'activateProduct',
                onSuccess: ACTIVATE_REQUEST_PRODUCT.SUCCESS,
                ...action.meta,
            }),
        );
    }
};

const fetchProduct = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_PRODUCT.START) {
        const { productId, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: GET,
                url: `${PRODUCTS}/${productId}`,
                key: 'fetchProduct',
                onSuccess: (data) => {
                    dispatch({ type: FETCH_PRODUCT.SUCCESS, payload: data });
                },
                ...rest,
            }),
        );
    }
};

const fetchProducts = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_PRODUCTS.START) {
        const { ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: GET,
                url: `${PRODUCTS}`,
                key: 'fetchProducts',
                onSuccess: (data) => {
                    dispatch({ type: FETCH_PRODUCTS.SUCCESS, payload: data });
                },
                ...rest,
            }),
        );
    }
};

const fetchApprovedOrders = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_APPROVED_ORDERS.START) {
        const { ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: GET,
                url: `${ORDERS}/approved`,
                key: 'fetchApprovedOrders',
                onSuccess: (data) => {
                    dispatch({ type: FETCH_APPROVED_ORDERS.SUCCESS, payload: data });
                },
                ...rest,
            }),
        );
    }
};

const fetchOrders = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_ORDERS.START) {
        const { ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: GET,
                url: `${ORDERS}`,
                key: 'fetchOrders',
                onSuccess: (data) => {
                    dispatch({ type: FETCH_ORDERS.SUCCESS, payload: data });
                },
                ...rest,
            }),
        );
    }
};

const updateOrder = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === UPDATE_ORDER_PRODUCT.START) {
        const { params, orderId, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: PUT,
                url: `${ORDERS}/${orderId}`,
                key: 'updateOrder',
                onSuccess: UPDATE_ORDER_PRODUCT.SUCCESS,
                params,
                ...rest,
            }),
        );
    }
};


const deleteProduct = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === DELETE_PRODUCT.START) {
        const { productId, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: DELETE,
                url: `${PRODUCTS}/${productId}`,
                key: 'deleteProduct',
                onSuccess: DELETE_PRODUCT.SUCCESS,
                ...rest,
            }),
        );
    }
};


export default [
    orderProduct,
    assignedProduct,
    activateProduct,
    requestProduct,
    updateOrder,
    fetchOrders,
    fetchApprovedOrders,
    fetchProduct,
    fetchProducts,
    deleteProduct,
];

