import { Router } from 'express';
import { getAllLogs, createLog, visitorsLog, visitorMetrics } from '../controllers/ServerLogController';

const router = Router();

router.get('/', getAllLogs); // GET all logs
router.post('/', createLog); 

router.get('/stats', createLog); 

router.post('/visit', visitorsLog); 
router.get('/metrics', visitorMetrics); 


export default router;
