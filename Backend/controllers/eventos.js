const db = require('../config/dataBase'); 
//  Obtener todos los eventos
const MostrarEventos = (req, res) => {
    const query = 'SELECT * FROM eventos_escolares';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los eventos:', err);
            return res.status(500).json({ error: 'Error al obtener los eventos' });
        }
        res.json(results);
    });
};

//  Obtener un evento por ID
const MostrarEventoPorId = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM eventos_escolares WHERE id_evento = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener el evento:', err);
            return res.status(500).json({ error: 'Error al obtener el evento' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json(result[0]);
    });
};

//  Crear un nuevo evento
const CrearEvento = (req, res) => {
    const { titulo, descripcion, fecha, publico } = req.body;

    if (!titulo || !descripcion || !fecha || !publico) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = `
        INSERT INTO eventos_escolares (titulo, descripcion, fecha, publico)
        VALUES (?, ?, ?, ?)
    `;
    db.query(query, [titulo, descripcion, fecha, publico], (err, result) => {
        if (err) {
            console.error('Error al crear el evento:', err);
            return res.status(500).json({ error: 'Error al crear el evento' });
        }
        res.status(201).json({ message: 'Evento creado exitosamente', id: result.insertId });
    });
};

//  Actualizar un evento existente
const ActualizarEvento = (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fecha, publico } = req.body;

    const query = `
        UPDATE eventos_escolares
        SET titulo = ?, descripcion = ?, fecha = ?, publico = ?
        WHERE id_evento = ?
    `;
    db.query(query, [titulo, descripcion, fecha, publico, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el evento:', err);
            return res.status(500).json({ error: 'Error al actualizar el evento' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json({ message: 'Evento actualizado correctamente' });
    });
};

//  Eliminar un evento
const EliminarEvento = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM eventos_escolares WHERE id_evento = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el evento:', err);
            return res.status(500).json({ error: 'Error al eliminar el evento' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json({ message: 'Evento eliminado correctamente' });
    });
};

module.exports = {
    MostrarEventos,
    MostrarEventoPorId,
    CrearEvento,
    ActualizarEvento,
    EliminarEvento
};
