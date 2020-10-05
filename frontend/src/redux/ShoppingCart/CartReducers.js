import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS
} from './CartConstants';


const initialState = {
    cartItems: [],
    shippingAddress: {}
};


export const cartReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case CART_ADD_ITEM:
            const item = payload;
            console.log(`cartReducer item is? ${JSON.stringify(item)}`);

            const itemExist = state.cartItems.find(x => x.product === item.product);
            console.log(`cartReducer itemExist is? ${JSON.stringify(itemExist)}`);


            if(itemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(
                        x => x.product === itemExist.product ? item : x
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems, item
                    ]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: payload
            }
        default:
            return state;
    }
};


