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
   



} from "../actions/type"


const initialState = {
    items: null,
    total_cost: null,
    total_items: null
}

export default function Cart(state=initialState, action){
    const {type, payload} = action
    switch(type){
        case ADD_ITEM_SUCCESS:
            return{
                ...state,
                items: payload.cart
            }
        case ADD_ITEM_FAIL:

        case GET_ITEMS_SUCCESS:
            return{
                ...state,
                items: payload.cart
                
            }
        case GET_ITEMS_FAIL:

        case REMOVE_ITEM_SUCCESS:
           
        case REMOVE_ITEM_FAIL:

        case EMPTY_CART_SUCCESS:
        case EMPTY_CART_FAIL:

        case GET_TOTAL_PRICE_SUCCESS:
            return{
                ...state,
                total_cost: payload.total_cost
            }
        case GET_TOTAL_PRICE_FAIL:

        case GET_TOTAL_ITEMS_SUCCESS:
            return{
                ...state,
                total_items: payload.total_items
            }
        case GET_TOTAL_ITEMS_FAIL:

       

        default: 
            return state

    }
}