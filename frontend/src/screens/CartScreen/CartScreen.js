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

    const removeFromCartHandler = (id) => {
        console.log('removed');
    };

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    };

    return (
        <Row>
            <Col md={ 8 }>
                <h1>Shopping cart</h1>
                {
                    cartItems.length === 0
                    ? <Message>
                        Your cart is empty
                        <Link to='/'> Go Back</Link>
                    </Message>
                    : (
                        <ListGroup variant='flush'>
                            {
                                cartItems.map(item => (
                                    <ListGroup.Item key={ item.product }>
                                        <Row>
                                            <Col md={ 2 }>
                                                <Image src={ item.image } alt={ item.name } fluid rounded />
                                            </Col>

                                            <Col md={ 3 }>
                                                <Link to={ `/product/${ item.product }`}>{ item.name }</Link>
                                            </Col>

                                            <Col md={ 2 }>
                                                RM { item.price }
                                            </Col>

                                            <Col md={ 2 }>
                                                <Form.Control
                                                    as='select'
                                                    value={ item.quantity }
                                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                >
                                                    {
                                                        [...Array(item.stockQuantity).keys()]
                                                        .map(x => (
                                                            <option key={ x + 1 } value={ x + 1 }>{ x + 1 }</option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>

                                            <Col md={ 2 }>
                                                <Button 
                                                    type='button' 
                                                    variant='light' onClick={() => removeFromCartHandler(item.product)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    )
                }

            </Col>
                
            <Col md={ 4 }>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({
                                    cartItems.reduce((acc, item) => acc + item.quantity, 0)
                                }) items
                            </h2>

                            <h5>
                                RM {
                                    cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
                                    .toFixed(2)
                                }
                            </h5>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button 
                                type='button' 
                                className='btn-block' 
                                disabled={ cartItems.length === 0 } 
                                onClick={ checkoutHandler }
                            >
                                Proceed to checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
};

export default CartScreen;
