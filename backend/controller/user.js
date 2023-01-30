import bcrypt from 'bcrypt';
import Product from '../models/Product';
import User from '../models/User';
import Features from '../utils/Features';

export const getUserData = async (request, response) => {
  try {
    const { user } = request;

    return response.status(200).send({
      email: user.email,
      name: user.name,
      wishlist: user.wishlist,
      cart: user.cart,
      role: user.role,
      image: user.image,
    });
  } catch (e) {
    console.log(e);
    return response.status(400).send({
      message: 'Server Error',
    });
  }
};

export const deleteAllUsers = async (request, response) => {
  try {
    await User.deleteMany({});

    return response.status(200).send();
  } catch (e) {
    console.log(e);
    return response.status(400).send({
      message: 'Server Error',
    });
  }
};

export const getAllUsers = async (req, res) => {
  const feature = new Features(User.find(), req.query)
    .search()
    .filter()
    .pagination();
  const users = await feature.query;

  res.status(200).json({
    success: true,
    users,
    usersCount: users.length,
  });
};

export const getWishlist = async (req, res) => {
  const userWishList = req.user.wishlist;

  const feature = new Features(Product.find(
    {
      _id: {
        $in: userWishList,
      },
    },
  ), req.query)
    .search()
    .filter()
    .pagination();
  const wishlist = await feature.query;
  const totalCount = await feature.count();

  res.status(200).json({
    success: true,
    data: wishlist,
    count: wishlist.length,
    totalCount,
  });
};

export const getCart = async (req, res) => {
  const userCart = req.user.cart;

  const feature = new Features(Product.find(
    {
      _id: {
        $in: userCart,
      },
    },
  ), req.query)
    .search()
    .filter()
    .pagination();

  const totalCount = await feature.count();
  const cart = await feature.query;

  res.status(200).json({
    success: true,
    data: cart,
    count: cart.length,
    totalCount,
  });
};

export const toggleWishlist = async (req, res) => {
  const { user } = req;

  if (user) {
    const wishlist = user.wishlist || [];
    const productId = (req.params.id);

    let newWishlist = [...wishlist];

    if (wishlist.includes((productId))) {
      newWishlist = wishlist.filter((id) => !id.equals(productId));
    } else {
      newWishlist.push(productId);
    }

    user.wishlist = newWishlist;
    await user.save();
    return res.status(200).json({
      success: true,
    });
  }
  res.status(404).json({
    success: false,
  });
};

export const toggleCart = async (req, res) => {
  const { user } = req;

  if (user) {
    const cart = user.cart || [];
    const productId = (req.params.id);

    let newCart = [...cart];

    if (cart.includes((productId))) {
      newCart = cart.filter((id) => !id.equals(productId));
    } else {
      newCart.push(productId);
    }

    user.cart = newCart;
    await user.save();
    return res.status(200).json({
      success: true,
    });
  }
  res.status(404).json({
    success: false,
  });
};

export const updateUserData = async (req, res) => {
  try {
    const { user } = req;
    const { body } = req;

    // user changing password
    if (body.newPassword) {
      const passwordCheck = await bcrypt.compare(
        req.body.oldPassword,
        user.password,
      );

      if (!passwordCheck) {
        return res.status(400).send({
          message: 'Old password does not match',
        });
      }

      const hashedPassword = await bcrypt.hash(body.newPassword, 10);

      user.password = hashedPassword;
    }

    user.name = body.name;
    user.image = body.image;

    user.save();

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: true,
    });
  }
};
