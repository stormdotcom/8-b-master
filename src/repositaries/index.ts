import { ServerLogRepository } from "./implementations/ServerLogRepository";
import { IServerLogRepository } from "./IServiceRepository";

export const Repositories = {
  serverLog: new ServerLogRepository() as IServerLogRepository,
};
