import * as constants from "../constants";

const initialState = {
    userLogin: "",
    userPassword: "",
    phone : "",
    invited_by: "",
    userName: "",
    userSurname: "",
    country_key: "",
    user:{},

    error401: false,
    isTryToLogin: false,
    isLoggedIn: false,
    isUserLoading: false,
    isUserCreating: false,
    userCreateSuccess: false,
    userCreateFail: false,
    errMsg: "",
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case constants.USER_ALREADY_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
            }
        case constants.USER_INPUT_PASSWORD_CHANGED:
            return {
                ...state,
                userPassword: action.payload,
            };

        case constants.USER_INPUT_LOGIN_CHANGED:
            return {
                ...state,
                userLogin: action.payload,
            };
        case constants.USER_INPUT_PHONE_CHANGED:
            return {
                ...state,
                phone: action.payload,
            };
        case constants.USER_INPUT_NAME_CHANGED:
            return {
                ...state,
                userName: action.payload,
            };
        case constants.USER_INPUT_INVITED_CHANGED:
            return {
                ...state,
                invited_by: action.payload,
            };
        case constants.USER_INPUT_COUNTRY_KEY_CHANGED:
            return {
                ...state,
                country_key: action.payload,
            };
        case constants.USER_INPUT_SURNAME_CHANGED:
            return {
                ...state,
                userSurname: action.payload,
            };
        case constants.USER_INPUT_INVITED_CHANGED:
            return {
                ...state,
                userSurname: action.payload,
            };
        case constants.USER_INPUT_COUNTRY_KEY_CHANGED:
            return {
                ...state,
                userSurname: action.payload,
            };
        case constants.USER_CLEAR_STATE:
            return {
                ...state,
                userCreateSuccess: false,
                errMsg: '',
            }
        case constants.USER_TRY_TO_LOG_IN:
            const login = state.userLogin;
            return {
                ...state,
                isTryToLogin: true,
                errMsg:''
            };
        case constants.USER_LOG_IN_SUCCESS:
            return {
                ...state,
                isTryToLogin:false,
                isLoggedIn: true,
                errMsg:''
            };
        case constants.USER_LOG_IN_FAILED:
            return {
                ...state,
                isTryToLogin: false,
                isLoggedIn: false,
                errMsg:action.payload,
            };

        case constants.USER_TRY_TO_CREATE:
            return {
                ...state,
                isUserCreating: true,
                userCreateSuccess: false,
                errMsg: '',
            };
        case constants.USER_CREATE_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                userCreateSuccess: false,
                isUserCreating: false,
            };
        case constants.USER_CREATE_SUCCESS:
            return {
                ...state,
                isUserCreating: false,
                userCreateSuccess: true,
                errMsg:''
            };

        case constants.GET_USER_LOADING:
            return {
                ...state,
                isUserLoading: true,
                errMsg:''
            };

        case constants.GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isUserLoading: false,
                errMsg:''
            };

        case constants.GET_USER_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                isUserLoading: false,
            };

        default:
            return state;
    }
}
