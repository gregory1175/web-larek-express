import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import router from './routes';
import errorHandler from './middlewares/error-handler';
import { errorLogger } from './middlewares/logger';
import { PORT, DB_ADDRESS } from './config';
import { NotFoundError } from './errors';

dotenv.config();
const app = express();
app.use(cors());

const connectToDB = async () => {
  try {
    if (!DB_ADDRESS) {
      throw new Error('DB_ADDRESS is not defined in environment variables');
    }
    await mongoose.connect(DB_ADDRESS);
    // eslint-disable-next-line no-console
    console.log('Connect with DB is OK');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('No connect with DB, error: ', error);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectToDB();

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Сервер работает на http://localhost:${PORT}`);
  });
};

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);
app.use((_req, _res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});
app.use(errorLogger);
app.use(errorHandler);

startServer();
