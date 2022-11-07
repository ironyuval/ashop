import express, { json } from 'express';
import product from './routes/ProductRoute';

const app = express();

app.use(json());

app.use('/api/v2', product);

export default app;
