import express, { json } from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/user';
import productRoutes from './routes/product';

const app = express();
app.use(morgan('tiny'));

app.use(json());

app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/build/index.html'));
});

export default app;
