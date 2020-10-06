import { combineReducers } from 'redux';
import { productListReducer, productDetailsReducer } from './Product/ProductReducers';
import { cartReducer } from './ShoppingCart/CartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './User/UserReducers';
import { orderCreateReducer, orderDetailsReducer } from './Orders/OrderReducers';


export default combineReducers({
    productList       : productListReducer      ,
    productDetails    : productDetailsReducer   ,
    cart              : cartReducer             ,
    userLogin         : userLoginReducer        ,
    userRegister      : userRegisterReducer     ,
    userDetails       : userDetailsReducer      ,
    userUpdateProfile : userUpdateProfileReducer,
    createOrder       : orderCreateReducer      ,
    orderDetails      : orderDetailsReducer     ,
});