import { Repository } from 'typeorm';
import { IProjectRepository } from '../IProject';
import { Project } from '../../db/entities/Project';

export class ProjectRepository implements IProjectRepository {
  private repository: Repository<Project>;

  constructor(repository: Repository<Project>) {
    this.repository = repository;
  }

  async getAll(): Promise<Project[]> {
    return await this.repository.find({ relations: ['applications'] });
  }

  async getById(id: number): Promise<Project | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['applications'],
    });
  }

  async create(project: Partial<Project>): Promise<Project> {
    const newProject = this.repository.create(project);
    return await this.repository.save(newProject);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
