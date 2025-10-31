// frontend/src/App.jsx (MODIFICADO)
import { Routes, Route } from "react-router-dom"; // Importamos Routes y Route
import { Login } from "./components/Login";
import { Home } from "./components/Home"; // Importamos la nueva Home
import { Registro } from "./components/Registro";
import { AlumnosList } from "./components/AlumnosList";
import { AlumnoForm } from "./components/AlumnoForm";

function App() {
  return (
    <Routes>
      {/* Ruta raíz: muestra el componente Login */}
      <Route path="/" element={<Login />} /> 
      
      <Route path="/registro" element={<Registro />} /> {/* ⬅️ Nueva Ruta */}

      <Route path="/alumnos" element={<AlumnosList />} />
      
      <Route path="/alumnos/crear" element={<AlumnoForm />} />
      <Route path="/alumnos/editar/:id" element={<AlumnoForm />} />
      
      {/* Ruta /home: muestra el componente Home (después del login) */}
      <Route path="/home" element={<Home />} /> 
      
      {/* Podrías añadir otras rutas como /alumnos, /profesores aquí */}
      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
}
export default App;