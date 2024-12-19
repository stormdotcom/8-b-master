import { Request, Response } from 'express';
import { GrokService } from '../../services/GrokService';
import { PromptsRepository } from '../../repositaries/implementations/PromptsRepository';
import { PromptService } from '../../services/PromptService';

const grokService = new GrokService();
const promptsService = new PromptService()

export const submitQuery = async (req: Request, res: Response, next:any): Promise<void> => {

  try {
    const { input, visitorId, timestamp } = req.body;
    const data = {message:input,visitorId, timestamp };
    if (!input) {
      res.status(400).json({ error: 'Input is required.' });
      return;
    }
    await promptsService.savePrompts(data)
    const response = await grokService.getResponse(input);
    res.status(200).json({ response });
  } catch (error) {
    next(error)
  }
};
