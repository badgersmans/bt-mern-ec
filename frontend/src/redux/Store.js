import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import RootReducer from './RootReducer';

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    cart: { cartItems: cartItemsFromStorage }
};

const middleware = [thunk];

const store = createStore(
    RootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
