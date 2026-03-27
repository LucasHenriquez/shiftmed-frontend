// src/components/views/vistaPanel.jsx
import React from 'react';
import { CalendarDays, Target, Timer, CheckCircle2, Plus } from 'lucide-react';

export default function VistaPanel({ turnos, profesionales, cargando, abrirModalCrearTurno, setSeccionActiva }) {
  return (
    <div className="animation-fadeIn">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Panel de Control</h1>
          <p className="text-slate-500 mt-1">Resumen operativo y estado de la red GPS en tiempo real.</p>
        </div>
        <button onClick={abrirModalCrearTurno} className="bg-shiftmed-dark hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transform hover:-translate-y-1 transition">
          <Plus className="w-5 h-5" /> Crear Nuevo Turno
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><CalendarDays className="w-7 h-7"/></div>
          <div><p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Turnos Registrados</p><h3 className="text-3xl font-black text-slate-900">{turnos.length}</h3></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50"></div>
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-shiftmed-green relative z-10"><Target className="w-7 h-7"/></div>
          <div className="relative z-10"><p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Médicos en Radar</p><h3 className="text-3xl font-black text-slate-900">{profesionales.length} <span className="text-sm text-shiftmed-green font-bold">Online</span></h3></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-500"><Timer className="w-7 h-7"/></div>
          <div><p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Tiempo Respuesta</p><h3 className="text-3xl font-black text-slate-900">-- <span className="text-lg text-slate-400 font-bold">min</span></h3></div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">Actividad Reciente</h3>
          <button onClick={() => setSeccionActiva('turnos')} className="text-sm font-bold text-shiftmed-green hover:underline">Ver todos los turnos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500 border-b border-slate-200">
                <th className="px-6 py-4 font-bold">Servicio Requerido</th>
                <th className="px-6 py-4 font-bold">Fecha / Horario</th>
                <th className="px-6 py-4 font-bold">Valor</th>
                <th className="px-6 py-4 font-bold">Estado</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {cargando ? <tr><td colSpan="4" className="px-6 py-4 text-center text-slate-500 font-medium">Cargando datos desde el servidor...</td></tr> : turnos.length === 0 ? <tr><td colSpan="4" className="px-6 py-4 text-center text-slate-500 font-medium">No hay turnos registrados en la base de datos.</td></tr> : (
                turnos.slice(0, 5).map((turno, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{turno.especialidad_requerida}</p>
                      <p className="text-xs text-slate-500">{turno.tipo_servicio || 'General'} - {turno.centro_medico}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {turno.fecha_turno ? new Date(turno.fecha_turno).toLocaleDateString() : 'Sin fecha'} <br/> 
                      <span className="text-xs font-bold">{turno.horario}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-emerald-600">
                      {turno.valor_turno ? `$ ${new Intl.NumberFormat('es-CL').format(turno.valor_turno)}` : 'Por definir'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center w-max gap-1 ${turno.estado === 'asignada' ? 'bg-emerald-100 text-shiftmed-green' : 'bg-amber-100 text-amber-600'}`}>
                        {turno.estado === 'asignada' ? <CheckCircle2 className="w-3 h-3"/> : <Timer className="w-3 h-3"/>}
                        {turno.estado || 'Pendiente'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}