import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { notification } from 'antd';
import { Modal } from 'antd';

const { confirm } = Modal;

export const formatMessagesFromError = error => {
    let message = (
        <>
            <span>
        <i className="fa fa-times"/> {error && error.message}
      </span>
        </>
    );

    if (error && error.messages) {
        message = error.message && (
            <h6 className="mb-0">
                <i className="fas fa-exclamation-triangle"/> {error.message}
            </h6>
        );
    }
    return (
        <>
            {message}
            {!!error && error.messages && (
                <ul className="pl-1">
                    {Object.keys(error.messages).map(item => {
                        return (
                            Array.isArray(error.messages[item]) &&
                            error.messages[item].map((item2, i) => <li key={i}>{item2}</li>)
                        );
                    })}
                </ul>
            )}
        </>
    );
};

export const sortArrayByObjectProp = (array = [], prop) =>
    array.sort((a, b) => {
        const _a = new Date(a[prop]);
        const _b = new Date(b[prop]);
        if (_a > _b) {
            return -1;
        } else if (_a < _b) {
            return 1;
        } else {
            return 1;
        }
    });
export const arrayToObjectByProp = (array, prop) =>
    array.reduce((obj, item) => {
        obj[item[prop]] = item;
        return obj;
    }, {});

export const createActionType = (type, entity = 'App') => ({
    START: `@@[${entity}] ${type}`,
    SUCCESS: `@@[${entity}] ${type}_SUCCESS`,
    ERROR: `@@[${entity}] ${type}_ERROR`,
    END: `@@[${entity}] ${type}_END`,
});

export const showConfirm = (
    title,
    message,
    confirmButtonText = 'Yes',
    cancelButtonText = 'No',
    handleConfirm,
    handleClose) => confirm({
        title,
        content: message,
        okText: confirmButtonText,
        okType: 'danger',
        cancelText: cancelButtonText,
        onOk: handleConfirm,
        onCancel: handleClose,
});

export const createActionString = (type, entity = 'App') =>
    `[${entity}] ${type}`;

export const capitalizeFirstLetter = string => {
    return (
        string &&
        string.split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.slice(1))
            .join(' ')
    );
};

export const userNameOrEmail = user => {
    if (!user) return null;
    const { first_name = '', last_name = '', email } = user;
    return (
        (first_name &&
            `${capitalizeFirstLetter(first_name)} ${capitalizeFirstLetter(last_name)}`) || email
    );
};

export const getDateByTimeZone = (date, format = 'Do MMM, YYYY', timezone) => {
    if (!date) return '';
    if (date === 'today') date = moment();
    return moment().format(format);
};

/***
 * filterVal: 'false'
 * filterType: 'SELECT',
 * comparator: '='
 * caseSensitive: false
 * @param data
 * */
export const parseTableParamsToQuery = data => {
    const { page, searchText, sizePerPage, sortField, type, filters } = data;
    const query = {};
    if (type === 'search') {
        if (searchText) {
            query['search'] = searchText;
        }
    }
    if (type === 'filter') {
        if (!_.isEmpty(filters)) {
            query['filters'] = filters;
        }
    }
    if (page) {
        query['page'] = page;
    }
    if (sizePerPage) {
        query['per_page'] = sizePerPage;
    }
    if (sortField) {
        query['sort'] = sortField;
    }
    return query;
};

export const byIdToByCreatedAt = object => {
    return Object.values(object).sort(
        (prev, curr) => new Date(curr.createdAt) - new Date(prev.createdAt),
    );
};

export const sortById = (object) => {
    return Object.values(object).sort(
        (prev, curr) => {
            return prev - curr;
        },
    );
};

export const arrayToById = (array) => {
    return array.reduce((accumulator, currentObject) => {
        const { _id } = currentObject;
        accumulator[_id] = currentObject;
        return accumulator;
    }, {});
};


export const maybePluralize = (count, noun, suffix = 's') =>
    `${count} ${noun}${count !== 1 ? suffix : ''}`;

export const filterByRole2 = (role, items = [], filtered = []) => {
    for (let i = 0; i < items.length; i++) {
        if (!items[i].roles || (items[i].roles && items[i].roles.includes(role))) {
            filtered.push(items[i]);
        }
        if (items[i].roles && items[i].roles.includes(role)) {
            if (filtered[i] && filtered[i].submenu && filtered[i].submenu.length > 0) {
                filtered[i].submenu = filterByRole(role, filtered[i], []);
            }
        }
    }
    return filtered;
};

export const filterByRole = (role, items = [], filtered = []) => {
    for (let i = 0; i < items.length; i++) {
        if (!items[i].roles || (items[i].roles && items[i].roles.includes(role))) {
            filtered.push(items[i]);
        }
    }
    return filtered;
};

/**
 * Get current path related object from Navigation Item
 * @param {Array} navItem - Navigation Item
 * @param {String} path - Location path you looking for e.g /app/dashboard
 * @return {Object} object that contained the path string
 **/
export const getRouteInfo = (navItem, path) => {
    if (navItem['path'] === path) {
        return navItem;
    }
    let route;
    for (let p in navItem) {
        if (navItem.hasOwnProperty(p) && typeof navItem[p] === 'object') {
            route = getRouteInfo(navItem[p], path);
            if (route) {
                return route;
            }
        }
    }
};

export const showNotification = (key, message, description = '') => {
    notification[key]({ message, description });
};

/**
 * Get Breakpoint
 * @param {Object} screens - Grid.useBreakpoint() from antd
 * @return {Array} array of breakpoint size
 * */
export const getBreakPoint = (screens) => {
    let breakPoints = [];
    for (const key in screens) {
        if (screens.hasOwnProperty(key)) {
            const element = screens[key];
            if (element) {
                breakPoints.push(key);
            }
        }
    }
    return breakPoints;
};

/**
 * Get first character from first & last sentences of a username
 * @param {String} name - Username
 * @return {String} 2 characters string
 */
export const getNameInitial = (name) => {
    let initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
};

/**
 * @param {Number} size code length
 * @param {Boolean} alpha Check if it's alpha numeral
 * @return {String} The code
 **/
export const generateSecrete = (size = 4, alpha = false) => {
    let characters = alpha ? '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' : '0123456789';
    characters = characters.split('');
    let selections = '';
    for (let i = 0; i < size; i++) {
        let index = Math.floor(Math.random() * characters.length);
        selections += characters[index];
        characters.splice(index, 1);
    }
    return selections;
};

/**
 * Returns either ascending or descending value
 * @param {Object} a - antd Table sorter param a
 * @param {Object} b - antd Table sorter param b
 * @param {String} key - object key for compare
 * @return {any} a value minus b value
 */
export const antdTableSorter = (a, b, key) => {
    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return a[key] - b[key];
    }

    if (typeof a[key] === 'string' && typeof b[key] === 'string') {
        a = a[key].toLowerCase();
        b = b[key].toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
    }
    return;
};
