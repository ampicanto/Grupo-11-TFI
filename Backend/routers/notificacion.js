const express = require('express');
const router = express.Router();

const {
    MostrarNotificaciones,
    MostrarNotificacionPorId,
    CrearNotificacion,
    ActualizarNotificacion,
    EliminarNotificacion,
    MarcarComoLeida
} = require('../controllers/notificaciones');

router.get('/notificaciones', MostrarNotificaciones);
router.get('/notificaciones/:id', MostrarNotificacionPorId);
router.post('/notificaciones', CrearNotificacion);
router.put('/notificaciones/:id', ActualizarNotificacion);
router.delete('/notificaciones/:id', EliminarNotificacion);

// Extra: marcar como leída
router.put('/notificaciones/:id/leida', MarcarComoLeida);

module.exports = router;
