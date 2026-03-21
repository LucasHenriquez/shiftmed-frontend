import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Activity, LayoutDashboard, CalendarDays, Users, Settings, Building2, 
  Bell, LogOut, Search, Plus, Target, Timer, CheckCircle2, Filter, 
  MoreVertical, Star, ShieldCheck, X, MapPin, Stethoscope
} from 'lucide-react';

function DashboardPage({ setVistaActual, usuarioActivo, setUsuarioActivo }) {
  const [seccionActiva, setSeccionActiva] = useState('panel');
  const [modalCrearTurno, setModalCrearTurno] = useState(false);

  // ==========================================
  // 🧠 ESTADOS PARA DATOS REALES (BASE DE DATOS)
  // ==========================================
  const [turnos, setTurnos] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [cargando, setCargando] = useState(false);

  const [nuevoTurno, setNuevoTurno] = useState({
    especialidad: '',
    fecha: '',
    horario: ''
  });

  // ==========================================
  // 🔌 CONEXIONES AL BACKEND CON TOKEN (JWT)
  // ==========================================

  // 1. OBTENER TURNOS (GET)
  const fetchTurnos = async () => {
    setCargando(true);
    try {
      // 👇 Sacamos el "Pase VIP" guardado en el navegador
      const token = localStorage.getItem('token'); 

      const res = await fetch('http://localhost:3000/api/ofertas', {
        headers: {
          'Authorization': `Bearer ${token}` // Le mostramos el pase al Backend
        }
      }); 

      if (res.ok) {
        const data = await res.json();
        setTurnos(data); 
      } else {
        throw new Error('Error al cargar turnos (Probablemente 401)');
      }
    } catch (error) {
      console.error(error);
      toast.error('No se pudieron cargar los turnos.');
    } finally {
      setCargando(false);
    }
  };

  // 2. OBTENER PROFESIONALES (GET)
  const fetchProfesionales = async () => {
    setCargando(true);
    try {
      const token = localStorage.getItem('token'); // Pase VIP

      const res = await fetch('http://localhost:3000/api/profesionales', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setProfesionales(data);
      } else {
        throw new Error('Error al cargar profesionales');
      }
    } catch (error) {
      console.error(error);
      toast.error('No se pudieron cargar los profesionales.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (seccionActiva === 'panel' || seccionActiva === 'turnos') {
      fetchTurnos();
    } else if (seccionActiva === 'profesionales') {
      fetchProfesionales();
    }
  }, [seccionActiva]);

  // 3. CREAR UN TURNO NUEVO (POST)
  const handleCrearTurno = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Guardando turno en la base de datos...');
    const token = localStorage.getItem('token'); // Pase VIP

    try {
      const res = await fetch('http://localhost:3000/api/ofertas', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Permiso para crear
        },
        body: JSON.stringify({
          centro_id: usuarioActivo?.id || 1, 
          especialidad: nuevoTurno.especialidad,
          fecha: nuevoTurno.fecha,
          horario: nuevoTurno.horario,
          estado: 'pendiente'
        })
      });

      if (res.ok) {
        toast.success('Turno publicado con éxito.', { id: toastId });
        setModalCrearTurno(false);
        fetchTurnos(); // Recargamos la tabla para ver el nuevo turno

        setTimeout(() => {
          toast('Algoritmo GPS buscando médicos cercanos...', {
            icon: '📡', duration: 4000,
            style: { border: '1px solid #10B981', color: '#0B1120', fontWeight: 'bold' }
          });
        }, 1500);
      } else {
        throw new Error('Error al guardar');
      }
    } catch (error) {
      toast.error('Fallo al guardar en la base de datos.', { id: toastId });
    }
  };

  const cerrarSesion = () => {
    setUsuarioActivo(null);
    localStorage.removeItem('token'); // 🗑️ Borramos el token al salir por seguridad
    setVistaActual('landing');
    toast('Sesión cerrada', { icon: '👋' });
  };

  // ==========================================
  // 🧩 SUB-VISTAS DEL DASHBOARD (INTERFAZ)
  // ==========================================

  const renderizarContenido = () => {
    if (seccionActiva === 'panel') {
      return (
        <div className="animation-fadeIn">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Panel de Control</h1>
              <p className="text-slate-500 mt-1">Resumen operativo y estado de la red GPS en tiempo real.</p>
            </div>
            <button onClick={() => setModalCrearTurno(true)} className="bg-shiftmed-dark hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transform hover:-translate-y-1 transition">
              <Plus className="w-5 h-5" /> Crear Nuevo Turno
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6 hover:border-shiftmed-green transition cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><CalendarDays className="w-7 h-7"/></div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Turnos Registrados</p>
                <h3 className="text-3xl font-black text-slate-900">{turnos.length}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6 relative overflow-hidden hover:border-shiftmed-green transition cursor-pointer">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50"></div>
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-shiftmed-green relative z-10"><Target className="w-7 h-7"/></div>
              <div className="relative z-10">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Médicos en Radar</p>
                <h3 className="text-3xl font-black text-slate-900">Activo <span className="text-sm text-shiftmed-green font-bold">Online</span></h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6 hover:border-shiftmed-green transition cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-500"><Timer className="w-7 h-7"/></div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Tiempo Respuesta</p>
                <h3 className="text-3xl font-black text-slate-900">-- <span className="text-lg text-slate-400 font-bold">min</span></h3>
              </div>
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
                    <th className="px-6 py-4 font-bold">Especialidad</th>
                    <th className="px-6 py-4 font-bold">Fecha / Horario</th>
                    <th className="px-6 py-4 font-bold">Estado</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  {cargando ? (
                    <tr><td colSpan="3" className="px-6 py-4 text-center text-slate-500 font-medium">Cargando datos desde el servidor...</td></tr>
                  ) : turnos.length === 0 ? (
                    <tr><td colSpan="3" className="px-6 py-4 text-center text-slate-500 font-medium">No hay turnos registrados en la base de datos.</td></tr>
                  ) : (
                    turnos.slice(0, 5).map((turno, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4"><p className="font-bold text-slate-900">{turno.especialidad || 'Especialidad no definida'}</p></td>
                        <td className="px-6 py-4 text-slate-600">{turno.fecha ? new Date(turno.fecha).toLocaleDateString() : 'Sin fecha'} - {turno.horario}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center w-max gap-1 ${turno.estado === 'cubierto' ? 'bg-emerald-100 text-shiftmed-green' : 'bg-amber-100 text-amber-600'}`}>
                            {turno.estado === 'cubierto' ? <CheckCircle2 className="w-3 h-3"/> : <Timer className="w-3 h-3"/>}
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

    if (seccionActiva === 'turnos') {
      return (
        <div className="animation-fadeIn">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Gestión de Turnos</h1>
              <p className="text-slate-500 mt-1">Administra todas las solicitudes y asignaciones de tu institución.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition">
                <Filter className="w-4 h-4" /> Filtros
              </button>
              <button onClick={() => setModalCrearTurno(true)} className="bg-shiftmed-dark text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition">
                <Plus className="w-4 h-4" /> Publicar Turno
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500 border-b border-slate-200">
                    <th className="px-6 py-4 font-bold">ID / Especialidad</th>
                    <th className="px-6 py-4 font-bold">Fecha y Hora</th>
                    <th className="px-6 py-4 font-bold">Estado GPS</th>
                    <th className="px-6 py-4 font-bold text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  {cargando ? (
                    <tr><td colSpan="4" className="px-6 py-4 text-center text-slate-500 font-medium">Sincronizando con base de datos...</td></tr>
                  ) : turnos.length === 0 ? (
                    <tr><td colSpan="4" className="px-6 py-4 text-center text-slate-500 font-medium">No hay historial de turnos.</td></tr>
                  ) : (
                    turnos.map((turno, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4">
                          <p className="text-xs text-slate-400 font-bold mb-1">#SHF-{turno.id || index + 100}</p>
                          <p className="font-bold text-slate-900">{turno.especialidad}</p>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-600">{turno.fecha ? new Date(turno.fecha).toLocaleDateString() : 'Sin fecha'} - {turno.horario}</td>
                        <td className="px-6 py-4">
                           <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center w-max gap-1 ${turno.estado === 'cubierto' ? 'bg-emerald-100 text-shiftmed-green' : 'bg-amber-100 text-amber-600'}`}>
                            {turno.estado === 'cubierto' ? 'Asignado' : 'Buscando (Radar)'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-shiftmed-dark p-2"><MoreVertical className="w-5 h-5" /></button>
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

    if (seccionActiva === 'profesionales') {
      return (
        <div className="animation-fadeIn">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Red de Profesionales</h1>
              <p className="text-slate-500 mt-1">Directorio de médicos validados extraídos de la base de datos.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cargando ? (
              <p className="text-slate-500 font-medium col-span-2">Cargando perfiles...</p>
            ) : profesionales.length === 0 ? (
              <p className="text-slate-500 font-medium col-span-2">No se encontraron profesionales en la base de datos.</p>
            ) : (
              profesionales.map((pro, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-shiftmed-dark text-white rounded-full flex items-center justify-center text-xl font-bold">
                        {pro.nombre ? pro.nombre.charAt(0) : 'MD'}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 flex items-center gap-1">Dr. {pro.nombre || 'Sin nombre'} <ShieldCheck className="w-4 h-4 text-shiftmed-green" /></h3>
                        <p className="text-sm text-slate-500">{pro.especialidad || 'Médico General'}</p>
                      </div>
                    </div>
                    <div className="bg-emerald-50 text-shiftmed-green px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Activity className="w-3 h-3" /> Verificado</div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <div className="flex text-amber-400"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                    <span className="text-xs font-bold text-slate-400">Ver Perfil Completo</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden animation-fadeIn relative">
      <Toaster />
      
      {/* MODAL DE CREAR TURNO */}
      {modalCrearTurno && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animation-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative transform scale-100 transition-transform">
            <button onClick={() => setModalCrearTurno(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 transition">
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-shiftmed-green">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">Publicar Turno</h3>
                <p className="text-slate-500 text-sm">El algoritmo notificará a médicos cercanos.</p>
              </div>
            </div>
            
            <form className="space-y-5" onSubmit={handleCrearTurno}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Especialidad Requerida</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Stethoscope className="h-5 w-5 text-slate-400" /></div>
                  <select 
                    required 
                    value={nuevoTurno.especialidad}
                    onChange={(e) => setNuevoTurno({...nuevoTurno, especialidad: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-shiftmed-green focus:ring-1 focus:ring-shiftmed-green transition bg-slate-50 appearance-none font-medium"
                  >
                    <option value="" disabled>Selecciona una especialidad...</option>
                    <option value="Medicina General">Medicina General</option>
                    <option value="Pediatría">Pediatría</option>
                    <option value="Traumatología">Traumatología</option>
                    <option value="Ginecología">Ginecología</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Fecha</label>
                  <input 
                    type="date" 
                    required 
                    value={nuevoTurno.fecha}
                    onChange={(e) => setNuevoTurno({...nuevoTurno, fecha: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green focus:ring-1 focus:ring-shiftmed-green transition bg-slate-50 font-medium text-slate-700" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Horario</label>
                  <select 
                    required 
                    value={nuevoTurno.horario}
                    onChange={(e) => setNuevoTurno({...nuevoTurno, horario: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-shiftmed-green focus:ring-1 focus:ring-shiftmed-green transition bg-slate-50 font-medium"
                  >
                    <option value="" disabled>Selecciona...</option>
                    <option value="08:00 - 14:00">08:00 - 14:00</option>
                    <option value="14:00 - 20:00">14:00 - 20:00</option>
                    <option value="Noche">20:00 - 08:00 (Noche)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Ubicación GPS Exacta</label>
                <div className="flex items-center gap-2 bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <MapPin className="text-shiftmed-green w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium text-slate-600 truncate">Clínica Registrada Actual</p>
                </div>
              </div>

              <button type="submit" disabled={cargando} className="w-full bg-shiftmed-green hover:bg-emerald-400 text-white font-black text-lg py-4 rounded-xl transition mt-2 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
                <Target className="w-5 h-5" /> Activar Hub GPS
              </button>
            </form>
          </div>
        </div>
      )}

      {/* BARRA LATERAL (SIDEBAR) */}
      <aside className="w-72 bg-shiftmed-dark text-white flex flex-col shadow-2xl z-20">
        <div className="h-20 flex items-center px-8 border-b border-slate-700/50">
          <div className="text-2xl font-bold tracking-wider flex items-center gap-2">
            <Activity className="text-shiftmed-green w-8 h-8" />
            <div><span className="text-shiftmed-green">Shift</span>Med</div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto hide-scrollbar">
          <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Gestión Principal</p>
          
          <button onClick={() => setSeccionActiva('panel')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${seccionActiva === 'panel' ? 'bg-shiftmed-green/10 text-shiftmed-green' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <LayoutDashboard className="w-5 h-5" /> Panel de Control
          </button>
          
          <button onClick={() => setSeccionActiva('turnos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${seccionActiva === 'turnos' ? 'bg-shiftmed-green/10 text-shiftmed-green' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <CalendarDays className="w-5 h-5" /> Mis Turnos
          </button>
          
          <button onClick={() => setSeccionActiva('profesionales')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${seccionActiva === 'profesionales' ? 'bg-shiftmed-green/10 text-shiftmed-green' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <Users className="w-5 h-5" /> Red de Profesionales
          </button>
          
          <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest mt-8 mb-4">Configuración</p>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-bold transition">
            <Building2 className="w-5 h-5" /> Datos de la Clínica
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-bold transition">
            <Settings className="w-5 h-5" /> Ajustes de Sistema
          </button>
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <button onClick={cerrarSesion} className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl font-bold transition">
            <LogOut className="w-5 h-5" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Cabecera (Header) */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10 flex-shrink-0">
          <div className="flex items-center bg-slate-100 px-4 py-2.5 rounded-full w-96 border border-slate-200 focus-within:border-shiftmed-green focus-within:bg-white transition-all">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input type="text" placeholder="Buscar turnos, médicos, especialidades..." className="bg-transparent border-none outline-none w-full text-sm font-medium" />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-shiftmed-dark transition">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-900">{usuarioActivo?.nombre || 'Director Médico'}</p>
                <p className="text-xs font-bold text-shiftmed-green">Clínica RedSalud</p>
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                {usuarioActivo?.nombre ? usuarioActivo.nombre.charAt(0).toUpperCase() : 'D'}
              </div>
            </div>
          </div>
        </header>

        {/* Área de Datos Dinámica */}
        <div className="flex-1 overflow-y-auto p-8 pb-24 hide-scrollbar">
          {renderizarContenido()}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;