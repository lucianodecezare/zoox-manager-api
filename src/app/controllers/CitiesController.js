import * as Yup from 'yup';

import { City } from '../schemas/CitySchema';

/**
 * Controls the CRUD operations of a `City`.
 */
class CitiesController {
  /**
   * Stores a `City`.
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} `City`
   */
  async store(request, response) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      estadoId: Yup.string().required(),
    });

    try {
      await schema.validate(request.body);

      const { estadoId, nome } = request.body;

      const newCity = new City({
        estadoId,
        nome: nome.toUpperCase(),
      });

      const city = await newCity.save();

      return response.status(201).json(city);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  /**
   * List all the `City` stored.
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} Array of `City`
   *
   */
  async index(request, response) {
    const { order, page, limit = 5, filter, descending } = request.query;
    const newFilter = filter.includes('undefined') ? '' : filter;
    const newDescending = descending === 'true' ? -1 : 1;
    const whereClause = {
      nome: { $regex: `.*${newFilter}.*`, $options: 'i' },
    };

    try {
      const cities = await City.find(whereClause)
        .sort({ [order]: newDescending })
        .skip(((+page <= 0 ? 1 : +page) - 1) * +limit)
        .limit(+limit)
        .populate('estadoId', 'nome abreviacao');
      const count = await City.countDocuments(whereClause);

      return response.status(200).json({ cidades: cities, count });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  /**
   * Get a specific `City`.
   *
   * @param {Object}} request
   * @param {Object}} response
   *
   * @returns {Object} `City`
   */
  async get(request, response) {
    try {
      const city = await City.findById(request.params.cityId).populate(
        'estadoId',
        'nome abreviacao'
      );

      return response.status(200).json(city);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  /**
   * Update a specific `City`.
   *
   * @param {Object}} request
   * @param {Object}} response
   */
  async update(request, response) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      estadoId: Yup.string().required(),
    });

    try {
      await schema.validate(request.body);

      const { estadoId, nome } = request.body;

      const city = await City.findByIdAndUpdate(request.params.cityId, {
        estadoId,
        nome: nome.toUpperCase(),
      });

      await city.save();

      return response.status(204).json();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  /**
   * Delete a specific `City`.
   *
   * @param {Object}} request
   * @param {Object}} response
   */
  async delete(request, response) {
    try {
      const deleted = await City.findByIdAndDelete(request.params.cityId);

      if (!deleted) {
        return response.status(404).json();
      }

      return response.status(204).json();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

const citiesController = new CitiesController();

export { citiesController };
