const express = require('express');
const router = express.Router();


const {    ObtenerRoles,
    ObtenerRolPorId,
    CrearRol,
    ActualizarRol,
    EliminarRol
} = require('../controllers/roles');
// Rutas para roles

router.get('/', ObtenerRoles);
router.get('/:id', ObtenerRolPorId);
router.post('/', CrearRol);
router.put('/:id', ActualizarRol);
router.delete('/:id', EliminarRol);
module.exports = router;