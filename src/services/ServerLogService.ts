import { Repositories } from "../repositaries";
import { IServerLogRepository } from "../repositaries/IServiceRepository";


export class ServerLogService {
  private repository: IServerLogRepository;

  constructor() {
    this.repository = Repositories.serverLog; // Inject dependency
  }

  async getAllLogs() {
    return await this.repository.getAll();
  }

  async getLogById(id: number) {
    return await this.repository.getById(id);
  }

  async createLog(serverId: string, message: string) {
    return await this.repository.create({ serverId, message });
  }

  async deleteLog(id: number) {
    return await this.repository.deleteById(id);
  }
}
