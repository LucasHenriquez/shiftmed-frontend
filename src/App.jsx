import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [vistaActual, setVistaActual] = useState('landing');
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  if (vistaActual === 'dashboard') {
    return <DashboardPage setVistaActual={setVistaActual} usuarioActivo={usuarioActivo} setUsuarioActivo={setUsuarioActivo} />;
  }

  if (vistaActual === 'login') {
    return <LoginPage setVistaActual={setVistaActual} setUsuarioActivo={setUsuarioActivo} />;
  }

  return <LandingPage setVistaActual={setVistaActual} />;
}

// ESTILOS GLOBALES
const styles = `
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes fadeInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .animation-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
  .animation-fadeInDown { animation: fadeInDown 1s ease-out forwards; }
  .animation-fadeInLeft { animation: fadeInLeft 1s ease-out forwards; }
  .animation-fadeInRight { animation: fadeInRight 1s ease-out forwards; }
  .animation-fadeIn { animation: fadeIn 0.3s ease-out forwards; }

  .animation-delay-100 { animation-delay: 100ms; }
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-400 { animation-delay: 400ms; }
  .animation-delay-500 { animation-delay: 500ms; }

  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  /* MAGIA DEL RADAR */
  .radar-sweep {
    background: conic-gradient(from 0deg, transparent 75%, rgba(16, 185, 129, 0.6) 100%);
    animation: radarSpin 3s linear infinite;
    border-radius: 50%;
  }
  @keyframes radarSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animation-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;

if (typeof document !== 'undefined') { 
  const styleSheet = document.createElement("style"); 
  styleSheet.type = "text/css"; 
  styleSheet.innerText = styles; 
  document.head.appendChild(styleSheet); 
}

export default App;