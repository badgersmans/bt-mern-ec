import { combineReducers } from 'redux';

import {
    productListReducer   ,
    productDetailsReducer,
    productDeleteReducer ,
    productCreateReducer ,
    productUpdateReducer,
    productCreateReviewReducer
} from './Product/ProductReducers';

import { cartReducer } from './ShoppingCart/CartReducers';

import {
    userLoginReducer        ,
    userRegisterReducer     ,
    userDetailsReducer      ,
    userUpdateProfileReducer,
    userListReducer         ,
    userDeleteReducer       ,
    userUpdateReducer
} from './User/UserReducers';

import {
    orderCreateReducer         ,
    orderDetailsReducer        ,
    orderPayReducer            ,
    orderListCurrentUserReducer,
    orderListAdminReducer      ,
    orderDeliverReducer
    } from './Orders/OrderReducers';


export default combineReducers({
    productList         : productListReducer         ,
    productDetails      : productDetailsReducer      ,
    productCreateReview : productCreateReviewReducer ,
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
    orderDeliver        : orderDeliverReducer        ,
    orderListCurrentUser: orderListCurrentUserReducer,
    orderListAdmin      : orderListAdminReducer      ,
});