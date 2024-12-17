import { DataSource } from 'typeorm';
import { ServerLog } from './entities/Logs';
import dotenv from 'dotenv';
import { dbConfig } from '../config/config';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env' });
} else {
  dotenv.config({ path: '.env.local' });
}
console.log("s", dbConfig)
export const AppDataSource = new DataSource({
  type: 'postgres',
  entities: [ServerLog],
  synchronize: true,
  host:dbConfig.host,
  port:dbConfig.port,
  username:dbConfig.username,
  password:dbConfig.password
});
