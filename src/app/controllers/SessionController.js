import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';

class SessionController {
  // TODO: Add try catch
  async store(request, response) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation error' });
    }

    const { username, password } = request.body;

    if (username !== 'admin' || password !== 'admin') {
      return response.status(401).json({ error: 'User not found' });
    }

    return response.json({
      token: jwt.sign({ id: 'admin' }, authConfig.SECRET, {
        expiresIn: authConfig.EXPIRES_IN,
      }),
    });
  }
}

const sessionController = new SessionController();

export { sessionController };
