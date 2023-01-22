import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import app from './app';
import User from './models/User';
import { Permissions } from '../frontend/src/server-shared/types';

const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) {
  dotenv.config({
    path: './env',
  });
}

const createMasterUser = async () => {
  const hashedPassword = await bcrypt
    .hash(process.env.DEFAULT_MASTER_PASSWORD, 10);

  const admin = {
    name: 'Master',
    email: process.env.DEFAULT_MASTER_EMAIL,
    password: hashedPassword,
    permission: Permissions.Master,
  };

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  await User.findOneAndUpdate({ email: admin.email }, admin, options);
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
    createMasterUser();
    await asyncListen();
    console.info(`server rest api address: http://localhost:${process.env.PORT}`);
  } catch (e) {
    console.error('server initialization failed, make sure DB_CLOUD and PORT environment vars exist');
  }
};

init();
