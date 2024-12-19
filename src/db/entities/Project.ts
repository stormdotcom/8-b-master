import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
  } from 'typeorm';
import { Application } from './Application';
  
  // Project Entity
  @Entity()
  export class Project {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ nullable: false })
    name!: string; // Project name
  
    @CreateDateColumn()
    createdAt!: Date; // Automatically set when the record is created
  
    @OneToMany(() => Application, (application) => application.project)
    applications!: Application[]; // Relationship to Application
  }
  
  