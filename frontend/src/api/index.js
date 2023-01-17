import product from "./product";
import user from "./user";

const getConfig = () => ({
  headers: { Authorization: `Bearer ${getStorageToken()}` },
});

export const API = {
  getConfig,
  Product: product,
  User: user,
};
