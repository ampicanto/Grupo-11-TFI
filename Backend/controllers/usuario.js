const db = require('../config/dataBase');
const bcrypt = require('bcrypt');
// Número de rondas para bcrypt: se puede configurar con la variable de entorno SALT_ROUNDS
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;

// FUNCIÓN CLAVE: AUTENTICACIÓN (LOGIN) - MODIFICADO para BCrypt
const AutenticarUsuario = (req, res) => {
    const { email, password } = req.body; 
    const contraseña_texto_plano = password || req.body.contrasena;

    if (!email || !contraseña_texto_plano) {
        return res.status(400).json({ error: 'Faltan credenciales de acceso.' });
    }

    // 1. Buscar al usuario por email
    db.query('SELECT id_usuario, nombre, apellido, email, id_rol, `contraseña` FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error interno del servidor.' });
        
        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas.' }); 
        }

        const usuario = results[0];

        // 2. ⚠️ Comparar la contraseña de texto plano con el HASH de la base de datos
        bcrypt.compare(contraseña_texto_plano, usuario.contraseña, (err, esIgual) => {
            if (err) return res.status(500).json({ error: 'Error al verificar la contraseña.' });

            if (esIgual) {
                // Éxito: Contraseña correcta
                res.json({ 
                    message: 'Inicio de sesión exitoso', 
                    usuario: { id: usuario.id_usuario, nombre: usuario.nombre, rol: usuario.id_rol } 
                    // En un proyecto real, aquí añadirías el JWT token
                });
            } else {
                // Fallo: Contraseña incorrecta
                return res.status(401).json({ error: 'Credenciales inválidas.' });
            }
        });
    });
};

// ... (El resto de tus funciones: MostrarUsuarios, ObtenerUsuarioPorId, etc.) ...


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
// Agregar un nuevo usuario (MODIFICADO para BCrypt)
const AgregarUsuario = (req, res) => {
    const { nombre, apellido, email, password, contrasena, id_rol, estado } = req.body;
    const contraseña_texto_plano = password || contrasena;
    const estadoFinal = estado || 'Activo';

    if (!nombre || !apellido || !email || !contraseña_texto_plano || !id_rol) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
    // 0. Comprobaciones previas: existencia de rol y unicidad de email
    db.query('SELECT id_rol FROM roles WHERE id_rol = ?', [id_rol], (err, roleResults) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al verificar el rol', detail: err.message });
        }
        if (roleResults.length === 0) {
            return res.status(400).json({ error: `El rol con id_rol=${id_rol} no existe` });
        }

        // Comprobar si el email ya está en uso
        db.query('SELECT id_usuario FROM usuarios WHERE email = ?', [email], (err, emailResults) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al verificar el email', detail: err.message });
            }
            if (emailResults.length > 0) {
                return res.status(409).json({ error: 'El email ya está registrado' });
            }

            // 1. Cifrar la contraseña ANTES de la inserción
            bcrypt.hash(contraseña_texto_plano, saltRounds, (err, hash) => {
                if (err) return res.status(500).json({ error: 'Error al cifrar la contraseña' });

                // 2. Usar el HASH cifrado en el INSERT
                db.query(
                    'INSERT INTO usuarios (nombre, apellido, email, `contraseña`, id_rol, estado) VALUES (?, ?, ?, ?, ?, ?)',
                    // ⚠️ Usamos el 'hash' cifrado
                    [nombre, apellido, email, hash, id_rol, estadoFinal],
                    (err, results) => {
                        if (err) {
                            // Log completo en consola para debugging
                            console.error(err);
                            // En entorno de desarrollo devolvemos el detalle SQL para ayudar a depurar.
                            // NO dejar en producción porque puede filtrar información sensible.
                            return res.status(500).json({ error: 'Error al agregar el usuario a la DB', detail: err.sqlMessage || err.message });
                        }
                        res.status(201).json({ message: 'Usuario agregado exitosamente', id: results.insertId });
                    }
                );
            });
        });
    });
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
    if (id_rol !== undefined) { fields.push('id_rol = ?'); values.push(id_rol); }
    if (estado !== undefined) { fields.push('estado = ?'); values.push(estado); }

    // Si se envía contraseña, primero la hasheamos y luego ejecutamos el UPDATE
    const doUpdate = (finalFields, finalValues) => {
        if (finalFields.length === 0) {
            return res.status(400).json({ error: 'No hay campos para actualizar' });
        }

        const sql = `UPDATE usuarios SET ${finalFields.join(', ')} WHERE id_usuario = ?`;
        finalValues.push(id);

        db.query(sql, finalValues, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al actualizar el usuario', detail: err.message });
            }
            res.json({ message: 'Usuario actualizado exitosamente' });
        });
    };

    if (contraseña !== undefined) {
        // Hashear la nueva contraseña
        bcrypt.hash(contraseña, saltRounds, (err, hash) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al cifrar la contraseña' });
            }
            // Añadir campo de contraseña hasheada y ejecutar update
            fields.push('`contraseña` = ?');
            values.push(hash);
            doUpdate(fields, values);
        });
    } else {
        doUpdate(fields, values);
    }
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
    EliminarUsuario,
    AutenticarUsuario

};