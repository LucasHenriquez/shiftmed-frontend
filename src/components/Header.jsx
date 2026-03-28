import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User as UserIcon, LogOut, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export default function Header({ usuarioActivo, cerrarSesion }) {
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  // Truco para cerrar los menús al hacer click afuera de ellos
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setMostrarNotificaciones(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setMostrarMenuUsuario(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔔 DATOS SIMULADOS DE NOTIFICACIONES (Más adelante los traeremos del backend)
  const notificaciones = [
    { id: 1, tipo: 'exito', titulo: '¡Turno Cubierto!', mensaje: 'El Dr. Juan Pérez aceptó el turno de Medicina Interna (Urgencia).', tiempo: 'Hace 2 min', leido: false },
    { id: 2, tipo: 'alerta', titulo: 'Turno por vencer', mensaje: 'El turno de Pediatría en Clínica San Miguel comienza en 1 hora y sigue sin médico.', tiempo: 'Hace 15 min', leido: false },
    { id: 3, tipo: 'info', titulo: 'Nuevo Profesional', mensaje: 'La Dra. Camila Rojas se ha registrado en tu red.', tiempo: 'Hace 2 horas', leido: true },
  ];

  const noLeidas = notificaciones.filter(n => !n.leido).length;

  // Renderizador automático de iconos según el tipo de notificación
  const IconoNotif = ({ tipo }) => {
    if (tipo === 'exito') return <CheckCircle className="w-5 h-5 text-emerald-500" />;
    if (tipo === 'alerta') return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    return <Clock className="w-5 h-5 text-blue-500" />;
  };

  return (
    <header className="bg-white border-b border-slate-200 h-20 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm transition-colors duration-300">
      
      {/* 🔍 BUSCADOR GLOBAL (Estructura base) */}
      <div className="flex-1 max-w-xl relative hidden md:block">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Buscar médicos, turnos, RUT..." 
          className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-shiftmed-green focus:ring-1 focus:ring-shiftmed-green transition text-sm font-medium text-slate-700"
        />
      </div>

      <div className="flex items-center gap-4 md:gap-6 ml-auto">
        
        {/* 🔔 CAMPANITA DE NOTIFICACIONES */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setMostrarNotificaciones(!mostrarNotificaciones)}
            className="relative p-2 text-slate-500 hover:text-shiftmed-dark hover:bg-slate-100 rounded-full transition focus:outline-none"
          >
            <Bell className="w-6 h-6" />
            {noLeidas > 0 && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>
            )}
          </button>

          {/* MENÚ DESPLEGABLE DE NOTIFICACIONES */}
          {mostrarNotificaciones && (
            <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animation-fadeInDown z-50">
              <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-extrabold text-slate-800">Notificaciones</h3>
                {noLeidas > 0 && (
                  <span className="text-xs font-bold text-shiftmed-green bg-emerald-100 px-2.5 py-1 rounded-md">
                    {noLeidas} nuevas
                  </span>
                )}
              </div>
              
              <div className="max-h-80 overflow-y-auto hide-scrollbar">
                {notificaciones.length > 0 ? (
                  notificaciones.map((notif) => (
                    <div key={notif.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition cursor-pointer flex gap-4 ${!notif.leido ? 'bg-blue-50/20' : ''}`}>
                      <div className="mt-0.5 flex-shrink-0">
                        <IconoNotif tipo={notif.tipo} />
                      </div>
                      <div>
                        <p className={`text-sm ${!notif.leido ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                          {notif.titulo}
                        </p>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.mensaje}</p>
                        <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wide">{notif.tiempo}</p>
                      </div>
                      {!notif.leido && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full self-center ml-auto"></div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-500">
                    <p className="text-sm font-medium">No tienes notificaciones nuevas.</p>
                  </div>
                )}
              </div>
              
              <div className="p-3 text-center border-t border-slate-100 hover:bg-slate-50 cursor-pointer transition">
                <span className="text-sm font-bold text-shiftmed-green">Marcar todas como leídas</span>
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

        {/* 👤 PERFIL DE USUARIO */}
        <div className="relative" ref={userRef}>
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setMostrarMenuUsuario(!mostrarMenuUsuario)}
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-900">{usuarioActivo?.nombre || 'Admin Local'}</p>
              <p className="text-xs text-slate-500 font-medium">{usuarioActivo?.rol || 'Coordinador Médico'}</p>
            </div>
            <div className="w-10 h-10 bg-shiftmed-dark text-white rounded-full flex items-center justify-center font-bold shadow-md group-hover:bg-slate-800 transition transform group-hover:scale-105">
              {usuarioActivo?.nombre ? usuarioActivo.nombre.charAt(0) : 'A'}
            </div>
          </div>

          {/* MENÚ DESPLEGABLE DE USUARIO */}
          {mostrarMenuUsuario && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animation-fadeInDown z-50">
              <div className="p-2">
                <button className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-shiftmed-dark hover:bg-slate-50 rounded-xl transition flex items-center gap-2">
                  <UserIcon className="w-4 h-4" /> Mi Perfil
                </button>
                <button 
                  onClick={cerrarSesion}
                  className="w-full text-left px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition flex items-center gap-2 mt-1"
                >
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