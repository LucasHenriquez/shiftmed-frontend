import React from 'react';
import { X, Activity, Building2, Edit, Target } from 'lucide-react';
import { formatearDinero } from '../../utils/formatters';

export default function ModalTurno({ modalCrearTurno, setModalCrearTurno, modoEdicion, handleCrearTurno, nuevoTurno, setNuevoTurno, centros, cargando }) {
  if (!modalCrearTurno) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animation-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative overflow-y-auto max-h-[90vh]">
        <button onClick={() => setModalCrearTurno(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 transition focus:outline-none"><X className="w-6 h-6" /></button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-shiftmed-green"><Activity className="w-6 h-6" /></div>
          <div><h3 className="text-2xl font-black text-slate-900 leading-tight">{modoEdicion ? 'Editar Oferta de Turno' : 'Publicar Nuevo Turno'}</h3></div>
        </div>
        
        <form className="space-y-4" onSubmit={handleCrearTurno}>
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-2">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Sede Clínica (Ubicación)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Building2 className="h-5 w-5 text-slate-400" /></div>
                <select required value={nuevoTurno.centro_id} onChange={(e) => setNuevoTurno({...nuevoTurno, centro_id: e.target.value})} className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-shiftmed-green bg-white font-bold text-shiftmed-dark shadow-sm">
                  <option value="" disabled>Selecciona la sede...</option>
                  {centros.map((centro) => (<option key={centro.id} value={centro.id}>{centro.nombre}</option>))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Especialidad Requerida</label>
              <select required value={nuevoTurno.especialidad} onChange={(e) => setNuevoTurno({...nuevoTurno, especialidad: e.target.value})} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-shiftmed-green bg-white font-medium shadow-sm">
                <option value="" disabled>Selecciona especialidad...</option>
                <option value="Medicina General">Medicina General</option>
                <option value="Pediatría">Pediatría</option>
                <option value="Traumatología">Traumatología</option>
                <option value="Ginecología">Ginecología</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Tipo de Servicio</label>
              <select required value={nuevoTurno.tipo_servicio} onChange={(e) => setNuevoTurno({...nuevoTurno, tipo_servicio: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium">
                <option value="" disabled>Ej: Urgencias, Consulta...</option>
                <option value="Consulta Médica">Consulta Médica</option>
                <option value="Urgencias">Urgencias</option>
                <option value="Pabellón Quirúrgico">Pabellón Quirúrgico</option>
                <option value="Telemedicina">Telemedicina</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Ubicación Específica</label>
              <input type="text" required value={nuevoTurno.ubicacion_especifica} onChange={(e) => setNuevoTurno({...nuevoTurno, ubicacion_especifica: e.target.value})} placeholder="Ej: Piso 3, Box 14" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium text-slate-700" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Fecha del Turno</label>
              <input type="date" required min={new Date().toISOString().split("T")[0]} value={nuevoTurno.fecha} onChange={(e) => setNuevoTurno({...nuevoTurno, fecha: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium text-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Rango Horario</label>
              <select required value={nuevoTurno.horario} onChange={(e) => setNuevoTurno({...nuevoTurno, horario: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium">
                <option value="" disabled>Selecciona horario...</option>
                <option value="08:00 - 14:00 (Diurno)">08:00 - 14:00 (Diurno)</option>
                <option value="14:00 - 20:00 (Tarde)">14:00 - 20:00 (Tarde)</option>
                <option value="20:00 - 08:00 (Noche)">20:00 - 08:00 (Noche)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Valor Bruto a Pagar (CLP)</label>
              <div className="relative">
                <input type="text" required value={nuevoTurno.valor_turno} onChange={(e) => setNuevoTurno({...nuevoTurno, valor_turno: formatearDinero(e.target.value)})} placeholder="$ 150.000" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green bg-emerald-50 font-black text-emerald-600 text-lg" />
              </div>
            </div>
            {/* 👇 AQUÍ AGREGUÉ EL SELECTOR DE URGENCIA 👇 */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Nivel de Urgencia (Triage)</label>
              <select 
                required 
                value={nuevoTurno.nivel_urgencia || 'Normal'} 
                onChange={(e) => setNuevoTurno({...nuevoTurno, nivel_urgencia: e.target.value})} 
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium text-slate-700"
              >
                <option value="Normal">🟢 Normal (Planificado)</option>
                <option value="Alta">🟠 Alta (Necesario pronto)</option>
                <option value="Crítica">🔴 Crítica (Emergencia)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Descripción / Instrucciones Adicionales</label>
            <textarea required rows="2" value={nuevoTurno.descripcion} onChange={(e) => setNuevoTurno({...nuevoTurno, descripcion: e.target.value})} placeholder="Ej: Se requiere puntualidad..." className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green bg-slate-50 font-medium text-slate-700 resize-none"></textarea>
          </div>

          <button type="submit" disabled={cargando} className="w-full bg-shiftmed-green hover:bg-emerald-400 text-white font-black text-lg py-4 rounded-xl transition mt-2 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            {modoEdicion ? <Edit className="w-5 h-5"/> : <Target className="w-5 h-5" />} {modoEdicion ? 'Actualizar Oferta' : 'Lanzar al Hub GPS'}
          </button>
        </form>
      </div>
    </div>
  );
}