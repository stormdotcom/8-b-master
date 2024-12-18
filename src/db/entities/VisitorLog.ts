import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class VisitorLog {
    @PrimaryGeneratedColumn()
    id!: number; // Auto-incrementing primary key
  
    @Column({ nullable: false })
    visitorId!: string; // Unique identifier for the visitor (cannot be null)
  
    @Column({ nullable: false })
    route!: string; // Page route visited by the user (cannot be null)
  
    @Column({ nullable: true, default: '' })
    message!: string; // Optional message, defaults to an empty string
  
    @Column({ nullable: false })
    client!: string; // Client information (e.g., browser/user-agent)
  
    @Column({ nullable: false })
    ip!: string; // Client's IP address
  
    @CreateDateColumn()
    timestamp!: Date; // Automatically set when the record is created
  }
  