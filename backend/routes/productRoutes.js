import express from 'express';
import { 
    getProducts               ,
    getTopProducts            ,
    getProductByID            ,
    deleteProductByID         ,
    createProduct             ,
    updateProduct             ,
    updateProductStockQuantity,
    createProductReview 
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/auth.js';


const router = express.Router();


router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router.get('/top', getTopProducts);

router.route('/:id')
.get(getProductByID)
.delete(protect, isAdmin, deleteProductByID)
.put(protect, isAdmin, updateProduct);

router.route('/:id/stockquantity').put(protect, updateProductStockQuantity);

router.route('/:id/reviews').post(protect, createProductReview);


export default router;
