import dotenv from 'dotenv';
import app from './app';
import connectDb from './db/connectDb';

export const isDevelopment = process.env.NODE_ENV !== 'production';
dotenv.config(isDevelopment ? {
  path: '.env',
} : undefined);

export const server = app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});
