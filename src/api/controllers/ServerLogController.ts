import { Request, Response } from 'express';
import { AppDataSource } from '../../db/data-source';
import { ServerLog } from '../../db/entities/Logs';
import { VisitorLog } from '../../db/entities/VisitorLog';
import { VisitorLogRepository } from '../../repositaries/implementations/VisitorLogRepository';


const logRepository = AppDataSource.getRepository(ServerLog);
const visitorLogRepository = AppDataSource.getRepository(VisitorLog);

const VLR = new VisitorLogRepository();

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

export const visitorMetrics = async (req: Request, res: Response, next: any) => {
  try {
    const vLog =await VLR.getVisitorMetrics();
    res.status(200).json({ data: vLog });
  } catch (error: any) {
    next(error)
  }
};