import { emailSchema, passwordSchema } from "./register.validation";
import Joi from "joi";

export const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

export default loginSchema;
