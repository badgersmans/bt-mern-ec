import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import ShowMoreText from 'react-show-more-text';
import Rating from '../../components/Rating/Rating';

const ProductScreen = ({ match }) => {

    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async() => {
            const { data } = await axios.get(`/api/products/${ match.params.id }`);

            setProduct(data)
        }
        fetchProduct();
    }, []);

    return (
        <Fragment>
            <Link className="btn btn-dark my-3" to='/'>Go back</Link>

            <Row>
                <Col md={ 6 }>
                    <Image src={ product.image } alt={ product.name } fluid/>
                </Col>

                <Col md={ 3 }>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{ product.name }</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={ product.rating } text={ `${product.numReviews} reviews` } />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: RM { product.price }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <ShowMoreText
                                lines={5}
                                more='Show more'
                                less='Show less'
                                expanded={false}
                                width={300}
                            >
                                Description: { product.description }
                            </ShowMoreText>
                        </ListGroup.Item>


                    </ListGroup>
                </Col>

                <Col md={ 3 }>
                    <Card>
                        <ListGroup variant='flush'>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    
                                    <Col>
                                        <strong>RM { product.price }</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>

                                    <Col>
                                        {
                                            product.countInStock > 0 ? 'In stock' : 'Out of stock'
                                        }
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button 
                                    className='btn-block' 
                                    type='button' 
                                    disabled={ product.countInStock === 0 }>
                                    Add to cart
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
};

export default ProductScreen;
