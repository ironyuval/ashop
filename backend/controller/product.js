import Product from '../models/Product';
import Features from '../utils/Features';
import { productSchema } from '../../frontend/src/server-shared/validation/product.validation';

export const createProduct = async (req, res) => {
  try {
    const validatedValue = productSchema.validate({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      rating: req.body.rating,
      genre: req.body.genre,
    });

    const { error } = validatedValue;

    if (error) {
      const item = error.details[0];
      const errorMessage = item.message.replace('"', '');
      throw (new Error(errorMessage));
    }

    const product = await Product.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({
      success: true,
      product,
    });
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
};

export const createMockProducts = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const includesCreatedBy = req.body.map((product) => ({ ...product, createdBy }));
    await Product.insertMany(includesCreatedBy);
    res.status(201).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const queryData = new Features(Product.find(), req.query)
      .search()
      .filter()
      .sort()
      .pagination()
      .populate({ path: 'createdBy', select: 'name' });

    const products = await queryData.query;

    const totalCount = await queryData.count();

    res.status(200).json({
      totalCount,
      success: true,
      products,
      resultCount: products.length,
    });
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const validatedValue = productSchema.validate({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      rating: req.body.rating,
      genre: req.body.genre,
    });

    const { error } = validatedValue;

    if (error) {
      const item = error.details[0];
      const errorMessage = item.message.replace('" ', '');
      throw (new Error(errorMessage));
    }

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
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
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
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
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
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
};
