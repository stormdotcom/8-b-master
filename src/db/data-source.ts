import { DataSource } from 'typeorm';
import { ServerLog } from './entities/Logs';
import dotenv from 'dotenv';
dotenv.config();


console.log("here", process.env.DB_PASSWORD)
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ServerLog],
  synchronize: true,
});
