import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(500).json({
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    console.log(req.body);

    await user.save();

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.SECRET,
      { expiresIn: '24h' },
    );

    return res.status(201).send({
      message: 'User Created Successfully',
      result: { token },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
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

    const passwordCheck = await bcrypt.compare(
      request.body.password,
      user.password,
    );

    if (!passwordCheck) {
      return response.status(400).send({
        message: 'Passwords does not match',
      });
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.SECRET,
      { expiresIn: '24h' },
    );

    return response.status(200).send({
      message: 'Login Successful',
      email: user.email,
      name: user.name,
      favorites: user.favorites,
      type: user.type,
      image: user.image,
      token,
    });
  } catch (e) {
    console.log(e);
    return response.status(400).send({
      message: 'Server Error',
    });
  }
};
