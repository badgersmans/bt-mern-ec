import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => { 
  return (
    <Fragment>

      <Header />

      <main className="py-4">
        <Container>
          <h1>Welcome to Geminids</h1>
        </Container>
      </main>

      <Footer />

    </Fragment>
  );
};

export default App;
