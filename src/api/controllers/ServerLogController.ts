import { Request, Response } from 'express';
import { AppDataSource } from '../../db/data-source';
import { ServerLog } from '../../db/entities/Logs';


const logRepository = AppDataSource.getRepository(ServerLog);

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