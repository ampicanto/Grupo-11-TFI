import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom"; // ⬅️ 1. Importar useNavigate
import axios from "axios"; // ⬅️ 2. Importar Axios para peticiones HTTP
import "./style.css";
import logo from "../assets/icono.PNG";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [captchaValido, setCaptchaValido] = useState(false);
  const [errorLogin, setErrorLogin] = useState(''); // ⬅️ Para mostrar errores de Login
  const navigate = useNavigate(); // ⬅️ 3. Inicializar el hook de navegación

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (value) => {
    // Cuando el captcha se completa con éxito, value es true
    if (value) {
      setCaptchaValido(true);
      setErrorLogin(''); // Limpiar errores si se valida el captcha
    }
  };

  // ⬅️ 4. Hacer la función asíncrona para usar 'await' con axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorLogin(''); // Limpiar errores al iniciar el intento de Login

    if (!captchaValido) {
      // ⚠️ El error estaba aquí: tu código previo solo hacía un 'alert' y 'return'.
      setErrorLogin("Por favor verifica el captcha antes de continuar.");
      return;
    }
    
    // 5. Bloque try/catch para manejar la petición al Backend
    try {
        // La URL es solo /api/usuarios/login gracias a la configuración del Proxy en vite.config.js
        const response = await axios.post('/api/usuarios/login', { 
            email: formData.email,
            // Enviamos el campo 'password' que es lo que espera tu Backend
            password: formData.password 
        });

        // Si la petición es exitosa (código 200/201), redirigimos al usuario
        console.log("Login exitoso:", response.data); 
        
        // Aquí deberías guardar el token JWT del usuario si tu API lo devuelve
        
        // 6. Redirigir a la página principal /home
        navigate('/home'); 

    } catch (error) {
        // 7. Manejo de Errores (401, 500, etc.)
        console.error("Error en la autenticación:", error);
        
        // Mostrar un mensaje de error específico (401 - Credenciales inválidas)
        setErrorLogin(error.response?.data?.error || 'Credenciales inválidas o error de red.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Iniciar Sesión</h2>
        <p>Accedé a tu cuenta</p>
        
        {/* ⬅️ Mostrar el mensaje de error si existe */}
        {errorLogin && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{errorLogin}</p>}

        <form onSubmit={handleSubmit}>
          {/* ... (Inputs de Correo y Contraseña, no cambiamos nada aquí) ... */}
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
          {/* ... (ReCAPTCHA integration) ... */}

          <div className="captcha-container">
            <ReCAPTCHA
              sitekey="6LcIcPErAAAAAEItNKo6udqJR4WpWmoa8xiBt1mD" 
              onChange={handleCaptchaChange}
            />
          </div>

          <button type="submit">Entrar</button>
        </form>

        <p className="register-text">
          ¿No tenés cuenta? <a href="#" onClick={() => navigate('/registro')}>Registrate</a> {/* ⬅️ Corregir el enlace */}
        </p>
      </div>
    </div>
  );
};