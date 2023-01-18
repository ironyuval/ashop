import { isDevelopment } from "../utils";
import axios from "axios";

const getStorageToken = () => {
  return localStorage.getItem("token");
};
const getConfig = () => ({
  headers: { Authorization: `Bearer ${getStorageToken()}` },
});

const basename = isDevelopment ? `http://localhost:6565` : "";

export const methods = {
  get: (endpoint) => axios.get(`${basename}/${endpoint}`, getConfig()),
  put: (endpoint, data) =>
    axios.put(`${basename}/${endpoint}`, data, getConfig()),
  post: (endpoint, data) =>
    axios.post(`${basename}/${endpoint}`, data, getConfig()),
  delete: (endpoint) => axios.delete(`${basename}/${endpoint}`, getConfig()),
};
