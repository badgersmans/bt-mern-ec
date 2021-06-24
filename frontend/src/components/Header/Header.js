import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from '../SearchBox/SearchBox';
import { logout } from '../../redux/User/UserActions';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);
  const cartLength = cartItems.length;

  const logoutHandler = () => {
    dispatch(logout());

    history.push('/');
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                alt=''
                src='/favicon.ico'
                width='30'
                height='30'
                className='d-inline-block align-bottom'
              />{' '}
              Geminids
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />

            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link active={false}>
                  {cartLength > 0 ? (
                    <span className='fa-layers fa-fw mx-2'>
                      <i className='fas fa-shopping-cart'></i>
                      <span
                        className='fa-layers-counter fa-layers-top-right fa-inverse'
                        style={{ background: 'tomato', fontSize: '0.8rem' }}
                      >
                        {cartLength}
                      </span>
                    </span>
                  ) : (
                    <i className='fas fa-shopping-cart'>&nbsp;</i>
                  )}
                  Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link active={false}>
                    <i className='fas fa-user'></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
