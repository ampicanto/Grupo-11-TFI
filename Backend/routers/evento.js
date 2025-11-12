const express = require('express');
const router = express.Router();

const {
    MostrarEventos,
    MostrarEventoPorId,
    CrearEvento,
    ActualizarEvento,
    EliminarEvento
} = require('../controllers/eventos');

router.get('/eventos', MostrarEventos);
router.get('/eventos/:id', MostrarEventoPorId);
router.post('/eventos', CrearEvento);
router.put('/eventos/:id', ActualizarEvento);
router.delete('/eventos/:id', EliminarEvento);

module.exports = router;
