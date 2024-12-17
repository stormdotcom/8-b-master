import statusMonitor from 'express-status-monitor';
import { Application } from 'express';

// Monitor Configuration
export const setupMonitor = (app: Application) => {
  app.use(
    statusMonitor({
      title: 'Server Status',
      path: '/status',
      spans: [
        { interval: 1, retention: 60 },
        { interval: 5, retention: 60 },
        { interval: 15, retention: 60 },
      ],
      chartVisibility: {
        cpu: true,
        mem: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
      },
    })
  );
};
