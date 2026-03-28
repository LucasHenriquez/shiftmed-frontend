import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Zap, Stethoscope, MapPin, Building2, Activity, HeartPulse, 
  Timer, ShieldCheck, Target, CheckCircle2, User, Terminal, 
  Palette, ChevronDown, ChevronUp, X, Check, AlertCircle, Star, Quote,
  Award, CheckCircle // <-- Añadidos para los sellos
} from 'lucide-react';

const AnimatedSection = ({ children, delay = "" }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} className={`transition-all duration-1000 transform ${delay} ${inView ? 'opacity-100 translate-y-0 animation-fadeInUp' : 'opacity-0 translate-y-10'}`}>
      {children}
    </div>
  );
};

function LandingPage({ setVistaActual }) {
  const turnosDisponibles = [
    { id: 1, especialidad: "Medicina Interna", clinica: "Clínica Ñuñoa", distancia: "0.5 km", tipo: "Urgencia", color: "text-red-500", bg: "bg-red-50" },
    { id: 2, especialidad: "Pediatría", clinica: "IntegraMédica Providencia", distancia: "1.2 km", tipo: "Reemplazo", color: "text-blue-500", bg: "bg-blue-50" },
    { id: 3, especialidad: "Traumatología", clinica: "Hospital Clínico", distancia: "3.4 km", tipo: "Turno Extra", color: "text-amber-500", bg: "bg-amber-50" }
  ];

  const [turnosAceptados, setTurnosAceptados] = useState([]);
  const aceptarTurno = (id) => {
    if (!turnosAceptados.includes(id)) setTurnosAceptados([...turnosAceptados, id]);
  };

  const [modalAbierto, setModalAbierto] = useState(false);
  const [faqAbierto, setFaqAbierto] = useState(null);

  const faqs = [
    { pregunta: "¿Cómo validan a los médicos de la plataforma?", respuesta: "Todo profesional debe pasar por un estricto filtro donde verificamos su registro en la Superintendencia de Salud y antecedentes profesionales antes de activar su cuenta." },
    { pregunta: "¿Qué pasa si un especialista cancela a último minuto?", respuesta: "Nuestro algoritmo de Hub GPS detecta la cancelación e inmediatamente envía la alerta a los siguientes especialistas más cercanos para cubrir la vacante en tiempo récord." },
    { pregunta: "¿Tiene algún costo para los profesionales de la salud?", respuesta: "No, ShiftMed es 100% gratuito para los profesionales. Las instituciones de salud abonan una tarifa plana solo por cada turno cubierto exitosamente." }
  ];

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setModalAbierto(false);
    toast.success('Solicitud corporativa recibida. Nuestro equipo se contactará a la brevedad.', {
      duration: 5000, position: 'bottom-center',
      style: { background: '#0B1120', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 'bold' }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 scroll-smooth relative overflow-x-hidden animation-fadeIn">
      <Toaster />

      {/* MODAL DE CONTACTO */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-70 z-[100] flex items-center justify-center p-4 animation-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative transform scale-100 transition-transform">
            <button onClick={() => setModalAbierto(false)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Acceso Corporativo</h3>
            <p className="text-slate-500 text-sm mb-6">Déjanos los datos de tu institución y coordinaremos una demostración técnica en vivo.</p>
            <form className="space-y-4" onSubmit={handleDemoSubmit}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nombre de la Institución</label>
                <input type="text" required className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green focus:ring-1 focus:ring-shiftmed-green transition" placeholder="Ej: Clínica San Miguel" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Correo del Director/a</label>
                <input type="email" required className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green focus:ring-1 focus:ring-shiftmed-green transition" placeholder="gerencia@clinica.cl" />
              </div>
              <button type="submit" className="w-full bg-shiftmed-dark hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition mt-4 shadow-lg">
                Agendar Demostración
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WHATSAPP */}
      <a href="https://wa.me/56984306614" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#1EBE57] text-white p-4 rounded-full shadow-2xl z-50 transform hover:scale-110 transition duration-300 flex items-center justify-center group">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
        <span className="absolute right-16 bg-white text-slate-800 text-sm font-bold py-2 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap pointer-events-none">¿Dudas? ¡Hablemos!</span>
      </a>

      {/* NAVBAR */}
      <nav className="bg-shiftmed-dark text-white py-4 px-8 flex justify-between items-center shadow-lg sticky top-0 z-40 transform animation-fadeInDown">
        <div className="text-3xl font-bold tracking-wider cursor-pointer flex items-center gap-2">
          <Activity className="text-shiftmed-green w-8 h-8" />
          <div><span className="text-shiftmed-green">Shift</span>Med</div>
        </div>
        <div className="hidden lg:flex space-x-8 text-sm font-medium">
          <a href="#inicio" className="hover:text-shiftmed-green transition duration-300">Inicio</a>
          <a href="#como-funciona" className="hover:text-shiftmed-green transition duration-300">Cómo Funciona</a>
          <a href="#tecnologia" className="hover:text-shiftmed-green transition duration-300">Tecnología GPS</a>
          <a href="#testimonios" className="hover:text-shiftmed-green transition duration-300">Casos de Éxito</a>
        </div>
        <button onClick={() => setVistaActual('login')} className="bg-shiftmed-green hover:bg-emerald-400 text-white px-6 py-2 rounded-full font-bold transition transform hover:scale-105">
          Ingresar
        </button>
      </nav>

      {/* 🚀 1. HERO */}
      <section id="inicio" className="container mx-auto px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        <AnimatedSection>
          <div className="w-full space-y-6">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-shiftmed-green px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide shadow-sm">
              <Zap className="w-4 h-4 fill-current" /> Plataforma de Staffing Inteligente
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
              Cubre turnos médicos en <span className="text-shiftmed-green">minutos</span>, no en días.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Conecta las necesidades de tu centro de salud con especialistas validados cercanos a ti. Tecnología GPS para decisiones inmediatas y cobertura eficiente.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
              <button onClick={() => setModalAbierto(true)} className="bg-shiftmed-dark hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-xl transform hover:-translate-y-1">
                Registrar Institución
              </button>
              <button onClick={() => setVistaActual('login')} className="bg-white border-2 border-slate-200 hover:border-shiftmed-green hover:text-shiftmed-green text-slate-700 px-8 py-4 rounded-xl font-bold text-lg transition shadow-sm">
                Soy Profesional
              </button>
            </div>

            {/* 👇 NUEVA FRANJA DE AUTORIDAD (Integrada aquí para que cuadre con el celular al lado) 👇 */}
            <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5 max-w-lg">
              {/* Sello Local */}
              <div className="flex items-center gap-4 text-left">
                <div className="bg-emerald-100 p-3 rounded-full border border-emerald-200 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-shiftmed-green" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Cobertura Local Activa</h4>
                  <p className="text-slate-600 text-sm">Conectando personal en Ñuñoa y Región Metropolitana.</p>
                </div>
              </div>
              {/* Divisor */}
              <div className="h-px w-full bg-slate-100"></div>
              {/* Sello SIS */}
              <div className="flex items-center gap-4 text-left">
                <div className="bg-slate-900 p-3 rounded-full border border-slate-700 flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-slate-900">Validación SIS 100%</h4>
                      <CheckCircle className="w-4 h-4 text-shiftmed-green" />
                  </div>
                  <p className="text-slate-600 text-sm">Profesionales verificados en la Superintendencia de Salud de Chile.</p>
                </div>
              </div>
            </div>
            {/* 👆 FIN FRANJA DE AUTORIDAD 👆 */}

          </div>
        </AnimatedSection>

        {/* 📱 MOCKUP CELULAR (INTACTO) */}
        <AnimatedSection delay="animation-delay-300">
          <div className="w-full flex justify-center items-center mt-12 lg:mt-0 flex-shrink-0 relative">
            <div className="w-[320px] h-[600px] bg-slate-100 rounded-[3rem] shadow-2xl border-[12px] border-slate-800 relative flex flex-col items-center overflow-hidden flex-shrink-0">
              <div className="absolute top-0 w-36 h-7 bg-slate-800 rounded-b-3xl z-30"></div> 
              <div className="w-full bg-shiftmed-dark text-white pt-10 pb-4 px-5 z-20 shadow-md">
                <p className="text-sm font-bold text-slate-300 mb-1">📍 Tu ubicación actual</p>
                <h3 className="text-lg font-black flex items-center gap-2"><MapPin className="w-4 h-4 text-shiftmed-green" /> Turnos Cercanos</h3>
              </div>

              <div className="w-full h-full p-4 overflow-y-auto hide-scrollbar space-y-4 bg-slate-100 pb-10 z-10 relative">
                {turnosDisponibles.map((turno) => {
                  const aceptado = turnosAceptados.includes(turno.id);
                  return (
                    <div key={turno.id} className={`w-full rounded-2xl p-4 shadow-md border transform transition-all duration-300 ${aceptado ? 'bg-emerald-50 border-shiftmed-green' : 'bg-white border-slate-200 hover:border-shiftmed-green'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-inner transition-colors duration-500 ${aceptado ? 'bg-shiftmed-green' : 'bg-shiftmed-dark'}`}>
                            {aceptado ? <Check className="w-5 h-5 text-white" /> : <Stethoscope className="w-5 h-5 text-white" />}
                          </div>
                          <div>
                            <p className="font-extrabold text-slate-900 leading-tight text-sm">{aceptado ? '¡Confirmado!' : turno.especialidad}</p>
                            {!aceptado && <p className="text-xs font-bold text-slate-500">{turno.clinica}</p>}
                          </div>
                        </div>
                        {!aceptado && (
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${turno.bg} ${turno.color} flex items-center gap-1`}><AlertCircle className="w-3 h-3" /> {turno.tipo}</span>
                        )}
                      </div>
                      {!aceptado && (
                        <>
                          <div className="bg-slate-50 rounded-lg p-2 text-center mb-3 border border-slate-100 flex items-center justify-center space-x-1">
                            <MapPin className="w-3 h-3 text-shiftmed-green" />
                            <p className="text-xs font-bold text-slate-600">A solo <span className="text-shiftmed-green">{turno.distancia}</span> de ti</p>
                          </div>
                          <button onClick={() => aceptarTurno(turno.id)} className="w-full bg-shiftmed-green text-white text-sm font-bold py-2.5 rounded-xl transition shadow-sm hover:bg-emerald-400 active:scale-95">Postular a Turno</button>
                        </>
                      )}
                      {aceptado && <p className="text-xs font-bold text-shiftmed-green text-center mt-2">Esperando confirmación...</p>}
                    </div>
                  );
                })}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-slate-200 to-transparent z-20 rounded-b-[3rem] pointer-events-none"></div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* 🏢 2. BARRA DE CONFIANZA */}
      <div className="bg-white border-y border-slate-200 py-10">
        <AnimatedSection>
          <div className="container mx-auto px-8 text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Optimizando la gestión en centros de excelencia</p>
            <div className="flex justify-center items-center space-x-12 opacity-50 grayscale flex-wrap gap-y-4">
              <h3 className="text-xl font-black flex items-center gap-2"><Building2 className="w-6 h-6"/> Clínica RedSalud</h3>
              <h3 className="text-xl font-black flex items-center gap-2"><Activity className="w-6 h-6"/> IntegraMédica</h3>
              <h3 className="text-xl font-black flex items-center gap-2"><HeartPulse className="w-6 h-6"/> Bupa</h3>
              <h3 className="text-xl font-black flex items-center gap-2"><Building2 className="w-6 h-6"/> Hospital Clínico</h3>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* ⚖️ 3. BENEFICIOS */}
      <section id="como-funciona" className="container mx-auto px-8 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Tarjeta 1 - ROJA */}
          <AnimatedSection delay="animation-delay-100">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border-b-8 border-b-red-500">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                <Timer className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Adiós Búsqueda Manual</h3>
              <p className="text-slate-600 leading-relaxed">No pierdas más horas llamando a listas de contactos desactualizadas. Publica el turno y deja que el algoritmo trabaje.</p>
            </div>
          </AnimatedSection>

          {/* Tarjeta 2 - AZUL */}
          <AnimatedSection delay="animation-delay-300">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border-b-8 border-b-blue-500">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                <ShieldCheck className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Perfiles 100% Verificados</h3>
              <p className="text-slate-600 leading-relaxed">Accede al historial, especialidad y ranking de desempeño de cada profesional antes de aceptarlo en tu centro.</p>
            </div>
          </AnimatedSection>

          {/* Tarjeta 3 - VERDE */}
          <AnimatedSection delay="animation-delay-500">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border-b-8 border-b-shiftmed-green">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                <Target className="w-8 h-8 text-shiftmed-green" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Match Inteligente</h3>
              <p className="text-slate-600 leading-relaxed">Nuestro sistema notifica instantáneamente a los especialistas disponibles más cercanos a tu ubicación actual.</p>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* 🧠 4. TECNOLOGIA RADAR ANIMADO */}
      <section id="tecnologia" className="bg-shiftmed-dark text-white py-28 overflow-hidden">
        <div className="container mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-12 transform transition-all duration-1000 animation-fadeInLeft">
            <AnimatedSection>
              <div className="space-y-6">
                <span className="text-shiftmed-green font-bold tracking-widest uppercase text-sm mb-2 block">Tecnología de Vanguardia</span>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Asignación inteligente con precisión milimétrica.</h2>
                <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl">
                  No enviamos alertas masivas que nadie lee. Nuestro algoritmo cruza especialidades y ejecuta cálculos de <strong>distancia Haversine en tiempo real</strong>. Solo notificamos a los médicos que están a minutos de tu centro.
                </p>
                <ul className="space-y-5">
                  <li className="flex items-center space-x-4"><CheckCircle2 className="w-6 h-6 text-shiftmed-green flex-shrink-0" /><span className="font-medium text-lg">Cálculo de rutas y distancias en vivo.</span></li>
                  <li className="flex items-center space-x-4"><CheckCircle2 className="w-6 h-6 text-shiftmed-green flex-shrink-0" /><span className="font-medium text-lg">Filtro automático por especialidad requerida.</span></li>
                  <li className="flex items-center space-x-4"><CheckCircle2 className="w-6 h-6 text-shiftmed-green flex-shrink-0" /><span className="font-medium text-lg">Reducción del 80% en tiempos de contratación.</span></li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center items-center flex-shrink-0 transform transition-all duration-1000 animation-delay-200 animation-fadeInRight">
             <div className="w-full max-w-sm lg:max-w-md aspect-square bg-slate-900 rounded-[3rem] border border-slate-700 relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)] flex items-center justify-center p-8">
                <div className="absolute w-full h-full border border-slate-600 rounded-full opacity-20 scale-150 z-0"></div>
                <div className="absolute w-3/4 h-3/4 border border-slate-500 rounded-full opacity-30 z-0"></div>
                <div className="absolute w-1/2 h-1/2 border border-shiftmed-green rounded-full opacity-40 z-0"></div>
                <div className="absolute w-[150%] h-[150%] radar-sweep z-0 pointer-events-none"></div>
                
                <div className="z-10 bg-white p-4 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.8)] relative group">
                  <div className="absolute inset-0 rounded-full bg-shiftmed-green animate-ping opacity-30"></div>
                  <Building2 className="w-8 h-8 text-shiftmed-green relative z-10" />
                </div>
                
                <div className="absolute top-[35%] left-[25%] bg-shiftmed-dark border border-shiftmed-green text-white text-xs px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10 flex items-center gap-1 animate-bounce">
                  <User className="w-3 h-3 text-shiftmed-green" /> 0.5 km
                </div>
                
                <div className="absolute bottom-[22%] right-[25%] bg-slate-700 border border-slate-600 text-slate-300 text-xs px-3 py-1.5 rounded-lg z-10 flex items-center gap-1 animation-pulse-slow">
                  <User className="w-3 h-3 text-slate-400" /> 3.2 km
                </div>
                
                <div className="absolute top-[12%] right-[15%] bg-slate-800 text-slate-400 text-xs px-3 py-1.5 rounded-lg opacity-50 z-10 flex items-center gap-1">
                  <User className="w-3 h-3" /> 5.8 km
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ⭐ 5. TESTIMONIOS */}
      <section id="testimonios" className="bg-slate-100 py-24 border-y border-slate-200">
        <div className="container mx-auto px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-shiftmed-green font-bold tracking-widest uppercase text-sm mb-2 block">Confianza Demostrada</span>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Lo que dicen las clínicas</h2>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedSection delay="animation-delay-100">
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 relative">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-slate-100" />
                <div className="flex text-amber-400 mb-6"><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/></div>
                <p className="text-slate-700 text-lg italic mb-8 relative z-10">"Antes tardábamos horas llamando para cubrir un turno de urgencia en la madrugada. Con ShiftMed, el algoritmo geolocaliza a un médico validado en 15 minutos. Mejoró nuestra operación."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold text-lg">C</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Dra. Camila Rojas</h4>
                    <p className="text-sm text-slate-500">Directora Médica - Clínica Ñuñoa</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay="animation-delay-300">
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 relative">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-slate-100" />
                <div className="flex text-amber-400 mb-6"><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/></div>
                <p className="text-slate-700 text-lg italic mb-8 relative z-10">"La validación automática de perfiles nos dio la tranquilidad que necesitábamos. Ya no tenemos el problema con agencias intermediarias lentas. El control volvió a estar 100% en nuestras manos."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-shiftmed-green rounded-full flex items-center justify-center text-white font-bold text-lg">R</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Roberto Méndez</h4>
                    <p className="text-sm text-slate-500">Gerente de Operaciones - RedSalud</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ❓ 6. FAQ */}
      <section id="faq" className="container mx-auto px-8 py-24 max-w-4xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Preguntas Frecuentes</h2>
            <p className="text-slate-600 text-lg">Todo lo que necesitas saber sobre el modelo operativo de ShiftMed.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-shiftmed-green hover:shadow-md">
                <button onClick={() => setFaqAbierto(faqAbierto === index ? null : index)} className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none">
                  <span className="text-lg font-bold text-slate-800">{faq.pregunta}</span>
                  {faqAbierto === index ? <ChevronUp className="w-6 h-6 text-shiftmed-green flex-shrink-0" /> : <ChevronDown className="w-6 h-6 text-slate-400 flex-shrink-0" />}
                </button>
                <div className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${faqAbierto === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{faq.respuesta}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* 👨‍💻 7. TEAM */}
      <section className="bg-slate-50 py-24 border-t border-slate-200">
        <div className="container mx-auto px-8 text-center">
          <AnimatedSection>
            <div className="space-y-2 mb-12 block">
              <span className="text-shiftmed-green font-bold tracking-widest uppercase text-sm">El Motor Detrás de ShiftMed</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Ingenieros Desarrolladores</h2>
            </div>
          </AnimatedSection>
          
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto text-left">
            <AnimatedSection delay="animation-delay-100">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 flex-1 text-center">
                <div className="w-20 h-20 bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-inner"><Terminal className="w-8 h-8 text-white" /></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Lucas Henriquez</h3>
                <p className="text-shiftmed-green font-bold mb-4 text-sm uppercase tracking-wide">Arquitectura & Backend</p>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">Diseño de la base de datos relacional, implementación de API RESTful, seguridad mediante tokens JWT y programación del algoritmo de geolocalización Haversine.</p>
                <div className="flex justify-center space-x-2">
                  <span className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-bold">Node.js</span>
                  <span className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-bold">PostgreSQL</span>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay="animation-delay-400">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 flex-1 text-center">
                <div className="w-20 h-20 bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-inner"><Palette className="w-8 h-8 text-white" /></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Dylan Verdugo</h3>
                <p className="text-shiftmed-green font-bold mb-4 text-sm uppercase tracking-wide">Frontend & UI/UX</p>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">Diseño de interfaces modernas, maquetación de la experiencia de usuario, integración de componentes interactivos y despliegue visual de la plataforma.</p>
                <div className="flex justify-center space-x-2">
                  <span className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-bold">React</span>
                  <span className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-bold">Tailwind CSS</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 🎯 8. FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-16">
        <AnimatedSection>
          <div className="container mx-auto px-8 text-center max-w-3xl">
            <h2 className="text-4xl font-black text-slate-900 mb-6">¿Listo para revolucionar la gestión médica?</h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">Únete a la red de ShiftMed y experimenta la eficiencia operativa de la geolocalización.</p>
            <button onClick={() => setModalAbierto(true)} className="bg-shiftmed-green hover:bg-emerald-400 text-white px-10 py-5 rounded-2xl font-extrabold text-xl transition shadow-lg transform hover:-translate-y-1">
              Agendar una Demostración
            </button>
          </div>
        </AnimatedSection>
        <div className="text-center text-slate-400 text-sm mt-16">
            <p>© 2026 ShiftMed - Desarrollado por Lucas Henriquez & Dylan Verdugo.</p>
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;