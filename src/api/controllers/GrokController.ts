import { Request, Response } from 'express';
import { GrokService } from '../../services/GrokService';

const grokService = new GrokService();


export const submitQuery = async (req: Request, res: Response, next:any): Promise<void> => {
  try {
    const { input } = req.body;

    if (!input) {
      res.status(400).json({ error: 'Input is required.' });
      return;
    }

    const response = await grokService.getResponse(input);
    res.status(200).json({ response });
  } catch (error) {
    next(error)
  }
};
