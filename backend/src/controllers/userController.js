const { User } = require('../models');

const userController = {
  getAll: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
        where: { activo: true }
      });
      res.json(users);
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }

      // No permitir que usuarios no admin modifiquen otros usuarios
      if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
        return res.status(403).json({ error: 'No tiene permisos para modificar este usuario.' });
      }

      await user.update(req.body);
      const userWithoutPassword = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
      });

      res.json({ message: 'Usuario actualizado exitosamente', user: userWithoutPassword });
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  deactivate: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }

      // No permitir desactivarse a sí mismo
      if (req.user.id === parseInt(id)) {
        return res.status(400).json({ error: 'No puede desactivar su propia cuenta.' });
      }

      await user.update({ activo: false });
      res.json({ message: 'Usuario desactivado exitosamente' });
    } catch (error) {
      console.error('Error desactivando usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
};

module.exports = userController;