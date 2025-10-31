// frontend/src/main.jsx (MODIFICADO)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// ⚠️ IMPORTAMOS BrowserRouter ⚠️
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ⚠️ ENVOLVEMOS LA APP EN EL ROUTER ⚠️ */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </StrictMode>,
)