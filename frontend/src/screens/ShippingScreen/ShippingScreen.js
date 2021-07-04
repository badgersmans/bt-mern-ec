import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { saveShippingAdress } from '../../redux/ShoppingCart/CartActions';

const ShippingScreen = ({ history }) => {
  const { userInfo } = useSelector(state => state.userLogin);
  const { shippingAddress } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  const [address, setAddress]   = useState(shippingAddress.address  || '');
  const [city, setCity]         = useState(shippingAddress.city     || '');
  const [postCode, setPostCode] = useState(shippingAddress.postCode || '');
  const [country, setCountry]   = useState(shippingAddress.country  || '');

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAdress({ address, city, postCode, country }));

    history.push('/paymentmethod');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 style={{ paddingLeft: '0px' }}> Shipping address </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='City'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postCode'>
          <Form.Label>Postcode</Form.Label>
          <Form.Control
            type='text'
            placeholder='Postcode'
            value={postCode}
            required
            onChange={(e) => setPostCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
