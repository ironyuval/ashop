import { methods } from "./methods";

const Endpoints = {
  login: () => `api/auth/login`,
  register: () => `api/auth/register`,
};

export default {
  login: (email, password) =>
    methods.post(Endpoints.login(), { email, password }),
  register: (email, password) =>
    methods.post(Endpoints.register(), { email, password }),
};
