import {
    CREATE_PASSWORD,
    FETCH_MEMBER_CATEGORIES,
    LOGIN,
    REGISTER, RESET_PASSWORD,
    UPDATE_SESSION_TOKEN,
    VERIFY_CODE,
} from '../../actions';

const defaultState = {
    user: {
        data: undefined,
        session: undefined,
    },
    account: undefined,
    resetPassword: {},
    memberCategories: null,
    dashboard: {
        currentYear: null,
        previousYear: null,
    },
};


const appReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN.SUCCESS:
        case REGISTER.SUCCESS:
        case VERIFY_CODE.SUCCESS:
            return Object.assign({}, state, {
                user: {
                    ...state.user,
                    data: action.payload,
                },
            });
        case RESET_PASSWORD.SUCCESS:
            return Object.assign({}, state, {resetPassword: action.payload});
        case FETCH_MEMBER_CATEGORIES.SUCCESS:
            return Object.assign({}, state, { memberCategories: action.payload });
        case UPDATE_SESSION_TOKEN:
            return Object.assign({}, state, {
                user: { ...state.user, session: action.payload },
            });
        default:
            return state;
    }
};

export default appReducer;

