import express from 'express';
import { 
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getAllUsers,
    deleteUserByID,
    getUserByID,
    updateUserByID
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/auth.js';


const router = express.Router();

router.route('/').post(registerUser).get(protect, isAdmin, getAllUsers);
router.post('/login', authUser);

router.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile);

router.route('/:id')
.get(protect, isAdmin, getUserByID)
.put(protect, isAdmin, updateUserByID)
.delete(protect, isAdmin, deleteUserByID);

export default router;
