import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import { AppDataSource } from './db/data-source';

import apiRoutes from './api/routes';

import { requestLoggerMiddleware } from './utils/logger';
import { notFoundHandler } from './api/middleware/notFound';
import { errorHandler } from './api/middleware/errorHandler';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { socketHandler } from './sockets';

import { setupMonitor } from './config/monitor';
import { globalRateLimiter, securityMiddleware } from './api/middleware/security';
import { validateCustomToken } from './api/middleware/auth';

const app = express();
// app.use(
//   cors({
//     origin: validateOrigin,
//     credentials: true, // Allow cookies or authentication headers
//   })
// );

app.use(cors());
app.use(morgan("dev")); 
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, { cors: {     origin: "*"}});

socketHandler(io);
setupMonitor(app);

app.use(globalRateLimiter);
app.use(securityMiddleware);
app.use(requestLoggerMiddleware);

app.get('/', (req:any, res:any)=> res.send("MASTER API v1.1"));
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Server is up and running!' });
});
// Connect to Database
AppDataSource.initialize()
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Database connection error:', error));



app.use('/api/v1', validateCustomToken, apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
