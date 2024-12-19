import { Router } from 'express';
import serverLogRoutes from './serverLogRoutes';
import statsRoutes from "./statsRoute"
import gorkRoutes from './gorkRoutes';
import { commonRateLimiter, gorkRateLimiter } from '../../utils/rateLimiter';


const router = Router();

router.use('/logs', commonRateLimiter, serverLogRoutes);
router.use('/stats', commonRateLimiter, statsRoutes);
router.use('/gork', gorkRateLimiter, gorkRoutes);


export default router;
