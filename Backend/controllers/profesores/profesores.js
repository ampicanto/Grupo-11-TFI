const db = require('../../config/dataBase');



// obterner profesores

const MostrarProfesores = (req, res) => {
    db.query('SELECT * FROM docentes', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener los profesores' });
        res.json(results);
    });
};


// Obtener un profesor por ID

const ObtenerProfesorPorId = (req, res) => {
    const { id } = req.params;  
    db.query('SELECT * FROM docentes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener el profesor' });
        if (results.length === 0) return res.status(404).json({ error: 'Profesor no encontrado' });
        res.json(results[0]);
    });
}


// Agregar un nuevo profesor
const AgregarProfesor = (req, res) => {
    const { nombre, apellido, titulo, especialidad } = req.body;
        if (!legajo || !nombre || !apellido || !dni || !fecha_nacimiento) {

        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }   
    db.query('INSERT INTO docentes (nombre, apellido, titulo, especialidad) VALUES (?, ?, ?, ?, ?)',
    [legajo, nombre, apellido, dni, fecha_nacimiento], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al agregar el profesor' });
        res.status(201).json({ message: 'Profesor agregado exitosamente', id: results.insertId });
    });
};  


// actualizar un profesor
const ActualizarProfesor = (req, res) => {
    const { id } = req.params;
    const { legajo, nombre, apellido, dni, fecha_nacimiento } = req.body;
    db.query('UPDATE docentes SET  nombre = ?, apellido = ?, titulo = ?, especialidad = ? WHERE id = ?',
    [legajo, nombre, apellido, dni, fecha_nacimiento, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar el profesor' });
        res.json({ message: 'Profesor actualizado exitosamente' });
    });
}

//eliminar un profesor
const EliminarProfesor = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM docentes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar el profesor' });
        res.json({ message: 'Profesor eliminado exitosamente' });
    });
};

module.exports = {
    MostrarProfesores,
    ObtenerProfesorPorId,
    AgregarProfesor,
    ActualizarProfesor,
    EliminarProfesor
};