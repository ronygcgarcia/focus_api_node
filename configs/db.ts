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
        db_host: process.env.DB_HOST || 'localhost',
        db_port: Number(process.env.DB_PORT) || 5432,
        db_name: process.env.DB_DATABASE || 'api_node',
        db_username: process.env.DB_USERNAME || 'usernames',
        db_password: process.env.DB_PASSWORD || 'password',
      },
    },
  },
  default: 'postgres',
};

export default config;
