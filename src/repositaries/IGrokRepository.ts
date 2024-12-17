export interface IGrokRepository {
    fetchCompletion(
      messages: any[],
      model?: string,
      temperature?: number
    ): Promise<string | null>;
  }
  