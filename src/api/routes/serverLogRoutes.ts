import { Router } from 'express';
import { getAllLogs, createLog } from '../controllers/ServerLogController';

const router = Router();

router.get('/', getAllLogs); // GET all logs
router.post('/', createLog); // POST a new log

export default router;
