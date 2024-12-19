import { Prompts } from "../db/entities/Prompts";

    export interface IPrompts {
      getAll(): Promise<Prompts[]>;
      getById(id: number): Promise<Prompts | null>;
      createPrompt(data: Partial<Prompts>): Promise<Prompts>;
      deleteById(id: number): Promise<void>;
    }
    