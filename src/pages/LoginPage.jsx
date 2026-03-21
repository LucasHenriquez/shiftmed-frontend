import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Activity, ShieldCheck, ArrowLeft, Mail, Lock } from 'lucide-react';

function LoginPage({ setVistaActual, setUsuarioActivo }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Autenticando credenciales...', {
      style: { background: '#0B1120', color: '#fff' }
    });

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, contrasena: password })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('¡Acceso concedido!', { id: toastId });
        setUsuarioActivo(data.usuario || { nombre: 'Administrador' }); 
        
        // 👇 AQUÍ ESTÁ LA LÍNEA MÁGICA QUE FALTABA 👇
        localStorage.setItem('token', data.token); 
        
        setTimeout(() => {
          setVistaActual('dashboard');
        }, 1000);
        
      } else {
        toast.error(data.mensaje || 'Credenciales incorrectas.', { id: toastId });
      }
    } catch (error) {
      toast.error('Error de conexión. ¿Está encendido el servidor Node?', { 
        id: toastId, style: { background: '#FEF2F2', color: '#991B1B' }
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800 animation-fadeIn overflow-hidden">
      <Toaster />
      
      <div className="hidden lg:flex lg:w-1/2 bg-shiftmed-dark text-white p-12 flex-col justify-between relative transform animation-fadeInLeft">
        <div className="absolute w-full h-full border border-slate-700 rounded-full opacity-10 scale-[2.5] -top-1/4 -right-1/4 z-0"></div>
        <div className="absolute w-full h-full border border-shiftmed-green rounded-full opacity-20 scale-[1.5] -bottom-1/4 -left-1/4 z-0"></div>
        
        <div className="relative z-10">
          <div className="text-3xl font-bold tracking-wider flex items-center gap-2 mb-16">
            <Activity className="text-shiftmed-green w-10 h-10" />
            <div><span className="text-shiftmed-green">Shift</span>Med</div>
          </div>
          <h1 className="text-5xl font-black leading-tight mb-6">El futuro de la gestión operativa.</h1>
          <p className="text-slate-400 text-lg max-w-md">Accede a tu panel de control institucional o profesional para gestionar turnos, métricas y geolocalización en tiempo real.</p>
        </div>
        
        <div className="relative z-10 flex items-center gap-4 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 w-fit backdrop-blur-sm">
          <ShieldCheck className="w-8 h-8 text-shiftmed-green" />
          <div>
            <p className="font-bold">Conexión Segura</p>
            <p className="text-xs text-slate-400">Protegido con encriptación de grado médico</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24 bg-white relative transform animation-fadeInRight">
        <button onClick={() => setVistaActual('landing')} className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-shiftmed-dark transition">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </button>

        <div className="w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Iniciar Sesión</h2>
          <p className="text-slate-500 mb-8">Ingresa tus credenciales corporativas para continuar.</p>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-shiftmed-green focus:ring-1 focus:ring-shiftmed-green transition bg-slate-50 focus:bg-white" 
                  placeholder="ejemplo@clinica.cl" 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-bold text-slate-700">Contraseña</label>
                <a href="#" className="text-sm font-bold text-shiftmed-green hover:underline">¿Olvidaste tu clave?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-shiftmed-green focus:ring-1 focus:ring-shiftmed-green transition bg-slate-50 focus:bg-white" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-shiftmed-dark hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition shadow-xl transform hover:-translate-y-1">
              Ingresar al Sistema
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;