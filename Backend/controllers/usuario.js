const db = require('../config/dataBase');

// Obtener todos los usuarios
const MostrarUsuarios = (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener los usuarios' });
        res.json(results);
    });
}

// Obtener un usuario por ID
const ObtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;  
    db.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener el usuario' });
        if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(results[0]);
    });
}

// Agregar un nuevo usuario
const AgregarUsuario = (req, res) => {
    // Acepta 'password' o 'contrasena' desde el body
    const { nombre, apellido, email, password, contrasena, id_rol, estado } = req.body;
    const contraseña = password || contrasena; // variable JS sin ñ
    const estadoFinal = estado || 'Activo';

    if (!nombre || !apellido || !email || !contraseña || !id_rol) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    db.query(
        'INSERT INTO usuarios (nombre, apellido, email, `contraseña`, id_rol, estado) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, apellido, email, contraseña, id_rol, estadoFinal],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Error al agregar el usuario' });
            res.status(201).json({ message: 'Usuario agregado exitosamente', id: results.insertId });
        }
    );
};

// Actualizar un usuario
const ActualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, password, contrasena, id_rol, estado } = req.body;
    const contraseña = password || contrasena;

    // Construir campos y valores dinámicamente para no sobrescribir con undefined
    const fields = [];
    const values = [];

    if (nombre !== undefined) { fields.push('nombre = ?'); values.push(nombre); }
    if (apellido !== undefined) { fields.push('apellido = ?'); values.push(apellido); }
    if (email !== undefined) { fields.push('email = ?'); values.push(email); }
    if (contraseña !== undefined) { fields.push('`contraseña` = ?'); values.push(contraseña); }
    if (id_rol !== undefined) { fields.push('id_rol = ?'); values.push(id_rol); }
    if (estado !== undefined) { fields.push('estado = ?'); values.push(estado); }

    if (fields.length === 0) {
        return res.status(400).json({ error: 'No hay campos para actualizar' });
    }

    const sql = `UPDATE usuarios SET ${fields.join(', ')} WHERE id_usuario = ?`;
    values.push(id);

    db.query(sql, values, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar el usuario' });
        res.json({ message: 'Usuario actualizado exitosamente' });
    });
}

// Eliminar un usuario
const EliminarUsuario = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar el usuario' });
        res.json({ message: 'Usuario eliminado exitosamente' });
    });
}

module.exports = {
    MostrarUsuarios,
    ObtenerUsuarioPorId,
    AgregarUsuario,
    ActualizarUsuario,
    EliminarUsuario
};