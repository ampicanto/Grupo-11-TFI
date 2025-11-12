const db = require('../../config/dataBase'); 

//  Obtener todas las tareas entregadas
const MostrarTareas = (req, res) => {
    const query = 'SELECT * FROM tareas';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener las tareas:', err);
            return res.status(500).json({ error: 'Error al obtener las tareas' });
        }
        res.json(results);
    });
};

//  Obtener una tarea por ID
const MostrarTareaPorId = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM tareas WHERE id_tarea = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener la tarea:', err);
            return res.status(500).json({ error: 'Error al obtener la tarea' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json(result[0]);
    });
};

//  Crear una nueva tarea
const CrearTarea = (req, res) => {
    const { titulo, descripcion, fecha_entrega, id_materia } = req.body;

    if (!titulo || !descripcion || !fecha_entrega || !id_materia) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = `
        INSERT INTO tareas (titulo, descripcion, fecha_entrega, id_materia)
        VALUES (?, ?, ?, ?)
    `;
    db.query(query, [titulo, descripcion, fecha_entrega, id_materia], (err, result) => {
        if (err) {
            console.error('Error al crear la tarea:', err);
            return res.status(500).json({ error: 'Error al crear la tarea' });
        }
        res.status(201).json({ message: 'Tarea creada exitosamente', id: result.insertId });
    });
};

//  Actualizar una tarea existente
const ActualizarTarea = (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fecha_entrega, id_materia } = req.body;

    const query = `
        UPDATE tareas
        SET titulo = ?, descripcion = ?, fecha_entrega = ?, id_materia = ?
        WHERE id_tarea = ?
    `;
    db.query(query, [titulo, descripcion, fecha_entrega, id_materia, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar la tarea:', err);
            return res.status(500).json({ error: 'Error al actualizar la tarea' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json({ message: 'Tarea actualizada correctamente' });
    });
};

//  Eliminar una tarea
const EliminarTarea = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tareas WHERE id_tarea = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar la tarea:', err);
            return res.status(500).json({ error: 'Error al eliminar la tarea' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json({ message: 'Tarea eliminada correctamente' });
    });
};

module.exports = {
    MostrarTareas,
    MostrarTareaPorId,
    CrearTarea,
    ActualizarTarea,
    EliminarTarea
};
