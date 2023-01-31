import jwt from 'jsonwebtoken';
import User from './models/User';

const setPermissions = (permissions = []) => async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];

    if (!token) {
      throw (Error('Missing token'));
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const { userId } = decodedToken;

    if (!userId) { throw (Error('Wrong jwt token')); }

    if (permissions.length) {
      const userFound = await User.findById(userId);
      if (!userFound) {
        throw (Error('User token not found'));
      }
      req.user = userFound;
      if (!userFound || (!permissions.includes(userFound.role))) {
        throw (Error('Unauthorized user type!'));
      }
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: error.message,
    });
  }
};

export default setPermissions;
