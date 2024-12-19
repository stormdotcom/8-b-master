import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Prompts {
    @PrimaryGeneratedColumn()
    id!: number; // Auto-incrementing primary key
  
    @Column({ nullable: false })
    visitorId!: string; // Unique identifier for the visitor (cannot be null)

    @Column({ nullable: true, default: '' })
    message!: string; // Optional message, defaults to an empty string
  
    @CreateDateColumn()
    timestamp!: Date; // Automatically set when the record is created
  }
  