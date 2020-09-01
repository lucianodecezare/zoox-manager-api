import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

const authMiddleware = (request, response, next) => {
  const xApiKey = request.headers['x-api-key'];

  if (!xApiKey) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  try {
    jwt.verify(xApiKey, authConfig.SECRET);
  } catch (error) {
    return response.status(401).json({ error: 'Invalid token' });
  }

  return next();
};

export { authMiddleware };
