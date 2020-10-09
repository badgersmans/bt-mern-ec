import React, { useEffect, Fragment } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import Paginate from '../../components/Paginate/Paginate';
import { listProducts, deleteProduct, createProduct } from '../../redux/Product/ProductActions';
import { PRODUCT_CREATE_RESET } from '../../redux/Product/ProductConstants';


const ProductListScreen = ({ history, match }) => {

    const pageNumber = match.params.pageNumber || 1;
    
    const dispatch  = useDispatch();
    const { loading, error, products, page, pages } = useSelector(state => state.productList);
    const { loading:loadingDelete, error:deleteError, success:deleteSuccess } = useSelector(state => state.deleteProduct);
    const { loading:createLoading, error:createError, success:createSuccess, product:createdProduct } = useSelector(state => state.createProduct);
    const { userInfo } = useSelector(state => state.userLogin);

    useEffect(() => {
        dispatch({
            type: PRODUCT_CREATE_RESET
        });

        if (!userInfo.isAdmin) {
            history.push('/login');
        }

        if(createSuccess) {
            history.push(`/admin/product/${ createdProduct._id }/edit`);
        } else {
            dispatch(listProducts('', pageNumber));
        }
    }, [dispatch, history, userInfo, deleteSuccess, createSuccess, createdProduct, pageNumber]);

    const deleteHandler = (productID) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(productID));
        }
    };

    const createProductHandler = () => {
        dispatch(createProduct());
    };

    return (
        <Fragment>

            <Row className="align-items-center">
                <Col>
                    <h1 style={{ paddingLeft: '0px' }}>Products</h1>
                </Col>

                <Col className="text-right">
                    <Button className="my-3" onClick={ createProductHandler }>
                        <i className="fas fa-plus"></i>{ ' ' }
                        Add Product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            { deleteError && <Message variant='danger'>{ deleteError }</Message> }

            {createLoading && <Loader />}
            { createError && <Message variant='danger'>{ createError }</Message> }

            {
                loading ? <Loader />
                : error ? <Message variant='danger'>{ error }</Message>
                : (
                    <Fragment>
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className='table-sm'
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                products.map(product => (
                                    <tr key={ product._id }>

                                        <td>{ product._id }</td>
                                        <td>{ product.name }</td>
                                        <td>
                                            RM { product.price }
                                        </td>

                                        <td>
                                            { product.category }
                                        </td>

                                        <td>
                                            { product.brand }
                                        </td>

                                        <td>
                                            <LinkContainer to={ `/admin/product/${ product._id }/edit` }>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button 
                                                variant='danger' 
                                                className='btn-sm'
                                                onClick={() => deleteHandler(product._id) }
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    <Paginate pages={ pages } page={ page } isAdmin={ true }/>
                    </Fragment>
                )
            }
        </Fragment>
    )
};

export default ProductListScreen;
