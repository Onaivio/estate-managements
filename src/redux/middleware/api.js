import { isEmpty } from 'lodash';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import { createAPIRequest } from '../../services/axios';
import {
    API_REQUEST,
    startUILoading,
    stopUILoading,
    uiSetPagination,
    updateUIError,
} from '../actions/index';
import { updateSessionToken } from '../actions';
import { formatMessagesFromError, showNotification } from '../../_shared/functions/util';

export const processApiError = error => {
    let response = '';
    if (!error) {
        response = 'An error occurred, please try again!';
    } else if (error.message) {
        response = error.message;
    } else if (error.messages) {
        Object.values(error.messages).forEach(message => {
            response += `${message}\n`;
        });
    }
    return response || 'An error occurred';
};
// @ts-ignore
const apiRequest = ({ dispatch }) => next => action => {
    if (action.type === API_REQUEST.START) {
        const {
            method,
            url,
            key,
            payload,
            onError,
            successMessage,
            params,
            onSuccess,
            nextRoute,
            errorMessage,
            noSuccessToast,
            noErrorToast,
        } = action.meta;
        const config = { method, url };
        if (payload && (!isEmpty(payload) || payload instanceof FormData)) {
            config.data = payload;
        }
        if (params && !isEmpty(params)) {
            config.params = params;
        }
        dispatch(updateUIError(key, null));
        dispatch(startUILoading(key));
        createAPIRequest(config)
            .then(response => {
                console.log('api-response:', response);
                const { data, _meta } = response;
                if (_meta && _meta.pagination) {
                    dispatch(uiSetPagination(key, _meta.pagination));
                }
                if (_meta && _meta.token) {
                    dispatch(updateSessionToken(_meta.token));
                }
                if (onSuccess) {
                    if (typeof onSuccess === 'function') {
                        onSuccess(data);
                    } else {
                        dispatch({ type: onSuccess, payload: data });
                    }
                }
                if (nextRoute) {
                    // dispatch(push(nextRoute));
                    dispatch(window.location = nextRoute);
                }
                dispatch(stopUILoading(key));
                const toastMessage = successMessage || (_meta && _meta.message);
                if (!noSuccessToast && toastMessage) {
                    toast.dismiss();
                    toast.info(toastMessage);
                    // showNotification('info', 'Info', toastMessage);
                }
            })
            .catch(e => {
                console.log('errrr ', e);
                const showErrorMessage = message => {
                    if (!noErrorToast && method.toLowerCase() !== 'get' && message) {
                        toast.error(message);
                        // showNotification('error', errorMessage || 'An Error occurred', message);
                    }
                };
                if (onError) {
                    if (typeof onError === 'function') {
                        onError(e);
                    } else {
                        const message = formatMessagesFromError(e);
                        console.log('error-message:', message);
                        dispatch(updateUIError(key, message));
                        showErrorMessage(e.message ? e.message : 'Check your internet connection');
                    }
                } else {
                    const error =
                        (e && e.data && e.data._meta && e.data._meta.error) ||
                        (e && e.error) ||
                        e;
                    console.log('error-message:', error);
                    const message = errorMessage || error;
                    dispatch(updateUIError(key, message));
                    showErrorMessage((error && error.message) ? error.message : 'Check your internet connection');
                }
                dispatch(stopUILoading(key));
            });
    }
    return next(action);
};

export default [apiRequest];
