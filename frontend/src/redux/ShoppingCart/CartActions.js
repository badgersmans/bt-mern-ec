import axios from 'axios';

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from './CartConstants';


export const addToCart = (productID, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/products/${ productID }`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            stockQuantity: data.stockQuantity,
            quantity
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};


export const removeFromCart = (productID) => async (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productID
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};


export const saveShippingAdress = (formData) => async (dispatch) => {

    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: formData
    });

    localStorage.setItem('shippingAddress', JSON.stringify(formData));
};


export const savePaymentMethod = (paymentMethod) => async (dispatch) => {

    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: paymentMethod
    });

    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
};