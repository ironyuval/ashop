import { Router } from "express";
import { getAllProducts } from "../controller/ProductController";
const router = Router();

router.route("/products").get(getAllProducts);

export default router