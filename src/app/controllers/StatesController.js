import * as Yup from 'yup';

import { State } from '../schemas/StateSchema';

/**
 * Controls the CRUD operations of a `State`.
 */
class StatesController {
  /**
   * Stores a `State`.
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} `State`
   */
  async store(request, response) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      abreviacao: Yup.string().required().min(2).max(2),
    });

    try {
      await schema.validate(request.body);

      const { abreviacao, nome } = request.body;

      const newState = new State({
        abreviacao: abreviacao.toUpperCase(),
        nome: nome.toUpperCase(),
      });

      const state = await newState.save();

      return response.status(201).json(state);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  /**
   * List all the `State` stored.
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} Array of `State`
   */
  async index(request, response) {
    const { order, page, limit = 5, filter, descending } = request.query;

    const newFilter = filter.includes('undefined') ? '' : filter;
    const newDescending = descending === 'true' ? -1 : 1;
    const whereClause = {
      nome: { $regex: `.*${newFilter}.*`, $options: 'i' },
    };

    try {
      const states = await State.find(whereClause)
        .sort({ [order]: newDescending })
        .skip(((+page <= 0 ? 1 : +page) - 1) * +limit)
        .limit(+limit);
      const count = await State.countDocuments(whereClause);

      return response.status(200).json({ estados: states, count });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  /**
   * Get a specific `State`.
   *
   * @param {Object}} request
   * @param {Object}} response
   *
   * @returns {Object} `State`
   */
  async get(request, response) {
    try {
      const state = await State.findById(request.params.stateId);

      return response.status(200).json(state);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  /**
   * Update a specific `State`.
   *
   * @param {Object}} request
   * @param {Object}} response
   */
  async update(request, response) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      abreviacao: Yup.string().required().min(2).max(2),
    });

    try {
      await schema.validate(request.body);

      const { abreviacao, nome } = request.body;

      const state = await State.findByIdAndUpdate(request.params.stateId, {
        abreviacao: abreviacao.toUpperCase(),
        nome: nome.toUpperCase(),
      });

      await state.save();

      return response.status(204).json();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  /**
   * Delete a specific `State`.
   *
   * @param {Object}} request
   * @param {Object}} response
   */
  async delete(request, response) {
    try {
      const deleted = await State.findByIdAndDelete(request.params.stateId);

      if (!deleted) {
        return response.status(404).json();
      }

      return response.status(204).json();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

const statesController = new StatesController();

export { statesController };
