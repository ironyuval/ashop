import { Router } from 'express';
import {
  getAllUsers, login, register, toggleFavorite, getUserData, updateUser,
} from '../controller/user';
import { getAuth } from '../auth';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/data').get(getAuth(false), getUserData);
router.route('/').get(getAuth(true), getAllUsers);
router.route('/').put(getAuth(false), updateUser);
router.route('/favorite/:id').post(getAuth(false), toggleFavorite);

// forgot password
// reset password -> update password

// addToFavorites
// removeFromFavorites

export default router;
