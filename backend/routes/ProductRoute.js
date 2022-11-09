import { Router } from 'express';
import {
  getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct,
} from '../controller/ProductController';

const router = Router();

router.route('/products/:id').get(getSingleProduct);
router.route('/products').get(getAllProducts);
router.route('/products/new').post(createProduct);
router.route('/products/:id').put(updateProduct);
router.route('/products/:id').delete(deleteProduct);

export default router;
