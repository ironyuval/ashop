import { Router } from 'express';
import {
  getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct,
} from '../controller/product';
import { getAuth } from '../auth';

const router = Router();

// Read - normal user
router.route('/:id').get(getSingleProduct);
router.route('/').get(getAllProducts);
// Write - admin user
router.route('/new').post(getAuth(true), createProduct);
router.route('/:id').put(getAuth(true), updateProduct);
router.route('/:id').delete(getAuth(true), deleteProduct);

export default router;
