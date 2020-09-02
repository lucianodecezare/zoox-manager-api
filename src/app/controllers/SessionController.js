import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';

/**
 * Controls `Session`.
 */
class SessionController {
  /**
   * Create a new `Session`.
   *
   * @param {Object}} request
   * @param {Object}} response
   *
   * @returns {Object} { token: string }
   */
  async store(request, response) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
    });

    try {
      await schema.validate(request.body);

      const { username, password } = request.body;

      if (username !== 'admin' || password !== 'admin') {
        return response.status(401).json({ error: 'User not found' });
      }

      return response.status(201).json({
        token: jwt.sign({ id: 'admin' }, authConfig.SECRET, {
          expiresIn: authConfig.EXPIRES_IN,
        }),
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

const sessionController = new SessionController();

export { sessionController };
