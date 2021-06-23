import axios from 'axios';

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from './CartConstants';

export const addToCart =
  (productID, userInfo, quantity) => async (dispatch, getState) => {
    const { data: productData } = await axios.get(`/api/products/${productID}`);

    const payload = {
      product: productData._id,
      user: userInfo._id,
      name: productData.name,
      image: productData.image,
      price: productData.price,
      stockQuantity: productData.stockQuantity,
      quantity,
    };

    const cartItem = {
      cartitems: payload,
    };

    dispatch({
      type: CART_ADD_ITEM,
      payload,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data: cartItems } = await axios.put(
      `/api/users/${userInfo._id}/cartitems`,
      cartItem,
      config
    );

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log(`was called`);
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
