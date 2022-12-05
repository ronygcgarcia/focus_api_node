
import 'reflect-metadata';
import path from 'path';
import api from './routes/api';
import web from './routes/web';
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
    this.configMigrations(this.db);
  }

  routes() {
    this.server.app.use('/', web);
    this.server.app.use('/api', api);
    this.server.app.all('*', () => {
      throw new NotFoundException();
    });
  }

  async configMigrations(db: Sequelize) {
    await generateMigration(db, {
      outDir: path.join(__dirname, '/app/db/migrations'),
      snapshotDir: path.join(__dirname, '/app/db/snapshots'),
      migrationName: 'init-project-migration',
      prettierOptions: {
        'printWidth': 100,
        'tabWidth': 2,
        'useTabs': false,
        'semi': true,
        'singleQuote': true,
        'trailingComma': 'es5',
        'bracketSpacing': true,
        'arrowParens': 'always',
        'parser': 'babel',
      },
    });
  }
}
