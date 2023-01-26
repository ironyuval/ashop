import { methods } from "./methods";

const Endpoints = {
  toggleWishlistById: (productId) => `api/user/wishlist/${productId}`,
  data: () => `api/user/data`,
  singleById: (userId) => `api/user/${userId}`,
  all: () => `api/user`,
};

export default {
  toggleWishlist: (productId) =>
    methods.post(Endpoints.toggleWishlistById(productId)),
  getAllUsers: () => methods.get(Endpoints.all),
  getUser: (userId = "") => methods.get(Endpoints.singleById(userId)),
  updateUser: (userId, data) => methods.put(Endpoints.singleById(userId), data),
  getData: () => methods.get(Endpoints.data()),
};
