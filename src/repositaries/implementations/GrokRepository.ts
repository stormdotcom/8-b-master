import axios, { AxiosInstance } from 'axios';
import { IGrokRepository } from '../IGrokRepository';
import { gorkApiLogger } from '../../utils/logger';

export class GrokRepository implements IGrokRepository {
  private apiClient: AxiosInstance;

  constructor(private apiKey: string | undefined) {
    this.apiClient = axios.create({
      baseURL: 'https://api.x.ai/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  async fetchCompletion(
    messages: any[],
    model: string = 'grok-beta',
    temperature: number = 0
  ): Promise<string | null> {
    try {
      const response = await this.apiClient.post('', {
        model,
        messages,
        temperature,
        stream: false,
      });
      return response.data.choices[0]?.message?.content || null;
    } catch (error: any) {
      console.error('Error in Grok API call:', error.message);
      gorkApiLogger.error(error.message);
      throw new Error('Failed to fetch response from xAI.');

    }
  }
}
