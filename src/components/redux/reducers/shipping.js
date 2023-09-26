


import {
    GET_SHIPPING_FAIL,
    GET_SHIPPING_SUCCESS
} from '../actions/type'

const initialState = {
    shipping: null
}

export default function Shipping(state=initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_SHIPPING_FAIL:
        case GET_SHIPPING_SUCCESS:
            return{
                ...state,
                shipping: payload.shipping
            }
        default: 
            return state
    }

}