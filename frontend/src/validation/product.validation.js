import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().min(6).max(255).required(),
  price: Joi.number().min(1).max(255).required(),
  //images/category?
});

export default CreateProductSchema;
