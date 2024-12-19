import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./Project";

// Application Entity
@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string; // Application name

  @Column({ nullable: false })
  type!: string; // Application type (ui, api, gpt, llm)

  @Column({ nullable: false })
  url!: string; // Application URL

  @Column({ nullable: false })
  socketUrl!: string; // Application socket URL

  @Column({ nullable: false })
  healthCheckUrl!: string; // Application health check URL

  @Column({ nullable: false })
  status!: string; // Application status

  @ManyToOne(() => Project, (project) => project.applications, { onDelete: 'CASCADE' })
  project!: Project; // Relationship to Project
}
