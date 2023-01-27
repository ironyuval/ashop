import { Router } from 'express';
import {
  getAllUsers, toggleWishlist, getUserData, updateUserData,
} from '../controller/user';
import handlePermissions from '../auth';
import { Permissions } from '../../frontend/src/server-shared/types';

const router = Router();

router.route('/').get(handlePermissions(), getAllUsers);
router.route('/data').get(handlePermissions([Permissions.Registered]), getUserData);
router.route('/data').put(handlePermissions([Permissions.Registered]), updateUserData);
router.route('/wishlist/:id').post(handlePermissions([Permissions.Registered]), toggleWishlist);
router.route('/cart/:id').post(handlePermissions([Permissions.Registered]), toggleWishlist);

// forgot password
// reset password -> update password

export default router;
