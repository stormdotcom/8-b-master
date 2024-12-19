import { Repository } from 'typeorm';
import { Prompts } from '../../db/entities/Prompts';
import { IPrompts } from '../IPrompts';
import { AppDataSource } from '../../db/data-source';

export class PromptsRepository implements IPrompts {
  private repository: Repository<Prompts>;

  constructor() {
   this.repository = AppDataSource.getRepository(Prompts);
  }

  /**
   * Retrieve all Prompts records.
   * @returns {Promise<Prompts[]>} - List of all Prompts.
   */
  async getAll(): Promise<Prompts[]> {
    return await this.repository.find();
  }

  /**
   * Find a specific Prompt by ID.
   * @param {number} id - The ID of the Prompt to retrieve.
   * @returns {Promise<Prompts | null>} - The Prompt if found, otherwise null.
   */
  async getById(id: number): Promise<Prompts | null> {
    return await this.repository.findOneBy({ id }) || null;
  }

  /**
   * Create a new Prompt record.
   * @param {Partial<Prompts>} data - The data for the new Prompt.
   * @returns {Promise<Prompts>} - The newly created Prompt.
   */
  async createPrompt(data: Partial<Prompts>): Promise<Prompts> {
    const newPrompt = this.repository.create(data);
     return await this.repository.save(newPrompt);
  }

  /**
   * Update an existing Prompt by ID.
   * @param {number} id - The ID of the Prompt to update.
   * @param {Partial<Prompts>} updates - The fields to update.
   * @returns {Promise<Prompts | null>} - The updated Prompt if successful, otherwise null.
   */

  /**
   * Delete a Prompt by ID.
   * @param {number} id - The ID of the Prompt to delete.
   * @returns {Promise<void>} - Resolves once deletion is complete.
   */
  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
