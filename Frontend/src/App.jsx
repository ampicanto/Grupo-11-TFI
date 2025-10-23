import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Registro } from "./components/Registro";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
