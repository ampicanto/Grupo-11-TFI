const db = require('../config/dataBase');

// Obtener asignaciones de un profesor por su ID
const ObtenerAsignacionesPorProfesorId = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT a.id_asignacion, m.nombre as materia, c.nombre as curso, d.nombre as docente
        FROM asignaciones a
        INNER JOIN materias m ON a.id_materia = m.id_materia
        INNER JOIN cursos c ON a.id_curso = c.id_curso
        INNER JOIN docentes d ON a.id_docente = d.id_docente
        WHERE a.id_docente = ?
    `;
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error al obtener las asignaciones' });
        }
        res.json(results);
    });
}

// Agregar una nueva asignación para un profesor
const AgregarAsignacion = (req, res) => {
    const { id_docente, id_materia, id_curso } = req.body;
    
    // Validar que se proporcionen todos los campos requeridos
    if (!id_docente || !id_materia || !id_curso) {
        return res.status(400).json({ 
            error: 'Se requieren todos los campos: id_docente, id_materia, id_curso' 
        });
    }

    const query = 'INSERT INTO asignaciones (id_docente, id_materia, id_curso) VALUES (?, ?, ?)';
    
    db.query(query, [id_docente, id_materia, id_curso], (err, result) => {
        if (err) {
            console.error('Error al insertar asignación:', err);
            return res.status(500).json({ error: 'Error al crear la asignación' });
        }
        
        res.status(201).json({
            message: 'Asignación creada exitosamente',
            id_asignacion: result.insertId
        });
    });
}

// Eliminar una asignación
const EliminarAsignacion = (req, res) => {
    const { id } = req.params;
    
    db.query('DELETE FROM asignaciones WHERE id_asignacion = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar asignación:', err);
            return res.status(500).json({ error: 'Error al eliminar la asignación' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }
        
        res.json({ message: 'Asignación eliminada exitosamente' });
    });
}

module.exports = {
    ObtenerAsignacionesPorProfesorId,
    AgregarAsignacion,
    EliminarAsignacion
};