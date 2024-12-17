import app from './app';
import { PORT } from './config/config';



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ${process.env.NODE_ENV}`);
});
