import React from 'react';
import { Filter, Plus, DollarSign, Building2, CheckCircle2, Timer, UserCheck, Edit, Trash2 } from 'lucide-react';

export default function VistaTurnos({ turnos, cargando, abrirModalCrearTurno, abrirModalAsignar, abrirModalEditarTurno, eliminarTurno, cambiarEstadoTurno }) {
  
  // 🎨 Generador de Insignias de Estado
  const renderBadge = (estado) => {
    const est = (estado || 'pendiente').toLowerCase();
    
    if (est === 'pendiente') {
      return <span className="px-3 py-1 rounded-full text-xs font-bold flex items-center w-max gap-1.5 bg-amber-100 text-amber-700 animate-pulse border border-amber-200"><Timer className="w-3.5 h-3.5"/> Pendiente</span>;
    }
    if (est === 'asignado' || est === 'asignada') {
      return <span className="px-3 py-1 rounded-full text-xs font-bold flex items-center w-max gap-1.5 bg-blue-100 text-blue-700 border border-blue-200"><UserCheck className="w-3.5 h-3.5"/> Asignado</span>;
    }
    if (est === 'finalizado') {
      return <span className="px-3 py-1 rounded-full text-xs font-bold flex items-center w-max gap-1.5 bg-emerald-100 text-emerald-700 border border-emerald-200"><CheckCircle2 className="w-3.5 h-3.5"/> Finalizado</span>;
    }
    
    return <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">{estado}</span>;
  };

  return (
    <div className="animation-fadeIn">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Gestión de Turnos</h1>
          <p className="text-slate-500 mt-1">Administra todas las solicitudes, valores y asignaciones.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition shadow-sm">
            <Filter className="w-4 h-4" /> Filtros
          </button>
          <button onClick={abrirModalCrearTurno} className="bg-shiftmed-dark text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition shadow-md">
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
              {cargando ? <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500 font-medium">Sincronizando con la Base de Datos...</td></tr> : turnos.length === 0 ? <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500 font-medium">No hay historial de turnos registrados.</td></tr> : (
                turnos.map((turno, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-400 font-bold mb-1">#SHF-{turno.id || index + 100}</p>
                      <p className="font-bold text-slate-900 text-base">{turno.especialidad_requerida}</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{turno.tipo_servicio}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700">{turno.fecha_turno ? new Date(turno.fecha_turno).toLocaleDateString() : 'Sin fecha'}</p>
                      <p className="text-xs font-bold text-slate-400 mt-0.5">{turno.horario}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-black text-emerald-600 flex items-center gap-1 text-base"><DollarSign className="w-4 h-4"/> {turno.valor_turno ? new Intl.NumberFormat('es-CL').format(turno.valor_turno) : '0'}</p>
                      <p className="text-xs font-bold text-slate-600 mt-1 flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-slate-400"/>{turno.centro_medico}</p>
                      <p className="text-xs text-slate-400 mt-0.5 ml-5">{turno.ubicacion_especifica || 'Por definir'}</p>
                    </td>
                    <td className="px-6 py-4">
                       {/* 👇 AQUÍ LLAMAMOS A LA INSIGNIA 👇 */}
                       {renderBadge(turno.estado)}
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      
                      {/* Botón Asignar (Solo si está pendiente o no tiene estado) */}
                      {(!turno.estado || turno.estado.toLowerCase() === 'pendiente') && (
                        <button onClick={() => abrirModalAsignar(turno)} className="text-blue-600 bg-blue-50 border border-blue-100 p-2 rounded-lg hover:bg-blue-100 transition shadow-sm" title="Asignar Médico">
                          <UserCheck className="w-5 h-5" />
                        </button>
                      )}

                      {/* Botón Finalizar (Solo si está asignado) */}
                      {(turno.estado && (turno.estado.toLowerCase() === 'asignado' || turno.estado.toLowerCase() === 'asignada')) && (
                        <button onClick={() => cambiarEstadoTurno && cambiarEstadoTurno(turno.id, 'finalizado')} className="text-emerald-600 bg-emerald-50 border border-emerald-100 p-2 rounded-lg hover:bg-emerald-100 transition shadow-sm" title="Marcar como Finalizado">
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                      )}

                      <button onClick={() => abrirModalEditarTurno(turno)} className="text-slate-500 hover:text-indigo-600 bg-white border border-slate-200 p-2 rounded-lg transition shadow-sm hover:border-indigo-200" title="Editar Turno"><Edit className="w-5 h-5" /></button>
                      <button onClick={() => eliminarTurno(turno.id)} className="text-slate-500 hover:text-rose-600 bg-white border border-slate-200 p-2 rounded-lg transition shadow-sm hover:border-rose-200" title="Eliminar Turno"><Trash2 className="w-5 h-5" /></button>
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