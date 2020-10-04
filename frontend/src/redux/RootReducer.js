import { combineReducers } from 'redux';
import { productListReducer, productDetailsReducer } from './Product/ProductReducers';
import { cartReducer } from './ShoppingCart/CartReducers';
import { userLoginReducer } from './User/UserReducers';


export default combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
});