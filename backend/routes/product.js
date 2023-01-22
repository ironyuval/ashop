import { Router } from 'express';
import {
  getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, createMockProducts,
} from '../controller/product';
import { Permissions } from '../../frontend/src/server-shared/types';
import handlePermissions from '../auth';

const router = Router();

// Read - all users
router.route('/:id').get(getSingleProduct);
router.route('/').get(getAllProducts);
// Create/Update/Delete - admin user
router.route('/').post(handlePermissions([Permissions.Admin]), createProduct);
router.route('/:id').put(handlePermissions([Permissions.Admin]), updateProduct);
router.route('/:id').delete(handlePermissions([Permissions.Admin]), deleteProduct);
// Dev purposes - master user
router.route('/mock').post(handlePermissions([Permissions.Master]), createMockProducts);

export default router;
