import { IGrokRepository } from "./IGrokRepository";
import { GrokRepository } from "./implementations/GrokRepository";
import { PromptsRepository } from "./implementations/PromptsRepository";
import { ServerLogRepository } from "./implementations/ServerLogRepository";
import { IPrompts } from "./IPrompts";
import { IServerLogRepository } from "./IServiceRepository";

const API_KEY: string | undefined = process.env.X_AI_API_KEY; 

export const Repositories = {
  serverLog: new ServerLogRepository() as IServerLogRepository,
  grok: new GrokRepository(API_KEY) as IGrokRepository,
  prompts: new PromptsRepository() as IPrompts
};
