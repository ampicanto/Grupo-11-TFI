const express = require('express');
const router = express.Router();

const {
    MostrarTareas,
    MostrarTareaPorId,
    CrearTarea,
    ActualizarTarea,
    EliminarTarea
} = require('../../controllers/profesores/tarea');

router.get('/tareas', MostrarTareas);
router.get('/tareas/:id', MostrarTareaPorId);
router.post('/tareas', CrearTarea);
router.put('/tareas/:id', ActualizarTarea);
router.delete('/tareas/:id', EliminarTarea);

module.exports = router;
