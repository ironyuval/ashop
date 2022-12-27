import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User';
import Features from '../utils/Features';

export const register = async (request, response) => {
  try {
    const userExists = await User.findOne({ email: request.body.email });
    if (userExists) {
      return response.status(500).json({
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt
      .hash(request.body.password, 10);

    const user = new User({
      name: request.body.name,
      email: request.body.email,
      password: hashedPassword,
    });

    const userCreated = (await user.save()).toJSON();

    const token = jwt.sign(
      {
        userId: userCreated._id,
        userEmail: user.email,
      },
      process.env.SECRET,
      { expiresIn: '24h' },
    );

    delete userCreated.password;

    return response.status(201).send({
      message: 'User Created Successfully',
      result: { ...userCreated, token },
    });
  } catch (e) {
    return response.status(500).send({
      message: 'Error creating user',
      e,
    });
  }
};

export const login = async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email });

    if (!user) {
      return response.status(404).send({ message: 'Email not found' });
    }

    const passwordCheck = await bcrypt.compare(request.body.password, user.password);

    if (!passwordCheck) {
      return response.status(400).send({
        message: 'Passwords does not match',
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      process.env.SECRET,
      { expiresIn: '24h' },
    );

    return response.status(200).send({
      message: 'Login Successful',
      email: user.email,
      name: user.name,
      favorites: user.favorites,
      type: user.type,
      token,
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
