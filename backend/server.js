import app from './app';
import { connectDb } from './db/connectDb';
import dotenv from 'dotenv';

const isDevelopment = process.env.NODE_ENV !== 'production';
dotenv.config(isDevelopment ? {
  path: 'backend/.env',
} : undefined);

app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});
