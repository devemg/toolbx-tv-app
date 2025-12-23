import express, { Request, Response } from 'express';
import cors from 'cors';
import contentRoutes from './routes/content.js';
import userRoutes from './routes/user.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/content', contentRoutes);
app.use('/api/user', userRoutes);

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
