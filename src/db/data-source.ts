import { DataSource } from 'typeorm';
import { ServerLog } from './entities/Logs';
import dotenv from 'dotenv';
import { dbConfig } from '../config/config';
import { VisitorLog } from './entities/VisitorLog';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env' });
} else {
  dotenv.config({ path: '.env.local' });
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  entities: [ServerLog, VisitorLog],
  synchronize: true,
  host:dbConfig.host,
  port:dbConfig.port,
  username:dbConfig.username,
  password:dbConfig.password
});
