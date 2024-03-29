import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_RATED_REQUEST,
    PRODUCT_TOP_RATED_SUCCESS,
    PRODUCT_TOP_RATED_FAIL
} from './ProductConstants';

const productListState = {
    products: []
};

const productDetailsState = {
    product: {
        reviews: []
    }
};

const productDeleteState = {};
const productCreateState = {};
const productUpdateState = {
    product: {}
};
const productCreateReviewState = {};
const topProductsState = {
    products: []
};


export const productListReducer = (state = productListState, action) => {

    const { type, payload } = action;
 
    switch (type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                products: []
            }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: payload.products,
                pages: payload.pages,
                page: payload.page
            }
        case PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: payload
            }
        default:
            return state;
    }
};


export const productDetailsReducer = (state = productDetailsState, action) => {

    const { type, payload } = action;

    switch (type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: payload
            }
        case PRODUCT_DETAILS_RESET:
            return {
                product: {
                    reviews: []
                }
            }
        default:
            return state;
    }
};


export const productDeleteReducer = (state = productDeleteState, action) => {

    const { type, payload } = action;

    switch (type) {
        case PRODUCT_DELETE_REQUEST:
            return {
                loading: true,
            }
        case PRODUCT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case PRODUCT_DELETE_FAIL:
            return {
                loading: false,
                error: payload
            }
        default:
            return state;
    }
};


export const productCreateReducer = (state = productCreateState, action) => {

    const { type, payload } = action;

    switch (type) {
        case PRODUCT_CREATE_REQUEST:
            return {
                loading: true,
            }
        case PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                product: payload
            }
        case PRODUCT_CREATE_FAIL:
            return {
                loading: false,
                error: payload
            }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state;
    }
};


export const productUpdateReducer = (state = productUpdateState, action) => {

    const { type, payload } = action;

    switch (type) {
        case PRODUCT_UPDATE_REQUEST:
            return {
                loading: true,
            }
        case PRODUCT_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                product: payload
            }
        case PRODUCT_UPDATE_FAIL:
            return {
                loading: false,
                error: payload
            }
        case PRODUCT_UPDATE_RESET:
            return {
                product: {}
            }
        default:
            return state;
    }
};


export const productCreateReviewReducer = (state = productCreateReviewState, action) => {

    const { type, payload } = action;

    switch (type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {
                loading: true,
            }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {
                loading: false,
                error: payload
            }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state;
    }
};


export const topProductsReducer = (state = topProductsState, action) => {

    const { type, payload } = action;

    switch (type) {
        case PRODUCT_TOP_RATED_REQUEST:
            return {
                loading: true,
                products: []
            }
        case PRODUCT_TOP_RATED_SUCCESS:
            return {
                loading: false,
                products: payload
            }
        case PRODUCT_TOP_RATED_FAIL:
            return {
                loading: false,
                error: payload
            }
        default:
            return state;
    }
};






