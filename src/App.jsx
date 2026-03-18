import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* 🌐 BARRA DE NAVEGACIÓN (HEADER) */}
      <nav className="bg-shiftmed-dark text-white py-4 px-8 flex justify-between items-center shadow-md sticky top-0 z-50">
        <div className="text-3xl font-bold tracking-wider cursor-pointer">
          <span className="text-shiftmed-green">Shift</span>Med
        </div>
        <div className="hidden lg:flex space-x-8 text-sm font-medium">
          <a href="#inicio" className="hover:text-shiftmed-green transition duration-300">Inicio</a>
          <a href="#como-funciona" className="hover:text-shiftmed-green transition duration-300">Cómo Funciona</a>
          <a href="#tecnologia" className="hover:text-shiftmed-green transition duration-300">Tecnología GPS</a>
        </div>
        <button className="bg-shiftmed-green hover:bg-emerald-400 text-white px-6 py-2 rounded-full font-bold transition transform hover:scale-105">
          Ingresar
        </button>
      </nav>

      {/* 🚀 1. SECCIÓN PORTADA (HERO) */}
      <section id="inicio" className="container mx-auto px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Columna Izquierda: Textos y Botones */}
        <div className="w-full lg:w-3/5 space-y-6 flex-shrink-0">
          <span className="inline-block bg-emerald-100 text-shiftmed-green px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide shadow-sm">
            ⚡ Plataforma de Staffing Inteligente
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
            Cubre turnos médicos en <span className="text-shiftmed-green">minutos</span>, no en días.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
            Conecta las necesidades de tu centro de salud con especialistas validados cercanos a ti. Tecnología GPS para decisiones inmediatas y cobertura eficiente.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
            <button className="bg-shiftmed-dark hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-xl transform hover:-translate-y-1">
              Registrar mi Clínica
            </button>
            <button className="bg-white border-2 border-slate-200 hover:border-shiftmed-green hover:text-shiftmed-green text-slate-700 px-8 py-4 rounded-xl font-bold text-lg transition shadow-sm">
              Soy Profesional
            </button>
          </div>
        </div>

        {/* CONTENEDOR DERECHO ESTABILIZADO (MOCKUP CELULAR) */}
        <div className="w-full sm:w-[380px] lg:w-[420px] aspect-square flex-shrink-0 mt-16 lg:mt-0 flex justify-center items-center bg-gray-100 rounded-3xl p-8 border border-gray-200">
          <div className="w-full max-w-sm h-full bg-slate-100 rounded-[2.5rem] shadow-2xl border-[10px] border-slate-800 relative flex flex-col items-center justify-center p-5 overflow-hidden aspect-[9/16]">
            {/* Notch */}
            <div className="absolute top-0 w-32 h-6 bg-slate-800 rounded-b-2xl z-10"></div> 
            
            {/* Tarjeta de Alerta Falsa */}
            <div className="bg-white w-full rounded-2xl p-4 shadow-xl border border-slate-100 transform transition duration-500 hover:scale-105 mt-10 z-20 cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-shiftmed-dark rounded-full flex items-center justify-center text-xl shadow-inner">👨‍⚕️</div>
                <div>
                  <p className="font-extrabold text-slate-900 leading-tight">¡Turno Encontrado!</p>
                  <p className="text-xs text-slate-500 font-medium">Medicina Interna</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center mb-4 border border-slate-100">
                <p className="text-sm font-bold text-slate-800">Clínica San Miguel</p>
                <div className="flex items-center justify-center space-x-1 mt-1">
                  <span className="text-shiftmed-green">📍</span>
                  <p className="text-xs font-bold text-shiftmed-green uppercase tracking-wide">
                    A solo 0.51 km de ti
                  </p>
                </div>
              </div>
              <button className="w-full bg-shiftmed-green text-white text-sm font-bold py-3 rounded-xl transition shadow-md">
                Aceptar Turno
              </button>
            </div>
            {/* Fondo decorativo celular */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-200 to-transparent z-0 rounded-b-[2rem]"></div>
          </div>
        </div>
      </section>

      {/* 🏢 2. BARRA DE CONFIANZA */}
      <div className="bg-white border-y border-slate-200 py-10">
        <div className="container mx-auto px-8 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Optimizando la gestión en centros de excelencia</p>
          <div className="flex justify-center items-center space-x-12 opacity-50 grayscale flex-wrap gap-y-4">
            <h3 className="text-xl font-black">🏥 Clínica RedSalud</h3>
            <h3 className="text-xl font-black">✚ IntegraMédica</h3>
            <h3 className="text-xl font-black">⚕️ Bupa</h3>
            <h3 className="text-xl font-black">🏥 Hospital Clínico</h3>
          </div>
        </div>
      </div>

      {/* ⚖️ 3. EL PROBLEMA VS SOLUCIÓN */}
      <section id="como-funciona" className="container mx-auto px-8 py-24">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6">El staffing médico tradicional está roto.</h2>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto leading-relaxed">Ya basta de coordinar turnos por grupos de WhatsApp, lidiar con cancelaciones de último minuto y agencias lentas. ShiftMed automatiza todo el proceso.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner">⏳</div>
            <h3 className="text-2xl font-bold mb-4">Adiós Búsqueda Manual</h3>
            <p className="text-slate-600 leading-relaxed">No pierdas más horas llamando a listas de contactos desactualizadas. Publica el turno y deja que el algoritmo trabaje.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner">🛡️</div>
            <h3 className="text-2xl font-bold mb-4">Perfiles 100% Verificados</h3>
            <p className="text-slate-600 leading-relaxed">Accede al historial, especialidad y ranking de desempeño de cada profesional antes de aceptarlo en tu centro.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border-b-8 border-b-shiftmed-green">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner">🎯</div>
            <h3 className="text-2xl font-bold mb-4">Match Inteligente</h3>
            <p className="text-slate-600 leading-relaxed">Nuestro sistema notifica instantáneamente a los especialistas disponibles más cercanos a tu ubicación actual.</p>
          </div>
        </div>
      </section>

      {/* 🧠 4. LA JOYA DE LA CORONA ESTABILIZADA (HUB GPS) */}
      <section id="tecnologia" className="bg-shiftmed-dark text-white py-28">
        <div className="container mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <span className="text-shiftmed-green font-bold tracking-widest uppercase text-sm mb-2 block">Tecnología de Vanguardia</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Asignación inteligente con precisión milimétrica.</h2>
            <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl">
              No enviamos alertas masivas que nadie lee. Nuestro algoritmo de vanguardia cruza especialidades, disponibilidad y ejecuta cálculos de <strong>distancia Haversine en tiempo real</strong>. Solo notificamos a los médicos que están a minutos de tu centro, asegurando respuestas en tiempo récord.
            </p>
            <ul className="space-y-5">
              <li className="flex items-center space-x-4">
                <span className="bg-shiftmed-green p-1.5 rounded-full text-xs flex-shrink-0">✔️</span>
                <span className="font-medium">Cálculo de rutas y distancias en vivo.</span>
              </li>
              <li className="flex items-center space-x-4">
                <span className="bg-shiftmed-green p-1.5 rounded-full text-xs flex-shrink-0">✔️</span>
                <span className="font-medium">Filtro automático por especialidad requerida.</span>
              </li>
              <li className="flex items-center space-x-4">
                <span className="bg-shiftmed-green p-1.5 rounded-full text-xs flex-shrink-0">✔️</span>
                <span className="font-medium">Reducción del 80% en tiempos de contratación.</span>
              </li>
            </ul>
          </div>
          
          {/* SIMULACIÓN RADAR GPS ESTABILIZADA */}
          <div className="w-full lg:w-1/2 flex justify-center items-center flex-shrink-0">
             <div className="w-full max-w-sm lg:max-w-md aspect-square bg-slate-800 rounded-3xl border border-slate-700 relative overflow-hidden shadow-2xl flex items-center justify-center p-8">
                <div className="absolute w-full h-full border border-slate-600 rounded-full opacity-20 scale-150 animate-pulse z-0"></div>
                <div className="absolute w-3/4 h-3/4 border border-slate-500 rounded-full opacity-30 animate-pulse z-0"></div>
                <div className="absolute w-1/2 h-1/2 border border-shiftmed-green rounded-full opacity-50 z-0"></div>
                
                <div className="z-10 bg-white text-3xl p-3 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)]">🏥</div>
                
                <div className="absolute top-1/4 left-1/4 bg-shiftmed-dark border border-shiftmed-green text-white text-xs px-2 py-1 rounded-lg shadow-lg z-10">👨‍⚕️ 0.5 km</div>
                <div className="absolute bottom-1/3 right-1/4 bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-lg opacity-50 z-10">👩‍⚕️ 3.2 km</div>
                <div className="absolute top-1/3 right-1/4 bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-lg opacity-50 z-10">👨‍⚕️ 5.8 km</div>
             </div>
          </div>
        </div>
      </section>

      {/* 👨‍💻 5. EQUIPO DE INGENIERÍA (LOS CREADORES) */}
      <section className="bg-slate-50 py-24 border-t border-slate-200">
        <div className="container mx-auto px-8 text-center">
          <span className="text-shiftmed-green font-bold tracking-widest uppercase text-sm mb-2 block">
            El Motor Detrás de ShiftMed
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12">
            Ingenieros Desarrolladores
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto text-left">
            {/* Perfil Lucas */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 flex-1 text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl shadow-inner">
                💻
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Lucas</h3>
              <p className="text-shiftmed-green font-bold mb-4 text-sm uppercase tracking-wide">Arquitectura & Backend</p>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Diseño de la base de datos relacional, implementación de API RESTful, seguridad mediante tokens JWT y programación del algoritmo de geolocalización Haversine.
              </p>
              <div className="flex justify-center space-x-2">
                <span className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-bold">Node.js</span>
                <span className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-bold">PostgreSQL</span>
              </div>
            </div>

            {/* Perfil Dylan */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 flex-1 text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl shadow-inner">
                🎨
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Dylan</h3>
              <p className="text-shiftmed-green font-bold mb-4 text-sm uppercase tracking-wide">Frontend & UI/UX</p>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Diseño de interfaces modernas, maquetación de la experiencia de usuario, integración de componentes interactivos y despliegue visual de la plataforma.
              </p>
              <div className="flex justify-center space-x-2">
                <span className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-bold">React</span>
                <span className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-bold">Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 6. FOOTER Y CTA FINAL */}
      <footer className="bg-white border-t border-slate-200 py-16">
        <div className="container mx-auto px-8 text-center max-w-3xl">
          <h2 className="text-4xl font-black text-slate-900 mb-6">¿Listo para revolucionar la gestión médica?</h2>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">Únete a la red de ShiftMed y experimenta la eficiencia operativa de la geolocalización.</p>
          <button className="bg-shiftmed-green hover:bg-emerald-400 text-white px-10 py-5 rounded-2xl font-extrabold text-xl transition shadow-lg transform hover:-translate-y-1">
            Agendar una Demostración
          </button>
        </div>
        <div className="text-center text-slate-400 text-sm mt-16">
            <p>© 2026 ShiftMed - Desarrollado por Lucas & Dylan.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;