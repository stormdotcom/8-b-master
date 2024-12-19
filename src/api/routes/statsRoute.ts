import { Router } from 'express';
import { viewOverAll } from '../controllers/statsController';

const router = Router();


router.get('/view/overall', viewOverAll); 
 

export default router;
