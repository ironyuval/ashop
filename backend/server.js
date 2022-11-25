import dotenv from 'dotenv';
import express, { json } from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { connectDb } from './db/connectDb';
import productRoutes from './routes/product';
import userRoutes from './routes/user';

const app = express();

app.use(cors());
app.use(morgan('tiny'));

app.use(json());

app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});

const isDevelopment = process.env.NODE_ENV !== 'production';
dotenv.config(isDevelopment ? {
  path: '.env',
} : undefined);

app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});
