import { Router } from 'express';
import {
  getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct,
} from '../controller/product';
import { Permissions } from '../../frontend/src/server-shared/types';
import handlePermissions from '../auth';

const router = Router();

// Read - normal user
router.route('/:id').get(getSingleProduct);
router.route('/').get(getAllProducts);
// Write - admin user
router.route('/new').post(handlePermissions([Permissions.Admin]), createProduct);
router.route('/:id').put(handlePermissions([Permissions.Admin]), updateProduct);
router.route('/:id').delete(handlePermissions([Permissions.Admin]), deleteProduct);

export default router;
