const express = require('express');
const router = express.Router();

const {
    MostrarNotas,
    MostrarNotaPorId,
    CrearNota,
    ActualizarNota,
    EliminarNota
} = require('../controllers/notas');

router.get('/notas', MostrarNotas);
router.get('/notas/:id', MostrarNotaPorId);
router.post('/notas', CrearNota);
router.put('/notas/:id', ActualizarNota);
router.delete('/notas/:id', EliminarNota);

module.exports = router;
