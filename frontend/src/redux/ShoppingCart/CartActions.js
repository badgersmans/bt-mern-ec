import axios from 'axios';

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
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