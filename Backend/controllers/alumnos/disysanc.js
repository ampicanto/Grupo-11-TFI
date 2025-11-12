const db = require('../config/dataBase');

// Obtener sanciones de un alumno por su ID
const ObtenerSancionesPorAlumnoId = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT s.id_sancion, s.tipo_sancion, s.motivo, s.fecha,
               d.nombre as docente_nombre
        FROM sanciones s
        INNER JOIN docentes d ON s.docente_responsable = d.id_docente
        WHERE s.id_alumno = ?
        ORDER BY s.fecha DESC
    `;
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error al obtener las sanciones' });
        }
        res.json(results);
    });
};

// Registrar nueva sanción
const RegistrarSancion = (req, res) => {
    const { id_alumno, tipo_sancion, motivo, fecha, docente_responsable } = req.body;
    
    // Validar campos requeridos
    if (!id_alumno || !tipo_sancion || !motivo || !fecha || !docente_responsable) {
        return res.status(400).json({ 
            error: 'Todos los campos son requeridos' 
        });
    }

    const query = `
        INSERT INTO sanciones 
        (id_alumno, tipo_sancion, motivo, fecha, docente_responsable) 
        VALUES (?, ?, ?, ?, ?)
    `;
    
    db.query(query, [id_alumno, tipo_sancion, motivo, fecha, docente_responsable], (err, result) => {
        if (err) {
            console.error('Error al registrar sanción:', err);
            return res.status(500).json({ error: 'Error al registrar la sanción' });
        }
        
        res.status(201).json({
            message: 'Sanción registrada exitosamente',
            id_sancion: result.insertId
        });
    });
};

// Actualizar una sanción existente
const ActualizarSancion = (req, res) => {
    const { id } = req.params;
    const { tipo_sancion, motivo } = req.body;

    if (!tipo_sancion || !motivo) {
        return res.status(400).json({ 
            error: 'Tipo de sanción y motivo son requeridos' 
        });
    }

    const query = 'UPDATE sanciones SET tipo_sancion = ?, motivo = ? WHERE id_sancion = ?';
    
    db.query(query, [tipo_sancion, motivo, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar sanción:', err);
            return res.status(500).json({ error: 'Error al actualizar la sanción' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Sanción no encontrada' });
        }
        
        res.json({ message: 'Sanción actualizada exitosamente' });
    });
};

// Eliminar una sanción
const EliminarSancion = (req, res) => {
    const { id } = req.params;
    
    db.query('DELETE FROM sanciones WHERE id_sancion = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar sanción:', err);
            return res.status(500).json({ error: 'Error al eliminar la sanción' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Sanción no encontrada' });
        }
        
        res.json({ message: 'Sanción eliminada exitosamente' });
    });
};

module.exports = {
    ObtenerSancionesPorAlumnoId,
    RegistrarSancion,
    ActualizarSancion,
    EliminarSancion
};