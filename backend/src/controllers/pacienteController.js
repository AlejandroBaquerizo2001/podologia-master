const { Paciente, FichaMedica } = require('../models');
const { Op } = require('sequelize'); // Importar Op de Sequelize

const pacienteController = {
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const search = req.query.search || '';

      const whereClause = {
        userId: req.user.id
      };

      if (search) {
        whereClause[Op.or] = [
          { nombre: { [Op.iLike]: `%${search}%` } },
          { rut: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const { count, rows: pacientes } = await Paciente.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [['nombre', 'ASC']],
        include: [{
          model: FichaMedica,
          required: false
        }]
      });

      res.json({
        pacientes,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        total: count
      });
    } catch (error) {
      console.error('Error obteniendo pacientes:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  // ... el resto de tu código permanece igual
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const paciente = await Paciente.findOne({
        where: { id, userId: req.user.id },
        include: [FichaMedica]
      });

      if (!paciente) {
        return res.status(404).json({ error: 'Paciente no encontrado.' });
      }

      res.json(paciente);
    } catch (error) {
      console.error('Error obteniendo paciente:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  create: async (req, res) => {
    try {
      const pacienteData = { ...req.body, userId: req.user.id };
      const paciente = await Paciente.create(pacienteData);

      // Crear ficha médica vacía para el paciente
      await FichaMedica.create({ pacienteId: paciente.id });

      res.status(201).json({ message: 'Paciente creado exitosamente', paciente });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'El RUT ya está registrado.' });
      }
      console.error('Error creando paciente:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const paciente = await Paciente.findOne({ where: { id, userId: req.user.id } });

      if (!paciente) {
        return res.status(404).json({ error: 'Paciente no encontrado.' });
      }

      await paciente.update(req.body);
      res.json({ message: 'Paciente actualizado exitosamente', paciente });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'El RUT ya está registrado.' });
      }
      console.error('Error actualizando paciente:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const paciente = await Paciente.findOne({ where: { id, userId: req.user.id } });

      if (!paciente) {
        return res.status(404).json({ error: 'Paciente no encontrado.' });
      }

      await paciente.destroy();
      res.json({ message: 'Paciente eliminado exitosamente' });
    } catch (error) {
      console.error('Error eliminando paciente:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
};

module.exports = pacienteController;