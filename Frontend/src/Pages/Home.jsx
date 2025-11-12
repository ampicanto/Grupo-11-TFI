// frontend/src/components/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // ⬅️ Importar Link

export const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenido al Panel Escolar</h1>
      <p>¡Has iniciado sesión correctamente!</p>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Módulos</h2>
        {/* ⬅️ ENLACE A LA VISTA DE ALUMNOS */}
        <Link 
            to="/alumnos" 
            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}
        >
            Ir al Listado de Alumnos
        </Link>
        {/* Aquí irían otros enlaces: /profesores, /tutores, etc. */}
      </div>
    </div>
  );
};