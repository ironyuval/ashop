import Product from '../models/Product';
import ErrorHandler from '../utils/ErrorHandler';
import Features from '../utils/Features';

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

export const getAllProducts = async (req, res) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  const feature = new Features(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await feature.query;
  res.status(200).json({
    success: true,
    products,
    productsCount,
  });
};

export const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('product is not found with this id', 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  return res.status(200).json({
    success: true,
  });
};

export const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('product is not found with this id', 404));
  }
  await product.remove();
  return res.status(200).json({
    success: true,
    message: 'product deleted successfuly',
  });
};

export const getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('product is not found with this id', 404));
  }
  return res.status(200).json({
    success: true,
    product,
  });
};
