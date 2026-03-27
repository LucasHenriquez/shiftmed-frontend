import React from 'react';
import { X, UserCheck, CheckCircle2 } from 'lucide-react';

export default function ModalAsignar({ modalAsignar, setModalAsignar, turnoAAsignar, handleAsignarTurno, medicosAptos, medicoSeleccionado, setMedicoSeleccionado, cargando }) {
  if (!modalAsignar || !turnoAAsignar) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animation-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
        <button onClick={() => setModalAsignar(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500"><X className="w-6 h-6" /></button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-shiftmed-green"><UserCheck className="w-6 h-6" /></div>
          <div><h3 className="text-2xl font-black text-slate-900">Asignar Turno</h3><p className="text-sm font-bold text-shiftmed-green">{turnoAAsignar.especialidad_requerida}</p></div>
        </div>

        <form onSubmit={handleAsignarTurno}>
          <label className="block text-sm font-bold text-slate-700 mb-2">Selecciona un Profesional Disponible</label>
          
          {medicosAptos.length > 0 ? (
            <select required value={medicoSeleccionado} onChange={(e) => setMedicoSeleccionado(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-shiftmed-green bg-white font-medium mb-6">
              <option value="" disabled>Elegir médico...</option>
              {medicosAptos.map(pro => (
                <option key={pro.id} value={pro.id}>Dr. {pro.nombres} {pro.apellidos}</option>
              ))}
            </select>
          ) : (
            <div className="bg-amber-50 text-amber-600 font-bold text-sm p-4 rounded-xl mb-6 border border-amber-200">
              ⚠️ No tienes médicos registrados con la especialidad de "{turnoAAsignar.especialidad_requerida}". Ve a la Red de Profesionales y agrega uno primero.
            </div>
          )}

          <button type="submit" disabled={!medicoSeleccionado || cargando} className="w-full bg-shiftmed-dark text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50 transition">
            Confirmar Asignación <CheckCircle2 className="w-5 h-5"/>
          </button>
        </form>
      </div>
    </div>
  );
}