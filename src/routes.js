import { Router } from 'express';

import { authMiddleware } from './app/middlewares/auth';
import { sessionController } from './app/controllers/SessionController';
import { statesController } from './app/controllers/StatesController';

const routes = new Router();

// Login (No auth required)
routes.post('/login', sessionController.store);

// All routes below will need authentication
routes.use(authMiddleware);

// States
routes.post('/states', statesController.store);
routes.get('/states', statesController.index);
routes.get('/states/:stateId', statesController.get);
routes.put('/states/:stateId', statesController.update);
routes.delete('/states/:stateId', statesController.delete);

export { routes };
