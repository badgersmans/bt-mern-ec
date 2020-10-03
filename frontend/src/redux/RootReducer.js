import { combineReducers } from 'redux';
import { productListReducer, productDetailsReducer } from './Product/ProductReducers';
import { cartReducer } from './ShoppingCart/CartReducers';


export default combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});