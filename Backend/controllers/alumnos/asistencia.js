const db = require('../config/dataBase');

// Obtener asistencias de un alumno por su ID
const ObtenerAsistenciasPorAlumnoId = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT a.id_asistencia, a.fecha, a.estado, c.nombre as curso
        FROM asistencias a
        INNER JOIN cursos c ON a.id_curso = c.id_curso
        WHERE a.id_alumno = ?
        ORDER BY a.fecha DESC
    `;
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error al obtener las asistencias' });
        }
        res.json(results);
    });
};

// Registrar nueva asistencia
const RegistrarAsistencia = (req, res) => {
    const { id_alumno, id_curso, fecha, estado } = req.body;
    
    // Validar que se proporcionen todos los campos requeridos
    if (!id_alumno || !id_curso || !fecha || !estado) {
        return res.status(400).json({ 
            error: 'Se requieren todos los campos: id_alumno, id_curso, fecha, estado' 
        });
    }

    // Validar que el estado sea válido
    const estadosValidos = ['Presente', 'Ausente', 'Tarde'];
    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({ 
            error: 'Estado inválido. Debe ser: Presente, Ausente o Tarde' 
        });
    }

    const query = 'INSERT INTO asistencias (id_alumno, id_curso, fecha, estado) VALUES (?, ?, ?, ?)';
    
    db.query(query, [id_alumno, id_curso, fecha, estado], (err, result) => {
        if (err) {
            console.error('Error al registrar asistencia:', err);
            return res.status(500).json({ error: 'Error al registrar la asistencia' });
        }
        
        res.status(201).json({
            message: 'Asistencia registrada exitosamente',
            id_asistencia: result.insertId
        });
    });
};

// Actualizar una asistencia existente
const ActualizarAsistencia = (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado || !['Presente', 'Ausente', 'Tarde'].includes(estado)) {
        return res.status(400).json({ 
            error: 'Estado inválido. Debe ser: Presente, Ausente o Tarde' 
        });
    }

    const query = 'UPDATE asistencias SET estado = ? WHERE id_asistencia = ?';
    
    db.query(query, [estado, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar asistencia:', err);
            return res.status(500).json({ error: 'Error al actualizar la asistencia' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Asistencia no encontrada' });
        }
        
        res.json({ message: 'Asistencia actualizada exitosamente' });
    });
};

// Eliminar una asistencia
const EliminarAsistencia = (req, res) => {
    const { id } = req.params;
    
    db.query('DELETE FROM asistencias WHERE id_asistencia = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar asistencia:', err);
            return res.status(500).json({ error: 'Error al eliminar la asistencia' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Asistencia no encontrada' });
        }
        
        res.json({ message: 'Asistencia eliminada exitosamente' });
    });
};

module.exports = {
    ObtenerAsistenciasPorAlumnoId,
    RegistrarAsistencia,
    ActualizarAsistencia,
    EliminarAsistencia
};