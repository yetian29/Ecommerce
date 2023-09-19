import {
    ADD_ITEM_FAIL,
    ADD_ITEM_SUCCESS,
    GET_ITEMS_FAIL,
    GET_ITEMS_SUCCESS,
    REMOVE_ITEM_SUCCESS,
    REMOVE_ITEM_FAIL,
    EMPTY_CART_SUCCESS,
    EMPTY_CART_FAIL,
    GET_TOTAL_PRICE_SUCCESS,
    GET_TOTAL_PRICE_FAIL,
    GET_TOTAL_ITEMS_SUCCESS,
    GET_TOTAL_ITEMS_FAIL,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAIL



} from "../actions/type"


const initialState = {
    'item_add': null,
    'cart_items': null,
}

export default function Cart(state=initialState, action){
    const {type, payload} = action
    switch(type){
        case ADD_ITEM_SUCCESS:
            return{
                ...state,
                item_add: payload
            }
        case ADD_ITEM_FAIL:

        case GET_ITEMS_SUCCESS:
            return{
                ...state,
                cart_items: payload
                
            }
        case GET_ITEMS_FAIL:

        case REMOVE_ITEM_SUCCESS:
            return{
                ...state,
                cart_items: null
            }
        case REMOVE_ITEM_FAIL:

        case EMPTY_CART_SUCCESS:
        case EMPTY_CART_FAIL:

        case GET_TOTAL_PRICE_SUCCESS:
        case GET_TOTAL_PRICE_FAIL:

        case GET_TOTAL_ITEMS_SUCCESS:
        case GET_TOTAL_ITEMS_FAIL:

        case UPDATE_ITEM_SUCCESS:
        case UPDATE_ITEM_FAIL:

        default: 
            return state

    }
}