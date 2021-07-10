import axios from 'axios';

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from './CartConstants';

export const addToCart =
  (productID, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${productID}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        stockQuantity: data.stockQuantity,
        quantity,
      },
    });

    //here the order is guaranteed by redux/redux-thunk
    // because getState() gets the latest state from redux
    // so localStorage will be in sync with the redux state.
    // we store cartItems in localStorage so that page refresh/browser closed doesn't clear the data.
    // because redux resets when page refreshed/browser closed/
    // .cart is the name defined in the RootReducer, .cartItems is defined in the cartReducer initial state
    // console.log(getState().cart.cartItems);
    // JSON.stringify() because we can only save strings in local storage
    // and getState().cart.cartItems returns an object
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart = (productID) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productID,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAdress = (formData) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: formData,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(formData));
};

export const savePaymentMethod = (paymentMethod) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
};
