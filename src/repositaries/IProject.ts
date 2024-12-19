import { Application } from "../db/entities/Application";
import { Project } from "../db/entities/Project";

// IProjectRepository Interface
export interface IProjectRepository {
    getAll(): Promise<Project[]>;
    getById(id: number): Promise<Project | null>;
    create(project: Partial<Project>): Promise<Project>;
    deleteById(id: number): Promise<void>;
  }
  
  // IApplicationRepository Interface
  export interface IApplicationRepository {
    getAll(): Promise<Application[]>;
    getById(id: number): Promise<Application | null>;
    create(application: Partial<Application>): Promise<Application>;
    deleteById(id: number): Promise<void>;
    findByProjectId(projectId: number): Promise<Application[]>;
  }
  