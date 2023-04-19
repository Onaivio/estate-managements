import { createActionType } from '../../../_shared/functions/util';


export const ORDER_PRODUCT = createActionType('ORDER_PRODUCT', 'Product');
export const REQUEST_PRODUCT = createActionType('REQUEST_PRODUCT', 'Product');
export const ACTIVATE_REQUEST_PRODUCT = createActionType('ACTIVATE_REQUEST_PRODUCT', 'Product');
export const ASSIGN_REQUEST_PRODUCT = createActionType('ASSIGN_REQUEST_PRODUCT', 'Product');
export const UPDATE_ORDER_PRODUCT = createActionType('UPDATE_ORDER_PRODUCT', 'Product');
export const FETCH_APPROVED_ORDERS = createActionType('FETCH_APPROVED_ORDERS', 'Product');
export const FETCH_ORDERS = createActionType('FETCH_ORDERS', 'Product');
export const SAVE_PRODUCT = createActionType('SAVE_PRODUCT', 'Product');
export const FETCH_PRODUCT = createActionType('FETCH_PRODUCT', 'Product');
export const FETCH_PRODUCTS = createActionType('FETCH_PRODUCTS', 'Product');
export const FETCH_PRODUCT_CART = createActionType('FETCH_PRODUCT_CART', 'Product');
export const DELETE_PRODUCT = createActionType('DELETE_PRODUCT', 'Product');


export const fetchProducts = params => ({
    type: FETCH_PRODUCTS.START,
    meta: { params },
});

export const fetchOrders = params => ({
    type: FETCH_ORDERS.START,
    meta: { params },
});


export const fetchApprovedOrders = params => ({
    type: FETCH_APPROVED_ORDERS.START,
    meta: { params },
});

export const fetchProductCart = params => ({
    type: FETCH_PRODUCT_CART.START,
    meta: { params },
});

export const orderProduct = (payload, params = {}) => ({
    type: ORDER_PRODUCT.START,
    meta: { payload, params },
});

export const updateOrder = (orderId, payload, params = {}) => ({
    type: ORDER_PRODUCT.START,
    meta: { orderId, payload, params },
});

export const requestProduct = (payload, params = {}) => ({
    type: REQUEST_PRODUCT.START,
    meta: { payload, params },
});

export const activateProduct = (payload, params = {}) => ({
    type: ACTIVATE_REQUEST_PRODUCT.START,
    meta: { payload, params },
});

export const assignProduct = (payload, params = {}) => ({
    type: ASSIGN_REQUEST_PRODUCT.START,
    meta: { payload, params },
});

export const saveProduct = (payload, params = {}) => ({
    type: SAVE_PRODUCT.START,
    meta: { payload, params },
});

export const fetchProduct = (productId, params = {}) => ({
    type: FETCH_PRODUCT.START,
    meta: { productId, params },
});


export const deleteProduct = (productId, params = {}) => ({
    type: DELETE_PRODUCT.START,
    meta: { productId, params },
});
