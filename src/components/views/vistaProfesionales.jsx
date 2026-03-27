import React from 'react';
import { Filter, UserPlus, ShieldCheck, Edit, Trash2 } from 'lucide-react';

export default function VistaProfesionales({ profesionalesFiltrados, cargando, filtroEspecialidad, setFiltroEspecialidad, abrirModalCrearProf, abrirModalEditarProf, eliminarProfesional }) {
  return (
    <div className="animation-fadeIn">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Red de Profesionales</h1>
          <p className="text-slate-500 mt-1">Directorio de médicos validados extraídos de la base de datos.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative flex items-center">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <select value={filtroEspecialidad} onChange={(e) => setFiltroEspecialidad(e.target.value)} className="pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 focus:outline-none focus:border-shiftmed-green shadow-sm">
              <option value="">Todas las especialidades</option>
              <option value="Medicina General">Medicina General</option>
              <option value="Pediatría">Pediatría</option>
              <option value="Traumatología">Traumatología</option>
              <option value="Ginecología">Ginecología</option>
            </select>
          </div>
          <button onClick={abrirModalCrearProf} className="bg-shiftmed-green hover:bg-emerald-400 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transform hover:-translate-y-1 transition">
            <UserPlus className="w-5 h-5" /> Agregar Médico
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cargando ? <p className="col-span-2 text-slate-500 font-medium">Cargando perfiles...</p> : profesionalesFiltrados.length === 0 ? <p className="col-span-2 text-slate-500 font-medium">No se encontraron profesionales registrados.</p> : (
          profesionalesFiltrados.map((pro, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-shiftmed-dark text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {pro.nombres ? pro.nombres.charAt(0).toUpperCase() : pro.nombre ? pro.nombre.charAt(0).toUpperCase() : 'MD'}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 flex items-center gap-1">Dr. {pro.nombres || pro.nombre} {pro.apellidos || ''} <ShieldCheck className="w-4 h-4 text-shiftmed-green" /></h3>
                    <p className="text-sm text-slate-500 font-bold">{pro.especialidad || 'Médico General'}</p>
                    <p className="text-xs text-slate-400 mt-1">RUT: {pro.rut || 'N/A'} | SIS: {pro.registro_sis || 'Pendiente'}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => abrirModalEditarProf(pro)} className="text-blue-500 bg-blue-50 p-2 rounded-lg hover:bg-blue-100"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => eliminarProfesional(pro.id)} className="text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500">{pro.email} | {pro.telefono}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}