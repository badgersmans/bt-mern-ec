import express from 'express';
import { addOrderItems, getOrderByID, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDelivered } from '../controllers/orderController.js';
import { protect, isAdmin } from '../middleware/auth.js';


const router = express.Router();


router.route('/').get(protect, isAdmin, getAllOrders).post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderByID);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);


export default router;
