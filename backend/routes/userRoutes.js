import { Router } from 'express';
import {
  getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct,
} from '../controller/ProductController';
import { login, register } from '../controller/UserController';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
export default router;
