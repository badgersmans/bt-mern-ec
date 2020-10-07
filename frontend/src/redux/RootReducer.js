import { combineReducers } from 'redux';
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer } from './Product/ProductReducers';
import { cartReducer } from './ShoppingCart/CartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './User/UserReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListCurrentUserReducer } from './Orders/OrderReducers';


export default combineReducers({
    productList         : productListReducer         ,
    productDetails      : productDetailsReducer      ,
    createProduct       : productCreateReducer       ,
    updateProduct       : productUpdateReducer       ,
    deleteProduct       : productDeleteReducer       ,
    cart                : cartReducer                ,
    userLogin           : userLoginReducer           ,
    userRegister        : userRegisterReducer        ,
    userDetails         : userDetailsReducer         ,
    userList            : userListReducer            ,
    userUpdateProfile   : userUpdateProfileReducer   ,
    deleteUser          : userDeleteReducer          ,
    updateUser          : userUpdateReducer          ,
    createOrder         : orderCreateReducer         ,
    orderDetails        : orderDetailsReducer        ,
    orderPay            : orderPayReducer            ,
    orderListCurrentUser: orderListCurrentUserReducer,
});