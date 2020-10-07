import express from 'express';
import { getProducts, getProductByID, deleteProductByID } from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/auth.js';


const router = express.Router();


router.route('/').get(getProducts);
router.route('/:id').get(getProductByID).delete(protect, isAdmin, deleteProductByID);


export default router;
