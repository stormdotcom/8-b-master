import { Prompts } from "../db/entities/Prompts";
import { Repositories } from "../repositaries";

export class PromptService {
  private promptsRepository = Repositories.prompts;
  async savePrompts(data: Partial<Prompts>): Promise<void> {
   
     await this.promptsRepository.createPrompt(data);
  }
}