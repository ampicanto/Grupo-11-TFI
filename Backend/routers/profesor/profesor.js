const express = require('express');
const router = express.Router();

const {
    MostrarProfesores,
    ObtenerProfesorPorId,
    AgregarProfesor,
    ActualizarProfesor,
    EliminarProfesor
} = require('../../controllers/profesores/profesores');

// Rutas para profesores
router.get('/', MostrarProfesores);
router.get('/:id', ObtenerProfesorPorId);
router.post('/', AgregarProfesor);
router.put('/:id', ActualizarProfesor);
router.delete('/:id', EliminarProfesor);


module.exports = router;