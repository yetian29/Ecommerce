

import { refresh } from '../actions/auth';
import {

    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    VERIFY_FAIL,
    VERIFY_SUCCESS,
    REFRESH_FAIL,
    REFRESH_SUCCESS,
    LOGOUT,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    REFRESH_TOKEN
   
   
   
   
   
} from '../actions/type'




const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isRefreshing: false,
    isAuthenticated: null,
    user: null,
    loading: false
};

export default function Auth(state = initialState, action) {
    const { type, payload } = action;
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');

    switch (type) {
        case SIGNUP_FAIL:
        case SIGNUP_SUCCESS:
        case ACTIVATION_FAIL:
        case ACTIVATION_SUCCESS:
        case LOGIN_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                access,
                refresh,
                isAuthenticated: true
            };
        case LOAD_USER_FAIL:
            return {
                ...state,
                user: null
            };
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: payload
            };
        case VERIFY_FAIL:
        case VERIFY_SUCCESS:
        case REFRESH_TOKEN:
            if (state.isRefreshing || !access || !refresh) {
                return state; // Không thực hiện làm mới nếu đang làm mới, không có access hoặc không có refresh
            }
            return {
                ...state,
                isRefreshing: true
            };
        case REFRESH_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh)
            return {
                ...state,
                access,
                refresh,
                isAuthenticated: true,
                isRefreshing: false // Đã làm mới xong
            };
        case REFRESH_FAIL:
            localStorage.removeItem('refresh');
            localStorage.removeItem('access');
            return {
                ...state,
                refresh: null,
                access: null,
                isAuthenticated: false,
                user: null,
                isRefreshing: false // Làm mới thất bại
            };
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            };
        case RESET_PASSWORD_FAIL:
        case RESET_PASSWORD_SUCCESS:
        case RESET_PASSWORD_CONFIRM_FAIL:
        case RESET_PASSWORD_CONFIRM_SUCCESS:
        case SET_AUTH_LOADING:
            return {
                ...state, 
                loading: true
            };
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: null
            };
        default: 
            return state;
    }
}
