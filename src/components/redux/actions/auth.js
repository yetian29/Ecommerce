


import {

    REMOVE_AUTH_LOADING,
    SET_AUTH_LOADING,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
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
    REFRESH_TOKEN,
    
    
   
   
   
} from './type'


import setAlert from './alert';

import axios from 'axios'

export const sign_up = (email, first_name, last_name, password, re_password) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING, 
       
    })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        email,
        first_name,
        last_name,
        password, 
        re_password
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        if(res.status === 201) {

            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });

            dispatch(setAlert('Dang ky tai khoan thanh cong', 'green')); 
        }
        else {
            dispatch({
                type: SIGNUP_FAIL
            });

            dispatch(setAlert('Dang ky tai khoan that bai', 'red')); 

        }

        dispatch({
                type: REMOVE_AUTH_LOADING
            })
    }
    catch(error) {

        dispatch({
            type: SIGNUP_FAIL
        });


        dispatch({
                type: REMOVE_AUTH_LOADING
            });

        dispatch(setAlert('Dang ky tai khoan that bai', 'red')); 

    }
}


export const activate = (uid, token) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING, 
       
    })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
       uid,
       token
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        if(res.status === 204) {

            dispatch({
                type: ACTIVATION_SUCCESS,
                payload: res.data
            });

            dispatch(setAlert('Kich hoat tai khoan thanh cong', 'green')); 
        }
        else {
            dispatch({
                type: ACTIVATION_FAIL
            });

            dispatch(setAlert('Kich hoat tai khoan that bai', 'red')); 

        }

        dispatch({
                type: REMOVE_AUTH_LOADING
            })
    }
    catch(error) {

        dispatch({
            type: ACTIVATION_FAIL
        });


        dispatch({
                type: REMOVE_AUTH_LOADING
            });

        dispatch(setAlert('Kich hoat tai khoan that bai', 'red')); 

    }
}

export const login = (email, password) => async dispatch => {
    
    dispatch({
        type: SET_AUTH_LOADING, 
       
    })
    const config = {
        headers: {
            'Content-Type': 'application/json',

        }
    };

    const body = JSON.stringify({
        email,
        password, 
       
    });


    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        if(res.status === 200) {

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            
            

            dispatch(load_user());

          
            dispatch(setAlert('Dang nhap tai khoan thanh cong', 'green')); 
        }
        else {
            dispatch({
                type: LOGIN_FAIL
            });

            dispatch(setAlert('Dang nhap tai khoan that bai', 'red')); 

        }

        dispatch({
                type: REMOVE_AUTH_LOADING
            })
    }
    catch(error) {

        dispatch({
            type: LOGIN_FAIL
        });


        dispatch({
                type: REMOVE_AUTH_LOADING
            });

        dispatch(setAlert('Dang nhap tai khoan that bai', 'red')); 

    }

}

export const load_user = () => async dispatch => {
    const accessToken = localStorage.getItem('access')

    if (!accessToken){
        dispatch({
            type: LOGOUT
        })
        return
    }
    
    
     const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json' // Post (Content-Type)
            

        }
    };

   

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

        if(res.status === 200) {

            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: res.data
            });
      

        }
        else {
            dispatch({
                type: LOAD_USER_FAIL
            });

        }

       
    }
    catch(error) {

        dispatch({
            type: LOAD_USER_FAIL
        });      

    }
    }
   
  


export const check_account = () => async dispatch => {

    const accessToken = localStorage.getItem('access')

    if(!accessToken){
        dispatch({
            type: LOGOUT
        })
        return
    }
     
    const config = {
        headers: {
            'Content-Type': 'application/json',
           
        }
    };

    const body = JSON.stringify({
        token: accessToken
       
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);

        if(res.status === 200) {

            dispatch({
                type: VERIFY_SUCCESS,
                payload: res.data
            });

       
        }
        else {
            dispatch({
                type: VERIFY_FAIL
            });      

        }
      
    }
    catch(error) {

        dispatch({
            type: VERIFY_FAIL
        });

    }
    }
   


export const refresh = () => async dispatch => {
    
    const refreshToken = localStorage.getItem('refresh');

    if (!refreshToken) {
        dispatch({ type: LOGOUT });
        return;
    }

    dispatch({
        type: REFRESH_TOKEN
    })
   
        const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
    },
  };

        const body = JSON.stringify({
            refresh: refreshToken
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, body, config);
            
            if (res.status === 200) {
                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data
                });
            } 
            else {
                dispatch({
                type: REFRESH_FAIL
            });
            }
        }
        catch(error){
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } 
   

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
    dispatch(setAlert('Dang xuat tai khoan thanh cong', 'green'))
}


export const reset_password = (email) => async dispatch => {
    
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
           email
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
            
            if (res.status === 204) {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS,
                    payload: res.data
                });

                dispatch(setAlert('Gui email thanh cong', 'green'));
            } 
            else {
                dispatch({
                    type: RESET_PASSWORD_FAIL
                });

                dispatch(setAlert('Gui email that bai', 'red'));
             
            }
        }
        catch(error){
            dispatch({
                type: RESET_PASSWORD_FAIL
            });
            dispatch(setAlert('Gui email that bai', 'red'))
        }
    } 
export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    
        const config = {
            headers: {      
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
           uid,
           token,
           new_password,
           re_new_password
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
            
            if (res.status === 204) {
                dispatch({
                    type: RESET_PASSWORD_CONFIRM_SUCCESS,
                    payload: res.data
                });

                dispatch(setAlert('Cai lai mat khau thanh cong', 'green'));
            } 
            else {
                dispatch({
                    type: RESET_PASSWORD_CONFIRM_FAIL
                });

                dispatch(setAlert('Cai lai mat khau that bai', 'red'));
             
            }
        }
        catch(error){
            dispatch({
                type: RESET_PASSWORD_CONFIRM_FAIL
            });
            dispatch(setAlert('Cai lai mat khau that bai', 'red'))
        }
}
    









