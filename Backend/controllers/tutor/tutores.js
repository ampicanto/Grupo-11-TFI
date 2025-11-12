const db = require('../../config/dataBase');


// Obtener todos los tutores
const MostrarTutores = (req, res) => {
    db.query('SELECT * FROM padres_tutores', (err, results) => {
        if (err) {
            console.error('MostrarTutores error:', err);
            return res.status(500).json({ error: 'Error al obtener los tutores' });
        }
        res.json(results);
    });
};

// Obtener un tutor por ID
const ObtenerTutorPorId = (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID de tutor requerido' });

    db.query('SELECT * FROM padres_tutores WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('ObtenerTutorPorId error:', err);
            return res.status(500).json({ error: 'Error al obtener el tutor' });
        }
        if (!results || results.length === 0) return res.status(404).json({ error: 'Tutor no encontrado' });
        res.json(results[0]);
    });
};

// Agregar un nuevo tutor
const AgregarTutor = (req, res) => {
    const { nombre, apellido, telefono, email } = req.body;

    if (!nombre || !apellido || !telefono || !email) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    db.query(
        'INSERT INTO padres_tutores (nombre, apellido, telefono, email) VALUES (?, ?, ?, ?)',
        [nombre, apellido, telefono, email],
        (err, results) => {
            if (err) {
                console.error('AgregarTutor error:', err);
                return res.status(500).json({ error: 'Error al agregar el tutor' });
            }
            res.status(201).json({ message: 'Tutor agregado exitosamente', id: results.insertId });
        }
    );
};

// Actualizar un tutor
const ActualizarTutor = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, email } = req.body;

    if (!id) return res.status(400).json({ error: 'ID de tutor requerido' });
    if (!nombre || !apellido || !telefono || !email) {
        return res.status(400).json({ error: 'Faltan datos obligatorios para actualizar' });
    }

    db.query(
        'UPDATE padres_tutores SET nombre = ?, apellido = ?, telefono = ?, email = ? WHERE id = ?',
        [nombre, apellido, telefono, email, id],
        (err, results) => {
            if (err) {
                console.error('ActualizarTutor error:', err);
                return res.status(500).json({ error: 'Error al actualizar el tutor' });
            }
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Tutor no encontrado' });
            res.json({ message: 'Tutor actualizado exitosamente' });
        }
    );
};

// Eliminar un tutor
const EliminarTutor = (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID de tutor requerido' });

    db.query('DELETE FROM padres_tutores WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('EliminarTutor error:', err);
            return res.status(500).json({ error: 'Error al eliminar el tutor' });
        }
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Tutor no encontrado' });
        res.json({ message: 'Tutor eliminado exitosamente' });
    });
};

module.exports = {
    MostrarTutores,
    ObtenerTutorPorId,
    AgregarTutor,
    ActualizarTutor,
    EliminarTutor,
};