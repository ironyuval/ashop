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
      permission: user.permission,
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

  res.status(200).json({
    success: true,
    wishlist,
    count: wishlist.length,
  });
};

export const toggleWishlist = async (req, res) => {
  const { userId } = req;
  const user = await User.findById(userId);

  if (user) {
    const userWishlist = user.wishlist;
    const productId = req.params.id;

    let newWishlist = [...userWishlist];

    if (newWishlist.includes(productId)) {
      newWishlist = newWishlist.filter((id) => id !== productId);
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
    const userCart = user.cart;
    const productId = req.params.id;

    let newCart = [...userCart];

    if (newCart.includes(productId)) {
      newCart = newCart.filter((id) => id !== productId);
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
  const { user } = req;
  const { body } = req;

  const userFound = await User.findById(user.userId);

  if (body.newPassword) {
    if (!userFound) {
      return res.status(404).send({ message: 'Email not found' });
    }

    const passwordCheck = await bcrypt.compare(
      req.body.oldPassword,
      userFound.password,
    );

    if (!passwordCheck) {
      return res.status(400).send({
        message: 'Old password does not match',
      });
    }

    const hashedPassword = await bcrypt.hash(body.newPassword, 10);

    userFound.password = hashedPassword;
  }

  userFound.name = body.name;
  userFound.image = body.image;

  userFound.save();

  res.status(200).json({
    success: true,
  });
};
