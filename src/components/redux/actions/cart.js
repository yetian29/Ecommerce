import axios from "axios"
import {
     ADD_ITEM_FAIL, 
    ADD_ITEM_SUCCESS, 
    EMPTY_CART_FAIL, 
    EMPTY_CART_SUCCESS, 
    GET_ITEMS_FAIL, 
    GET_ITEMS_SUCCESS,
     GET_TOTAL_ITEMS_FAIL,
     GET_TOTAL_ITEMS_SUCCESS,
     GET_TOTAL_PRICE_FAIL,
     GET_TOTAL_PRICE_SUCCESS,
     REMOVE_ITEM_FAIL,
     REMOVE_ITEM_SUCCESS, 
     UPDATE_ITEM_FAIL, 
     UPDATE_ITEM_SUCCESS} from "./type"
import setAlert from "./alert"



export const add_item = (product_id, count) => async dispatch =>{
    if(localStorage.getItem('access')){
        const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    const body = JSON.stringify({
        product_id,
        count
    })
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/cart/add_item`, body, config)
        if(res.status === 200){
            dispatch({
                type: ADD_ITEM_SUCCESS,
                payload: res.data
            })
            dispatch(setAlert('Them vao gio hang thanh cong', 'green'))
        }
        else{
            dispatch({
                type: ADD_ITEM_FAIL
            })
            dispatch(setAlert('Them vao gio hang that bai', 'red'))
        }
    }
    catch(error){
        dispatch({
            type: ADD_ITEM_FAIL
        })
        dispatch(setAlert('Them vao gio hang that bai', 'red'))


    }
    }
    else{
        dispatch({
            type: ADD_ITEM_FAIL
        })
        dispatch(setAlert('Them vao gio hang that bai', 'red'))

    }
   
}


export const get_items = () => async dispatch =>{
    if(localStorage.getItem('access')){
        const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }
    
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/get_items`, config)
        if(res.status === 200){
            dispatch({
                type: GET_ITEMS_SUCCESS,
                payload: res.data
            })
        }
        else{
            dispatch({
                type: GET_ITEMS_FAIL
            })
        }
    }
    catch(error){
        dispatch({
            type: GET_ITEMS_FAIL
        })
    }
    }
    else{
        dispatch({
            type: GET_ITEMS_FAIL
        })
    }
   
}


export const remove_item = (product_id) => async dispatch =>{
    if(localStorage.getItem('access')){
        const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    const body = JSON.stringify({
        product_id,
       
    })
    try{
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/remove_item`, body, config)
        if(res.status === 200){
            dispatch({
                type: REMOVE_ITEM_SUCCESS,
                payload: res.data
            })
        }
        else{
            dispatch({
                type: REMOVE_ITEM_FAIL
            })
        }
    }
    catch(error){
        dispatch({
            type: REMOVE_ITEM_FAIL
        })
    }
    }
    else{
        dispatch({
            type: REMOVE_ITEM_FAIL
        })
    }
   
}

export const empty_cart = () => async dispatch =>{
    if(localStorage.getItem('access')){
        const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            
            'Accept': 'application/json'
        }
    }
   
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/cart/empty_cart`,  config)
        if(res.status === 200){
            dispatch({
                type: EMPTY_CART_SUCCESS,
                payload: res.data
            })
        }
        else{
            dispatch({
                type: EMPTY_CART_FAIL
            })
        }
    }
    catch(error){
        dispatch({
            type: EMPTY_CART_FAIL
        }) 
    } 
}
    else{
        dispatch({
            type: EMPTY_CART_FAIL
        })
    }
   
}


export const get_total_prices = () => async dispatch =>{
    if(localStorage.getItem('access')){
        const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }
    
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/total_prices`, config)
        if(res.status === 200){
            dispatch({
                type: GET_TOTAL_PRICE_SUCCESS,
                payload: res.data
            })
        }
        else{
            dispatch({
                type: GET_TOTAL_PRICE_FAIL 
            })
             }
    }
    catch(error){
        dispatch({
            type: GET_TOTAL_PRICE_FAIL
        })
    }
    }
    else{
        dispatch({
            type: GET_TOTAL_PRICE_FAIL
        })
    }
   
}


export const get_total_items = () => async dispatch =>{
    if(localStorage.getItem('access')){
        const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }
    
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/total_items`, config)
        if(res.status === 200){
            dispatch({
                type: GET_TOTAL_ITEMS_SUCCESS,
                payload: res.data
            })
        }
        else{
            dispatch({
                type: GET_TOTAL_ITEMS_FAIL 
            })
             }
    }
    catch(error){
        dispatch({
            type: GET_TOTAL_ITEMS_FAIL
         })
         }
    }
    else{
        dispatch({
            type: GET_TOTAL_ITEMS_FAIL
        })
    }
   
}


export const update_item = (product_id, count) => async dispatch =>{
    if(localStorage.getItem('access')){
        const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
        const body = JSON.stringify({
            product_id, 
            count
        })
    
    try{
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/cart/update_item`, config)
        if(res.status === 200){
            dispatch({
                type: UPDATE_ITEM_SUCCESS,
                payload: res.data
            })
        }
        else{
            dispatch({
                type: UPDATE_ITEM_FAIL
            })
        }
    }
    catch(error){
        dispatch({
            type: UPDATE_ITEM_FAIL
        })
    }
    }
    else{
        dispatch({
            type: UPDATE_ITEM_FAIL  
        })
    }
   
}





