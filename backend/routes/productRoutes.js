import express from 'express';
import { getProducts, getProductByID, deleteProductByID, createProduct, updateProduct, createProductReview } from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/auth.js';


const router = express.Router();


router.route('/').get(getProducts).post(protect, isAdmin, createProduct);

router.route('/:id')
.get(getProductByID)
.delete(protect, isAdmin, deleteProductByID)
.put(protect, isAdmin, updateProduct);

router.route('/:id/reviews').post(protect, createProductReview);


export default router;
