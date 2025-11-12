const db = require('../config/dataBase'); 

//  Obtener todas las notificaciones
const MostrarNotificaciones = (req, res) => {
    const query = 'SELECT * FROM notificaciones';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener las notificaciones:', err);
            return res.status(500).json({ error: 'Error al obtener las notificaciones' });
        }
        res.json(results);
    });
};

//  Obtener una notificación por ID
const MostrarNotificacionPorId = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM notificaciones WHERE id_notificacion = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener la notificación:', err);
            return res.status(500).json({ error: 'Error al obtener la notificación' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }
        res.json(result[0]);
    });
};

//  Crear una nueva notificación
const CrearNotificacion = (req, res) => {
    const { id_alumno, id_tutor, mensaje, fecha_envio, leido } = req.body;

    if (!id_alumno || !id_tutor || !mensaje || !fecha_envio || leido === undefined) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = `
        INSERT INTO notificaciones (id_alumno, id_tutor, mensaje, fecha_envio, leido)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [id_alumno, id_tutor, mensaje, fecha_envio, leido], (err, result) => {
        if (err) {
            console.error('Error al crear la notificación:', err);
            return res.status(500).json({ error: 'Error al crear la notificación' });
        }
        res.status(201).json({ message: 'Notificación creada exitosamente', id: result.insertId });
    });
};

//  Actualizar una notificación existente
const ActualizarNotificacion = (req, res) => {
    const { id } = req.params;
    const { id_alumno, id_tutor, mensaje, fecha_envio, leido } = req.body;

    const query = `
        UPDATE notificaciones
        SET id_alumno = ?, id_tutor = ?, mensaje = ?, fecha_envio = ?, leido = ?
        WHERE id_notificacion = ?
    `;
    db.query(query, [id_alumno, id_tutor, mensaje, fecha_envio, leido, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar la notificación:', err);
            return res.status(500).json({ error: 'Error al actualizar la notificación' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }
        res.json({ message: 'Notificación actualizada correctamente' });
    });
};

// Eliminar una notificación
const EliminarNotificacion = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM notificaciones WHERE id_notificacion = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar la notificación:', err);
            return res.status(500).json({ error: 'Error al eliminar la notificación' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }
        res.json({ message: 'Notificación eliminada correctamente' });
    });
};

// Marcar una notificación como leída
const MarcarComoLeida = (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE notificaciones SET leido = 1 WHERE id_notificacion = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al marcar como leída:', err);
            return res.status(500).json({ error: 'Error al actualizar el estado de la notificación' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }
        res.json({ message: 'Notificación marcada como leída' });
    });
};

module.exports = {
    MostrarNotificaciones,
    MostrarNotificacionPorId,
    CrearNotificacion,
    ActualizarNotificacion,
    EliminarNotificacion,
    MarcarComoLeida
};
