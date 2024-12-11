import { config } from 'dotenv';

config();
export const {
  PORT = 3000,
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek',
  UPLOAD_PATH = 'images',
  UPLOAD_TEMP_PATH = 'temp',
  ORIGIN_ALLOW = 'http://localhost:5173',
  NODE_ENV = 'develop',
  AUTH_REFRESH_TOKEN_EXPIRY = '7d',
  AUTH_ACCESS_TOKEN_EXPIRY = '1m',
} = process.env;
