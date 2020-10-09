import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, createProductReview } from '../../redux/Product/ProductActions';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import ShowMoreText from 'react-show-more-text';
import Rating from '../../components/Rating/Rating';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import Meta from '../../components/Meta/Meta';
import { GlassMagnifier } from "react-image-magnifiers";
import DayJS from 'react-dayjs';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../redux/Product/ProductConstants';

const ProductScreen = ({ match, history }) => {

    const [quantity, setQuantity] = useState(1);
    const [rating, setRating]     = useState(0);
    const [comment, setComment]   = useState('');

    const dispatch = useDispatch();

    const { loading, error, product } = useSelector(state => state.productDetails);
    const { userInfo } = useSelector(state => state.userLogin);
    const { error:productReviewError, success:successProductReview } = useSelector(state => state.productCreateReview);

    useEffect(() => {
        if(productReviewError) {
            dispatch({
                type: PRODUCT_CREATE_REVIEW_RESET
            });
        }
        if(successProductReview) {
            // alert('Review submitted');
            setRating(0);
            setComment('');
            dispatch({
                type: PRODUCT_CREATE_REVIEW_RESET
            });
        }
        dispatch(listProductDetails(match.params.id));
        // eslint-disable-next-line
    }, [dispatch, match, successProductReview]);

    const addToCartHandler = () => {

        /* let quantityFix;

        if (quantity === 0) {
            quantityFix  = quantity;
            quantityFix += 1;
        } else {
            quantityFix = quantity;
        } */

        history.push(`/cart/${ match.params.id }?quantity=${ quantity }`)
    };

    const submitHandler = e => {
        e.preventDefault();

        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }));
    };


    return (
        <Fragment>
            <Link className="btn btn-dark my-3" to='/'>Go back</Link>

            {
                loading
                ? <Loader />
                : error ? <Message variant='danger'>{ error }</Message>
                : (
                    <Fragment>
                        <Meta title={ product.name }/>
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

                    <Row>
                        <Col md=  { 6 }>
                            <h2>Reviews</h2>
                            {
                                product.reviews.length === 0 && <Message>No reviews</Message>
                            }
                            <ListGroup variant='flush'>
                                {
                                    product.reviews.map(review => (
                                        <ListGroup.Item key={ review._id }>
                                            <strong>{ review.name }</strong>
                                            <Rating value={ review.rating }/>
                                            <p>
                                                {
                                                    <DayJS format='DD MMM YYYY'>{ review.createdAt }</DayJS>
                                                }
                                            </p>
                                            <p>{ review.comment }</p>
                                        </ListGroup.Item>
                                    ))
                                }
                                <ListGroup.Item>
                                    <h2>Write a review</h2>
                                    { productReviewError && <Message variant='danger'>{ productReviewError }</Message>}
                                    {
                                        userInfo ? (
                                            <Form onSubmit={ submitHandler }>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control 
                                                        as='select' 
                                                        value={ rating } 
                                                        onChange={e => setRating(e.target.value) }
                                                        required
                                                    >
                                                        <option value="">Select rating</option>
                                                        <option value="1">1 - Poor</option>
                                                        <option value="2">2 - Fair</option>
                                                        <option value="3">3 - Average</option>
                                                        <option value="4">4 - Very good</option>
                                                        <option value="5">5 - Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control 
                                                        as='textarea' 
                                                        row='3' 
                                                        value={ comment } 
                                                        onChange={e => setComment(e.target.value)}
                                                        required
                                                    >
                                                    </Form.Control>
                                                </Form.Group>

                                                <Button type='submit' variant='primary'>
                                                    Submit review
                                                </Button>
                                            </Form>
                                        ) : <Message>
                                            <Link to='/login'>Login</Link>{ ' ' }
                                                to comment
                                            </Message>
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    </Fragment>
                )
            }
        </Fragment>
    )
};

export default ProductScreen;
