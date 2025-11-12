// frontend/src/components/AlumnosList.jsx (VERSION CORREGIDA)

import React, { useState, useEffect, useCallback } from 'react'; // ⬅️ Añadir useCallback
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AlumnosList = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // 1. Encapsular la lógica de obtención en una función (usamos useCallback por buena práctica)
    const fetchAlumnos = useCallback(async () => {
        try {
            const response = await axios.get('/api/alumnos');
            setAlumnos(response.data);
            setLoading(false);
            setError(null);
        } catch (err) {
            console.error("Error al obtener alumnos:", err);
            setError('No se pudieron cargar los datos de alumnos.');
            setLoading(false);
        }
    }, []); // La dependencia vacía asegura que la función solo se cree una vez

    // 2. Usar fetchAlumnos en useEffect
    useEffect(() => {
        fetchAlumnos();
    }, [fetchAlumnos]); // ⬅️ Dependencia de fetchAlumnos (necesaria por ser de useCallback)

    if (loading) return <p>Cargando lista de alumnos...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    // Lógica para Eliminar un Alumno (CORREGIDA)
    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este alumno?")) {
            return;
        }

        try {
            await axios.delete(`/api/alumnos/${id}`);
            
            // 3. ¡Llamamos a la función recién creada!
            fetchAlumnos(); 
            
            alert("Alumno eliminado exitosamente.");
        } catch (error) {
            console.error("Error al eliminar alumno:", error);
            alert("Error al eliminar el alumno.");
        }
    };

    return (
        <div>
            {/* ... Tu JSX de la tabla está perfecto ... */}
            <h2>📝 Listado de Alumnos</h2>
            <button onClick={() => navigate('/alumnos/crear')}>
                + Agregar Nuevo Alumno
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Legajo</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Fecha Nac.</th>
                        <th>Acciones</th> {/* ⬅️ Añadir encabezado para botones */}
                    </tr>
                </thead>
                <tbody>
                    {alumnos.map(alumno => (
                        <tr key={alumno.id}>
                            <td>{alumno.legajo}</td> {/* Asumo que tienes legajo */}
                            <td>{alumno.nombre}</td>
                            <td>{alumno.apellido}</td>
                            <td>{alumno.dni}</td>
                            <td>{new Date(alumno.fecha_nacimiento).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => navigate(`/alumnos/editar/${alumno.id}`)} style={{marginRight: '10px'}}>
                                    Editar
                                </button>
                                <button onClick={() => handleDelete(alumno.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {alumnos.length === 0 && <p>No hay alumnos registrados.</p>}
        </div>
    );
};