import { Router } from 'express';
import {
  getAllUsers, toggleWishlist, getUserData, updateUserData,
  toggleCart, getWishlist, deleteAllUsers, getCart,
} from '../controller/user';
import setPermissions from '../auth';
import { Permissions } from '../../frontend/src/server-shared/types';

const router = Router();

router.route('/').get(getAllUsers);
router.route('/').delete(deleteAllUsers);
router.route('/data').get(setPermissions(Permissions.Registered), getUserData);
router.route('/data').put(setPermissions(Permissions.Registered), updateUserData);
router.route('/wishlist').get(setPermissions(Permissions.Registered), getWishlist);
router.route('/wishlist/:id').post(setPermissions(Permissions.Registered), toggleWishlist);
router.route('/cart').get(setPermissions(Permissions.Registered), getCart);
router.route('/cart/:id').post(setPermissions(Permissions.Registered), toggleCart);

// forgot password
// reset password -> update password

export default router;
