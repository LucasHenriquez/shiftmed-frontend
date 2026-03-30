import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User as UserIcon, LogOut, CheckCircle, AlertTriangle, Clock, Loader2, User, Activity } from 'lucide-react';

export default function Header({ usuarioActivo, cerrarSesion }) {
  // Estados para menús
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  
  // Estados para el Buscador Global
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState({ profesionales: [], turnos: [] });
  const [buscando, setBuscando] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const notifRef = useRef(null);
  const userRef = useRef(null);
  const searchRef = useRef(null);

  // Cerrar menús al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) setMostrarNotificaciones(false);
      if (userRef.current && !userRef.current.contains(event.target)) setMostrarMenuUsuario(false);
      if (searchRef.current && !searchRef.current.contains(event.target)) setMostrarResultados(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🧠 Lógica del Buscador (Debounce)
  useEffect(() => {
    if (busqueda.trim().length < 2) {
      setResultados({ profesionales: [], turnos: [] });
      setMostrarResultados(false);
      return;
    }

    setBuscando(true);
    setMostrarResultados(true);

    // Pausa de 500ms antes de buscar para no saturar la BD
    const delayDebounce = setTimeout(async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3000/api/buscar?q=${busqueda}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setResultados(data);
        }
      } catch (error) {
        console.error("Error buscando:", error);
      } finally {
        setBuscando(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [busqueda]);

  // Mockup Notificaciones
  const notificaciones = [
    { id: 1, tipo: 'exito', titulo: '¡Turno Cubierto!', mensaje: 'El Dr. Juan Pérez aceptó el turno de Medicina Interna.', tiempo: 'Hace 2 min', leido: false },
    { id: 2, tipo: 'alerta', titulo: 'Turno por vencer', mensaje: 'Pediatría en Clínica San Miguel comienza en 1 hora.', tiempo: 'Hace 15 min', leido: false },
  ];
  const noLeidas = notificaciones.filter(n => !n.leido).length;

  const IconoNotif = ({ tipo }) => {
    if (tipo === 'exito') return <CheckCircle className="w-5 h-5 text-emerald-500" />;
    if (tipo === 'alerta') return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    return <Clock className="w-5 h-5 text-blue-500" />;
  };

  return (
    <header className="bg-white border-b border-slate-200 h-20 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm transition-colors duration-300">
      
      {/* 🔍 BUSCADOR GLOBAL */}
      <div className="flex-1 max-w-xl relative hidden md:block" ref={searchRef}>
        <div className="relative">
          {buscando ? (
            <Loader2 className="w-5 h-5 text-shiftmed-green absolute left-4 top-1/2 transform -translate-y-1/2 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          )}
          
          <input 
            type="text" 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onFocus={() => busqueda.length >= 2 && setMostrarResultados(true)}
            placeholder="Buscar médicos, especialidades, turnos, RUT..." 
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-shiftmed-green focus:ring-1 focus:ring-shiftmed-green transition text-sm font-medium text-slate-700"
          />
        </div>

        {/* CAJA DE RESULTADOS DEL BUSCADOR */}
        {mostrarResultados && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animation-fadeInDown z-50">
            
            {/* Si no hay resultados */}
            {!buscando && resultados.profesionales.length === 0 && resultados.turnos.length === 0 && (
              <div className="p-6 text-center text-slate-500 text-sm">No se encontraron resultados para "{busqueda}"</div>
            )}

            {/* Resultados: Profesionales */}
            {resultados.profesionales.length > 0 && (
              <div>
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Médicos Encontrados
                </div>
                {resultados.profesionales.map(prof => (
                  <div key={prof.id} className="p-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer flex items-center gap-3 transition">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"><User className="w-4 h-4"/></div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{prof.nombres} {prof.apellidos}</p>
                      <p className="text-xs text-slate-500">{prof.especialidad} | RUT: {prof.rut}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Resultados: Turnos */}
            {resultados.turnos.length > 0 && (
              <div>
                <div className="bg-slate-50 px-4 py-2 border-y border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Turnos (Ofertas)
                </div>
                {resultados.turnos.map(turno => (
                  <div key={turno.id} className="p-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer flex items-center gap-3 transition">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-shiftmed-green flex items-center justify-center font-bold text-xs"><Activity className="w-4 h-4"/></div>
                    <div>
                      {/* 👇 AQUÍ LE QUITAMOS EL "_requerida" y el "_turno" 👇 */}
                      <p className="text-sm font-bold text-slate-800">{turno.especialidad}</p>
                      <p className="text-xs text-slate-500">{turno.fecha?.split('T')[0]} | {turno.tipo_servicio}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="p-2 text-center border-t border-slate-100 bg-slate-50 text-xs text-slate-400">
              Presiona ESC para cerrar
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 md:gap-6 ml-auto">
        
        {/* 🔔 CAMPANITA DE NOTIFICACIONES */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setMostrarNotificaciones(!mostrarNotificaciones)}
            className="relative p-2 text-slate-500 hover:text-shiftmed-dark hover:bg-slate-100 rounded-full transition focus:outline-none"
          >
            <Bell className="w-6 h-6" />
            {noLeidas > 0 && <span className="absolute top-1 right-1 w-3 h-3 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>}
          </button>

          {mostrarNotificaciones && (
            <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animation-fadeInDown z-50">
              <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-extrabold text-slate-800">Notificaciones</h3>
                {noLeidas > 0 && <span className="text-xs font-bold text-shiftmed-green bg-emerald-100 px-2.5 py-1 rounded-md">{noLeidas} nuevas</span>}
              </div>
              <div className="max-h-80 overflow-y-auto hide-scrollbar">
                {notificaciones.map((notif) => (
                  <div key={notif.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition cursor-pointer flex gap-4 ${!notif.leido ? 'bg-blue-50/20' : ''}`}>
                    <div className="mt-0.5 flex-shrink-0"><IconoNotif tipo={notif.tipo} /></div>
                    <div>
                      <p className={`text-sm ${!notif.leido ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>{notif.titulo}</p>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.mensaje}</p>
                      <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wide">{notif.tiempo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

        {/* 👤 PERFIL DE USUARIO */}
        <div className="relative" ref={userRef}>
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setMostrarMenuUsuario(!mostrarMenuUsuario)}>
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-900">{usuarioActivo?.nombre || 'Admin Local'}</p>
              <p className="text-xs text-slate-500 font-medium">{usuarioActivo?.rol || 'Coordinador Médico'}</p>
            </div>
            <div className="w-10 h-10 bg-shiftmed-dark text-white rounded-full flex items-center justify-center font-bold shadow-md group-hover:bg-slate-800 transition transform group-hover:scale-105">
              {usuarioActivo?.nombre ? usuarioActivo.nombre.charAt(0) : 'A'}
            </div>
          </div>

          {mostrarMenuUsuario && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animation-fadeInDown z-50">
              <div className="p-2">
                <button className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-shiftmed-dark hover:bg-slate-50 rounded-xl transition flex items-center gap-2">
                  <UserIcon className="w-4 h-4" /> Mi Perfil
                </button>
                <button onClick={cerrarSesion} className="w-full text-left px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition flex items-center gap-2 mt-1">
                  <LogOut className="w-4 h-4" /> Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}