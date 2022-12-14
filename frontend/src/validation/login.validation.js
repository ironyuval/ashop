import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(64)
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).max(1024).required(),
  confirmPassword: Joi.ref("password"),
});

export default loginSchema;
