
import 'reflect-metadata';
import path from 'path';
import api from './routes/api';
import Server from './app/nucleo/Server';
import Database from './app/nucleo/Database';
import NotFoundException from './handlers/NotFoundException';
import { Sequelize } from 'sequelize-typescript';
import { generateMigration } from 'sequelize-typescript-model-repository-migration';

export default class Main {
  server: Server;

  db: Database;

  constructor() {
    this.server = new Server();
    this.server.start();
    this.db = new Database();
    this.routes();
  }

  routes() {
    this.server.app.use('/api', api);
    this.server.app.all('*', () => {
      throw new NotFoundException();
    });
  }
}
