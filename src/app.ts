import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import morgan from "morgan";
import { AppDataSource } from './db/data-source';

import serverLogRoutes from './api/routes/serverLogRoutes';
import apiRoutes from './api/routes';

import { requestLoggerMiddleware } from './utils/logger';
import { notFoundHandler } from './api/middleware/notFound';
import { errorHandler } from './api/middleware/errorHandler';

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev")); 
app.use(express.json());


app.use(requestLoggerMiddleware);
// Connect to Database
AppDataSource.initialize()
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Database connection error:', error));


app.use('/api/v1', apiRoutes);


app.use(notFoundHandler);
app.use(errorHandler);

export default app;
