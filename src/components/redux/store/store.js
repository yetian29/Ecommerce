import reducer from '../reducers'
import {applyMiddleware} from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const initialState = {

}

const middleware = [thunk]

const store = configureStore(
    {reducer},
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)

export default store