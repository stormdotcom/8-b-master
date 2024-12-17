import app from './app';
import dotenv from 'dotenv';
import { PORT } from './config/config';



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ${process.env.NODE_ENV}`);
});
