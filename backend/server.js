import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import app from './app';
import User from './models/User';
import { Roles } from '../frontend/src/server-shared/types';

const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) {
  dotenv.config({
    path: './env',
  });
}

const createDefaultUsers = async () => {
  await User.deleteMany({});

  const hashedPassword = bcrypt
    .hashSync(process.env.DEFAULT_MASTER_PASSWORD, 10);

  const master = {
    name: 'Master',
    email: process.env.DEFAULT_MASTER_EMAIL,
    password: hashedPassword,
    role: Roles.Master,
  };

  const admin = {
    name: 'Demo Admin',
    email: 'admin@demo.com',
    password: hashedPassword,
    role: Roles.Admin,
  };

  const user = {
    name: 'Demo User',
    email: 'user@demo.com',
    password: hashedPassword,
    role: Roles.User,
  };

  await User.insertMany([master, admin, user]);
};

const asyncListen = () => new Promise((resolve, reject) => {
  app.listen(process.env.PORT, (err) => { if (err) reject(); resolve(); });
});

const connect = async () => mongoose.connect(process.env.DB_CLOUD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const init = async () => {
  try {
    const connectionData = await connect();
    console.log(`mongodb is connected with: ${connectionData.connection.host}`);
    /* await createDefaultUsers();
 */ await asyncListen();
    console.info(`server rest api address: http://localhost:${process.env.PORT}`);
  } catch (e) {
    console.error(e);
  }
};

init();
