

import { combineReducers } from "redux";
import Auth from "./auth";
import Alert from "./alert";
import Product from "./product";
import Category from "./category";
export default combineReducers({
    Auth, 
    Alert,
    Product,
    Category
  
})