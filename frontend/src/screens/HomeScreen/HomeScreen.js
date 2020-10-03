import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/Product/ProductActions';
import { Col, Row } from 'react-bootstrap';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import Product from '../../components/Product/Product';

const HomeScreen = () => {

    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.productList);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <Fragment>
            <h1>Latest products</h1>

            {
                loading
                ? <Loader />
                : error ? <Message variant='danger'>{ error }</Message>

                :  <Row>
                        {
                            products.map(product => (
                                <Col key={ product._id } sm={ 12 } md={ 6 } lg={ 4 } xl={ 3 }>
                                    <Product product={ product }/>
                                </Col>
                            ))
                        }
                    </Row>
            }
        </Fragment>
    )
};

export default HomeScreen;
