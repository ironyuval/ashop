import jwt from 'jsonwebtoken';
import User from './models/User';
import { UserType } from './utils/types';

const auth = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = decodedToken;

    const { userId } = user;
    req.userId = userId;
    if (userId) {
      const userFound = await User.findById(userId);
      if (userFound && userFound.type === UserType.Admin) {
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
