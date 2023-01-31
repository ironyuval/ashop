import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerSchema } from '../../frontend/src/server-shared/validation/register.validation';
import { loginSchema } from '../../frontend/src/server-shared/validation/login.validation';

import User from '../models/User';

export const register = async (req, res) => {
  const requestEmail = req.body.email.toLowerCase();

  try {
    const validatedValue = registerSchema.validate({
      name: req.body.name,
      email: requestEmail,
      password: req.body.password,
    });

    const { error } = validatedValue;

    if (error) {
      const item = error.details[0];
      const errorMessage = item.message.replace('" ', '');
      throw (new Error(errorMessage));
    }

    const userExists = await User.findOne({ email: requestEmail });
    if (userExists) {
      return res.status(500).json({
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: requestEmail,
      password: hashedPassword,
    });

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

export const login = async (req, res) => {
  try {
    const requestEmail = req.body.email.toLowerCase();

    const validatedValue = loginSchema.validate({
      email: requestEmail,
      password: req.body.password,
    });

    const { error } = validatedValue;

    if (error) {
      const item = error.details[0];
      const errorMessage = item.message.replace('" ', '');
      throw (new Error(errorMessage));
    }

    console.log(req.body.email);

    const user = await User.findOne({ email: requestEmail });

    if (!user) {
      return res.status(404).send({ message: 'Email not found' });
    }

    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!passwordCheck) {
      return res.status(400).send({
        message: 'Passwords does not match',
      });
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.SECRET,
      { expiresIn: '24h' },
    );

    return res.status(200).send({
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      message: 'Server Error',
    });
  }
};
