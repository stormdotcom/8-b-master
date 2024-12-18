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
  async getVisitorMetrics(): Promise<
  { route: string; visitors: number; uniqueUsers: number; bounceRate: number }[]
> {
  // 1. Get total visitors and unique users per route
  const routeMetrics = await this.repository
    .createQueryBuilder('log')
    .select('log.route', 'route')
    .addSelect('COUNT(log.id)', 'visitors')
    .addSelect('COUNT(DISTINCT log.visitorId)', 'uniqueUsers')
    .groupBy('log.route')
    .orderBy('visitors', 'DESC')
    .getRawMany();

  // 2. Calculate bounce rate for each route
  const bounceRates = await this.repository
    .createQueryBuilder('log')
    .select('log.route', 'route')
    .addSelect('COUNT(DISTINCT log.visitorId)', 'totalUsers')
    .addSelect(
      `SUM(
        CASE WHEN log.visitorId IN (
          SELECT "visitorId" 
          FROM "visitor_log" 
          GROUP BY "visitorId" 
          HAVING COUNT(DISTINCT route) = 1
        ) THEN 1 ELSE 0 END
      )`,
      'bounces'
    )
    .groupBy('log.route')
    .getRawMany();

  // 3. Combine results
  const finalMetrics = routeMetrics.map((route) => {
    const bounceData = bounceRates.find((b) => b.route === route.route);
    const bounceRate =
      bounceData && bounceData.totalUsers > 0
        ? (parseInt(bounceData.bounces, 10) / parseInt(bounceData.totalUsers, 10)) * 100
        : 0;

    return {
      route: route.route,
      visitors: parseInt(route.visitors, 10),
      uniqueUsers: parseInt(route.uniqueUsers, 10),
      bounceRate: parseFloat(bounceRate.toFixed(2)), // Round bounce rate to 2 decimal places
    };
  });

  return finalMetrics;
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
