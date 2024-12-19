import { Router } from 'express';
import { submitQuery } from '../controllers/GrokController';
import { validateApiBody } from '../../validators/api.validator';


const router = Router();

router.post('/query', validateApiBody, submitQuery);


export default router;
