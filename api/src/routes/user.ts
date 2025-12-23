import { Router, Request, Response } from 'express';
import { mockUserData } from '../data.js';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json(mockUserData);
});

export default router;
