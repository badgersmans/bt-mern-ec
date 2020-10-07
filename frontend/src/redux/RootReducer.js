import { combineReducers } from 'redux';
import { productListReducer, productDetailsReducer } from './Product/ProductReducers';
import { cartReducer } from './ShoppingCart/CartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer } from './User/UserReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListCurrentUserReducer } from './Orders/OrderReducers';


export default combineReducers({
    productList         : productListReducer         ,
    productDetails      : productDetailsReducer      ,
    cart                : cartReducer                ,
    userLogin           : userLoginReducer           ,
    userRegister        : userRegisterReducer        ,
    userDetails         : userDetailsReducer         ,
    userList            : userListReducer            ,
    userUpdateProfile   : userUpdateProfileReducer   ,
    deleteUser          : userDeleteReducer          ,
    createOrder         : orderCreateReducer         ,
    orderDetails        : orderDetailsReducer        ,
    orderPay            : orderPayReducer            ,
    orderListCurrentUser: orderListCurrentUserReducer,
});