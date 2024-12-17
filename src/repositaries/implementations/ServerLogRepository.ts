import { Repository } from 'typeorm';

import { AppDataSource } from '../../db/data-source';
import { IServerLogRepository } from '../IServiceRepository';
import { ServerLog } from '../../db/entities/Logs';

export class ServerLogRepository implements IServerLogRepository {
  private repository: Repository<ServerLog>;

  constructor() {
    this.repository = AppDataSource.getRepository(ServerLog);
  }

  async getAll(): Promise<ServerLog[]> {
    return await this.repository.find();
  }

  async getById(id: number): Promise<ServerLog | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async create(log: Partial<ServerLog>): Promise<ServerLog> {
    const newLog = this.repository.create(log);
    return await this.repository.save(newLog);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
