import React from 'react';
import _ from 'lodash';
import getRouteUINavigation from '../../_shared/data/nav';
import {
    UI_CROP_CLEAR_CURRENT,
    UI_CROP_OPEN,
    UI_CROP_UPDATE,
    UI_ERROR,
    UI_FILTER_OPEN,
    UI_INITIALIZE,
    UI_LOADING,
    UI_MODAL_CUSTOM_TOGGLE,
    UI_MODEL_TOGGLE,
    UI_RESET,
    UI_SET_PAGINATION,
    UI_CHANGE_LOCALE,
    UI_REMOVE_LOCAL_DATA,
    UI_GET_LOCAL_DATA,
    UI_SAVE_LOCAL_DATA,
    UI_TOGGLE_COLLAPSED_NAV,
    UI_NAV_TYPE_CHANGE,
    UI_TOGGLE_MOBILE_NAV,
    SHOW_SIDEBAR,
    SHOW_RIGHT_SIDEBAR,
    CHANGE_TOP_BAR_THEME,
    CHANGE_SIDEBAR_THEME, CHANGE_LAYOUT_WIDTH, CHANGE_LAYOUT, CHANGE_PRE_LOADER, CHANGE_SIDEBAR_TYPE, TOGGLE_LEFT_MENU,
} from '../actions';
import { NAV_TYPE_SIDE, NAV_TYPE_TOP, SIDE_NAV_LIGHT } from '../../_shared/constants/AppConstant';


const defaultState = {
    route: _.get(window.location, 'pathname'),
    module: 'agent',
    initialize: {
        navigation: [],
        routes: [],
    },
    errors: {},
    loading: {},
    crop: {
        open: false,
        current: 'upload',
    },
    modal: {
        isOpen: false,
        isOpenCustom: false,
    },
    navCollapsed: false,
    sideNavTheme: SIDE_NAV_LIGHT,
    locale: 'en',
    navType: NAV_TYPE_TOP,
    topNavColor: '#3e82f7',
    layoutType: 'vertical',
    layoutWidth: 'fluid',
    leftSideBarTheme: 'dark',
    leftSideBarType: 'default',
    topbarTheme: 'light',
    isPreloader: false,
    showRightSidebar: false,
    isMobile: false,
    showSidebar: true,
    leftMenu: false,
    headerNavColor: '#3e82f7',
    mobileNav: false,
    filter: {},
    pagination: {
        total_count: 0,
        per_page: 10,
        current: 1,
    },
    getLocalData: {},

};

const uiReducer = (state = defaultState, action) => {
    switch (action.type) {
        case UI_INITIALIZE:
            const { module, user, userAccount } = action.payload;
            const initialize = getRouteUINavigation(module, userAccount);
            if (!initialize[module]) {
                return state;
            }
            let init = initialize[module];
            if (user && user.current_profile_type === 'App') {
                init = initialize['app'];
            }
            return Object.assign({}, state, {
                module,
                initialize: { ...init },
            });
        case UI_RESET: {
            return Object.assign({}, state, {
                module,
                initialize: {
                    navigation: [],
                    routes: [],
                },
            });
        }
        case UI_LOADING.START:
            return getNewLoadingState(state, action, true);
        case UI_LOADING.END:
            return getNewLoadingState(state, action, false);
        case UI_ERROR:
            return Object.assign({}, state, {
                errors: { ...state.errors, [action.key]: action.value },
            });
        case UI_MODEL_TOGGLE:
            return Object.assign({}, state, {
                modal: {
                    isOpen: !state.model.isOpen,
                    isOpenCustom: false,
                },
            });
        case UI_SAVE_LOCAL_DATA: {
            saveLocalData(action.key, action.payload);
            return Object.assign({}, state);
        }
        case UI_TOGGLE_COLLAPSED_NAV:
            return Object.assign({}, state, {
                sideNavTheme: action.sideNavTheme,
            });
        case UI_NAV_TYPE_CHANGE:
            return Object.assign({}, state, {
                navType: action.navType,
            });
        case UI_TOGGLE_MOBILE_NAV:
            return Object.assign({}, state, {
                mobileNav: action.mobileNav,
            });
        case UI_GET_LOCAL_DATA:
            return Object.assign({}, state, {
                getLocalData: { ...state.getLocalData, ...getLocalData(action.key) },
            });
        case UI_REMOVE_LOCAL_DATA: {
            removeLocalData(action.key);
            return Object.assign({}, state);
        }
        case UI_MODAL_CUSTOM_TOGGLE:
            return Object.assign({}, state, {
                modal: {
                    isOpen: false,
                    isOpenCustom: !state.modal.isOpenCustom,
                },
            });
        case UI_SET_PAGINATION.START:
            const { key, payload } = action.meta;
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    [key]: payload,
                },
            };
        case UI_CROP_OPEN.START:
            return {
                ...state,
                crop: {
                    ...state.crop,
                    open: true,
                    current: action.key,
                    [action.key]: {
                        ...state.crop[action.key],
                        image: action.payload,
                        type: action.key,
                        aspect: action.aspect,
                    },
                },
            };
        case UI_CROP_UPDATE.START: {
            return {
                ...state,
                crop: {
                    ...state.crop,
                    [action.key]: {
                        ...state.crop[action.key],
                        image: action.image,
                    },
                },
            };
        }
        case UI_CROP_OPEN.END:
            return {
                ...state,
                crop: {
                    ...state.crop,
                    open: false,
                },
            };
        case UI_CROP_CLEAR_CURRENT.START:
            return {
                ...state,
                crop: {
                    open: false,
                },
            };
        case UI_FILTER_OPEN.START:
            return getFilterState(state, action, { open: true });
        case UI_FILTER_OPEN.END:
            return getFilterState(state, action, { open: false });
        case UI_CHANGE_LOCALE:
            return { ...state, locale: action.locale };
        case CHANGE_LAYOUT:
            return {
                ...state,
                layoutType: action.payload,
            };
        case CHANGE_PRE_LOADER:
            return {
                ...state,
                isPreloader: action.payload,
            };

        case CHANGE_LAYOUT_WIDTH:
            return {
                ...state,
                layoutWidth: action.payload,
            };
        case CHANGE_SIDEBAR_THEME:
            return {
                ...state,
                leftSideBarTheme: action.payload,
            };
        case CHANGE_SIDEBAR_TYPE:
            return {
                ...state,
                leftSideBarType: action.payload.sidebarType,
            };
        case CHANGE_TOP_BAR_THEME:
            return {
                ...state,
                topbarTheme: action.payload,
            };
        case SHOW_RIGHT_SIDEBAR:
            return {
                ...state,
                showRightSidebar: action.payload,
            };
        case SHOW_SIDEBAR:
            return {
                ...state,
                showSidebar: action.payload,
            };
        case TOGGLE_LEFT_MENU:
            return {
                ...state,
                leftMenu: action.payload,
            };
        default:
            return state;
    }
};

export default uiReducer;

function getNewLoadingState(currentState = {}, action, value) {
    const { key } = action;
    return Object.assign({}, currentState, {
        loading: { ...currentState.loading, [key]: value },
    });
}

function updateNewView(currentState, key, action) {
    return { ...currentState, key: action.payload };
}

function getFilterState(currentState = {}, action, value) {
    const { key } = action;
    return Object.assign({}, currentState, {
        filter: { ...currentState.filter, [key]: value },
    });
}

const saveLocalData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getLocalData = (key) => {
    console.log('getLocalData-key:', key);
    const data = JSON.parse(localStorage.getItem(key));
    console.log('data:', data);
    return data;
};

const removeLocalData = (key) => {
    localStorage.removeItem(key);
};


