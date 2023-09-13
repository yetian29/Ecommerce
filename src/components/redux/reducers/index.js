

import { combineReducers } from "redux";
import Auth from "./auth";
import Alert from "./alert";
import Product from "./product";
export default combineReducers({
    Auth, 
    Alert,
    Product
  
})