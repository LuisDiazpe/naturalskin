import { useState } from 'react';
import { supabase, mensajeError } from '../supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const entrar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(mensajeError(error));
    setEnviando(false);
  };

  return (
    <div className="login">
      <form className="card login-card" onSubmit={entrar}>
        <img src={`${import.meta.env.BASE_URL}assets/img/logo-monograma-160.png`} alt="" width="64" height="67" />
        <h1 className="titulo">Panel de <em>citas</em></h1>
        <p className="muted">Acceso solo para el personal de Natural Skin.</p>
        <label>Correo<input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Contraseña<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn btn-primary" disabled={enviando}>{enviando ? 'Entrando…' : 'Entrar'}</button>
      </form>
    </div>
  );
}
