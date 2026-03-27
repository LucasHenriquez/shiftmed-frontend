import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Globe, Monitor, Zap, Save, Activity, Bell, Shield, LayoutDashboard } from 'lucide-react';

export default function VistaAjustes() {
  // Estados originales
  const [idioma, setIdioma] = useState(localStorage.getItem('shiftmed_idioma') || 'es');
  const [formatoHora, setFormatoHora] = useState(localStorage.getItem('shiftmed_hora') || '24h');
  const [densidad, setDensidad] = useState(localStorage.getItem('shiftmed_densidad') || 'comoda');
  const [animaciones, setAnimaciones] = useState(localStorage.getItem('shiftmed_animaciones') === 'false' ? false : true);
  
  // Nuevos estados Premium
  const [vistaInicial, setVistaInicial] = useState(localStorage.getItem('shiftmed_vista') || 'panel');
  const [sonidoAlertas, setSonidoAlertas] = useState(localStorage.getItem('shiftmed_sonido') !== 'false');
  const [notificacionesEmail, setNotificacionesEmail] = useState(localStorage.getItem('shiftmed_email') !== 'false');
  const [cierreAutomatico, setCierreAutomatico] = useState(localStorage.getItem('shiftmed_cierre') || '30m');

  const [guardando, setGuardando] = useState(false);

  // Motor para aplicar cambios funcionales de interfaz en tiempo real
  useEffect(() => {
    const root = document.documentElement;
    if (!animaciones) root.classList.add('no-anim');
    else root.classList.remove('no-anim');
    root.setAttribute('data-densidad', densidad);
  }, [animaciones, densidad]);

  const guardarConfiguracion = (e) => {
    e.preventDefault();
    setGuardando(true);
    
    // Guardar originales
    localStorage.setItem('shiftmed_idioma', idioma);
    localStorage.setItem('shiftmed_hora', formatoHora);
    localStorage.setItem('shiftmed_densidad', densidad);
    localStorage.setItem('shiftmed_animaciones', animaciones);
    
    // Guardar nuevos
    localStorage.setItem('shiftmed_vista', vistaInicial);
    localStorage.setItem('shiftmed_sonido', sonidoAlertas);
    localStorage.setItem('shiftmed_email', notificacionesEmail);
    localStorage.setItem('shiftmed_cierre', cierreAutomatico);

    setTimeout(() => {
      setGuardando(false);
      toast.success('Ajustes del sistema actualizados exitosamente.');
    }, 600);
  };

  return (
    <div className="animation-fadeIn max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Ajustes de Sistema</h1>
        <p className="text-slate-500 mt-1">Configura el comportamiento, alertas y seguridad de tu plataforma.</p>
      </div>

      <form onSubmit={guardarConfiguracion} className="space-y-6">
        
        {/* TARJETA 1: LOCALIZACIÓN Y PREFERENCIAS */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-slate-900">Preferencias Generales</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Idioma de la Interfaz</label>
              <select value={idioma} onChange={(e) => setIdioma(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium text-slate-700">
                <option value="es">Español (Latinoamérica)</option>
                <option value="en">English (US)</option>
                <option value="pt">Português (Brasil)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Formato de Hora</label>
              <select value={formatoHora} onChange={(e) => setFormatoHora(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium text-slate-700">
                <option value="24h">24 Horas (14:00) - Estándar</option>
                <option value="12h">12 Horas (02:00 PM)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Pantalla Inicial</label>
              <select value={vistaInicial} onChange={(e) => setVistaInicial(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium text-slate-700">
                <option value="panel">Panel Principal (Resumen)</option>
                <option value="turnos">Mis Turnos Activos</option>
                <option value="profesionales">Directorio Médico</option>
              </select>
            </div>
          </div>
        </div>

        {/* FILA 2: NOTIFICACIONES Y SEGURIDAD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* TARJETA 2: NOTIFICACIONES */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900">Alertas y Notificaciones</h3>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-sm">Sonido de Turno Cubierto</p>
                  <p className="text-xs text-slate-500 mt-1">Alerta sonora cuando un médico acepta.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={sonidoAlertas} onChange={() => setSonidoAlertas(!sonidoAlertas)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-shiftmed-green"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-sm">Notificaciones por Email</p>
                  <p className="text-xs text-slate-500 mt-1">Recibir resúmenes diarios al correo.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={notificacionesEmail} onChange={() => setNotificacionesEmail(!notificacionesEmail)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-shiftmed-green"></div>
                </label>
              </div>
            </div>
          </div>

          {/* TARJETA 3: SEGURIDAD */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-500" />
              <h3 className="font-bold text-slate-900">Privacidad y Seguridad</h3>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
              <label className="block text-sm font-bold text-slate-700 mb-2">Cierre de Sesión por Inactividad</label>
              <select value={cierreAutomatico} onChange={(e) => setCierreAutomatico(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium text-slate-700">
                <option value="15m">15 minutos (Máxima Seguridad)</option>
                <option value="30m">30 minutos (Recomendado)</option>
                <option value="1h">1 hora</option>
                <option value="nunca">No cerrar sesión automáticamente</option>
              </select>
              <p className="text-xs text-slate-500 mt-3">
                Protege los datos de tu clínica. Si dejas la PC desatendida, el sistema cerrará tu sesión tras este periodo.
              </p>
            </div>
          </div>
        </div>

        {/* FILA 3: VISUALIZACIÓN Y RENDIMIENTO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-sky-500" />
              <h3 className="font-bold text-slate-900">Densidad de Tablas</h3>
            </div>
            <div className="p-6">
              <select value={densidad} onChange={(e) => setDensidad(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium text-slate-700">
                <option value="comoda">Modo Cómodo (Filas anchas)</option>
                <option value="compacta">Modo Compacto (Para muchos datos)</option>
              </select>
              <p className="text-xs text-slate-500 mt-2">Ajusta el espacio entre filas para ver más turnos en pantalla.</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
              <Zap className="w-5 h-5 text-rose-500" />
              <h3 className="font-bold text-slate-900">Rendimiento</h3>
            </div>
            <div className="p-6 flex items-center justify-between h-[calc(100%-60px)]">
              <div>
                <p className="font-bold text-slate-900 text-sm">Animaciones de Interfaz</p>
                <p className="text-xs text-slate-500 mt-1">Desactívalas en equipos lentos.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={animaciones} onChange={() => setAnimaciones(!animaciones)} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-shiftmed-green"></div>
              </label>
            </div>
          </div>
        </div>

        {/* BOTÓN DE GUARDAR */}
        <div className="flex justify-end pt-4 pb-8">
          <button type="submit" disabled={guardando} className="bg-shiftmed-dark hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-black flex items-center gap-2 shadow-lg transform hover:-translate-y-1 transition disabled:opacity-50">
            {guardando ? <Activity className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} 
            {guardando ? 'Guardando...' : 'Guardar Ajustes'}
          </button>
        </div>
      </form>
    </div>
  );
}