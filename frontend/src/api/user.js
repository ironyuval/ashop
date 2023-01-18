import { methods } from "./methods";

const Endpoints = {
  toggleFavoriteById: (productId) => `api/user/favorite/${productId}`,
  data: () => `api/user/data`,
  singleById: (userId) => `api/user/${userId}`,
  all: () => `api/user`,
};

export default {
  toggleFavorite: (productId) =>
    methods.post(Endpoints.toggleFavoriteById(productId)),
  getAllUsers: () => methods.get(Endpoints.all),
  getUser: (userId = "") => methods.get(Endpoints.singleById(userId)),
  updateUser: (userId, data) => methods.put(Endpoints.singleById(userId), data),
  getData: () => methods.get(Endpoints.data()),
};
