import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async(req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userID);

            next();

        } catch (error) {
            console.error(error);
            res.status(401)
            throw new Error('Token expired or invalid');
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized');
    }
});


const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401)
        throw new Error('Unauthorized');
    }
};

export { protect, isAdmin }

