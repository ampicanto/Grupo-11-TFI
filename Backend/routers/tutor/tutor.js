const express = require('express');
const router = express.Router();

const { 
    MostrarTutores,
    ObtenerTutorPorId,
    AgregarTutor,
    ActualizarTutor,
    EliminarTutor
} = require('../../controllers/tutor/tutores');

// Rutas para tutores
router.get('/', MostrarTutores);
router.get('/:id', ObtenerTutorPorId);
router.post('/', AgregarTutor);
router.put('/:id', ActualizarTutor);
router.delete('/:id', EliminarTutor);


module.exports = router;