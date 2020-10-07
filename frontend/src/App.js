import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProductScreen from './screens/ProductScreen/ProductScreen';
import CartScreen from './screens/CartScreen/CartScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen/ShippingScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen/OrderScreen';
import UserListScreen from './screens/UserListScreen/UserListScreen';

const App = () => { 
  return (
    <Router>
      <Fragment>

        <Header />

        <main className="py-3">
          <Container>
            <Route path='/login'        component={ LoginScreen }        />
            <Route path='/shipping'     component={ ShippingScreen }     />
            <Route path='/paymentmethod'component={ PaymentMethodScreen }/>
            <Route path='/placeorder'   component={ PlaceOrderScreen }   />
            <Route path='/order/:id'    component={ OrderScreen }        />
            <Route path='/register'     component={ RegisterScreen }     />
            <Route path='/profile'      component={ ProfileScreen }      />
            <Route path='/product/:id'  component={ ProductScreen }      />
            <Route path='/cart/:id?'    component={ CartScreen }         />
            <Route path='/admin/userlist'    component={ UserListScreen }/>
            <Route exact path='/'       component={ HomeScreen }         />
          </Container>
        </main>

        <Footer />

      </Fragment>
    </Router>
  );
};

export default App;
