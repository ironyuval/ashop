import { API } from ".";
import { getBasename } from "../utils";
import axios from "axios";

const Endpoints = {
  getProducts: (queryString) => `${getBasename()}/api/product?${queryString}`,
  createProduct: () => `${getBasename()}/api/product/new`,
  updateProduct: (productId) => `${getBasename()}/api/product/${productId}`,
};

export default {
  getProducts: (params) =>
    axios.get(
      getProducts(new URLSearchParams(params).toString()),
      API.getConfig()
    ),
  createProduct: (data) =>
    axios.post(Endpoints.createProduct(), data, API.getConfig()),
  updateProduct: (productId, data) =>
    axios.put(Endpoints.updateProduct(productId), data, API.getConfig()),
};
