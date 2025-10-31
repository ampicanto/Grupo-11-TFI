// backend/routers/usuarios.js (CORREGIDO Y FINAL)
const express = require('express');
const router = express.Router();

// ⚠️ Importamos las funciones del controller que acabamos de modificar
const { 
    MostrarUsuarios,
    ObtenerUsuarioPorId,
    AgregarUsuario,
    ActualizarUsuario,
    EliminarUsuario,
    AutenticarUsuario // ⬅️ La función clave
} = require('../controllers/usuario.js'); 

// ----------------------------------------------------
// RUTAS PRINCIPALES DE AUTENTICACIÓN Y CRUD
// ----------------------------------------------------

// POST /api/usuarios/login ⬅️ Esta es la ruta que llama el Frontend
router.post('/login', AutenticarUsuario); 

// Rutas de CRUD (Opcionales para la administración)
router.get('/usuarios', MostrarUsuarios);
router.get('/:id', ObtenerUsuarioPorId);
router.post('/registro', AgregarUsuario); // Puedes llamarlo /registro en lugar de solo /
router.put('/:id', ActualizarUsuario);
router.delete('/:id', EliminarUsuario);

module.exports = router; 