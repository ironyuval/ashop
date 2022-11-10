import { Router } from 'express';
import {
  getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct,
} from '../controller/product';
import Auth from '../auth';

const router = Router();

// Read - normal user
router.route('/:id').get(getSingleProduct);
router.route('/').get(getAllProducts);
// Write - admin user
router.route('/new').post(Auth, createProduct);
router.route('/:id').put(Auth, updateProduct);
router.route('/:id').delete(Auth, deleteProduct);

export default router;
