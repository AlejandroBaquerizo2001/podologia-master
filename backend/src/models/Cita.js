const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cita = sequelize.define('Cita', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('consulta', 'examen', 'control', 'urgencia'),
    defaultValue: 'consulta'
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'confirmada', 'completada', 'cancelada'),
    defaultValue: 'pendiente'
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  recordatorio: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pacienteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Cita;