import { isDevelopment } from "../utils";
import axios from "axios";

const basename = isDevelopment ? `http://localhost:6565` : "";

export const methods = {
  get: (endpoint) => axios.get(`${basename}/${endpoint}`),
  put: (endpoint, data) => axios.put(`${basename}/${endpoint}`, data),
  post: (endpoint, data) => axios.post(`${basename}/${endpoint}`, data),
  delete: (endpoint) => axios.delete(`${basename}/${endpoint}`),
};
