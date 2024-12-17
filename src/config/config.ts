
import dotenv from 'dotenv';

// Load environment variables based on the environment
if (process.env.NODE_ENV === 'development'){
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config({ path: '.env' });
}

// Export environment variables
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
};

export const PORT = process.env.PORT 