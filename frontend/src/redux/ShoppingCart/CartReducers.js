import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
} from './CartConstants';


const initialState = {
    cartItems: []
};


export const cartReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case CART_ADD_ITEM:
            const item = payload;
            console.log(`cartReducer item is? ${item}`);

            const itemExist = state.cartItems.find(x => x.product === item.product);
            console.log(`cartReducer itemExist is? ${itemExist}`);


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
                loading: false,
                products: payload
            }
        default:
            return state;
    }
};








