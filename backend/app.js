import express, { json } from 'express';
import productRoutes from './routes/product';
import userRoutes from './routes/user';

const app = express();

app.use(json());

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);

export default app;
