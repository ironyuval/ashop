import { Router } from 'express';
import {
  getAllUsers, toggleWishlist, getUserData, updateUser,
} from '../controller/user';
import handlePermissions from '../auth';
import { Permissions } from '../../frontend/src/server-shared/types';

const router = Router();

router.route('/data').get(handlePermissions([Permissions.Registered]), getUserData);
router.route('/').get(handlePermissions([Permissions.Admin]), getAllUsers);
router.route('/').put(handlePermissions([Permissions.Registered]), updateUser);
router.route('/wishlist/:id').post(handlePermissions([Permissions.Registered]), toggleWishlist);
router.route('/cart/:id').post(handlePermissions([Permissions.Registered]), toggleWishlist);

// forgot password
// reset password -> update password

// addToFavorites
// removeFromFavorites

export default router;
