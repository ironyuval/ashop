import { Filters, Genres } from "../types";
import Joi from "joi";

export const productSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  description: Joi.string().min(6).required(),
  price: Joi.number().min(Filters.price.min).max(Filters.price.max).required(),
  rating: Joi.number()
    .min(Filters.rating.min)
    .max(Filters.rating.max)
    .required(),
  genre: Joi.string().valid(...Object.keys(Genres)),
  //images/category?
});

export default productSchema;
