// frontend/src/App.jsx (MODIFICADO)
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import { Home } from "./Pages/Home";
import { Registro } from "./Pages/Registro";
import { AlumnosList } from "./components/CRUDALUMNO/AlumnosList";
import { AlumnoForm } from "./components/CRUDALUMNO/AlumnoForm";
import {Navbar} from "./components/Navbar.jsx";
import {Hero} from "./components/Hero.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/alumnos" element={<AlumnosList />} />
        <Route path="/alumnos/crear" element={<AlumnoForm />} />
        <Route path="/alumnos/editar/:id" element={<AlumnoForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </div>
  );
}

export default App;