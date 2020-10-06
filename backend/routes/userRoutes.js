import express from 'express';
import { 
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getAllUsers
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/auth.js';


const router = express.Router();

router.route('/').post(registerUser).get(protect, isAdmin, getAllUsers);
router.post('/login', authUser);

router.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile);


export default router;
