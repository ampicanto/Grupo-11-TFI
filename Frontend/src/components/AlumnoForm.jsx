// frontend/src/components/AlumnoForm.jsx - Lógica Completa para CREAR y EDITAR

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // ⬅️ Importar useParams

export const AlumnoForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // ⬅️ Obtener el ID de la URL
    
    const [formData, setFormData] = useState({
        legajo: '', 
        nombre: '', 
        apellido: '', 
        dni: '', 
        fecha_nacimiento: ''
    });
    const [mensaje, setMensaje] = useState(null);
    const [cargando, setCargando] = useState(id ? true : false); // Estado de carga para la edición

    // 1. Efecto para Cargar Datos en MODO EDICIÓN
    useEffect(() => {
        if (id) {
            const fetchAlumno = async () => {
                try {
                    // Llama a la ruta GET que configuraste en backend/routers/alumno/alumno.js (GET por ID)
                    const response = await axios.get(`/api/alumnos/${id}`);
                    const data = response.data;
                    
                    // Formatear la fecha para el input type="date"
                    if (data.fecha_nacimiento) {
                        data.fecha_nacimiento = data.fecha_nacimiento.split('T')[0];
                    }
                    setFormData(data);
                    setCargando(false);
                } catch (error) {
                    console.error("Error al cargar alumno para edición:", error);
                    setMensaje({ type: 'error', text: 'Error al cargar los datos del alumno.' });
                    setCargando(false);
                }
            };
            fetchAlumno();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 2. Función de Envío Única para CREAR o EDITAR
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);

        try {
            if (id) {
                // MODO EDICIÓN: Usamos PUT/PATCH
                const response = await axios.put(`/api/alumnos/${id}`, formData); 
                setMensaje({ type: 'success', text: response.data.message || 'Alumno actualizado exitosamente.' });
            } else {
                // MODO CREACIÓN: Usamos POST
                const response = await axios.post('/api/alumnos', formData); 
                setMensaje({ type: 'success', text: response.data.message || 'Alumno agregado exitosamente.' });
            }
            
            // Redirigir a la lista de alumnos
            setTimeout(() => {
                navigate('/alumnos');
            }, 1500);

        } catch (error) {
            console.error(id ? "Error al actualizar alumno:" : "Error al crear alumno:", error);
            setMensaje({ type: 'error', text: error.response?.data?.error || 'Error desconocido al procesar el alumno.' });
        }
    };

    // 3. Renderizado del Formulario
    if (cargando) {
        return <div className="form-container">Cargando datos...</div>;
    }

    return (
        <div className="form-container">
            <h2>{id ? `Editar Alumno ID: ${id}` : 'Crear Nuevo Alumno'}</h2>
            {mensaje && (
                <p style={{ color: mensaje.type === 'success' ? 'green' : 'red', fontWeight: 'bold' }}>
                    {mensaje.text}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                {/* Inputs para cada campo */}
                <label>Legajo:</label> <input type="text" name="legajo" value={formData.legajo} onChange={handleChange} required />
                <label>Nombre:</label> <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                <label>Apellido:</label> <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
                <label>DNI:</label> <input type="text" name="dni" value={formData.dni} onChange={handleChange} required />
                <label>Fecha Nacimiento:</label> <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required />
                
                <button type="submit">{id ? 'Guardar Cambios' : 'Guardar Alumno'}</button>
                <button type="button" onClick={() => navigate('/alumnos')} style={{ marginLeft: '10px' }}>Cancelar</button>
            </form>
        </div>
    );
};