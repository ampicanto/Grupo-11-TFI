const db = require('../../config/dataBase'); 

//  Obtener todas las materias
const MostrarMaterias = (req, res) => {
    const query = 'SELECT * FROM materias';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener las materias:', err);
            return res.status(500).json({ error: 'Error al obtener las materias' });
        }
        res.json(results);
    });
};

//  Obtener una materia por ID
const MostrarMateriaPorId = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM materias WHERE id_materia = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener la materia:', err);
            return res.status(500).json({ error: 'Error al obtener la materia' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        res.json(result[0]);
    });
};

//  Crear una nueva materia
const CrearMateria = (req, res) => {
    const { nombre_materia, carga_horaria } = req.body;

    if (!nombre_materia || !carga_horaria) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = `
        INSERT INTO materias (nombre_materia, carga_horaria)
        VALUES (?, ?)
    `;
    db.query(query, [nombre_materia, carga_horaria], (err, result) => {
        if (err) {
            console.error('Error al crear la materia:', err);
            return res.status(500).json({ error: 'Error al crear la materia' });
        }
        res.status(201).json({ message: 'Materia creada exitosamente', id: result.insertId });
    });
};

//  Actualizar una materia existente
const ActualizarMateria = (req, res) => {
    const { id } = req.params;
    const { nombre_materia, carga_horaria } = req.body;

    const query = `
        UPDATE materias
        SET nombre_materia = ?, carga_horaria = ?
        WHERE id_materia = ?
    `;
    db.query(query, [nombre_materia, carga_horaria, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar la materia:', err);
            return res.status(500).json({ error: 'Error al actualizar la materia' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        res.json({ message: 'Materia actualizada correctamente' });
    });
};

//  Eliminar una materia
const EliminarMateria = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM materias WHERE id_materia = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar la materia:', err);
            return res.status(500).json({ error: 'Error al eliminar la materia' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        res.json({ message: 'Materia eliminada correctamente' });
    });
};

module.exports = {
    MostrarMaterias,
    MostrarMateriaPorId,
    CrearMateria,
    ActualizarMateria,
    EliminarMateria
};
