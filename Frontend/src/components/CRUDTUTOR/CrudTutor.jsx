import React, { useState, useEffect } from "react";
import "../../CSS/tutor.css";

const PanelTutor = () => {
  const [activeSection, setActiveSection] = useState("asistencia");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedAlumno, setSelectedAlumno] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);

  const idTutor = 1; // ejemplo, esto vendría del login o JWT

  // ===== Obtener alumnos del tutor =====
  useEffect(() => {
    fetch(`http://localhost:8000/api/tutores/${idTutor}/alumnos`)
      .then((res) => res.json())
      .then((data) => {
        setAlumnos(data);
        if (data.length > 0) setSelectedAlumno(data[0]); // selecciona el primero
      })
      .catch((err) => console.error("Error al cargar alumnos:", err));
  }, [idTutor]);

  // ===== Cargar datos del alumno seleccionado =====
  useEffect(() => {
    if (!selectedAlumno) return;

    // Asistencias
    fetch(`http://localhost:8000/api/asistencias/${selectedAlumno.id_alumno}`)
      .then((res) => res.json())
      .then(setAsistencias)
      .catch((err) => console.error("Error en asistencias:", err));

    // Calificaciones
    fetch(`http://localhost:8000/api/calificaciones/${selectedAlumno.id_alumno}`)
      .then((res) => res.json())
      .then(setCalificaciones)
      .catch((err) => console.error("Error en calificaciones:", err));

    // Tareas
    fetch(`http://localhost:8000/api/tareas/${selectedAlumno.id_alumno}`)
      .then((res) => res.json())
      .then(setTareas)
      .catch((err) => console.error("Error en tareas:", err));

    // Notificaciones (pueden ser del tutor)
    fetch(`http://localhost:8000/api/notificaciones/${idTutor}`)
      .then((res) => res.json())
      .then(setNotificaciones)
      .catch((err) => console.error("Error en notificaciones:", err));
  }, [selectedAlumno]);

  return (
    <div className="container">
      {/* Botón hamburguesa */}
      <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>

      {/* ===== SIDEBAR ===== */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <h2>Aula Virtual</h2>
        <ul>
          <li>
            <button
              onClick={() => setActiveSection("asistencia")}
              className={activeSection === "asistencia" ? "active" : ""}
            >
              Asistencia
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("calificaciones")}
              className={activeSection === "calificaciones" ? "active" : ""}
            >
              Calificaciones
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("tareas")}
              className={activeSection === "tareas" ? "active" : ""}
            >
              Tareas
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("notificaciones")}
              className={activeSection === "notificaciones" ? "active" : ""}
            >
              Notificaciones
            </button>
          </li>
        </ul>
      </aside>

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <main className="main-content">
        <div className="header">
          <h1>
            BIENVENIDO/A{" "}
            <span>
              TUTOR/A DE {selectedAlumno ? selectedAlumno.nombre : "—"}
            </span>
          </h1>

          {/* Selector de alumno */}
          <div className="alumno-selector">
            <label htmlFor="alumno">Cambiar alumno:</label>
            <select
              id="alumno"
              value={selectedAlumno?.id_alumno || ""}
              onChange={(e) => {
                const alumno = alumnos.find(
                  (a) => a.id_alumno === parseInt(e.target.value)
                );
                setSelectedAlumno(alumno);
              }}
            >
              {alumnos.map((alumno) => (
                <option key={alumno.id_alumno} value={alumno.id_alumno}>
                  {alumno.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ===== SECCIONES ===== */}
        {activeSection === "asistencia" && (
          <section className="section">
            <h3>📋 Asistencia</h3>
            <div className="grid">
              {asistencias.length > 0 ? (
                asistencias.map((a) => (
                  <div className="card" key={a.id_materia}>
                    <h4>{a.materia}</h4>
                    <p>{a.presentes} de {a.total} asistencias</p>
                  </div>
                ))
              ) : (
                <p>No hay registros de asistencia.</p>
              )}
            </div>
          </section>
        )}

        {activeSection === "calificaciones" && (
          <section className="section">
            <h3>📚 Calificaciones</h3>
            <div className="grid">
              {calificaciones.length > 0 ? (
                calificaciones.map((c) => (
                  <div className="card" key={c.id_materia}>
                    <h4>{c.materia}</h4>
                    <p>Promedio: {c.promedio}</p>
                  </div>
                ))
              ) : (
                <p>No hay calificaciones registradas.</p>
              )}
            </div>
          </section>
        )}

        {activeSection === "tareas" && (
          <section className="section">
            <h3>📝 Tareas</h3>
            <div className="grid">
              {tareas.length > 0 ? (
                tareas.map((t) => (
                  <div className="card" key={t.id_tarea}>
                    <h4>{t.titulo}</h4>
                    <p>{t.estado}</p>
                  </div>
                ))
              ) : (
                <p>No hay tareas disponibles.</p>
              )}
            </div>
          </section>
        )}

        {activeSection === "notificaciones" && (
          <section className="section">
            <h3>🔔 Notificaciones</h3>
            <div className="grid">
              {notificaciones.length > 0 ? (
                notificaciones.map((n) => (
                  <div className="card" key={n.id_notificacion}>
                    <h4>{n.titulo}</h4>
                    <p>{n.descripcion}</p>
                  </div>
                ))
              ) : (
                <p>No hay notificaciones nuevas.</p>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default PanelTutor;
