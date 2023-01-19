import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import app from './app';
import User from './models/User';
import { Permissions } from '../frontend/src/server-shared/types';

export const isDevelopment = process.env.NODE_ENV !== 'production';

dotenv.config(isDevelopment ? {
  path: './env',
} : undefined);

const createDefaultAdmin = async () => {
  const hashedPassword = await bcrypt
    .hash('123456', 10);

  const admin = {
    name: 'Yuval',
    email: 'ironyuval65@gmail.com',
    password: hashedPassword,
    permission: Permissions.Admin,
  };

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  await User.findOneAndUpdate({ email: admin.email }, admin, options);
};

export const connect = () => {
  mongoose.connect(process.env.DB_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((data) => {
    createDefaultAdmin();

    app.listen(process.env.PORT, () => {
      console.log(`server is working on http://localhost:${process.env.PORT}`);
    });
    console.log(`mongodb is connected with server: ${data.connection.host}`);
  }).catch((error) => console.log(error));
};

connect();
