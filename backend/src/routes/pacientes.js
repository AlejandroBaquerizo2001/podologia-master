const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const { auth } = require('../middleware/auth');
const { validatePaciente } = require('../middleware/validation');

router.use(auth);

router.get('/', pacienteController.getAll);
router.get('/:id', pacienteController.getById);
router.post('/', validatePaciente, pacienteController.create);
router.put('/:id', validatePaciente, pacienteController.update);
router.delete('/:id', pacienteController.delete);

module.exports = router;