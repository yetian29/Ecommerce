

import {
    
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS
} from '../actions/type'

const initialState = {
    categories: null
}
export default function Category(state=initialState, action) {

    const {type, payload} = action;

    switch(type){
        case GET_CATEGORIES_FAIL:
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload.categories
            }
        default:
            return state
    }
}