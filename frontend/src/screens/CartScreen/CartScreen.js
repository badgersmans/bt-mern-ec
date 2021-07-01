import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../../components/Message/Message';
import {
  addToCart,
  removeFromCart,
} from '../../redux/ShoppingCart/CartActions';
import formatMoney from '../../lib/moneyFormatter';

const CartScreen = ({ match, location, history }) => {
  // const productID = match.params.id;
  // const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  /*     useEffect(() => {
        if (productID) {
            dispatch(addToCart(productID, quantity));
        }
    }, [dispatch, productID, quantity]); */

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  const countSubtotalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.productID}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.productID}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>{formatMoney(item.price)}</Col>

                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.productID, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.stockQuantity).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.productID)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              {countSubtotalItems > 1 ? (
                <h2>Subtotal ({countSubtotalItems}) items</h2>
              ) : (
                <h2>Subtotal ({countSubtotalItems}) item</h2>
              )}

              <h5>
                {formatMoney(
                  cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )
                )}
              </h5>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
