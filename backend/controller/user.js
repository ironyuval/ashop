import bcrypt from 'bcrypt';
import User from '../models/User';
import jwt from 'jsonwebtoken';

export const register = async (request, response) => {
  try {
    const userExists = await User.findOne({ email: request.body.email });
    if (userExists) {
      return response.status(500).send({
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt
      .hash(request.body.password, 10);

    const user = new User({
      email: request.body.email,
      password: hashedPassword,
      type: request.body.type,
    });

    const result = await user.save();

    return response.status(201).send({
      message: 'User Created Successfully',
      result,
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
      token,
    });
  } catch (e) {
    console.log(e);
    return response.status(400).send({
      message: 'Server Error',
    });
  }
};
