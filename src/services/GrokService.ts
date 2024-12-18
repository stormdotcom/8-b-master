import { FRIDAY_PROMPT } from "../config/constants";
import { Repositories } from "../repositaries";

export class GrokService {
  private grokRepository = Repositories.grok;
  private maxInputLength = 300; 

  private sanitizeInput(input: string): string  {
    return input.trim().slice(0, this.maxInputLength);
  }

  async getResponse(userInput: string): Promise<string | null> {
    const sanitizedInput = this.sanitizeInput(userInput);

    const messages = [
      { role: 'system', content: FRIDAY_PROMPT},
      { role: 'user', content: sanitizedInput },
    ];

    return await this.grokRepository.fetchCompletion(messages);
  }
}
