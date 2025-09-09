const validatePaciente = (req, res, next) => {
  const { nombre, rut } = req.body;
  
  if (!nombre || !rut) {
    return res.status(400).json({ error: 'Nombre y RUT son campos obligatorios.' });
  }

  const rutRegex = /^[0-9]{7,8}-[0-9kK]{1}$/;
  if (!rutRegex.test(rut)) {
    return res.status(400).json({ error: 'El formato del RUT no es válido. Use el formato: 12345678-9' });
  }

  next();
};

const validateCita = (req, res, next) => {
  const { fecha, hora, pacienteId } = req.body;
  
  if (!fecha || !hora || !pacienteId) {
    return res.status(400).json({ error: 'Fecha, hora y paciente son campos obligatorios.' });
  }

  next();
};

module.exports = { validatePaciente, validateCita };