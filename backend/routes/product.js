import { Router } from 'express';
import {
  getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, createMockProducts,
} from '../controller/product';
import { Permissions } from '../../frontend/src/server-shared/types';
import setPermissions from '../auth';

const router = Router();

// Read - all users
router.route('/:id').get(getSingleProduct);
router.route('/').get(getAllProducts);
// Create/Update/Delete - at least admin
router.route('/').post(setPermissions(Permissions.Admin), createProduct);
router.route('/:id').put(setPermissions(Permissions.Admin), updateProduct);
router.route('/:id').delete(setPermissions(Permissions.Admin), deleteProduct);
// Dev purposes - master user
router.route('/mock').post(setPermissions(Permissions.Master), createMockProducts);

export default router;
