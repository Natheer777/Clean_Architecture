import express, { Express } from 'express';
import { UserRouter } from './router';

export class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares() {
    this.app.use(express.json());
  }

  private setupRoutes() {
    const userRoutes = new UserRouter();
    this.app.use('/api', userRoutes.getRouter());
  }

  start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}