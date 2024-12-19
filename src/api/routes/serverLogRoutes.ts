import { Router } from 'express';
import { getAllLogs, createLog, visitorsLog, visitorMetrics, getAllChats } from '../controllers/ServerLogController';

const router = Router();

router.get('/', getAllLogs); // GET all logs
router.post('/', createLog); 

router.get('/stats', createLog); 

router.post('/visit', visitorsLog); 
router.get('/metrics', visitorMetrics); 

router.get('/chats/all', getAllChats); 


export default router;
