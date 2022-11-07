import app from './app';
import { connectDb } from './db/Database';
import dotenv from 'dotenv';

dotenv.config({
  path: 'backend/config/.env',
});

connectDb();
const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});
