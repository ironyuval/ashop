import bcrypt from 'bcrypt';
import User from '../models/User';
import Features from '../utils/Features';

export const getUserData = async (request, response) => {
  try {
    const { userId } = request;

    console.log(userId);

    const userFound = await User.findById(userId);

    return response.status(200).send({
      message: 'Login Successful',
      email: userFound.email,
      name: userFound.name,
      favorites: userFound.favorites,
      type: userFound.type,
      image: userFound.image,
    });
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

export const toggleFavorite = async (req, res) => {
  const self = req.user;
  const user = await User.findById(self.userId);

  if (user) {
    const userFavorites = user.favorites;
    const productId = req.params.id;

    let newFavorites = [...userFavorites];

    if (userFavorites.includes(productId)) {
      newFavorites = userFavorites.filter((id) => id !== productId);
    } else {
      newFavorites.push(productId);
    }

    user.favorites = newFavorites;
    await user.save();
    return res.status(200).json({
      success: true,
    });
  }
  res.status(404).json({
    success: false,
  });
};

export const updateUser = async (req, res) => {
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

  console.log(body);

  userFound.name = body.name;
  userFound.image = body.image;

  userFound.save();

  res.status(200).json({
    success: true,
  });
};
