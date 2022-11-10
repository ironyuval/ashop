import { Router } from 'express';
import {
  getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct,
} from '../controller/ProductController';

const router = Router();

router.route('/:id').get(getSingleProduct);
router.route('/').get(getAllProducts);
router.route('/new').post(createProduct);
router.route(':id').put(updateProduct);
router.route('/:id').delete(deleteProduct);

export default router;
