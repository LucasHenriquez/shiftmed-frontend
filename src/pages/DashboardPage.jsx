import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Activity, CalendarDays, Target, Timer, CheckCircle2, Filter, 
  Building2, ShieldCheck, MapPin, UserPlus, Edit, Trash2, DollarSign, UserCheck, Plus, X
} from 'lucide-react';

import { formatearDinero, limpiarDinero, normalizar } from '../utils/formatters';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import ModalAsignar from '../components/modals/modalAsignar';
import ModalCentro from '../components/modals/modalCentro';
import ModalProfesional from '../components/modals/modalProfesional';
import ModalTurno from '../components/modals/modalTurno';

import VistaPanel from '../components/views/vistaPanel';
import VistaTurnos from '../components/views/vistaTurnos';
import VistaProfesionales from '../components/views/vistaProfesionales';
import VistaCentros from '../components/views/vistaCentros';
import VistaAjustes from '../components/views/vistaAjustes';

function DashboardPage({ setVistaActual, usuarioActivo, setUsuarioActivo }) {
  const [seccionActiva, setSeccionActiva] = useState('panel');
  
  const [modalCrearTurno, setModalCrearTurno] = useState(false);
  const [modalCrearProfesional, setModalCrearProfesional] = useState(false);
  const [modalCrearCentro, setModalCrearCentro] = useState(false); 
  const [modalAsignar, setModalAsignar] = useState(false); 

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const [turnos, setTurnos] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [centros, setCentros] = useState([]); 
  const [cargando, setCargando] = useState(false);

  const [filtroEspecialidad, setFiltroEspecialidad] = useState(''); 
  const [turnoAAsignar, setTurnoAAsignar] = useState(null);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState('');

  const [nuevoTurno, setNuevoTurno] = useState({ centro_id: '', especialidad: '', tipo_servicio: '', fecha: '', horario: '', valor_turno: '', ubicacion_especifica: '', descripcion: '' });
  const [nuevoProfesional, setNuevoProfesional] = useState({ nombres: '', apellidos: '', rut: '', fecha_nacimiento: '', registro_sis: '', especialidad: '', email: '', telefono: '' });
  const [nuevoCentro, setNuevoCentro] = useState({ nombre: '', direccion: '', ciudad: '', latitud: '', longitud: '' });

  const hoy = new Date().toISOString().split("T")[0];

  // ==========================================
  // 🔌 CONEXIONES AL BACKEND Y MEMORIA DE AJUSTES
  // ==========================================
  const fetchTurnos = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const res = await fetch('http://localhost:3000/api/ofertas', { headers: { 'Authorization': `Bearer ${token}` } }); 
      if (res.ok) { const data = await res.json(); setTurnos(data); }
    } catch (error) { console.error(error); }
  };

  const fetchProfesionales = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const res = await fetch('http://localhost:3000/api/profesionales', { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) { const data = await res.json(); setProfesionales(data); }
    } catch (error) { console.error(error); }
  };

  const fetchCentros = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const res = await fetch('http://localhost:3000/api/centros', { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) { const data = await res.json(); setCentros(data); }
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    setCargando(true);
    Promise.all([fetchCentros(), fetchTurnos(), fetchProfesionales()]).then(() => setCargando(false));
  }, [seccionActiva]);

  // 👇 EL GUARDIÁN DE LA MEMORIA (Agregado perfectamente) 👇
  useEffect(() => {
    const root = document.documentElement;
    const temaGuardado = localStorage.getItem('shiftmed_tema') || 'claro';
    const animacionesGuardadas = localStorage.getItem('shiftmed_animaciones') !== 'false';
    const densidadGuardada = localStorage.getItem('shiftmed_densidad') || 'comoda';

    // 1. Aplicar Tema (Modo Oscuro)
    if (temaGuardado === 'oscuro' || (temaGuardado === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // 2. Aplicar Densidad
    root.setAttribute('data-densidad', densidadGuardada);

    // 3. Aplicar Animaciones
    if (!animacionesGuardadas) root.classList.add('no-anim');
  }, []);

  // ==========================================
  // 🧑‍⚕️ ASIGNAR TURNO MANUALMENTE
  // ==========================================
  const abrirModalAsignar = (turno) => { setTurnoAAsignar(turno); setMedicoSeleccionado(''); setModalAsignar(true); };

  const handleAsignarTurno = async (e) => {
    e.preventDefault();
    if (!medicoSeleccionado) { toast.error('Por favor, selecciona un médico.'); return; }
    const toastId = toast.loading('Asignando turno...');
    const token = localStorage.getItem('token'); 

    try {
      const res = await fetch(`http://localhost:3000/api/ofertas/${turnoAAsignar.id}/asignar`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ profesional_id: medicoSeleccionado })
      });
      if (res.ok) { toast.success('¡Turno asignado con éxito!', { id: toastId }); setModalAsignar(false); fetchTurnos(); } else { throw new Error('Error al asignar'); }
    } catch (error) { toast.error('Fallo al asignar el turno.', { id: toastId }); }
  };

  // ==========================================
  // 🏥 CRUD DE CENTROS MÉDICOS
  // ==========================================
  const abrirModalCrearCentro = () => { setModoEdicion(false); setIdEditando(null); setNuevoCentro({ nombre: '', direccion: '', ciudad: '', latitud: '', longitud: '' }); setModalCrearCentro(true); };
  const abrirModalEditarCentro = (centro) => { setModoEdicion(true); setIdEditando(centro.id); setNuevoCentro({ nombre: centro.nombre || '', direccion: centro.direccion || '', ciudad: centro.ciudad || '', latitud: centro.latitud || '', longitud: centro.longitud || '' }); setModalCrearCentro(true); };

  const handleCrearCentro = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(modoEdicion ? 'Actualizando sede...' : 'Registrando sede...');
    const token = localStorage.getItem('token'); 
    const url = modoEdicion ? `http://localhost:3000/api/centros/${idEditando}` : 'http://localhost:3000/api/centros';
    const method = modoEdicion ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, { method: method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(nuevoCentro) });
      if (res.ok) { toast.success(modoEdicion ? 'Sede actualizada.' : 'Sede registrada.', { id: toastId }); setModalCrearCentro(false); fetchCentros(); } else { throw new Error('Error al guardar'); }
    } catch (error) { toast.error('Fallo al guardar sede.', { id: toastId }); }
  };

  const eliminarCentro = async (id) => {
    if(!window.confirm('¿Estás seguro de desactivar esta sede?')) return;
    const token = localStorage.getItem('token'); 
    try {
      const res = await fetch(`http://localhost:3000/api/centros/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if(res.ok) { toast.success('Sede desactivada'); fetchCentros(); } else { toast.error('Error al desactivar la sede'); }
    } catch (error) { console.error(error); }
  };

  // ==========================================
  // 📝 CRUD DE TURNOS 
  // ==========================================
  const abrirModalCrearTurno = () => { setModoEdicion(false); setIdEditando(null); setNuevoTurno({ centro_id: '', especialidad: '', tipo_servicio: '', fecha: '', horario: '', valor_turno: '', ubicacion_especifica: '', descripcion: '' }); setModalCrearTurno(true); };
  const abrirModalEditarTurno = (turno) => { setModoEdicion(true); setIdEditando(turno.id); setNuevoTurno({ centro_id: turno.centro_id || centros[0]?.id || '', especialidad: turno.especialidad_requerida || '', tipo_servicio: turno.tipo_servicio || '', fecha: turno.fecha_turno?.split('T')[0] || '', horario: turno.horario || '', valor_turno: turno.valor_turno ? formatearDinero(turno.valor_turno.toString()) : '', ubicacion_especifica: turno.ubicacion_especifica || '', descripcion: turno.descripcion || '' }); setModalCrearTurno(true); };

  const handleCrearTurno = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(modoEdicion ? 'Actualizando turno...' : 'Publicando turno en la red...');
    const token = localStorage.getItem('token'); 
    const url = modoEdicion ? `http://localhost:3000/api/ofertas/${idEditando}` : 'http://localhost:3000/api/ofertas';
    const method = modoEdicion ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, { method: method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ centro_id: nuevoTurno.centro_id, especialidad_requerida: nuevoTurno.especialidad, fecha_turno: nuevoTurno.fecha, horario: nuevoTurno.horario, valor_turno: limpiarDinero(nuevoTurno.valor_turno), tipo_servicio: nuevoTurno.tipo_servicio, ubicacion_especifica: nuevoTurno.ubicacion_especifica, descripcion: nuevoTurno.descripcion }) });
      if (res.ok) { toast.success(modoEdicion ? 'Turno actualizado con éxito.' : 'Turno publicado.', { id: toastId }); setModalCrearTurno(false); fetchTurnos(); } else { throw new Error('Error al guardar'); }
    } catch (error) { toast.error('Fallo al guardar en la base de datos.', { id: toastId }); }
  };

  const eliminarTurno = async (id) => {
    if(!window.confirm('¿Estás seguro de cancelar este turno? Los médicos ya no lo verán.')) return;
    const token = localStorage.getItem('token'); 
    try {
      const res = await fetch(`http://localhost:3000/api/ofertas/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if(res.ok) { toast.success('Turno cancelado'); fetchTurnos(); } else { toast.error('Error al cancelar el turno'); }
    } catch (error) { console.error(error); }
  };

  // ==========================================
  // 👨‍⚕️ CRUD DE PROFESIONALES 
  // ==========================================
  const abrirModalCrearProf = () => { setModoEdicion(false); setIdEditando(null); setNuevoProfesional({ nombres: '', apellidos: '', rut: '', fecha_nacimiento: '', registro_sis: '', especialidad: '', email: '', telefono: '' }); setModalCrearProfesional(true); };
  const abrirModalEditarProf = (prof) => { setModoEdicion(true); setIdEditando(prof.id); setNuevoProfesional({ nombres: prof.nombres || '', apellidos: prof.apellidos || '', rut: prof.rut || '', fecha_nacimiento: prof.fecha_nacimiento?.split('T')[0] || '', registro_sis: prof.registro_sis || '', especialidad: prof.especialidad || '', email: prof.email || '', telefono: prof.telefono || '' }); setModalCrearProfesional(true); };

  const handleCrearProfesional = async (e) => {
    e.preventDefault();
    if (nuevoProfesional.rut.length < 11) { toast.error('El RUT ingresado parece estar incompleto.'); return; }
    const toastId = toast.loading(modoEdicion ? 'Actualizando médico...' : 'Registrando médico en la base de datos...');
    const token = localStorage.getItem('token'); 
    const url = modoEdicion ? `http://localhost:3000/api/profesionales/${idEditando}` : 'http://localhost:3000/api/profesionales';
    const method = modoEdicion ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, { method: method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(nuevoProfesional) });
      if (res.ok) { toast.success(modoEdicion ? 'Médico actualizado.' : 'Profesional registrado con éxito.', { id: toastId }); setModalCrearProfesional(false); fetchProfesionales(); } else { const data = await res.json(); throw new Error(data.mensaje || 'Error al guardar'); }
    } catch (error) { toast.error(error.message || 'Fallo al registrar profesional.', { id: toastId }); }
  };

  const eliminarProfesional = async (id) => {
    if(!window.confirm('¿Desvincular a este médico de la red?')) return;
    const token = localStorage.getItem('token'); 
    try {
      const res = await fetch(`http://localhost:3000/api/profesionales/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if(res.ok) { toast.success('Médico eliminado'); fetchProfesionales(); } else { toast.error('Error al eliminar'); }
    } catch (error) { console.error(error); }
  };

  const cerrarSesion = () => { setUsuarioActivo(null); localStorage.removeItem('token'); setVistaActual('landing'); toast('Sesión cerrada', { icon: '👋' }); };

  const profesionalesFiltrados = filtroEspecialidad ? profesionales.filter(p => p.especialidad === filtroEspecialidad) : profesionales;
  const medicosAptos = turnoAAsignar ? profesionales.filter(pro => normalizar(pro.especialidad) === normalizar(turnoAAsignar.especialidad_requerida)) : [];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden animation-fadeIn relative">
      <Toaster />

      <ModalAsignar 
        modalAsignar={modalAsignar} setModalAsignar={setModalAsignar} turnoAAsignar={turnoAAsignar} 
        handleAsignarTurno={handleAsignarTurno} medicosAptos={medicosAptos} 
        medicoSeleccionado={medicoSeleccionado} setMedicoSeleccionado={setMedicoSeleccionado} cargando={cargando} 
      />

      <ModalTurno 
        modalCrearTurno={modalCrearTurno} setModalCrearTurno={setModalCrearTurno} modoEdicion={modoEdicion} 
        handleCrearTurno={handleCrearTurno} nuevoTurno={nuevoTurno} setNuevoTurno={setNuevoTurno} 
        centros={centros} cargando={cargando} 
      />

      <ModalCentro 
        modalCrearCentro={modalCrearCentro} setModalCrearCentro={setModalCrearCentro} modoEdicion={modoEdicion} 
        handleCrearCentro={handleCrearCentro} nuevoCentro={nuevoCentro} setNuevoCentro={setNuevoCentro} cargando={cargando} 
      />

      <ModalProfesional 
        modalCrearProfesional={modalCrearProfesional} setModalCrearProfesional={setModalCrearProfesional} modoEdicion={modoEdicion} 
        handleCrearProfesional={handleCrearProfesional} nuevoProfesional={nuevoProfesional} setNuevoProfesional={setNuevoProfesional} 
        cargando={cargando} hoy={hoy} 
      />

      <Sidebar seccionActiva={seccionActiva} setSeccionActiva={setSeccionActiva} cerrarSesion={cerrarSesion} />

      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        <Header usuarioActivo={usuarioActivo} />

        <div className="flex-1 overflow-y-auto p-8 pb-24 hide-scrollbar">
          {seccionActiva === 'panel' && <VistaPanel turnos={turnos} profesionales={profesionales} cargando={cargando} abrirModalCrearTurno={abrirModalCrearTurno} setSeccionActiva={setSeccionActiva} />}
          {seccionActiva === 'turnos' && <VistaTurnos turnos={turnos} cargando={cargando} abrirModalCrearTurno={abrirModalCrearTurno} abrirModalAsignar={abrirModalAsignar} abrirModalEditarTurno={abrirModalEditarTurno} eliminarTurno={eliminarTurno} />}
          {seccionActiva === 'profesionales' && <VistaProfesionales profesionalesFiltrados={profesionalesFiltrados} cargando={cargando} filtroEspecialidad={filtroEspecialidad} setFiltroEspecialidad={setFiltroEspecialidad} abrirModalCrearProf={abrirModalCrearProf} abrirModalEditarProf={abrirModalEditarProf} eliminarProfesional={eliminarProfesional} />}
          {seccionActiva === 'centros' && <VistaCentros centros={centros} cargando={cargando} abrirModalCrearCentro={abrirModalCrearCentro} abrirModalEditarCentro={abrirModalEditarCentro} eliminarCentro={eliminarCentro} />}
          
          {/* ✨ AQUÍ RENDERIZAMOS LA VISTA DE AJUSTES ✨ */}
          {seccionActiva === 'ajustes' && <VistaAjustes />}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;