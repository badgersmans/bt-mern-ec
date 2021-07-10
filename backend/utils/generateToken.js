import jwt from 'jsonwebtoken';

const generateToken = (userID) => {
  return jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: '8h',
  });
};

export default generateToken;
