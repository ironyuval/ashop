import jwt from 'jsonwebtoken';
import User from './models/User';
import { UserTypes } from './utils/types';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = decodedToken;

    const { userId } = user;

    if (userId) {
      const userFound = await User.findById(userId);
      if (userFound && userFound.type === UserTypes.Admin) {
        next();
      } else {
        throw (Error('Unauthorized user type!'));
      }
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

export default auth;
