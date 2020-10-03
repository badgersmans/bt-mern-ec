import { combineReducers } from 'redux';
import { productListReducer, productDetailsReducer } from './Product/ProductReducers';


export default combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
});