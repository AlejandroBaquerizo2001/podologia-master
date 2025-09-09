const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
      }

      const user = await User.findOne({ where: { email } });
      
      if (!user || !(await user.validPassword(password))) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
      }

      if (!user.activo) {
        return res.status(401).json({ error: 'Cuenta desactivada. Contacte al administrador.' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login exitoso',
        token,
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          role: user.role,
          especialidad: user.especialidad
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  register: async (req, res) => {
    try {
      const { nombre, email, password, role, especialidad, telefono } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'El email ya está registrado.' });
      }

      const user = await User.create({
        nombre,
        email,
        password,
        role: role || 'doctor',
        especialidad,
        telefono
      });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'Usuario creado exitosamente',
        token,
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          role: user.role,
          especialidad: user.especialidad
        }
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  getProfile: async (req, res) => {
    try {
      res.json(req.user);
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { nombre, especialidad, telefono } = req.body;
      
      await req.user.update({
        nombre: nombre || req.user.nombre,
        especialidad: especialidad || req.user.especialidad,
        telefono: telefono || req.user.telefono
      });

      res.json({ message: 'Perfil actualizado exitosamente', user: req.user });
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
};

module.exports = authController;