import axios from 'axios';

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
    ORDER_LIST_CURRENT_USER_REQUEST,
    ORDER_LIST_CURRENT_USER_SUCCESS,
    ORDER_LIST_CURRENT_USER_FAIL,
    ORDER_LIST_ADMIN_REQUEST,
    ORDER_LIST_ADMIN_SUCCESS,
    ORDER_LIST_ADMIN_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL
} from './OrderConstants';


export const createOrder = (order) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_CREATE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
        };

        const { data } = await axios.post(`/api/orders`, order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};


export const getOrderDetails = (orderID) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_DETAILS_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${ userInfo.token }`
            }
        };

        const { data } = await axios.get(`/api/orders/${ orderID }`, config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};


export const payOrder = (orderID, paymentResult) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_PAY_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
        };

        await axios.put(`/api/orders/${ orderID }/pay`, paymentResult, config);

        dispatch({
            type: ORDER_PAY_SUCCESS
        });

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};


export const deliverOrder = (order) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_DELIVER_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${ userInfo.token }`
            }
        };

        await axios.put(`/api/orders/${ order._id }/deliver`, {}, config); // note to self, for PUT requests, an empty object must be specified otherwise it won't work.

        dispatch({
            type: ORDER_DELIVER_SUCCESS
        });

    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};


export const listCurrentUserOrder = () => async (dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_LIST_CURRENT_USER_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${ userInfo.token }`
            }
        };

        const { data } = await axios.get(`/api/orders/myorders`, config);

        dispatch({
            type: ORDER_LIST_CURRENT_USER_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_LIST_CURRENT_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};


export const listAllOrders = () => async (dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_LIST_ADMIN_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${ userInfo.token }`
            }
        };

        const { data } = await axios.get(`/api/orders`, config);

        dispatch({
            type: ORDER_LIST_ADMIN_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_LIST_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
