import express, { json } from 'express';
import productRoutes from './routes/product';
import userRoutes from './routes/user';
import morgan from 'morgan';

const app = express();
app.use(morgan('tiny'));

app.use(json());

app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);

export default app;
