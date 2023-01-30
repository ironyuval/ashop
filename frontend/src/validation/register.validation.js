import Joi from "joi";

const passRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[$&+,:;=?@#|'<>.^*()%!-])(?=(?:.*[0-9]){4}).*/;

export const emailSchema = Joi.string()
  .min(6)
  .max(32)
  .email({ tlds: { allow: false } })
  .trim()
  .required();
export const nameSchema = Joi.string().min(2).max(16).trim().required();

export const passwordSchema = Joi.string()
  .min(8)
  .max(16)
  .regex(passRegex)
  .trim()
  .required();

export const registerSchema = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});
