import React from 'react';
import { Building2, Edit, Trash2 } from 'lucide-react';

export default function VistaCentros({ centros, cargando, abrirModalCrearCentro, abrirModalEditarCentro, eliminarCentro }) {
  return (
    <div className="animation-fadeIn">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Sedes y Sucursales</h1>
          <p className="text-slate-500 mt-1">Administra los recintos médicos donde se publican los turnos.</p>
        </div>
        <button onClick={abrirModalCrearCentro} className="bg-shiftmed-dark hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transform hover:-translate-y-1 transition">
          <Building2 className="w-5 h-5" /> Agregar Sede
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500 border-b border-slate-200">
              <th className="px-6 py-4 font-bold">Nombre del Centro</th>
              <th className="px-6 py-4 font-bold">Ubicación</th>
              <th className="px-6 py-4 font-bold">Estado</th>
              <th className="px-6 py-4 font-bold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {cargando ? <tr><td colSpan="4" className="px-6 py-4 text-center text-slate-500">Cargando sedes...</td></tr> : centros.length === 0 ? <tr><td colSpan="4" className="px-6 py-4 text-center text-slate-500">No hay sedes registradas.</td></tr> : (
              centros.map((centro) => (
                <tr key={centro.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900 flex items-center gap-2"><Building2 className="w-4 h-4 text-slate-400"/> {centro.nombre}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-600 font-medium">{centro.direccion}</p>
                    <p className="text-xs text-slate-400">{centro.ciudad}</p>
                  </td>
                  <td className="px-6 py-4">
                     <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-shiftmed-green">Activo</span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button onClick={() => abrirModalEditarCentro(centro)} className="text-blue-500 bg-blue-50 p-2 rounded-lg hover:bg-blue-100"><Edit className="w-5 h-5" /></button>
                    <button onClick={() => eliminarCentro(centro.id)} className="text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100"><Trash2 className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}