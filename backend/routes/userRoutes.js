import express from 'express';
import {
  login,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUserByID,
  getUserByID,
  updateUserByID,
  addCartItemsToUser,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, isAdmin, getAllUsers);
router.post('/login', login);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .get(protect, isAdmin, getUserByID)
  .put(protect, isAdmin, updateUserByID)
  .delete(protect, isAdmin, deleteUserByID);

router.put('/:id/cartitems', protect, addCartItemsToUser);

export default router;
