import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../../redux/Product/ProductActions';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import ShowMoreText from 'react-show-more-text';
import Rating from '../../components/Rating/Rating';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import { GlassMagnifier } from "react-image-magnifiers";

const ProductScreen = ({ match, history }) => {

    const [quantity, setQuantity] = useState(0);

    const dispatch = useDispatch();

    const { loading, error, product } = useSelector(state => state.productDetails);

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch]);

    const addToCartHandler = () => {

        let quantityFix;

        if (quantity === 0) {
            quantityFix  = quantity;
            quantityFix += 1;
        } else {
            quantityFix = quantity;
        }

        history.push(`/cart/${ match.params.id }?quantity=${ quantityFix }`)
    };


    return (
        <Fragment>
            <Link className="btn btn-dark my-3" to='/'>Go back</Link>

            {
                loading
                ? <Loader />
                : error ? <Message variant='danger'>{ error }</Message>
                : (
                    <Row>
                        <Col md={ 6 }>
                            <GlassMagnifier
                                allowOverflow= { false }
                                magnifierSize="55%"
                                imageSrc={ product.image }
                                imageAlt={ product.name }
                            />
                        </Col>

                        <Col md={ 3 }>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{ product.name }</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating value={ product.avgRating } text={ `${product.reviewCount} reviews` } />
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
                                                    product.stockQuantity > 0 ? 'In stock' : 'Out of stock'
                                                }
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {
                                        product.stockQuantity > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Quantity</Col>
                                                    <Col>
                                                        <Form.Control
                                                            as='select'
                                                            value={ quantity }
                                                            onChange={(e) => {
                                                                setQuantity(e.target.value)
                                                            }}
                                                        >
                                                            {
                                                                [...Array(product.stockQuantity).keys()]
                                                                .map(x => (
                                                                    <option key={ x + 1 } value={ x + 1 }>{ x + 1 }</option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                    
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    }

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn-block' 
                                            type='button' 
                                            disabled={ product.stockQuantity === 0 }>
                                            Add to cart
                                        </Button>
                                    </ListGroup.Item>

                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                )
            }
        </Fragment>
    )
};

export default ProductScreen;
