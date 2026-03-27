import React from 'react';
import { X, Building2, Edit, Plus } from 'lucide-react';

export default function ModalCentro({ modalCrearCentro, setModalCrearCentro, modoEdicion, handleCrearCentro, nuevoCentro, setNuevoCentro, cargando }) {
  if (!modalCrearCentro) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animation-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative transform scale-100 transition-transform">
        <button onClick={() => setModalCrearCentro(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 transition"><X className="w-6 h-6" /></button>
        <div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500"><Building2 className="w-6 h-6" /></div><div><h3 className="text-2xl font-black text-slate-900 leading-tight">{modoEdicion ? 'Editar Sede' : 'Agregar Sede Clínica'}</h3></div></div>
        
        <form className="space-y-4" onSubmit={handleCrearCentro}>
          <div><label className="block text-sm font-bold text-slate-700 mb-1">Nombre de la Sede</label><input type="text" required value={nuevoCentro.nombre} onChange={(e) => setNuevoCentro({...nuevoCentro, nombre: e.target.value})} placeholder="Ej: Clínica RedSalud Ñuñoa" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 bg-slate-50 font-medium text-slate-900" /></div>
          <div><label className="block text-sm font-bold text-slate-700 mb-1">Dirección Exacta</label><input type="text" required value={nuevoCentro.direccion} onChange={(e) => setNuevoCentro({...nuevoCentro, direccion: e.target.value})} placeholder="Ej: Av. Irarrázaval 2401" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 bg-slate-50 font-medium text-slate-900" /></div>
          <div><label className="block text-sm font-bold text-slate-700 mb-1">Ciudad</label><input type="text" required value={nuevoCentro.ciudad} onChange={(e) => setNuevoCentro({...nuevoCentro, ciudad: e.target.value})} placeholder="Ej: Santiago" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 bg-slate-50 font-medium text-slate-900" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Latitud GPS (Opcional)</label><input type="text" value={nuevoCentro.latitud} onChange={(e) => setNuevoCentro({...nuevoCentro, latitud: e.target.value})} placeholder="-33.456" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 bg-slate-50 font-mono text-slate-500 text-sm" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Longitud GPS (Opcional)</label><input type="text" value={nuevoCentro.longitud} onChange={(e) => setNuevoCentro({...nuevoCentro, longitud: e.target.value})} placeholder="-70.648" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 bg-slate-50 font-mono text-slate-500 text-sm" /></div>
          </div>
          <button type="submit" disabled={cargando} className="w-full bg-shiftmed-dark hover:bg-slate-800 text-white font-black text-lg py-4 rounded-xl transition mt-4 shadow-lg flex items-center justify-center gap-2">{modoEdicion ? <Edit className="w-5 h-5"/> : <Plus className="w-5 h-5" />} {modoEdicion ? 'Actualizar Sede' : 'Guardar Sede'}</button>
        </form>
      </div>
    </div>
  );
}