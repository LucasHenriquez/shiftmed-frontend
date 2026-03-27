import React from 'react';
import { Filter, Plus, DollarSign, Building2, CheckCircle2, Timer, UserCheck, Edit, Trash2 } from 'lucide-react';

export default function VistaTurnos({ turnos, cargando, abrirModalCrearTurno, abrirModalAsignar, abrirModalEditarTurno, eliminarTurno }) {
  return (
    <div className="animation-fadeIn">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Gestión de Turnos</h1>
          <p className="text-slate-500 mt-1">Administra todas las solicitudes, valores y asignaciones.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition">
            <Filter className="w-4 h-4" /> Filtros
          </button>
          <button onClick={abrirModalCrearTurno} className="bg-shiftmed-dark text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition">
            <Plus className="w-4 h-4" /> Publicar Turno
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500 border-b border-slate-200">
                <th className="px-6 py-4 font-bold">Especialidad / Servicio</th>
                <th className="px-6 py-4 font-bold">Fecha / Horario</th>
                <th className="px-6 py-4 font-bold">Sede / Valor</th>
                <th className="px-6 py-4 font-bold">Estado GPS</th>
                <th className="px-6 py-4 font-bold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {cargando ? <tr><td colSpan="5" className="px-6 py-4 text-center text-slate-500 font-medium">Sincronizando...</td></tr> : turnos.length === 0 ? <tr><td colSpan="5" className="px-6 py-4 text-center text-slate-500 font-medium">No hay historial de turnos.</td></tr> : (
                turnos.map((turno, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-400 font-bold mb-1">#SHF-{turno.id || index + 100}</p>
                      <p className="font-bold text-slate-900">{turno.especialidad_requerida}</p>
                      <p className="text-xs text-slate-500">{turno.tipo_servicio}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-600">{turno.fecha_turno ? new Date(turno.fecha_turno).toLocaleDateString() : 'Sin fecha'}</p>
                      <p className="text-xs font-bold text-slate-400">{turno.horario}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-emerald-600 flex items-center gap-1"><DollarSign className="w-3 h-3"/> {turno.valor_turno ? new Intl.NumberFormat('es-CL').format(turno.valor_turno) : '0'}</p>
                      <p className="text-xs font-bold text-slate-700 mt-1 flex items-center gap-1"><Building2 className="w-3 h-3"/>{turno.centro_medico}</p>
                      <p className="text-xs text-slate-400 mt-0.5 ml-4">{turno.ubicacion_especifica || 'Por definir'}</p>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center w-max gap-1 ${turno.estado === 'asignada' ? 'bg-emerald-100 text-shiftmed-green' : 'bg-amber-100 text-amber-600'}`}>
                        {turno.estado === 'asignada' ? 'Asignado' : 'Buscando (Radar)'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      {turno.estado !== 'asignada' && (
                        <button onClick={() => abrirModalAsignar(turno)} className="text-emerald-500 bg-emerald-50 p-2 rounded-lg hover:bg-emerald-100 transition" title="Asignar Médico Manualmente"><UserCheck className="w-5 h-5" /></button>
                      )}
                      <button onClick={() => abrirModalEditarTurno(turno)} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-lg transition"><Edit className="w-5 h-5" /></button>
                      <button onClick={() => eliminarTurno(turno.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition"><Trash2 className="w-5 h-5" /></button>
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