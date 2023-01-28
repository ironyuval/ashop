import { methods } from "./methods";

const Endpoints = {
  toggleWishlistById: (productId) => `api/user/wishlist/${productId}`,
  toggleCartById: (productId) => `api/user/cart/${productId}`,
  data: () => `api/user/data`,
  cart: () => `api/user/cart`,
  wishlist: () => `api/user/wishlist`,
  singleById: (userId) => `api/user/${userId}`,
  all: () => `api/user`,
};

export default {
  toggleWishlist: (productId) =>
    methods.post(Endpoints.toggleWishlistById(productId)),
  toggleCart: (productId) => methods.post(Endpoints.toggleCartById(productId)),
  getAllUsers: () => methods.get(Endpoints.all),
  getUser: (userId = "") => methods.get(Endpoints.singleById(userId)),
  updateUser: (userId, data) => methods.put(Endpoints.singleById(userId), data),
  getData: () => methods.get(Endpoints.data()),
  getWishlist: () => methods.get(Endpoints.wishlist()),
  getCart: () => methods.get(Endpoints.cart()),
};
