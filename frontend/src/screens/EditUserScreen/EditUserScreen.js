import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import FormContainer from '../../components/FormContainer/FormContainer';
import { getUserDetails, updateUser } from '../../redux/User/UserActions';
import { USER_UPDATE_RESET } from '../../redux/User/UserConstants';

const EditUserScreen = ({ match, history }) => {
  const userID = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    success,
  } = useSelector((state) => state.updateUser);
  const { userInfo } = useSelector((state) => state.userLogin);
  console.log(userInfo);
  useEffect(() => {
    if (success) {
      dispatch({
        type: USER_UPDATE_RESET,
      });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userID) {
        dispatch(getUserDetails(userID));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userID, dispatch, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        _id: userID,
        name,
        email,
        isAdmin,
      })
    );
  };

  return (
    <Fragment>
      <Link to='/admin/userlist' className='btn btn-dark my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1 style={{ paddingLeft: '0px' }}>Edit User</h1>

        {updateLoading && <Loader />}
        {updateError && <Message variant='danger'>{updateError}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email address'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default EditUserScreen;
