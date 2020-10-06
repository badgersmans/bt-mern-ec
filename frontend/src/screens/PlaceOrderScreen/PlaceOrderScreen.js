import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message/Message';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { createOrder } from '../../redux/Orders/OrderActions';

const PlaceOrderScreen = ({ history }) => {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { shippingAddress: { address, city, postCode, country }, paymentMethod, cartItems } = cart;

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    // Calculate prices
    cart.itemsPrice    = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
    cart.taxPrice      = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice    = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

    const { order, success, error } = useSelector(state => state.createOrder);

    useEffect(() => {
        if (success) {
            history.push(`/order/${ order._id }`)
        }
        // eslint-disable-next-line
    }, [history, success]);

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems:      cartItems           ,
            shippingAddress: cart.shippingAddress,
            paymentMethod:   paymentMethod       ,
            itemsPrice:      cart.itemsPrice     ,
            taxPrice:        cart.taxPrice       ,
            shippingPrice:   cart.shippingPrice  ,
            totalPrice:      cart.totalPrice
        }));
    };

    return (
        <Fragment>
            <CheckoutSteps step1 step2 step3 step4/>

            <Row>
                <Col md={ 8 }>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2 style={{ paddingLeft:'0px' }}>Shipping</h2>

                            <p>
                                <strong>Address:</strong>
                                { address }, { city }, { postCode }, { country }
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 style={{ paddingLeft:'0px' }}>Payment method</h2>

                            <strong>Method:</strong>{ ' ' }
                            { paymentMethod }

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 style={{ paddingLeft:'0px' }}>Order items</h2>
                            
                            <strong>Method:</strong>
                            {
                                cartItems.length === 0
                                ? <Message>Your cart is empty</Message>
                                : (
                                    <ListGroup variant='flush'>
                                        {
                                            cartItems.map((item, index) => (
                                                <ListGroup.Item key={ index }>
                                                    <Row>
                                                        <Col md={ 1 }>
                                                            <Image src={ item.image } alt={ item.name } fluid rounded />
                                                        </Col>

                                                        <Col>
                                                            <Link to={ `/product/${ item.product }` }>
                                                                { item.name }
                                                            </Link>
                                                        </Col>

                                                        <Col md={ 4 }>
                                                            { item.quantity } x RM{ item.price } = RM{ item.quantity * item.price }
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>

                                )
                            }

                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                
                <Col md= { 4 }>
                    <Card>
                        <ListGroup variant='flush'>

                            <ListGroup.Item>
                                <h2>Order summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>RM{ cart.itemsPrice }</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>RM{ cart.shippingPrice }</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>RM{ cart.taxPrice }</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>RM{ cart.totalPrice }</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                { error && <Message variant='danger'>{ error }</Message> }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button 
                                    type='button' 
                                    className='btn-block' 
                                    disabled={ cartItems === 0 } 
                                    onClick={ placeOrderHandler }
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                            

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
};

export default PlaceOrderScreen;
