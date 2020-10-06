import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import { getUserDetails, updateUserProfile } from '../../redux/User/UserActions';
import { listCurrentUserOrder } from '../../redux/Orders/OrderActions';
import DayJS from 'react-dayjs';


const ProfileScreen = ({ location, history }) => {

    const [name, setName]                       = useState('');
    const [email, setEmail]                     = useState('');
    const [password, setPassword]               = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage]                 = useState(null);

    const dispatch = useDispatch();

    const { loading, error, user }                             = useSelector(state => state.userDetails);
    const { userInfo }                                         = useSelector(state => state.userLogin);
    const { success }                                          = useSelector(state => state.userUpdateProfile);
    const { loading:loadingOrders, error:ordersError, orders } = useSelector(state => state.orderListCurrentUser);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listCurrentUserOrder())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user]);
 
    const submitHandler = e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password}));
        }
    }


    return (
        <Row>
            <Col md={ 3 }>
                <h2 style={{ paddingLeft:'0px' }}>User profile</h2>

                { message && <Message variant='danger'>{ message }</Message> }
                { error && <Message variant='danger'>{ error }</Message> }
                { success && <Message variant='success'>Profile updated</Message> }
                { loading && <Loader /> }

                <Form onSubmit={ submitHandler }>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter name'
                            value={ name }
                            
                            onChange={e => setName(e.target.value) }
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email address'
                            value={ email }
                            
                            onChange={e => setEmail(e.target.value) }
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={ password }
                            
                            minLength='8'
                            onChange={e => setPassword(e.target.value) }
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={ confirmPassword }
                            
                            minLength='8'
                            onChange={e => setConfirmPassword(e.target.value) }
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={ 9 }>
                <h2>My orders</h2>
                {
                    loadingOrders
                    ? <Loader />
                    : ordersError ? <Message variant='danger'>{ ordersError }</Message>
                    : (
                        <Table
                            striped
                            bordered
                            hover
                            responsive
                            className='table-sm'
                        >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(order => (
                                        <tr key={ order._id }>
                                            <td>{ order._id }</td>
                                            <td>
                                                <DayJS format='DD MMM YYYY'>{ order.createdAt }</DayJS>
                                            </td>
                                            <td>{ order.totalPrice }</td>
                                            <td>
                                                {
                                                    order.isPaid
                                                    ? <DayJS format='DD MMM YYYY h:mm A'>{ order.paidAt }</DayJS>
                                                    : <i className="fas fa-times" style={{ color: 'red' }}></i>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    order.isDelivered
                                                    ? <DayJS format='DD MMM YYYY'>{ order.deliveredAt }</DayJS>
                                                    : <i className="fas fa-times" style={{ color: 'red' }}></i>
                                                }
                                            </td>
                                            <td>
                                                <LinkContainer to={ `/order/${ order._id }` }>
                                                    <Button className='btn-sm' variant='light'>Details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )
                }
            </Col>
        </Row>
    )
};

export default ProfileScreen;
