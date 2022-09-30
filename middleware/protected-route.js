import CustomAPIError from './custom-error.js';
import jwt from 'jsonwebtoken';

const protectedRoute = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new CustomAPIError(`Invalid Authorization`, 401);
  }
  const token = authHeader.split(' ')[1];
 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    throw new CustomAPIError(`Invalid Authorization`, 401);
  }
};



export default protectedRoute;
