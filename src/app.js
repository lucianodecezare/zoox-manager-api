import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import './database';
import { routes } from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

const { server } = new App();

export { server };
