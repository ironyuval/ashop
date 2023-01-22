import { Router } from 'express';
import {
  getAllUsers, toggleFavorite, getUserData, updateUser,
} from '../controller/user';
import handlePermissions from '../auth';
import { Permissions } from '../../frontend/src/server-shared/types';

const router = Router();

router.route('/data').get(handlePermissions([Permissions.Registered]), getUserData);
router.route('/').get(handlePermissions([Permissions.Admin]), getAllUsers);
router.route('/').put(handlePermissions([Permissions.Registered]), updateUser);
router.route('/favorite/:id').post(handlePermissions([Permissions.Registered]), toggleFavorite);

// forgot password
// reset password -> update password

// addToFavorites
// removeFromFavorites

export default router;
