import { IGrokRepository } from "./IGrokRepository";
import { GrokRepository } from "./implementations/GrokRepository";
import { ServerLogRepository } from "./implementations/ServerLogRepository";
import { IServerLogRepository } from "./IServiceRepository";

const API_KEY: string | undefined = process.env.X_AI_API_KEY; 

export const Repositories = {
  serverLog: new ServerLogRepository() as IServerLogRepository,
  grok: new GrokRepository(API_KEY) as IGrokRepository,
};
