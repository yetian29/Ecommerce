

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
    RESET_PASSWORD_CONFIRM_SUCCESS
   
   
   
   
   
} from '../actions/type'

const initialState = {
    loading: false,
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    user: null
   
    
    
}

export default function Auth(state=initialState, action) {

    const {type, payload} = action;

    switch(type) {
        case SIGNUP_FAIL:
        case SIGNUP_SUCCESS:
        case ACTIVATION_FAIL:
        case ACTIVATION_SUCCESS:
        case LOGIN_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
            
              
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            localStorage.setItem('refresh', payload.refresh)
            return {
                ...state,
                access: localStorage.getItem('access'),
                refresh: localStorage.getItem('refresh'),
                isAuthenticated: true,
                

            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                user: null
            }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case VERIFY_FAIL:
        case VERIFY_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case REFRESH_FAIL:
            localStorage.removeItem('accesss')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            
              
            }

        case REFRESH_SUCCESS:
            localStorage.setItem('access', payload.access)
            localStorage.setItem('refresh', payload.refresh)
            return {
                ...state,
                access: localStorage.getItem('access'),
                refresh: localStorage.getItem('refresh'),
                isAuthenticated: true,
            }
        
        case LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case RESET_PASSWORD_FAIL:
        case RESET_PASSWORD_SUCCESS:
        case RESET_PASSWORD_CONFIRM_FAIL:
        case RESET_PASSWORD_CONFIRM_SUCCESS:
   
      
        case SET_AUTH_LOADING:
            return {
                ...state, 
                loading: true
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: null
            }
        default: 
            return state
    }
}