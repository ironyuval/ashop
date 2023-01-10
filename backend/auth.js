import jwt from 'jsonwebtoken';
import User from './models/User';
import { UserType } from './utils/types';

export const getAuth = (requireAdmin) => async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = decodedToken;

    const { userId } = user;
    req.user = user;
    if (userId) {
      const userFound = await User.findById(userId);
      if ((requireAdmin && userFound && userFound.type === UserType.Admin)
       || (!requireAdmin && userFound)) {
        next();
      } else {
        throw (Error('Unauthorized user type!'));
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: error.message,
    });
  }
};

export default getAuth;
