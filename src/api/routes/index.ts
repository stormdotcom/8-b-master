import { Router } from 'express';
import serverLogRoutes from './serverLogRoutes';
import gorkRoutes from './gorkRoutes';
import { commonRateLimiter, gorkRateLimiter } from '../../utils/rateLimiter';


const router = Router();

router.use('/logs', commonRateLimiter, serverLogRoutes);
router.use('/gork', gorkRateLimiter, gorkRoutes);


export default router;
