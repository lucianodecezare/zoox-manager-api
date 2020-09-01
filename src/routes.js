import { Router } from 'express';

import { authMiddleware } from './app/middlewares/auth';
import { sessionController } from './app/controllers/SessionController';

const routes = new Router();

// Login (No auth required)
routes.post('/login', sessionController.store);

routes.use(authMiddleware);

export { routes };
