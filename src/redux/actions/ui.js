import { createActionString, createActionType } from '../../_shared/functions/util';


export const UI_INITIALIZE = createActionString('UI_INITIALIZE', 'UI');
export const UI_RESET = createActionString('UI_RESET', 'UI');
export const UI_LOADING = createActionType('UI_LOADING', 'UI');
export const UI_ERROR = createActionString('UI_ERROR', 'UI');
export const UI_NAVIGATE = createActionString('UI_NAVIGATE', 'UI');
export const UI_CHANGE_LOCALE = createActionString('UI_CHANGE_LOCALE', 'UI');
export const UI_TOGGLE_COLLAPSED_NAV = createActionString('UI_TOGGLE_COLLAPSED_NAV', 'UI');
export const UI_NAV_TYPE_CHANGE = createActionString('UI_NAV_TYPE_CHANGE', 'UI');
export const UI_TOGGLE_MOBILE_NAV = createActionString('UI_TOGGLE_MOBILE_NAV', 'UI');
export const UI_SAVE_LOCAL_DATA = createActionString('UI_SAVE_LOCAL_DATA', 'UI');
export const UI_GET_LOCAL_DATA = createActionString('UI_GET_LOCAL_DATA', 'UI');
export const UI_REMOVE_LOCAL_DATA = createActionString('UI_REMOVE_LOCAL_DATA', 'UI');

export const UI_MODEL_TOGGLE = createActionString('UI_MODAL_TOGGLE', 'UI');
export const UI_MODAL_CUSTOM_TOGGLE = createActionString('UI_MODAL_CUSTOM_TOGGLE', 'UI');

export const UI_SET_PAGINATION = createActionType('UI_SET_PAGINATION', 'UI');
export const UI_FILTER_OPEN = createActionType('UI_FILTER_OPEN', 'UI');

export const UI_CROP_OPEN = createActionType('UI_CROP_OPEN', 'UI');
export const UI_CROP_UPDATE = createActionType('UI_CROP_CLEAR', 'UI');
export const UI_CROP_CLEAR_CURRENT = createActionType('UI_CROP_CLEAR_CURRENT', 'UI');
export const UI_CROP_SAVE = createActionType('UI_CROP_SAVE', 'UI');


export const CHANGE_LAYOUT = createActionString('CHANGE_LAYOUT', 'UI');
export const CHANGE_LAYOUT_WIDTH = createActionString('CHANGE_LAYOUT_WIDTH', 'UI');
export const CHANGE_SIDEBAR_THEME = createActionString('CHANGE_SIDEBAR_THEME', 'UI');
export const CHANGE_SIDEBAR_TYPE = createActionString('CHANGE_SIDEBAR_TYPE', 'UI');
export const CHANGE_TOP_BAR_THEME = createActionString('CHANGE_TOP_BAR_THEME', 'UI');
export const SHOW_SIDEBAR = createActionString('SHOW_SIDEBAR', 'UI');
export const TOGGLE_LEFT_MENU = createActionString('TOGGLE_LEFT_MENU', 'UI');
export const SHOW_RIGHT_SIDEBAR = createActionString('SHOW_RIGHT_SIDEBAR', 'UI');
export const CHANGE_PRE_LOADER = createActionString('CHANGE_PRE_LOADER', 'UI');


export const initialize = payload => ({
    type: UI_INITIALIZE,
    payload,
});

export const resetUI = () => ({
    type: UI_RESET,
});

export const startUILoading = key => ({
    type: UI_LOADING.START,
    key,
});


export const stopUILoading = key => ({
    type: UI_LOADING.END,
    key,
});

export const updateUIError = (key, value) => ({
    type: UI_ERROR,
    key,
    value,
});

export const navigateTo = path => ({
    type: UI_NAVIGATE,
    payload: path,
});

export const uiChangeLocale = locale => ({
    type: UI_CHANGE_LOCALE,
    locale,
});

export const uiSetPagination = (key, payload) => ({
    type: UI_SET_PAGINATION.START,
    meta: {
        key,
        payload,
    },
});

export const uiCropOpen = (key, payload, aspect) => ({
    type: UI_CROP_OPEN.START,
    key,
    payload,
    aspect,
});

export const uiCropClose = key => ({
    type: UI_CROP_OPEN.END,
    key,
});

export const uiSaveLocalData = (key, payload) => ({
    type: UI_SAVE_LOCAL_DATA,
    key,
    payload,
});

export const uiGetLocalData = (key) => ({
    type: UI_GET_LOCAL_DATA,
    key,
});
export const uiRemoveLocalData = (key) => ({
    type: UI_REMOVE_LOCAL_DATA,
    key,
});

export const uiToggleCollapsedNav = (navCollapsed) => ({
    type: UI_TOGGLE_COLLAPSED_NAV,
    navCollapsed,
});

export const uiNavTypeChange = (navType) => ({
    type: UI_NAV_TYPE_CHANGE,
    navType,
});

export const uiMobileNavToggle = (mobileNav) => ({
    type: UI_TOGGLE_MOBILE_NAV,
    mobileNav,
});

export const changeLayout = layout => ({
    type: CHANGE_LAYOUT,
    payload: layout,
});

export const changePreloader = layout => ({
    type: CHANGE_PRE_LOADER,
    payload: layout,
});

export const changeLayoutWidth = width => ({
    type: CHANGE_LAYOUT_WIDTH,
    payload: width,
});

export const changeSidebarTheme = theme => ({
    type: CHANGE_SIDEBAR_THEME,
    payload: theme,
});

export const changeSidebarType = (sidebarType, isMobile) => ({
    type: CHANGE_SIDEBAR_TYPE,
    payload: { sidebarType, isMobile },
});

export const changeTopbarTheme = topbarTheme => ({
    type: CHANGE_TOP_BAR_THEME,
    payload: topbarTheme,
});

export const showRightSidebarAction = isopen => ({
    type: SHOW_RIGHT_SIDEBAR,
    payload: isopen,
});

export const showSidebar = isopen => ({
    type: SHOW_SIDEBAR,
    payload: isopen,
});

export const toggleLeftmenu = isopen => ({
    type: TOGGLE_LEFT_MENU,
    payload: isopen,
});

