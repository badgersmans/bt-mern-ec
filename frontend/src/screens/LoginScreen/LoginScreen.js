import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import FormContainer from '../../components/FormContainer/FormContainer'; 
import { login } from '../../redux/User/UserActions';


const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const { loading, error, userInfo } = useSelector(state => state.userLogin);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = e => {
        e.preventDefault();

        dispatch(login(email, password));
    }


    return (
        <FormContainer>
            <h1 style={{ paddingLeft:'0px' }}>Login</h1>

            { error && <Message variant='danger'>{ error }</Message> }
            { loading && <Loader /> }

            <Form onSubmit={ submitHandler }>
                <Form.Group controlId='email'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email address'
                        value={ email }
                        required
                        onChange={e => setEmail(e.target.value) }
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={ password }
                        required
                        minLength='8'
                        onChange={e => setPassword(e.target.value) }
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Login
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    No account?
                    <Link 
                        to={ redirect ? `/register?redirect=${redirect}` : '/register' }
                    >
                        {' '}Register one!
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
};

export default LoginScreen;
