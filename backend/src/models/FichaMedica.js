const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FichaMedica = sequelize.define('FichaMedica', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  antecedentesMedicos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  antecedentesQuirurgicos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  antecedentesAlergicos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  antecedentesFamiliares: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tratamientos: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  notasClinicas: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  pacienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }
});

module.exports = FichaMedica;