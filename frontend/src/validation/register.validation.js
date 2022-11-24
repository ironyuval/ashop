import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string()
    .min(6)
    .max(64)
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).max(1024).required(),
  confirmPassword: Joi.ref("password"),
});

export default registerSchema;