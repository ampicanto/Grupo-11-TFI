const db = require('../../config/dataBase');


// obterner alumnos

const MostrarAlumnos = (req, res) => {
    db.query('SELECT * FROM alumnos', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener los alumnos' });
        res.json(results);
    });
};

// Obtener un alumno por ID

const ObtenerAlumnoPorId = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM alumnos WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener el alumno' });
        if (results.length === 0) return res.status(404).json({ error: 'Alumno no encontrado' });
        res.json(results[0]);
    });
};

// Agregar un nuevo alumno

const AgregarAlumno = (req, res) => {
    const { legajo, nombre, apellido, dni, fecha_nacimiento } = req.body;

     if (!legajo || !nombre || !apellido || !dni || !fecha_nacimiento) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
   db.query('INSERT INTO alumnos (legajo, nombre, apellido, dni, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)',
    [legajo, nombre, apellido, dni, fecha_nacimiento], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al agregar el alumno' });
        res.status(201).json({ message: 'Alumno agregado exitosamente', id: results.insertId });
    });

};




// actualizar un alumno
const ActualizarAlumno = (req, res) => {
    const { id } = req.params;
    const { legajo, nombre, apellido, dni, fecha_nacimiento } = req.body;
    db.query('UPDATE alumnos SET legajo = ?, nombre = ?, apellido = ?, dni = ?, fecha_nacimiento = ? WHERE id = ?',
    [legajo, nombre, apellido, dni, fecha_nacimiento, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar el alumno' });
        res.json({ message: 'Alumno actualizado exitosamente' });
    });
}

//eliminar un alumno
const EliminarAlumno = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM alumnos WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar el alumno' });
        res.json({ message: 'Alumno eliminado exitosamente' });
    });
} ; 








// Exportar las funciones
module.exports = {
    MostrarAlumnos,
    ObtenerAlumnoPorId,
    AgregarAlumno,
    ActualizarAlumno,
    EliminarAlumno
};