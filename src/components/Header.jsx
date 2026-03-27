// src/components/Header.jsx
import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Header({ usuarioActivo }) {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10 flex-shrink-0">
      <div className="flex items-center bg-slate-100 px-4 py-2.5 rounded-full w-96 border border-slate-200 focus-within:border-shiftmed-green focus-within:bg-white transition-all">
        <Search className="w-5 h-5 text-slate-400 mr-3" />
        <input type="text" placeholder="Buscar turnos, médicos, especialidades..." className="bg-transparent border-none outline-none w-full text-sm font-medium" />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-shiftmed-dark transition">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-900">{usuarioActivo?.nombre || 'Director Médico'}</p>
            <p className="text-xs font-bold text-shiftmed-green">ShiftMed Admin</p>
          </div>
          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            {usuarioActivo?.nombre ? usuarioActivo.nombre.charAt(0).toUpperCase() : 'D'}
          </div>
        </div>
      </div>
    </header>
  );
}