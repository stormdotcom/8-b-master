import { Repository } from 'typeorm';
import { Application } from '../../db/entities/Application';
import { IApplicationRepository } from '../IProject';

export class ApplicationRepository implements IApplicationRepository {
  private repository: Repository<Application>;

  constructor(repository: Repository<Application>) {
    this.repository = repository;
  }

  async getAll(): Promise<Application[]> {
    return await this.repository.find({ relations: ['project'] });
  }

  async getById(id: number): Promise<Application | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['project'],
    });
  }

  async create(application: Partial<Application>): Promise<Application> {
    const newApplication = this.repository.create(application);
    return await this.repository.save(newApplication);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findByProjectId(projectId: number): Promise<Application[]> {
    return await this.repository.find({
      where: { project: { id: projectId } },
      relations: ['project'],
    });
  }
}
