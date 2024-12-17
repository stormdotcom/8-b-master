import { Router } from 'express';
import serverLogRoutes from './serverLogRoutes';
import gorkRoutes from './gorkRoutes';


const router = Router();

router.use('/logs', serverLogRoutes);
router.use('/gork', gorkRoutes);


export default router;
