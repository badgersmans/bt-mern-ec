import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async(req, res) => {

    const products = await Product.find({});

    res.status(200).json(products);
});


// @desc   Fetch a single products
// @route  GET /api/products/:id
// @access Public
const getProductByID = asyncHandler(async(req, res) => {

    const product = await Product.findById(req.params.id);

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


// @desc   Delete product by ID
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProductByID = asyncHandler(async(req, res) => {

    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({
            message: 'Product deleted'
        })
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


export {
    getProducts,
    getProductByID,
    deleteProductByID
}








