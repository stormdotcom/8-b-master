import { DataSource } from 'typeorm';
import { ServerLog } from './entities/Logs';
import dotenv from 'dotenv';
import { dbConfig } from '../config/config';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env' });
} else {
  dotenv.config({ path: '.env.local' });
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  entities: [ServerLog],
  synchronize: true,
  ...dbConfig
});
