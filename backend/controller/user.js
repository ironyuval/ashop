import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

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
