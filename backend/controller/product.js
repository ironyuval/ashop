import Product from '../models/Product';
import Features from '../utils/Features';

export const createProduct = async (req, res) => {
  const product = await Product.create({ ...req.body, createdBy: req.userId });
  res.status(201).json({
    success: true,
    product,
  });
};

export const getAllProducts = async (req, res) => {
  const feature = new Features(Product.find(), req.query)
    .search()
    .filter()
    .pagination();
  const products = await feature.query;
  res.status(200).json({
    success: true,
    products,
    productsCount: products.length,
  });
};

export const updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      message: 'product is not found with this id',
    });
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

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      message: 'product is not found with this id',
    });
  }
  await product.remove();
  return res.status(200).json({
    success: true,
    message: 'product deleted successfuly',
  });
};

export const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      message: 'product is not found with this id',
    });
  }
  return res.status(200).json({
    success: true,
    product,
  });
};
