const mysql = require('mysql2');

const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Churo4553044',
    database: 'institucion'
});

conection.connect((err) => {
    if (err) {
        console.error('Error al conectar la base de datos: ', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa');
});

module.exports = conection;