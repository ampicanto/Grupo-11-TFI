const db = require('../../config/dataBase');


// Obtener todos los alumnos

const MostrarTutores = (req, res) => {
    db.query('SELECT * FROM padres_tutores', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener los tutores' });
        res.json(results);
    });
};

// Obtener un tutor por ID  
const ObtenerTutorPorId = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM padres_tutores WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener el tutor' });
        if (results.length === 0) return res.status(404).json({ error: 'Tutor no encontrado' });
        res.json(results[0]);
    });
};

// Agregar un nuevo tutor   
const AgregarTutor = (req, res) => {
    const { nombre, apellido, telefono, email} = req.body;

     if (!nombre || !apellido || !telefono || !email) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
    db.query('INSERT INTO padres_tutores (nombre, apellido, telefono, email) VALUES (?, ?, ?, ?)',
    [nombre, apellido, telefono, email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al agregar el tutor' });
        res.status(201).json({ message: 'Tutor agregado exitosamente', id: results.insertId });
    });
};


// actualizar un tutor
const ActualizarTutor = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, email } = req.body; 
    db.query('UPDATE padres_tutores SET nombre = ?, apellido = ?, telefono = ?, email = ? WHERE id = ?',
    [nombre, apellido, telefono, email, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar el tutor' });
        res.json({ message: 'Tutor actualizado exitosamente' });
    });
}

//eliminar un tutor
const EliminarTutor = (req, res) => {
    const { id } = req.params;  
    db.query('DELETE FROM padres_tutores WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar el tutor' });
        res.json({ message: 'Tutor eliminado exitosamente' });
    });
}

module.exports = {
    MostrarTutores,
    ObtenerTutorPorId,
    AgregarTutor,
    ActualizarTutor,
    EliminarTutor
};