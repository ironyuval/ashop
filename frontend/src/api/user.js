import { methods } from "./methods";

const Endpoints = {
  toggleWishlistById: (productId) => `api/user/wishlist/${productId}`,
  toggleCartById: (productId) => `api/user/cart/${productId}`,
  data: () => `api/user/data`,
  cart: (queryString = "") => `api/user/cart?${queryString}`,
  wishlist: (queryString = "") => `api/user/wishlist?${queryString}`,
  all: (queryString = "") => `api/user/?${queryString}`,
};

export default {
  toggleWishlist: (productId) =>
    methods.post(Endpoints.toggleWishlistById(productId)),
  toggleCart: (productId) => methods.post(Endpoints.toggleCartById(productId)),
  getAllUsers: () => methods.get(Endpoints.all),
  updateData: (userId, data) => methods.put(Endpoints.data(), data),
  getData: () => methods.get(Endpoints.data()),
  getWishlist: (params) =>
    methods.get(Endpoints.wishlist(new URLSearchParams(params))),
  getCart: (params) => methods.get(Endpoints.cart(new URLSearchParams(params))),
};
