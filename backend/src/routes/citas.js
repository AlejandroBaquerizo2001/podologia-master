const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const { auth } = require('../middleware/auth');
const { validateCita } = require('../middleware/validation');

router.use(auth);

router.get('/', citaController.getAll);
router.get('/stats', citaController.getStats);
router.get('/:id', citaController.getById);
router.post('/', validateCita, citaController.create);
router.put('/:id', citaController.update);
router.delete('/:id', citaController.delete);

module.exports = router;