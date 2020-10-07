import express from 'express';
import { getProducts, getProductByID, deleteProductByID, createProduct, updateProduct } from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/auth.js';


const router = express.Router();


router.route('/').get(getProducts).post(protect, isAdmin, createProduct);

router.route('/:id')
.get(getProductByID)
.delete(protect, isAdmin, deleteProductByID)
.put(protect, isAdmin, updateProduct);


export default router;
