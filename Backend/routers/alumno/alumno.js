const express = require('express');
const router = express.Router();

const {
    MostrarAlumnos,
    ObtenerAlumnoPorId,
    AgregarAlumno,
    ActualizarAlumno,
    EliminarAlumno
} = require('../../controllers/alumnos/alumnos');

// Rutas para alumnos

router.get('/', MostrarAlumnos);
router.get('/:id', ObtenerAlumnoPorId);
router.post('/', AgregarAlumno);
router.put('/:id', ActualizarAlumno);
router.delete('/:id', EliminarAlumno);

module.exports = router;