import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../../components/Message/Message';
import { addToCart } from '../../redux/ShoppingCart/CartActions';

const CartScreen = ({ match, location, history }) => {

    const productID = match.params.id;
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cart);

    useEffect(() => {
        if (productID) {
            dispatch(addToCart(productID, quantity));
        }
    }, [dispatch, productID, quantity]);

    return (
        <div>
            cart
        </div>
    )
};

export default CartScreen;
