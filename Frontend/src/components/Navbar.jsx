import { Link } from 'react-router-dom';
import Logo from '../assets/LOGO BLANCO.png'
import '../CSS/NavBar.css'

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="nombre">Aula Virtual</h1>
        <div className="navbar-links">
          <Link to="/home" className="navbar-link">Inicio</Link>
          <Link to="/registro" className="navbar-link">Registro</Link>
          <Link to="/login" className="navbar-link">Iniciar Sesion</Link>
        </div>
      </div>
    </nav>

  
  );
};

export default Navbar;