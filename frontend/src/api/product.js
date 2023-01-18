import { methods } from "./methods";

const Endpoints = {
  all: (queryString = "") => `api/product/${queryString}`,
  singleById: (productId) => `api/product/${productId}`,
};

export default {
  getProducts: (params) =>
    methods.get(all(new URLSearchParams(params).toString())),
  createProduct: (data) => methods.post(Endpoints.all(), data),
  updateProduct: (productId, data) =>
    methods.put(Endpoints.singleById(productId), data),
  deleteProduct: (productId) => methods.delete(Endpoints.singleById(productId)),
};
