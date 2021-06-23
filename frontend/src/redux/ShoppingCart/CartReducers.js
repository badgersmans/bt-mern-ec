import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CLEAR_CART_ITEMS,
} from './CartConstants';

const initialState = {
  cartItems: [],
  shippingAddress: {},
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  console.log(state);
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;
      // console.log(`cartReducer item is? ${JSON.stringify(item)}`);

      const itemExist = state.cartItems.cartItems.find(
        (x) => x.product === item.product
      );
      // console.log(`cartReducer itemExist is? ${JSON.stringify(itemExist)}`);

      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.cartItems.map((x) =>
            x.product === itemExist.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };
    case CLEAR_CART_ITEMS:
      return {
        cartItems: [],
      };
    default:
      return state;
  }
};
