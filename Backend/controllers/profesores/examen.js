const db = require('../../config/dataBase'); // Ajustá la ruta a tu conexión MySQL

//  Obtener todos los exámenes
const MostrarExamenes = (req, res) => {
    const query = 'SELECT * FROM examenes';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los exámenes:', err);
            return res.status(500).json({ error: 'Error al obtener los exámenes' });
        }
        res.json(results);
    });
};

//  Obtener un examen por ID
const MostrarExamenPorId = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM examenes WHERE id_examen = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener el examen:', err);
            return res.status(500).json({ error: 'Error al obtener el examen' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Examen no encontrado' });
        }
        res.json(result[0]);
    });
};

//  Crear un nuevo examen
const CrearExamen = (req, res) => {
    const { id_asignacion, tipo_examen, fecha, descripcion } = req.body;

    if (!id_asignacion || !tipo_examen || !fecha || !descripcion) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = `
        INSERT INTO examenes (id_asignacion, tipo_examen, fecha, descripcion)
        VALUES (?, ?, ?, ?)
    `;
    db.query(query, [id_asignacion, tipo_examen, fecha, descripcion], (err, result) => {
        if (err) {
            console.error('Error al crear el examen:', err);
            return res.status(500).json({ error: 'Error al crear el examen' });
        }
        res.status(201).json({ message: 'Examen creado exitosamente', id: result.insertId });
    });
};

//  Actualizar un examen existente
const ActualizarExamen = (req, res) => {
    const { id } = req.params;
    const { id_asignacion, tipo_examen, fecha, descripcion } = req.body;

    const query = `
        UPDATE examenes
        SET id_asignacion = ?, tipo_examen = ?, fecha = ?, descripcion = ?
        WHERE id_examen = ?
    `;
    db.query(query, [id_asignacion, tipo_examen, fecha, descripcion, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el examen:', err);
            return res.status(500).json({ error: 'Error al actualizar el examen' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Examen no encontrado' });
        }
        res.json({ message: 'Examen actualizado correctamente' });
    });
};

//  Eliminar un examen
const EliminarExamen = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM examenes WHERE id_examen = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el examen:', err);
            return res.status(500).json({ error: 'Error al eliminar el examen' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Examen no encontrado' });
        }
        res.json({ message: 'Examen eliminado correctamente' });
    });
};

module.exports = {
    MostrarExamenes,
    MostrarExamenPorId,
    CrearExamen,
    ActualizarExamen,
    EliminarExamen
};
