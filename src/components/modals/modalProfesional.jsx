import React from 'react';
import { X, UserPlus, Edit, ShieldCheck } from 'lucide-react';
import { formatearNombre, formatearRUT, soloNumeros, formatearTelefono } from '../../utils/formatters';

export default function ModalProfesional({ modalCrearProfesional, setModalCrearProfesional, modoEdicion, handleCrearProfesional, nuevoProfesional, setNuevoProfesional, cargando, hoy }) {
  if (!modalCrearProfesional) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animation-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative overflow-y-auto max-h-[90vh]">
        <button onClick={() => setModalCrearProfesional(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 transition"><X className="w-6 h-6" /></button>
        <div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500"><UserPlus className="w-6 h-6" /></div><div><h3 className="text-2xl font-black text-slate-900 leading-tight">{modoEdicion ? 'Editar Médico' : 'Registrar Médico'}</h3></div></div>
        
        <form className="space-y-4" onSubmit={handleCrearProfesional}>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Nombres</label><input type="text" required value={nuevoProfesional.nombres} onChange={(e) => setNuevoProfesional({...nuevoProfesional, nombres: formatearNombre(e.target.value)})} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Apellidos</label><input type="text" required value={nuevoProfesional.apellidos} onChange={(e) => setNuevoProfesional({...nuevoProfesional, apellidos: formatearNombre(e.target.value)})} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-slate-700 mb-1">RUT Médico</label><input type="text" required maxLength="12" value={nuevoProfesional.rut} onChange={(e) => setNuevoProfesional({...nuevoProfesional, rut: formatearRUT(e.target.value)})} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Fecha de Nacimiento</label><input type="date" required max={hoy} value={nuevoProfesional.fecha_nacimiento} onChange={(e) => setNuevoProfesional({...nuevoProfesional, fecha_nacimiento: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium text-slate-700" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-slate-700 mb-1">N° Registro SIS</label><input type="text" required value={nuevoProfesional.registro_sis} onChange={(e) => setNuevoProfesional({...nuevoProfesional, registro_sis: soloNumeros(e.target.value)})} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium" /></div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Especialidad</label>
              <select required value={nuevoProfesional.especialidad} onChange={(e) => setNuevoProfesional({...nuevoProfesional, especialidad: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium"><option value="" disabled>Selecciona especialidad...</option><option value="Medicina General">Medicina General</option><option value="Pediatría">Pediatría</option><option value="Traumatología">Traumatología</option><option value="Ginecología">Ginecología</option></select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Correo Electrónico</label><input type="email" required value={nuevoProfesional.email} onChange={(e) => setNuevoProfesional({...nuevoProfesional, email: e.target.value.toLowerCase().replace(/\s/g, '')})} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Teléfono</label><input type="text" required value={nuevoProfesional.telefono} onChange={(e) => setNuevoProfesional({...nuevoProfesional, telefono: formatearTelefono(e.target.value)})} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium" /></div>
          </div>
          <button type="submit" disabled={cargando} className="w-full bg-shiftmed-dark hover:bg-slate-800 text-white font-black py-4 rounded-xl transition mt-4 shadow-lg flex items-center justify-center gap-2">{modoEdicion ? <Edit className="w-5 h-5"/> : <ShieldCheck className="w-5 h-5" />} {modoEdicion ? 'Guardar Cambios' : 'Validar e Ingresar'}</button>
        </form>
      </div>
    </div>
  );
}