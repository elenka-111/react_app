import * as constants from '../constants';
import axios from 'axios';

export default {
    saveUserLoginValue(value) {
        return {
            type: constants.USER_INPUT_LOGIN_CHANGED,
            payload: value,
        };
    },
    saveUserPasswordValue(value) {
        return {
            type: constants.USER_INPUT_PASSWORD_CHANGED,
            payload: value,
        };
    },
    saveUserPhoneValue(value) {
        return {
            type: constants.USER_INPUT_PHONE_CHANGED,
            payload: value,
        };
    },
    saveUserInvitedValue(value) {
        return {
            type: constants.USER_INPUT_INVITED_CHANGED,
            payload: value,
        };
    },
    saveUserNameValue(value){
        return {
            type: constants.USER_INPUT_NAME_CHANGED,
            payload: value,
        };
    },
    saveUserSurnameValue(value){
        return {
            type: constants.USER_INPUT_SURNAME_CHANGED,
            payload: value,
        };
    },
    saveUserCountryKeyValue(value){
        return {
            type: constants.USER_INPUT_COUNTRY_KEY_CHANGED,
            payload: value,
        };
    },
    userAlreadyLogin() {
        return {
            type: constants.USER_ALREADY_LOGIN,
        };
    },

    onLogin() {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.USER_TRY_TO_LOG_IN,
            });

            try {
                const response = await axios.post(
                    'http://erp.apptrix.ru/api/clients/token/',
                    {
                        "username" : store.user.userLogin,
                        "password" : store.user.userPassword
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                localStorage.setItem('client_id', response.data["client_id"]);

                dispatch({
                    type: constants.USER_LOG_IN_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.USER_LOG_IN_FAILED,
                    payload: e.message,
                });
            }
        };
    },
    clearState(){
        return {
            type: constants.USER_CLEAR_STATE
        };
    },
    createUser(){
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.USER_TRY_TO_CREATE,
            });

            try {
                const response = await axios.post(
                    'http://erp.apptrix.ru/api/clients/create/',
                    {
                        user : {
                            email: store.user.userLogin,
                            password: store.user.userPassword
                        },
                        phone : store.user.phone,
                        invited_by: store.user.invited_by,
                        name: store.user.userName,
                        surname: store.user.userSurname,
                        country_key: store.user.country_key
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                dispatch({
                    type: constants.USER_CREATE_SUCCESS,
                    payload: response.data
                })
            } catch (e) {

                dispatch({
                    type: constants.USER_CREATE_FAIL,
                    payload: e.message,
                });
            }
        };
    },
    fetchUser() {

        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.GET_USER_LOADING,
            });

            let accessToken = localStorage.getItem('access_token');
            let clientId = localStorage.getItem('client_id');
            console.log("in fetch user", accessToken);
            try {
                const response = await axios.get(
                    'http://erp.apptrix.ru/api/clients/'+clientId,
                    {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'content-type': 'application/json',
                    }
                });
                dispatch({
                    type: constants.GET_USER_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.GET_USER_FAIL,
                    payload: e.message,
                });
            }

        };
    },
    refreshToken(){
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.USER_TRY_TO_RELOG_IN,
            });

            let refreshToken = localStorage.getItem('refresh_token');
            try {
                const response = await axios.post(
                    'http://erp.apptrix.ru/api/clients/token/refresh/',
                    {
                        "refresh" : refreshToken
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem("error_401", "false");

                dispatch({
                    type: constants.USER_LOG_IN_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                localStorage.clear();
                dispatch({
                    type: constants.USER_LOG_IN_FAILED,
                    payload: e.message,
                });
            }
        };
    }

}



axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        console.log("get error 401");
        localStorage.setItem("error_401", "true");
    }
    return error;
});






