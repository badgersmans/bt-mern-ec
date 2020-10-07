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


// @desc   Create product
// @route  POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        stockQuantity: 0,
        reviewCount: 0,
        description: 'Sample description'
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});


// @desc   Update product
// @route  PUT /api/products/:productID
// @access Private/Admin
const updateProduct = asyncHandler(async(req, res) => {
    
    const { 
        name,
        price,
        description,
        image,
        brand,
        category,
        stockQuantity
    } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (product) {

        product.name          = name;
        product.price         = price;
        product.description   = description;
        product.image         = image;
        product.brand         = brand;
        product.category      = category;
        product.stockQuantity = stockQuantity;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
});



export {
    getProducts,
    getProductByID,
    deleteProductByID,
    createProduct,
    updateProduct
}








