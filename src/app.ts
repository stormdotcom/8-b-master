import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './db/data-source';
import serverLogRoutes from './api/routes/serverLogRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Database
AppDataSource.initialize()
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Database connection error:', error));

// API Routes
app.use('/api/logs', serverLogRoutes);

export default app;
