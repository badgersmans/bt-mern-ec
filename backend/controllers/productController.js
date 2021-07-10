import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;

  const searchText = req.query.searchText
    ? {
        $or: [
          {
            name: {
              $regex: req.query.searchText,
              $options: 'i',
            },
          },
          {
            brand: {
              $regex: req.query.searchText,
              $options: 'i',
            },
          },
          {
            description: {
              $regex: req.query.searchText,
              $options: 'i',
            },
          },
        ],
      }
    : {};

  const productCount = await Product.countDocuments({ ...searchText });
  const products = await Product.find({ ...searchText })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200).json({
    products,
    page,
    pages: Math.ceil(productCount / pageSize),
  });
});

// @desc   Fetch a single products
// @route  GET /api/products/:id
// @access Public
const getProductByID = asyncHandler(async (req, res) => {
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
const deleteProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({
      message: 'Product deleted',
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc   Create product
// @route  POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    stockQuantity: 0,
    reviewCount: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc   Update product
// @route  PUT /api/products/:productID
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, stockQuantity } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.stockQuantity = stockQuantity;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc   Update product
// @route  PUT /api/products/:productID/stockquantity
// @access Private
const updateProductStockQuantity = asyncHandler(async (req, res) => {
  const { stockQuantity } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.stockQuantity = stockQuantity;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc   Create new review
// @route  POST /api/products/:productID/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  const orders = await Order.find({ user: req.user._id });

  // Array of product ids that the user ordered
  const ordersItems = [].concat.apply(
    [],
    orders.map((order) =>
      order.orderItems.map((item) => item.product.toString())
    )
  );
  // console.log(ordersItems);

  if (product) {
    // Check if the id of the product matches any of the users ordered products
    const hasBought = ordersItems.includes(product._id.toString());

    if (!hasBought) {
      res.status(400);
      throw new Error('You can only review products you bought');
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You already reviewed this product');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.reviewCount = product.reviews.length;
    product.avgRating = product.reviews.reduce(
      (acc, item) => item.rating + acc / product.reviews.length,
      0
    );

    await product.save();
    res.status(201).json({
      message: 'Review added',
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc   Get top rated products
// @route  GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ avgRating: 'desc' }).limit(3);
  res.json(products);
});

export {
  getProducts,
  getProductByID,
  getTopProducts,
  deleteProductByID,
  createProduct,
  updateProduct,
  updateProductStockQuantity,
  createProductReview,
};
