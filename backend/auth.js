import jwt from 'jsonwebtoken';
import { Permissions } from '../frontend/src/server-shared/types';
import User from './models/User';

const handlePermissions = (permissions = []) => async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const { userId } = decodedToken;
    console.log(userId);

    if (!userId) { throw (Error('Missing token')); }

    if (permissions.length) {
      const userFound = await User.findById(userId);
      // admin excluded
      if (!userFound
        || (userFound.permission !== Permissions.Master
         && !permissions.includes(userFound.permission))) {
        throw (Error('Unauthorized user type!'));
      }
    }

    req.userId = userId;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: error.message,
    });
  }
};

export default handlePermissions;
