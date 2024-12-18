import { VisitorLog } from "../db/entities/VisitorLog";

export interface IVisitorLogRepository {
  /**
   * Fetch all visitor logs.
   * @returns A promise that resolves to an array of VisitorLog entities.
   */
  getAll(): Promise<VisitorLog[]>;

  /**
   * Fetch a visitor log by its unique ID.
   * @param id - The ID of the visitor log.
   * @returns A promise that resolves to the VisitorLog entity or null if not found.
   */
  getById(id: number): Promise<VisitorLog | null>;

  /**
   * Create a new visitor log.
   * @param log - Partial data to create a new VisitorLog entity.
   * @returns A promise that resolves to the newly created VisitorLog entity.
   */
  create(log: Partial<VisitorLog>): Promise<VisitorLog>;

  /**
   * Update an existing visitor log.
   * @param id - The ID of the visitor log to update.
   * @param updates - Partial data for updating the VisitorLog entity.
   * @returns A promise that resolves to the updated VisitorLog entity or null if not found.
   */
  updateById(id: number, updates: Partial<VisitorLog>): Promise<VisitorLog | null>;

  /**
   * Delete a visitor log by its unique ID.
   * @param id - The ID of the visitor log to delete.
   * @returns A promise that resolves when the deletion is complete.
   */
  deleteById(id: number): Promise<void>;
}
