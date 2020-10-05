import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { savePaymentMethod } from '../../redux/ShoppingCart/CartActions';

const PaymentMethodScreen = ({ history }) => {

    const dispatch = useDispatch();
    const { shippingAddress } = useSelector(state => state.cart);
    console.log(shippingAddress);

    if(!shippingAddress) {
        history.push('/shipping');
    }

    const [ paymentMethod , setPaymentMethod   ] = useState('PayPal');

    const submitHandler = e => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));

        history.push('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1 style={{ paddingLeft:'0px' }}> Payment method </h1>
            <Form onSubmit={ submitHandler } >
                <Form.Group>
                    <Form.Label as='legend'>Select payment method</Form.Label>

                    <Col>
                        <Form.Check 
                            type='radio' 
                            label='PayPal or Credit Card' 
                            id='PayPal' 
                            name='paymentMethod' 
                            value='PayPal' 
                            checked 
                            onChange={e => setPaymentMethod(e.target.value) }
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Proceed to payment
                </Button>
            </Form>
        </FormContainer>
    )
};

export default PaymentMethodScreen;
