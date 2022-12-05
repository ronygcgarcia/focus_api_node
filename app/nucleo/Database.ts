import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import dbConfig from '../../configs/db';
import { Singleton } from '../decorators/singleton';
import dbms from '../interfaces/IDbms';
import path from 'path';

@Singleton
export default class Database extends Sequelize {
  constructor() {
    const predefinida: Dialect = dbConfig.default;
    const config = dbConfig.connections[predefinida] as dbms;
    super(config.options.db_name, config.options.db_username, config.options.db_password, {
      repositoryMode: true,
      host: config.options.db_host,
      port: config.options.db_port,
      dialect: config.motor,
      timezone: process.env.TIMEZONE || '-06:00',
      models: [path.join(__dirname, '../models/*.model.ts')],
      logging(str) {
        if (process.env.DB_LOGGER === 'true') console.log(str);
      },
      pool: {
        max: 13,
        min: 1,
        idle: 10000,
        acquire: 20000, // i also tried 50000
      },
    });
  }
}
