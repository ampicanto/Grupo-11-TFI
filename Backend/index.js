const express = require('express');
const cors = require('cors');
const tutorRoutes = require('./routers/tutor/tutor');
const profesorRoutes = require('./routers/profesor/profesor');
const alumnoRoutes = require('./routers/alumno/alumno');    
const usuarioRoutes = require('./routers/usuarios');


const app = express();
app.use(cors());
app.use(express.json());


// Rutas
app.use('/api/tutores', tutorRoutes);
app.use('/api/profesores', profesorRoutes);
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Puerto de escucha
app.listen(8000, () => console.log('Servidor corriendo en el puerto 8000'));