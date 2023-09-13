
import axios from 'axios';
import {
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
    GET_PRODUCTS_BY_ARRIVAL_FAIL,
    GET_PRODUCTS_BY_SOLD_SUCCESS,
    GET_PRODUCTS_BY_SOLD_FAIL,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCTS_CATEGORY_FAIL,
    GET_PRODUCTS_CATEGORY_SUCCESS,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
    FILTERED_PRODUCTS_SUCCESS,
    FILTERED_PRODUCTS_FAIL
} from './type'


export const get_products = (sortBy, order, limit) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        sortBy,
        order, 
        limit
    })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/product/`, body, config)

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: GET_PRODUCTS_FAIL 
            })} 
            
        }
        catch(error){
            dispatch({
                type:  GET_PRODUCTS_FAIL
            })
        }
}



export const get_products_by_arrival = (sortBy, order, limit) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        sortBy,
        order, 
        limit
    })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/product/`, body, config)

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: GET_PRODUCTS_BY_ARRIVAL_FAIL 
            })} 
            
        }
        catch(error){
            dispatch({
                type:  GET_PRODUCTS_BY_ARRIVAL_FAIL
            })
        }
}


export const get_products_by_sold = (sortBy, order, limit) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        sortBy,
        order, 
        limit
    })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/product/`, body, config)

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_BY_SOLD_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: GET_PRODUCTS_BY_SOLD_FAIL 
            })} 
            
        }
        catch(error){
            dispatch({
                type:  GET_PRODUCTS_BY_SOLD_FAIL
            })
        }
}


export const get_product = (product_id) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

   
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/${product_id}`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCT_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: GET_PRODUCT_FAIL 
            })} 
            
        }
        catch(error){
            dispatch({
                type: GET_PRODUCT_FAIL
            })
        }
}

export const get_products_category = (category_id) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };


    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/category/${category_id}`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_CATEGORY_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: GET_PRODUCTS_CATEGORY_FAIL 
            })} 
            
        }
        catch(error){
            dispatch({
                type: GET_PRODUCTS_CATEGORY_FAIL
            })
        }
}

export const search = (search_term) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/search/${search_term}`, config)
        if(res.status === 200){
            dispatch({
                type: SEARCH_SUCCESS,
                payload: res.data
            })
        }
        else{
            dispatch({
                type: SEARCH_FAIL
            })
        }
    }
    catch(error){
        dispatch({
            type: SEARCH_FAIL
        })
    }
}

export const filter_products = (category_id, price_range, sortBy, order) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({
        category_id,
        price_range,
        sortBy,
        order
    })

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/product/by/search`, body, config)
        if (res.status === 200) {
            dispatch({
                type: FILTERED_PRODUCTS_SUCCESS,
                payload: res.data
            })
        }
        else{
            dispatch({
                type: FILTERED_PRODUCTS_FAIL 
            }) 
        }
        
    }
    catch(error){
        
           dispatch({
            type: FILTERED_PRODUCTS_FAIL
           })
            
        }
}


