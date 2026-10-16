import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import Login from './components/Login';
import Agenda from './components/Agenda';
import Servicios from './components/Servicios';
import Bloqueos from './components/Bloqueos';

const VISTAS = [
  ['agenda', 'Agenda'],
  ['servicios', 'Servicios'],
  ['bloqueos', 'Bloqueos']
];

export default function App() {
  const [session, setSession] = useState(undefined);
  const [vista, setVista] = useState('agenda');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (session === undefined) return <p className="cargando">Cargando…</p>;
  if (!session) return <Login />;

  return (
    <div className="app">
      <header className="top">
        <div className="top-row">
          <div className="marca">
            <img src={`${import.meta.env.BASE_URL}assets/img/logo-monograma-160.png`} alt="" width="40" height="42" />
            <span>Natural Skin <small>Panel de citas</small></span>
          </div>
          <div className="usuario">
            <span>{session.user.email}</span>
            <button className="btn btn-ghost btn-sm" onClick={() => supabase.auth.signOut()}>Salir</button>
          </div>
        </div>
        <nav className="vistas" aria-label="Secciones">
          {VISTAS.map(([id, label]) => (
            <button key={id} className="vista" aria-current={vista === id ? 'page' : undefined} onClick={() => setVista(id)}>{label}</button>
          ))}
        </nav>
      </header>
      <main className="contenido">
        {vista === 'agenda' && <Agenda />}
        {vista === 'servicios' && <Servicios />}
        {vista === 'bloqueos' && <Bloqueos />}
      </main>
    </div>
  );
}
