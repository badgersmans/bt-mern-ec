import jwt from 'jsonwebtoken';

const generateToken = (userID) => {
    return jwt.sign({userID}, process.env.JWT_SECRET,{
        expiresIn: 300
    });
};

export default generateToken;
