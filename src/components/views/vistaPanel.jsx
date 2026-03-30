import React from 'react';
import { 
  Activity, Users, CalendarCheck, AlertTriangle, 
  TrendingUp, Plus, ArrowRight, Clock, MapPin 
} from 'lucide-react';
import { formatearDinero } from '../../utils/formatters';

export default function VistaPanel({ turnos, profesionales, cargando, abrirModalCrearTurno, setSeccionActiva }) {
  
  const totalTurnos = turnos.length;
  const turnosCubiertos = turnos.filter(t => t.profesional_id).length;
  const turnosPendientes = totalTurnos - turnosCubiertos;
  const tasaCobertura = totalTurnos > 0 ? Math.round((turnosCubiertos / totalTurnos) * 100) : 0;
  const totalMedicos = profesionales.length;

  // Filtrar los próximos turnos urgentes (máximo 5 para la vista expandida)
  const turnosUrgentes = turnos.filter(t => !t.profesional_id).slice(0, 5);

  if (cargando) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400">
        <Activity className="w-12 h-12 animate-spin text-shiftmed-green mb-4" />
        <p className="font-bold">Sincronizando con la Base de Datos...</p>
      </div>
    );
  }

  return (
    <div className="animation-fadeIn max-w-6xl mx-auto">
      
      {/* ENCABEZADO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            Resumen Operativo <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-shiftmed-green opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-shiftmed-green"></span></span>
          </h1>
          <p className="text-slate-500 mt-1">Métricas en tiempo real de tu base de datos ShiftMed.</p>
        </div>
        <button 
          onClick={abrirModalCrearTurno} 
          className="bg-shiftmed-dark hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" /> Publicar Urgencia
        </button>
      </div>

      {/* 📊 TARJETAS DE KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* KPI 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-emerald-50 w-24 h-24 rounded-full group-hover:scale-110 transition-transform duration-500 z-0"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-emerald-100 p-3 rounded-xl"><TrendingUp className="w-6 h-6 text-shiftmed-green" /></div>
              <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md text-xs font-bold border border-emerald-100">+12% vs mes pasado</span>
            </div>
            <h3 className="text-3xl font-black text-slate-900">{tasaCobertura}%</h3>
            <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-wide">Eficacia de Cobertura</p>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-rose-50 w-24 h-24 rounded-full group-hover:scale-110 transition-transform duration-500 z-0"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-rose-100 p-3 rounded-xl"><AlertTriangle className="w-6 h-6 text-rose-500" /></div>
            </div>
            <h3 className="text-3xl font-black text-slate-900">{turnosPendientes}</h3>
            <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-wide">Turnos sin Médico</p>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-blue-50 w-24 h-24 rounded-full group-hover:scale-110 transition-transform duration-500 z-0"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-xl"><CalendarCheck className="w-6 h-6 text-blue-500" /></div>
            </div>
            <h3 className="text-3xl font-black text-slate-900">{turnosCubiertos} <span className="text-lg text-slate-400 font-medium">/ {totalTurnos}</span></h3>
            <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-wide">Turnos Cubiertos</p>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-indigo-50 w-24 h-24 rounded-full group-hover:scale-110 transition-transform duration-500 z-0"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-indigo-100 p-3 rounded-xl"><Users className="w-6 h-6 text-indigo-500" /></div>
            </div>
            <h3 className="text-3xl font-black text-slate-900">{totalMedicos}</h3>
            <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-wide">Especialistas en Red</p>
          </div>
        </div>
      </div>

      {/* 🚨 SECCIÓN DE ATENCIÓN EXPANDIDA */}
      <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" /> Atención Requerida (Turnos sin Asignar)
          </h3>
          <button 
            onClick={() => setSeccionActiva('turnos')} 
            className="text-sm font-bold text-shiftmed-green hover:text-emerald-700 transition flex items-center gap-1"
          >
            Ver todos los turnos <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-0 flex-1 flex flex-col">
          {turnosUrgentes.length > 0 ? (
            turnosUrgentes.map((turno) => (
              <div key={turno.id} className="p-5 border-b border-slate-100 hover:bg-slate-50 transition flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="bg-rose-100 text-rose-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">Urgente</span>
                    <h4 className="font-bold text-slate-900 text-lg">{turno.especialidad_requerida}</h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 mt-2">
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {turno.fecha_turno?.split('T')[0]} a las {turno.horario} hrs</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {turno.ubicacion_especifica || 'Por definir'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Valor Ofrecido</p>
                    <p className="font-black text-slate-800 text-lg">${formatearDinero(turno.valor_turno?.toString() || '0')}</p>
                  </div>
                  <button 
                    onClick={() => setSeccionActiva('turnos')}
                    className="bg-shiftmed-dark hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition shadow-md whitespace-nowrap"
                  >
                    Asignar Médico
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-16 text-center text-slate-400">
              <div className="bg-emerald-50 p-5 rounded-full mb-4">
                <CalendarCheck className="w-10 h-10 text-shiftmed-green" />
              </div>
              <h4 className="text-xl font-bold text-slate-700">¡Todo bajo control!</h4>
              <p className="mt-2">No hay turnos pendientes por cubrir en este momento.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}