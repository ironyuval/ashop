import { API } from ".";
import { getBasename } from "../utils";
import axios from "axios";

const Endpoints = {
  getUser: (userId) => `${getBasename()}/api/user/${userId}`,
};

export default {
  getUser: (userId) => axios.get(Endpoints.getUser(userId), API.getConfig()),
  updateUser: (userId) => axios.put(Endpoints.getUser(userId), API.getConfig()),
};
