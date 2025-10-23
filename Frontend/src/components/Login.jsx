import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "../css/style.css";
import logo from "../assets/icono.PNG";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [captchaValido, setCaptchaValido] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (value) => {
    if (value) setCaptchaValido(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaValido) {
      alert("Por favor verifica el captcha antes de continuar.");
      return;
    }
    console.log("Datos enviados:", formData);
  };

  const handleRegistroClick = () => {
    navigate('/registro');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Iniciar Sesión</h2>
        <p>Accedé a tu cuenta</p>

        <form onSubmit={handleSubmit}>
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

          <div className="captcha-container">
            <ReCAPTCHA
              sitekey="6LcIcPErAAAAAEItNKo6udqJR4WpWmoa8xiBt1mD" 
              onChange={handleCaptchaChange}
            />
          </div>

          <button type="submit">Entrar</button>
        </form>

        <p className="register-text">
          ¿No tenés cuenta? <button 
            onClick={handleRegistroClick} 
            style={{ 
              background: 'none', 
              border: 'none', 
              padding: 0, 
              color: '#f7f7f7ff', 
              textDecoration: 'underline', 
              cursor: 'pointer' 
            }}>
            Registrate
          </button>
        </p>
      </div>
    </div>
  );
};
