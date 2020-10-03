import { combineReducers } from 'redux';
import { productListReducer } from './Product/ProductReducers';
// import authReducer from '../redux/auth/AuthReducer';
// import profileReducer from '../redux/profile/ProfileReducer';
// import postReducer from '../redux/post/PostReducer';

export default combineReducers({
    productList: productListReducer,
    // authReducer,
    // profileReducer,
    // postReducer
});