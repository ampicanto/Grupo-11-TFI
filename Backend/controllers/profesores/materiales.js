const db = require('../../config/dataBase'); 

//  Obtener todos los materiales de estudio
const MostrarMateriales = (req, res) => {
    const query = 'SELECT * FROM materiales_estudio';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los materiales:', err);
            return res.status(500).json({ error: 'Error al obtener los materiales' });
        }
        res.json(results);
    });
};

//  Obtener un material por ID
const MostrarMaterialPorId = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM materiales_estudio WHERE id_material = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener el material:', err);
            return res.status(500).json({ error: 'Error al obtener el material' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Material no encontrado' });
        }
        res.json(result[0]);
    });
};

// Crear un nuevo material
const CrearMaterial = (req, res) => {
    const { id_asignacion, titulo, descripcion, archivo_url, fecha_subida } = req.body;

    if (!id_asignacion || !titulo || !descripcion || !archivo_url || !fecha_subida) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = `
        INSERT INTO materiales_estudio (id_asignacion, titulo, descripcion, archivo_url, fecha_subida)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [id_asignacion, titulo, descripcion, archivo_url, fecha_subida], (err, result) => {
        if (err) {
            console.error('Error al crear el material:', err);
            return res.status(500).json({ error: 'Error al crear el material' });
        }
        res.status(201).json({ message: 'Material creado exitosamente', id: result.insertId });
    });
};

// Actualizar un material existente
const ActualizarMaterial = (req, res) => {
    const { id } = req.params;
    const { id_asignacion, titulo, descripcion, archivo_url, fecha_subida } = req.body;

    const query = `
        UPDATE materiales_estudio
        SET id_asignacion = ?, titulo = ?, descripcion = ?, archivo_url = ?, fecha_subida = ?
        WHERE id_material = ?
    `;
    db.query(query, [id_asignacion, titulo, descripcion, archivo_url, fecha_subida, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el material:', err);
            return res.status(500).json({ error: 'Error al actualizar el material' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Material no encontrado' });
        }
        res.json({ message: 'Material actualizado correctamente' });
    });
};

//  Eliminar un material
const EliminarMaterial = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM materiales_estudio WHERE id_material = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el material:', err);
            return res.status(500).json({ error: 'Error al eliminar el material' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Material no encontrado' });
        }
        res.json({ message: 'Material eliminado correctamente' });
    });
};

module.exports = {
    MostrarMateriales,
    MostrarMaterialPorId,
    CrearMaterial,
    ActualizarMaterial,
    EliminarMaterial
};
