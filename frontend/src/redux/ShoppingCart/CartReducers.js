import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from './CartConstants';

const initialState = {
  cartItems: [],
  shippingAddress: {},
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ADD_ITEM:
      // payload is what is coming in from the cartActions
      // it looks like
      /* 
        product,
        name: data.name,
        image: data.image,
        price: data.price,
        stockQuantity: data.stockQuantity,
        quantity, 
      */
      const item = payload;
      console.log(`cartReducer item is? ${JSON.stringify(item)}`);

      // check for duplicate cart items
      // find returns the first element it finds, returns undefined otherwise
      // theCartItem refers to whatever is in the cartItems state
      // then theCartItem.product refers to the product ID from state
      // item.product refers to the product ID passed in from the cartActions
      // then if theCartItem.product === item.product, find() returns the element it found.
      // then we know that what is being added to cart already exists. Because the product id matches.
      const existingItem = state.cartItems.find(
        (theCartItem) => theCartItem.product === item.product
      );
      console.log(
        `cartReducer existingItem is? ${JSON.stringify(existingItem)}`
      );

      // if item exists
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(
            (theCartItem) =>
              theCartItem.product === existingItem.product
                ? item // merge the changed values/properties
                : theCartItem // give back the original data unchanged
          ),
        };
      } else {
        // item doesn't exist, then just add it!
        return {
          ...state,
          cartItems: [...state.cartItems, item], // overwrite the cartItems state
        };
      }

    case CART_REMOVE_ITEM:
      return {
        // filter() pass it a function that returns true to keep the elements
        // in the array, false to remove it
        ...state,
        cartItems: state.cartItems.filter(
          (theCartItem) => theCartItem.product !== payload
        ),
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
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
