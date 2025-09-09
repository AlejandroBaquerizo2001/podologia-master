const { Cita, Paciente } = require('../models');
const { Op } = require('sequelize');

const citaController = {
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const { fecha, estado, search } = req.query;

      const whereClause = { userId: req.user.id };

      if (fecha) {
        const startDate = new Date(fecha);
        const endDate = new Date(fecha);
        endDate.setDate(endDate.getDate() + 1);
        
        whereClause.fecha = {
          [Op.gte]: startDate,
          [Op.lt]: endDate
        };
      }

      if (estado && estado !== 'todas') {
        whereClause.estado = estado;
      }

      if (search) {
        whereClause[Op.or] = [
          { '$Paciente.nombre$': { [Op.iLike]: `%${search}%` } },
          { notas: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const { count, rows: citas } = await Cita.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [['fecha', 'ASC'], ['hora', 'ASC']],
        include: [{
          model: Paciente,
          attributes: ['id', 'nombre', 'rut']
        }]
      });

      res.json({
        citas,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        total: count
      });
    } catch (error) {
      console.error('Error obteniendo citas:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const cita = await Cita.findOne({
        where: { id, userId: req.user.id },
        include: [Paciente]
      });

      if (!cita) {
        return res.status(404).json({ error: 'Cita no encontrada.' });
      }

      res.json(cita);
    } catch (error) {
      console.error('Error obteniendo cita:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  create: async (req, res) => {
    try {
      // Verificar si el paciente existe y pertenece al usuario
      const paciente = await Paciente.findOne({
        where: { id: req.body.pacienteId, userId: req.user.id }
      });

      if (!paciente) {
        return res.status(404).json({ error: 'Paciente no encontrado.' });
      }

      const citaData = { ...req.body, userId: req.user.id };
      const cita = await Cita.create(citaData);

      res.status(201).json({ message: 'Cita creada exitosamente', cita });
    } catch (error) {
      console.error('Error creando cita:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const cita = await Cita.findOne({ where: { id, userId: req.user.id } });

      if (!cita) {
        return res.status(404).json({ error: 'Cita no encontrada.' });
      }

      await cita.update(req.body);
      res.json({ message: 'Cita actualizada exitosamente', cita });
    } catch (error) {
      console.error('Error actualizando cita:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const cita = await Cita.findOne({ where: { id, userId: req.user.id } });

      if (!cita) {
        return res.status(404).json({ error: 'Cita no encontrada.' });
      }

      await cita.destroy();
      res.json({ message: 'Cita eliminada exitosamente' });
    } catch (error) {
      console.error('Error eliminando cita:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  getStats: async (req, res) => {
    try {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const totalCitas = await Cita.count({ where: { userId: req.user.id } });
      const citasEsteMes = await Cita.count({
        where: {
          userId: req.user.id,
          fecha: {
            [Op.gte]: startOfMonth,
            [Op.lte]: endOfMonth
          }
        }
      });
      
      const citasConfirmadas = await Cita.count({
        where: { userId: req.user.id, estado: 'confirmada' }
      });
      
      const tasaConfirmacion = totalCitas > 0 
        ? Math.round((citasConfirmadas / totalCitas) * 100) 
        : 0;

      res.json({
        totalCitas,
        citasEsteMes,
        citasConfirmadas,
        tasaConfirmacion
      });
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
};

module.exports = citaController;