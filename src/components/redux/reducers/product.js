
import {
    
    GET_PRODUCTS_BY_ARRIVAL_FAIL,
    GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
    GET_PRODUCTS_BY_SOLD_FAIL,
    GET_PRODUCTS_BY_SOLD_SUCCESS,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_PRODUCTS_CATEGORY_SUCCESS,
    GET_PRODUCTS_CATEGORY_FAIL,
    SEARCH_FAIL,
    SEARCH_SUCCESS,
    FILTERED_PRODUCTS_SUCCESS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL
} from '../actions/type'

const initialState = {
    products_arrival: null,
    products_sold: null,
    products: null,
    product: null,
    searched_products: null,
    filtered_products: null


}
export default function Product(state=initialState, action){

    const {type, payload} = action

    switch(type){
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload.products
            }
        case GET_PRODUCTS_FAIL:
        case GET_PRODUCTS_BY_ARRIVAL_FAIL: 
        case GET_PRODUCTS_BY_ARRIVAL_SUCCESS:
            return {
                ...state,
                products_arrival: payload.products
              
            }
        case GET_PRODUCTS_BY_SOLD_FAIL: 
        case GET_PRODUCTS_BY_SOLD_SUCCESS:
            return {
                ...state,
                products_sold: payload.products
              
            }
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                product: payload.product
            }
        case GET_PRODUCT_FAIL:
        case GET_PRODUCTS_CATEGORY_SUCCESS:
            return {
                ...state,
                products: payload.products
            }
        case GET_PRODUCTS_CATEGORY_FAIL:
        case SEARCH_SUCCESS:
            return {
                ...state,
                searched_products: payload.searched_products
            }
        case SEARCH_FAIL:
        case FILTERED_PRODUCTS_SUCCESS:
            return {
                ...state,
                filtered_products: payload.filtered_products
            }

        default: 
            return state
    }
}