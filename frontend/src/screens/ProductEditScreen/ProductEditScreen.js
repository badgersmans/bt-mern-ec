import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import FormContainer from '../../components/FormContainer/FormContainer';
import { listProductDetails } from '../../redux/Product/ProductActions';


const ProductEditScreen = ({ match, history }) => {

    const productID = match.params.id;

    const [name, setName]                  = useState('');
    const [price, setPrice]                = useState(0);
    const [image, setImage]                = useState('');
    const [brand, setBrand]                = useState('');
    const [category, setCategory]          = useState('');
    const [stockQuantity, setStockQuantity]= useState(0);
    const [description, setDescription]    = useState('');

    const dispatch = useDispatch();

    const { loading, error, product } = useSelector(state => state.productDetails);

    useEffect(() => {
        if(!product.name || product._id !== productID) {
            dispatch(listProductDetails(productID));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setStockQuantity(product.stockQuantity);
            setDescription(product.description);
        }
    }, [product, productID, dispatch, history]);

    const submitHandler = e => {
        e.preventDefault();

        // update product
    }

    return (
        <Fragment>
            <Link to='/admin/productlist' className='btn btn-dark my-3'>
                Go Back
            </Link>

        <FormContainer>
            <h1 style={{ paddingLeft:'0px' }}>Edit Product</h1>
            
            {/* { updateLoading && <Loader /> }
            { updateError && <Message variant='danger'>{ updateError }</Message> } */}

            {
                loading
                ? <Loader />
                : error ? <Message variant='danger'>{ error }</Message>
                : (
                    <Form onSubmit={ submitHandler }>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Name'
                                value={ name }
                                required
                                onChange={e => setName(e.target.value) }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Price'
                                value={ price }
                                required
                                onChange={e => setPrice(e.target.value) }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Image URL'
                                value={ image }
                                required
                                onChange={e => setImage(e.target.value) }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Brand'
                                value={ brand }
                                required
                                onChange={e => setBrand(e.target.value) }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='stockQuantity'>
                            <Form.Label>Stock Quantity</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Stock Quantity'
                                value={ stockQuantity }
                                required
                                onChange={e => setStockQuantity(e.target.value) }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Category'
                                value={ category }
                                required
                                onChange={e => setCategory(e.target.value) }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="5"
                                placeholder='Enter Description'
                                value={ description }
                                required
                                onChange={e => setDescription(e.target.value) }
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )
            }
        </FormContainer>
        </Fragment>
    )
};

export default ProductEditScreen;
