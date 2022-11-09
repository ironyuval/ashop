import express, { json } from 'express';
import product from './routes/ProductRoute';
import ErrorHandler from './middleware/error';

const app = express();

app.use(json());

app.use('/api/v2', product);
app.use(ErrorHandler);

export default app;
