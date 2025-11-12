const express = require('express');
const router = express.Router();

const {
    MostrarMateriales,
    MostrarMaterialPorId,
    CrearMaterial,
    ActualizarMaterial,
    EliminarMaterial
} = require('../../controllers/profesores/materiales');

router.get('/materiales', MostrarMateriales);
router.get('/materiales/:id', MostrarMaterialPorId);
router.post('/materiales', CrearMaterial);
router.put('/materiales/:id', ActualizarMaterial);
router.delete('/materiales/:id', EliminarMaterial);

module.exports = router;
