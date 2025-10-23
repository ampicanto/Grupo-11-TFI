import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/styler.css';
import  logo from "../assets/icono.PNG";

export const Registro = () => {
  const navigate = useNavigate();
  
  return (
    <div className="caja">
      
       <h1 className='img'><img src={logo} alt="Logo" className="login-logo" /></h1>
      
      <h2 className="titulo">Bienvenido al Sistema de Gestión Escolar</h2>
        <p>Escuela Municipal Monseñor de Gregorio de jesus Diaz</p>
      <button className='profe'> PROFESOR/A 👨‍🏫 </button>
        <button className='estu'> ESTUDIANTE 👩‍🎓👨‍🎓 </button>
        <button className='tuto'> TUTOR 👩🏼‍🤝‍🧑🏻 </button>
        <button className='but'> VOLVER AL INICIO «–  </button>
    
    </div>
  );
};
