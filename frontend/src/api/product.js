import { methods } from "./methods";

const Endpoints = {
  allProducts: (queryString = "") => `api/product${queryString}`,
  singleProductById: (productId) => `api/product/${productId}`,
};

export default {
  getProducts: (params) =>
    methods.get(allProducts(new URLSearchParams(params).toString())),
  createProduct: (data) => methods.post(Endpoints.allProducts(), data),
  updateProduct: (productId, data) =>
    methods.put(Endpoints.singleProductById(productId), data),
  deleteProduct: (productId) =>
    methods.delete(Endpoints.singleProductById(productId)),
};
