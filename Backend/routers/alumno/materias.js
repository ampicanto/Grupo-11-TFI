const express = require('express');
const router = express.Router();

const {
    MostrarMaterias,
    MostrarMateriaPorId,
    CrearMateria,
    ActualizarMateria,
    EliminarMateria
} = require('../../controllers/alumnos/materia');

router.get('/materias', MostrarMaterias);
router.get('/materias/:id', MostrarMateriaPorId);
router.post('/materias', CrearMateria);
router.put('/materias/:id', ActualizarMateria);
router.delete('/materias/:id', EliminarMateria);

module.exports = router;
