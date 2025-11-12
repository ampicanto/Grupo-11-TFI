// frontend/src/components/Registro.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "../components/style.css"; // Usa el mismo CSS
import logo from "../assets/icono.PNG"; 

export const Registro = () => {
    const navigate = useNavigate();
    
    // Estados para los campos de registro
    const [formData, setFormData] = useState({ 
        nombre: "", 
        apellido: "", 
        email: "", 
        password: "", 
        confirmPassword: "" // Para validar que las contraseñas coincidan
    });
    
    const [errorRegistro, setErrorRegistro] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorRegistro('');
        setMensajeExito('');

        // 1. Validación local de contraseñas
        if (formData.password !== formData.confirmPassword) {
            setErrorRegistro("Las contraseñas no coinciden.");
            return;
        }

        // Preparamos los datos para enviar al Backend
        const userData = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email,
            password: formData.password,
            // ⚠️ NOTA: El rol y el estado deben ser definidos por defecto en el Backend
            // Pero si el Backend los requiere, podemos enviarlos aquí
            id_rol: 1, // Asumiendo que el rol 1 es un rol por defecto (ej: Administrador o Usuario básico)
            estado: 'Activo'
        };

        // 2. Llamada a la API para registrar el usuario (la función AgregarUsuario)
        try {
            // Usamos la ruta que configuramos en tu router: /api/usuarios/registro
            const { data } = await axios.post('/api/usuarios/registro', userData);

            // Usar el mensaje que pueda venir del backend si existe
            setMensajeExito(data?.message ? `${data.message} Serás redirigido al inicio de sesión.` : "¡Registro exitoso! Serás redirigido al inicio de sesión.");
            
            // 3. Redirigir al Login después de un breve retraso
            setTimeout(() => {
                navigate('/'); 
            }, 2000); 

        } catch (error) {
            console.error("Error en el registro:", error);
            // Manejo de error: ej. si el email ya existe
            setErrorRegistro(error.response?.data?.error || 'Error al intentar registrar el usuario. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <img src={logo} alt="Logo" className="login-logo" />
                <h2>Registrarse</h2>
                <p>Crea tu nueva cuenta</p>

                {mensajeExito && <p style={{ color: 'green', textAlign: 'center', fontWeight: 'bold' }}>{mensajeExito}</p>}
                {errorRegistro && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{errorRegistro}</p>}

                <form onSubmit={handleSubmit}>
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />

                    <label>Apellido</label>
                    <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                    
                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="tu@correo.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="*******"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    
                    <label>Confirmar Contraseña</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="*******"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Crear Cuenta</button>
                </form>

                <p className="register-text">
                    ¿Ya tenés cuenta? <a href="#" onClick={() => navigate('/')}>Inicia Sesión</a>
                </p>
            </div>
        </div>
    );
};
