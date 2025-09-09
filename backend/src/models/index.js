const sequelize = require('../config/database');
const User = require('./User');
const Paciente = require('./Paciente');
const Cita = require('./Cita');
const FichaMedica = require('./FichaMedica');

// Relaciones entre modelos
User.hasMany(Paciente, { foreignKey: 'userId' });
Paciente.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Cita, { foreignKey: 'userId' });
Cita.belongsTo(User, { foreignKey: 'userId' });

Paciente.hasMany(Cita, { foreignKey: 'pacienteId' });
Cita.belongsTo(Paciente, { foreignKey: 'pacienteId' });

Paciente.hasOne(FichaMedica, { foreignKey: 'pacienteId' });
FichaMedica.belongsTo(Paciente, { foreignKey: 'pacienteId' });

module.exports = {
  sequelize,
  User,
  Paciente,
  Cita,
  FichaMedica
};