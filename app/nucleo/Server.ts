import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import corsConfig from '../../configs/cors';
class Server {
  app: any;

  server: import('http').Server;

  port: string | number;

  host: string;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.port = process.env.PORT || 8000;

    this.host = process.env.HOST || 'localhost';
    this.middlewares();
  }

  middlewares() {
    this.app.use(express.static('public'));
    this.app.use(express.json());
    this.app.use(cors(corsConfig));
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`http://${this.host}:${this.port}`);
    });
  }
}

export default Server;
