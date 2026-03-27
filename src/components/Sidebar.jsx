// src/components/Sidebar.jsx
import React from 'react';
import { Activity, LayoutDashboard, CalendarDays, Users, Settings, Building2, LogOut } from 'lucide-react';

export default function Sidebar({ seccionActiva, setSeccionActiva, cerrarSesion }) {
  return (
    <aside className="w-72 bg-shiftmed-dark text-white flex flex-col shadow-2xl z-20">
      <div className="h-20 flex items-center px-8 border-b border-slate-700/50">
        <div className="text-2xl font-bold tracking-wider flex items-center gap-2">
          <Activity className="text-shiftmed-green w-8 h-8" />
          <div><span className="text-shiftmed-green">Shift</span>Med</div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto hide-scrollbar">
        <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Gestión Principal</p>
        
        <button onClick={() => setSeccionActiva('panel')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${seccionActiva === 'panel' ? 'bg-shiftmed-green/10 text-shiftmed-green' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
          <LayoutDashboard className="w-5 h-5" /> Panel de Control
        </button>
        
        <button onClick={() => setSeccionActiva('turnos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${seccionActiva === 'turnos' ? 'bg-shiftmed-green/10 text-shiftmed-green' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
          <CalendarDays className="w-5 h-5" /> Mis Turnos
        </button>
        
        <button onClick={() => setSeccionActiva('profesionales')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${seccionActiva === 'profesionales' ? 'bg-shiftmed-green/10 text-shiftmed-green' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
          <Users className="w-5 h-5" /> Red de Profesionales
        </button>
        
        <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest mt-8 mb-4">Configuración</p>
        
        <button onClick={() => setSeccionActiva('centros')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${seccionActiva === 'centros' ? 'bg-shiftmed-green/10 text-shiftmed-green' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
          <Building2 className="w-5 h-5" /> Datos de la Clínica
        </button>

        {/* 👇 AQUÍ ESTÁ EL BOTÓN ARREGLADO 👇 */}
        <button onClick={() => setSeccionActiva('ajustes')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${seccionActiva === 'ajustes' ? 'bg-shiftmed-green/10 text-shiftmed-green' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
          <Settings className="w-5 h-5" /> Ajustes de Sistema
        </button>
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <button onClick={cerrarSesion} className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl font-bold transition">
          <LogOut className="w-5 h-5" /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}