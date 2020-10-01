import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomeScreen from './screens/HomeScreen/HomeScreen';

const App = () => { 
  return (
    <Fragment>

      <Header />

      <main className="py-4">
        <Container>
          <HomeScreen />
        </Container>
      </main>

      <Footer />

    </Fragment>
  );
};

export default App;
