import express, { json } from 'express';
import productRoutes from './routes/ProductRoute';
import userRoutes from './routes/userRoutes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from './auth';

const app = express();

app.use(json());

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.get('/free-endpoint', (request, response) => {
  response.json({ message: 'You are free to access me anytime' });
});
app.get('/auth-endpoint', auth, (request, response) => {
  response.json({ message: 'You are authorized to access me' });
});

export default app;
