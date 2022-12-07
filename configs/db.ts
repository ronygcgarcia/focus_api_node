import { Dialect } from 'sequelize';
import connections from '../app/interfaces/IConnection';
import path from 'path';
import dotenv from 'dotenv';

const envFile = process.env.APP_ENV ? `.env.${process.env.APP_ENV}` : '.env';

dotenv.config({
  path: path.resolve(envFile),
});
const config: connections = {
  connections: {
    postgres: {
      motor: process.env.DB_DIALECT as Dialect || 'postgres' as Dialect, // mysql, mariadb, sqlite, postgres
      options: {
        db_host: process.env.DB_HOST || '146.190.48.115',
        db_port: Number(process.env.DB_PORT) || 5432,
        db_name: process.env.DB_DATABASE || 'focusapi',
        db_username: process.env.DB_USERNAME || 'admin',
        db_password: process.env.DB_PASSWORD || 'admin',
      },
    },
  },
  default: 'postgres',
};

export default config;
