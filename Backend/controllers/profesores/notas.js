const db = require('../../config/dataBase'); 

//  Obtener todas las notas
const MostrarNotas = (req, res) => {
    const query = 'SELECT * FROM notas';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener las notas:', err);
            return res.status(500).json({ error: 'Error al obtener las notas' });
        }
        res.json(results);
    });
};

//  Obtener una nota por ID
const MostrarNotaPorId = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM notas WHERE id_nota = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener la nota:', err);
            return res.status(500).json({ error: 'Error al obtener la nota' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        res.json(result[0]);
    });
};

//  Crear una nueva nota
const CrearNota = (req, res) => {
    const { id_examen, id_alumno, nota } = req.body;

    if (!id_examen || !id_alumno || nota === undefined) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = `
        INSERT INTO notas (id_examen, id_alumno, nota)
        VALUES (?, ?, ?)
    `;
    db.query(query, [id_examen, id_alumno, nota], (err, result) => {
        if (err) {
            console.error('Error al crear la nota:', err);
            return res.status(500).json({ error: 'Error al crear la nota' });
        }
        res.status(201).json({ message: 'Nota creada exitosamente', id: result.insertId });
    });
};

//  Actualizar una nota existente
const ActualizarNota = (req, res) => {
    const { id } = req.params;
    const { id_examen, id_alumno, nota } = req.body;

    const query = `
        UPDATE notas
        SET id_examen = ?, id_alumno = ?, nota = ?
        WHERE id_nota = ?
    `;
    db.query(query, [id_examen, id_alumno, nota, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar la nota:', err);
            return res.status(500).json({ error: 'Error al actualizar la nota' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        res.json({ message: 'Nota actualizada correctamente' });
    });
};

//  Eliminar una nota
const EliminarNota = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM notas WHERE id_nota = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar la nota:', err);
            return res.status(500).json({ error: 'Error al eliminar la nota' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        res.json({ message: 'Nota eliminada correctamente' });
    });
};

module.exports = {
    MostrarNotas,
    MostrarNotaPorId,
    CrearNota,
    ActualizarNota,
    EliminarNota
};
