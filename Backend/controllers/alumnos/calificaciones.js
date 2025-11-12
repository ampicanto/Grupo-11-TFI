const db = require('../config/dataBase');

// Obtener calificaciones de un alumno por su ID
const ObtenerCalificacionesPorAlumnoId = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT c.id_calificacion, c.nota, c.tipo_evaluacion, c.fecha,
               m.nombre as materia, cu.nombre as curso
        FROM calificaciones c
        INNER JOIN asignaciones a ON c.id_asignacion = a.id_asignacion
        INNER JOIN materias m ON a.id_materia = m.id_materia
        INNER JOIN cursos cu ON a.id_curso = cu.id_curso
        WHERE c.id_alumno = ?
        ORDER BY c.fecha DESC
    `;
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error al obtener las calificaciones' });
        }
        res.json(results);
    });
};

// Registrar nueva calificación
const RegistrarCalificacion = (req, res) => {
    const { id_alumno, id_asignacion, nota, tipo_evaluacion, fecha } = req.body;
    
    // Validar campos requeridos
    if (!id_alumno || !id_asignacion || !nota || !tipo_evaluacion || !fecha) {
        return res.status(400).json({ 
            error: 'Todos los campos son requeridos' 
        });
    }

    // Validar nota (entre 0 y 10)
    if (nota < 0 || nota > 10) {
        return res.status(400).json({ 
            error: 'La nota debe estar entre 0 y 10' 
        });
    }

    const query = `
        INSERT INTO calificaciones 
        (id_alumno, id_asignacion, nota, tipo_evaluacion, fecha) 
        VALUES (?, ?, ?, ?, ?)
    `;
    
    db.query(query, [id_alumno, id_asignacion, nota, tipo_evaluacion, fecha], (err, result) => {
        if (err) {
            console.error('Error al registrar calificación:', err);
            return res.status(500).json({ error: 'Error al registrar la calificación' });
        }
        
        res.status(201).json({
            message: 'Calificación registrada exitosamente',
            id_calificacion: result.insertId
        });
    });
};

// Actualizar una calificación existente
const ActualizarCalificacion = (req, res) => {
    const { id } = req.params;
    const { nota, tipo_evaluacion } = req.body;

    if (nota < 0 || nota > 10) {
        return res.status(400).json({ 
            error: 'La nota debe estar entre 0 y 10' 
        });
    }

    const query = 'UPDATE calificaciones SET nota = ?, tipo_evaluacion = ? WHERE id_calificacion = ?';
    
    db.query(query, [nota, tipo_evaluacion, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar calificación:', err);
            return res.status(500).json({ error: 'Error al actualizar la calificación' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Calificación no encontrada' });
        }
        
        res.json({ message: 'Calificación actualizada exitosamente' });
    });
};

// Eliminar una calificación
const EliminarCalificacion = (req, res) => {
    const { id } = req.params;
    
    db.query('DELETE FROM calificaciones WHERE id_calificacion = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar calificación:', err);
            return res.status(500).json({ error: 'Error al eliminar la calificación' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Calificación no encontrada' });
        }
        
        res.json({ message: 'Calificación eliminada exitosamente' });
    });
};

module.exports = {
    ObtenerCalificacionesPorAlumnoId,
    RegistrarCalificacion,
    ActualizarCalificacion,
    EliminarCalificacion
};