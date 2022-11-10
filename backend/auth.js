import jwt from 'jsonwebtoken';
import User from './models/User';
import { UserTypes } from './utils/types';

const auth = async (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM-TOKEN');
    const user = decodedToken;
    request.user = user;

    if (user.id) {
      const userFound = await User.findById(user.id);
      if (userFound && userFound.type === UserTypes.Admin) {
        next();
      }
    }
  } catch (error) {
    response.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};

export default auth;
