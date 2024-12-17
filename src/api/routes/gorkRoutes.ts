import { Router } from 'express';
import { submitQuery } from '../controllers/GrokController';


const router = Router();

router.post('/query', submitQuery);


export default router;
