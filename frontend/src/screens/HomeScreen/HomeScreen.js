import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Meta from '../../components/Meta/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/Product/ProductActions';
import { Col, Row } from 'react-bootstrap';
import Loader from '../../components/Loader/Loader';
import Paginate from '../../components/Paginate/Paginate';
import Message from '../../components/Message/Message';
import Product from '../../components/Product/Product';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';

const HomeScreen = ({ match }) => {
  const searchText = match.params.searchText;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(searchText, pageNumber));
  }, [dispatch, searchText, pageNumber]);

  return (
    <Fragment>
      <Meta />

      {!searchText ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-dark'>
          Go Back
        </Link>
      )}
      <h1>Latest products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Fragment>
          <Row>
            {products.map((product) => (
              <Col
                className='align-items-stretch d-flex'
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            searchText={searchText ? searchText : ''}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomeScreen;
