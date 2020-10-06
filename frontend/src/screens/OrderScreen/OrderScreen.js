import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DayJS from 'react-dayjs';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import { getOrderDetails, payOrder } from '../../redux/Orders/OrderActions';
import { ORDER_PAY_RESET } from '../../redux/Orders/OrderConstants';

const OrderScreen = ({ match }) => {

    const orderID = match.params.id;

    const [sdkReady, setSdkReady] = useState(false);

    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading:loadingPay, success:successPay } = orderPay;


    if(!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2);
        };

        // Calculate prices
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
    }

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');

            const script = document.createElement('script');
            script.type  = 'text/javascript'
            script.src   = `https://paypal.com/sdk/js?client-id=${ clientId }`
            script.async = true
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        };

        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderID));
        } else if(!order.isPaid) {
            if (!window.script) {
                addPayPalScript();
            }
        } else {
            setSdkReady(true);
        }
    }, [dispatch, orderID, successPay, order]);

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);

        dispatch(payOrder(orderID, paymentResult))
    };

    return (
        <Fragment>
            {
                loading ? <Loader /> : error ? <Message variant='damger'>{ error }</Message>
                : (
                    <Fragment>
                        <h1 >Order { order._id }</h1>

                        <Row>
                            <Col md={ 8 }>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2 style={{ paddingLeft:'0px' }}>Shipping</h2>
                                        <p>
                                            <strong>Name: </strong>{ order.user.name }
                                        </p>

                                        <p>
                                            <strong>Email: </strong>
                                            { order.user.name }<a href={ `mailto:${ order.user.email }` }>{ order.user.email }</a>
                                        </p>
                                    <p>
                                        <strong>Address:</strong>{ ' ' }
                                        { order.shippingAddress.address }, { order.shippingAddress.city }, { order.shippingAddress.postCode }, { order.shippingAddress.country }
                                    </p>

                                    {
                                        order.isDelivered 
                                        ? <Message variant='success'>
                                            Delivered on <DayJS format='DD MMM YYYY h:mm A'>{ order.deliveredAt }</DayJS>
                                          </Message>
                                        : <Message variant='danger'>Not Delivered</Message>
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2 style={{ paddingLeft:'0px' }}>Payment method</h2>

                                    <p>
                                        <strong>Method:</strong>{ ' ' }
                                        { order.paymentMethod }
                                    </p>

                                    {
                                        order.isPaid 
                                        ? <Message variant='success'>
                                            Paid on <DayJS format='DD MMM YYYY h:mm A'>{ order.paidAt }</DayJS>
                                          </Message>
                                        : <Message variant='danger'>Not paid</Message>
                                    }

                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2 style={{ paddingLeft:'0px' }}>Order items</h2>
                                    
                                    <strong>Method:</strong>
                                    {
                                        order.orderItems.length === 0
                                        ? <Message>Order is empty</Message>
                                        : (
                                            <ListGroup variant='flush'>
                                                {
                                                    order.orderItems.map((item, index) => (
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
                
                            <Col md={ 4 }>
                                <Card>
                                    <ListGroup variant='flush'>

                                        <ListGroup.Item>
                                            <h2>Order summary</h2>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Items</Col>
                                                <Col>RM{ order.itemsPrice }</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Shipping</Col>
                                                <Col>RM{ order.shippingPrice }</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Tax</Col>
                                                <Col>RM{ order.taxPrice }</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Total</Col>
                                                <Col>RM{ order.totalPrice }</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {
                                            !order.isPaid && (
                                                <ListGroup.Item>
                                                    {loadingPay && <Loader />}

                                                    {
                                                        !sdkReady ? <Loader />
                                                        : (
                                                            <PayPalButton 
                                                                amount={ order.totalPrice } 
                                                                onSuccess={ successPaymentHandler }
                                                            ></PayPalButton>
                                                        )
                                                    }
                                                </ListGroup.Item>

                                            )
                                        }

                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>

                    </Fragment>
                )
            }
            
        </Fragment>
    )
};

export default OrderScreen;
