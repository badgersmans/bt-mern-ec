import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer/FormContainer';
import { saveShippingAdress } from '../../redux/ShoppingCart/CartActions';

const ShippingScreen = ({ history }) => {

    const dispatch = useDispatch();
    const { shippingAddress } = useSelector(state => state.cart);

    const [ address , setAddress   ] = useState(shippingAddress.address);
    const [ city    , setCity      ] = useState(shippingAddress.city);
    const [ postCode, setPostCode  ] = useState(shippingAddress.postCode);
    const [ country , setCountry   ] = useState(shippingAddress.country);

    const submitHandler = e => {
        e.preventDefault();

        dispatch(saveShippingAdress({ address, city, postCode, country }));

        history.push('/payment');
    }

    return (
        <FormContainer>
            <h1 style={{ paddingLeft:'0px' }}> Shipping screen </h1>
            <Form onSubmit={ submitHandler } >
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Address'
                        value={ address }
                        required
                        onChange={e => setAddress(e.target.value) }
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='City'
                        value={ city }
                        required
                        onChange={e => setCity(e.target.value) }
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postCode'>
                    <Form.Label>Post code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Post code'
                        value={ postCode }
                        required
                        onChange={e => setPostCode(e.target.value) }
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Country'
                        value={ country }
                        required
                        onChange={e => setCountry(e.target.value) }
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Proceed to payment
                </Button>
            </Form>
        </FormContainer>
    )
};

export default ShippingScreen;
