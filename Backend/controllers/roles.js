const db = require('../config/dataBase');

// Obtener todos los roles
const ObtenerRoles = (req, res) => {
    const query = 'SELECT * FROM roles ORDER BY nombre_rol';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener roles:', err);
            return res.status(500).json({ error: 'Error al obtener los roles' });
        }
        res.json(results);
    });
};

// Obtener rol por ID
const ObtenerRolPorId = (req, res) => {
    const { id } = req.params;
    
    db.query('SELECT * FROM roles WHERE id_rol = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener rol:', err);
            return res.status(500).json({ error: 'Error al obtener el rol' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        
        res.json(results[0]);
    });
};

// Crear nuevo rol
const CrearRol = (req, res) => {
    const { nombre_rol, descripcion } = req.body;
    
    // Validar campos requeridos
    if (!nombre_rol) {
        return res.status(400).json({ error: 'El nombre del rol es requerido' });
    }

    const query = 'INSERT INTO roles (nombre_rol, descripcion) VALUES (?, ?)';
    
    db.query(query, [nombre_rol, descripcion], (err, result) => {
        if (err) {
            console.error('Error al crear rol:', err);
            return res.status(500).json({ error: 'Error al crear el rol' });
        }
        
        res.status(201).json({
            message: 'Rol creado exitosamente',
            id_rol: result.insertId
        });
    });
};

// Actualizar rol existente
const ActualizarRol = (req, res) => {
    const { id } = req.params;
    const { nombre_rol, descripcion } = req.body;

    if (!nombre_rol) {
        return res.status(400).json({ error: 'El nombre del rol es requerido' });
    }

    const query = 'UPDATE roles SET nombre_rol = ?, descripcion = ? WHERE id_rol = ?';
    
    db.query(query, [nombre_rol, descripcion, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar rol:', err);
            return res.status(500).json({ error: 'Error al actualizar el rol' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        
        res.json({ message: 'Rol actualizado exitosamente' });
    });
};

// Eliminar rol
const EliminarRol = (req, res) => {
    const { id } = req.params;
    
    db.query('DELETE FROM roles WHERE id_rol = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar rol:', err);
            return res.status(500).json({ error: 'Error al eliminar el rol' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        
        res.json({ message: 'Rol eliminado exitosamente' });
    });
};

module.exports = {
    ObtenerRoles,
    ObtenerRolPorId,
    CrearRol,
    ActualizarRol,
    EliminarRol
};