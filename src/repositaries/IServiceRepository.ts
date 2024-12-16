import { ServerLog } from "../db/entities/Logs";


export interface IServerLogRepository {
  getAll(): Promise<ServerLog[]>;
  getById(id: number): Promise<ServerLog | null>;
  create(log: Partial<ServerLog>): Promise<ServerLog>;
  deleteById(id: number): Promise<void>;
}
