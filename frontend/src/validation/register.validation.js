import Joi from "joi";

const passRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[$&+,:;=?@#|'<>.^*()%!-])(?=(?:.*[0-9]){4}).*/;

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string()
    .min(6)
    .max(64)
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).max(30).regex(passRegex).required(),
  confirmPassword: Joi.ref("password"),
});

export default registerSchema;
