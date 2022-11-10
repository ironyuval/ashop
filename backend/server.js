import app from './app';
import { connectDb } from './db/connectDb';
import dotenv from 'dotenv';

dotenv.config({
  path: 'backend/.env',
});

app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});
