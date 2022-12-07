
import 'reflect-metadata';
import api from './routes/api';
import Server from './app/nucleo/Server';
import Database from './app/nucleo/Database';
import NotFoundException from './handlers/NotFoundException';import Handler from './handlers/Handler';

export default class Main {
  server: Server;

  db: Database;

  constructor() {
    this.server = new Server();
    this.server.start();
    this.db = new Database();
    this.routes();
    this.server.app.use(Handler.handle);
  }

  routes() {
    this.server.app.use('/api', api);
    this.server.app.all('*', () => {
      throw new NotFoundException();
    });
  }
}
