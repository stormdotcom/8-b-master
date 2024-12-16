import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ServerLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  serverId: string = '';;

  @Column()
  message: string = '';;

  @CreateDateColumn()
  timestamp: Date = new Date();
}
