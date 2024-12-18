import { Repository } from 'typeorm';
import { AppDataSource } from '../../db/data-source';
import { VisitorLog } from '../../db/entities/VisitorLog';

export class VisitorLogRepository {
  private repository: Repository<VisitorLog>;

  constructor() {
    this.repository = AppDataSource.getRepository(VisitorLog);
  }

  /**
   * Calculate metrics: distinct route visit count, unique users, and bounce rate.
   * @returns An object containing distinct route counts, unique users, and bounce rate.
   */
  async getVisitorMetrics(): Promise<{
    distinctRouteCounts: { route: string; count: number }[];
    uniqueUsers: number;
    bounceRate: number;
  }> {
    // 1. Get distinct route counts
    const distinctRouteCounts = await this.repository
      .createQueryBuilder('log')
      .select('log.route', 'route')
      .addSelect('COUNT(log.id)', 'count')
      .groupBy('log.route')
      .orderBy('count', 'DESC')
      .getRawMany();

    // 2. Calculate unique users
    const uniqueUsers = await this.repository
      .createQueryBuilder('log')
      .select('COUNT(DISTINCT log.visitorId)', 'uniqueCount')
      .getRawOne();

    // 3. Calculate bounce rate
    const singleRouteSessions = await this.repository
      .createQueryBuilder('log')
      .select('log.visitorId', 'visitorId')
      .addSelect('COUNT(DISTINCT log.route)', 'routeCount')
      .groupBy('log.visitorId')
      .having('COUNT(DISTINCT log.route) = 1')
      .getRawMany();

    const totalSessions = await this.repository
      .createQueryBuilder('log')
      .select('DISTINCT log.visitorId')
      .getCount();

    const bounceRate =
      totalSessions > 0
        ? (singleRouteSessions.length / totalSessions) * 100
        : 0;

    // 4. Return calculated metrics
    return {
      distinctRouteCounts,
      uniqueUsers: parseInt(uniqueUsers.uniqueCount, 10),
      bounceRate,
    };
  }

  async getAll(): Promise<VisitorLog[]> {
    return await this.repository.find();
  }

 
  async getById(id: number): Promise<VisitorLog | null> {
    return await this.repository.findOne({ where: { id } });
  }

 
  async create(log: Partial<VisitorLog>): Promise<VisitorLog> {
    const newLog = this.repository.create(log);
    return await this.repository.save(newLog);
  }

 
  async updateById(id: number, updates: Partial<VisitorLog>): Promise<VisitorLog | null> {
    const log = await this.getById(id);
    if (!log) return null;

    Object.assign(log, updates);
    return await this.repository.save(log);
  }


  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
