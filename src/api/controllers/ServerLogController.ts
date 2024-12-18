import { Request, Response } from 'express';
import { AppDataSource } from '../../db/data-source';
import { ServerLog } from '../../db/entities/Logs';
import { VisitorLog } from '../../db/entities/VisitorLog';


const logRepository = AppDataSource.getRepository(ServerLog);
const visitorLogRepository = AppDataSource.getRepository(VisitorLog);

export const getAllLogs = async (req: Request, res: Response) => {
  try {
    const { serverId, message } = req.body;
    const log = logRepository.create({ serverId, message });
    await logRepository.save(log);

    res.status(201).json({ success: true, log });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error });
  }
};


export const createLog = async (req: Request, res: Response) => {
  try {
    const { serverId, message } = req.body;
    const log = logRepository.create({ serverId, message });
    await logRepository.save(log);

    res.status(201).json({ success: true, log });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error });
  }
};

export const visitorsLog = async (req: Request, res: Response, next: any) => {
  try {
    const { visitorId, route, timestamp } = req.body;
    const client = req.headers['user-agent'] || 'Unknown'; // User-Agent header
    const ip = req.headers['x-forwarded-for']?.toString() || req.ip || 'Unknown';
    const vLog = visitorLogRepository.create({ visitorId, route, timestamp, client, ip });
    await visitorLogRepository.save(vLog);
    res.status(201).json({ success: true });
  } catch (error: any) {
    next(error)
  }
};