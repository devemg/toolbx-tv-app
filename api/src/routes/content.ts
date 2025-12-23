import { Router, Request, Response } from 'express';
import { mockContentData } from '../data.js';

const router = Router();

router.get('/:tab?', (req: Request, res: Response) => {
  const tab = req.params.tab || 'home';
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  const data = mockContentData[tab.toLowerCase()] || mockContentData.home;
  
  // Paginate results
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedResults = data.slice(startIndex, endIndex);
  const totalResults = data.length;
  const totalPages = Math.ceil(totalResults / limit);
  
  res.json({
    page,
    total_pages: totalPages,
    total_results: totalResults,
    results: paginatedResults
  });
});

export default router;
