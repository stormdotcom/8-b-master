import { DataSource } from 'typeorm';
import { ServerLog } from './entities/Logs';
import dotenv from 'dotenv';
import { dbConfig } from '../config/config';
import { VisitorLog } from './entities/VisitorLog';
import { Prompts } from './entities/Prompts';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env' });
} else {
  dotenv.config({ path: '.env.local' });
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  entities: [ServerLog, VisitorLog, Prompts],
  host:dbConfig.host,
  port:dbConfig.port,
  username:dbConfig.username,
  password:dbConfig.password,
  synchronize: true,
dropSchema: true,
// logging: ['query', 'schema'], 
});
