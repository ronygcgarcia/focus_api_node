
import 'reflect-metadata';
import path from 'path';
import api from './routes/api';
import Server from './app/nucleo/Server';
import Database from './app/nucleo/Database';
import NotFoundException from './handlers/NotFoundException';
import { Sequelize } from 'sequelize-typescript';
import { generateMigration } from 'sequelize-typescript-model-repository-migration';
import Handler from './handlers/Handler';

export default class Main {
  server: Server;

  db: Database;

  constructor() {
    this.server = new Server();
    this.server.start();
    this.db = new Database();
    this.routes();
    this.ExceptionConfig();
  }

  routes() {
    this.server.app.use('/api', api);
    this.server.app.all('*', () => {
      throw new NotFoundException();
    });
  }

  ExceptionConfig() {
    this.server.app.use(Handler.handle);
  }
}
