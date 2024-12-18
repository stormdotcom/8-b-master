import { Router } from 'express';
import { getAllLogs, createLog, visitorsLog } from '../controllers/ServerLogController';

const router = Router();

router.get('/', getAllLogs); // GET all logs
router.post('/', createLog); 
router.post('/visit', visitorsLog); 











router.get('/ping', (req, res) => {
    res.status(200).json({ message: 'Server is up and running!' });
  });
export default router;
