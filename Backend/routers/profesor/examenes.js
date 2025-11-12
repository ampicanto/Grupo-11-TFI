const express = require('express');
const router = express.Router();

const {
    MostrarExamenes,
    MostrarExamenPorId,
    CrearExamen,
    ActualizarExamen,
    EliminarExamen
} = require('../../controllers/profesores/examen');

router.get('/examenes', MostrarExamenes);
router.get('/examenes/:id', MostrarExamenPorId);
router.post('/examenes', CrearExamen);
router.put('/examenes/:id', ActualizarExamen);
router.delete('/examenes/:id', EliminarExamen);

module.exports = router;
