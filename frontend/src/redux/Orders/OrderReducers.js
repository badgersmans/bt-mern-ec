import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_LIST_CURRENT_USER_REQUEST,
    ORDER_LIST_CURRENT_USER_SUCCESS,
    ORDER_LIST_CURRENT_USER_FAIL,
    ORDER_LIST_CURRENT_USER_RESET,
    ORDER_LIST_ADMIN_REQUEST,
    ORDER_LIST_ADMIN_SUCCESS,
    ORDER_LIST_ADMIN_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET
} from './OrderConstants';

const orderCreateState  = {};
const orderPayState     = {};
const orderListCurrentUserState = {
    orders: []
};

const orderDetailsState = {
    orderItems: [],
    shippingAddress: {},
    loading: true
};
const orderListAdminState = {
    orders: []
};
const orderDeliverState = {};

export const orderCreateReducer = (state = orderCreateState, action) => {

    const { type, payload } = action;

    switch (type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: payload
            }
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: payload
            }
        default:
            return state;
    }
};


export const orderDetailsReducer = (state = orderDetailsState, action) => {

    const { type, payload } = action;

    switch (type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: payload
            }
        default:
            return state;
    }
};


export const orderPayReducer = (state = orderPayState, action) => {

    const { type, payload } = action;

    switch (type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: payload
            }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state;
    }
};


export const orderDeliverReducer = (state = orderDeliverState, action) => {

    const { type, payload } = action;

    switch (type) {
        case ORDER_DELIVER_REQUEST:
            return {
                loading: true
            }
        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: payload
            }
        case ORDER_DELIVER_RESET:
            return {}
        default:
            return state;
    }
};


export const orderListCurrentUserReducer = (state = orderListCurrentUserState, action) => {

    const { type, payload } = action;

    switch (type) {
        case ORDER_LIST_CURRENT_USER_REQUEST:
            return {
                loading: true
            }
        case ORDER_LIST_CURRENT_USER_SUCCESS:
            return {
                loading: false,
                orders: payload
            }
        case ORDER_LIST_CURRENT_USER_FAIL:
            return {
                loading: false,
                error: payload
            }
        case ORDER_LIST_CURRENT_USER_RESET:
            return {
                orders: []
            }
        default:
            return state;
    }
};


export const orderListAdminReducer = (state = orderListAdminState, action) => {

    const { type, payload } = action;

    switch (type) {
        case ORDER_LIST_ADMIN_REQUEST:
            return {
                loading: true
            }
        case ORDER_LIST_ADMIN_SUCCESS:
            return {
                loading: false,
                orders: payload
            }
        case ORDER_LIST_ADMIN_FAIL:
            return {
                loading: false,
                error: payload
            }
        default:
            return state;
    }
};

