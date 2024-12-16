import app from './app';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 4000;
dotenv.config();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
