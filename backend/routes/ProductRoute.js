import { Router } from 'express';
import {
  getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct,
} from '../controller/ProductController';
import Auth from '../auth';

const router = Router();

// Read - normal user
router.route('/:id').get(getSingleProduct);
router.route('/').get(getAllProducts);
// Write - admin user
router.route('/new').post(createProduct);
router.route('/:id').put(updateProduct);
router.route('/:id').delete(deleteProduct);

/* router.post('/new', Auth, createProduct);
router.put('/:id', Auth, updateProduct);
router.delete('/:id', Auth, deleteProduct); */

export default router;
