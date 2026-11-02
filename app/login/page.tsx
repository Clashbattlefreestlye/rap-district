"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [artistName, setArtistName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!supabase) {
      setMessage("Falta configurar la conexión con Supabase. Contacta con el equipo.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { artist_name: artistName.trim(), country: country.trim() } }
        });
        if (error) throw error;
        setMessage(data.session
          ? "¡Cuenta creada! Ya puedes entrar al distrito."
          : "¡Registro recibido! Revisa tu correo y confirma la cuenta para iniciar sesión.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/perfil");
        router.refresh();
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No se pudo completar la operación.");
    } finally {
      setBusy(false);
    }
  }

  async function googleLogin() {
    setMessage("");
    if (!supabase) {
      setMessage("Falta configurar la conexión con Supabase.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/perfil` }
    });
    if (error) {
      setMessage(error.message);
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <Link href="/" className="auth-brand"><span className="brand-mark">R<span>D</span></span><span className="brand-name">RAP<span>DISTRICT</span></span></Link>
      <section className="auth-card">
        <div className="eyebrow"><span /> TU SITIO ESTÁ AQUÍ</div>
        <h1>{mode === "signup" ? "ENTRA AL" : "VUELVE AL"} <em>DISTRITO.</em></h1>
        <p className="auth-intro">{mode === "signup" ? "Crea tu perfil de MC y empieza a construir tu legado." : "Inicia sesión y vuelve a la competición."}</p>
        <div className="auth-switch">
          <button type="button" className={mode === "signup" ? "selected" : ""} onClick={() => { setMode("signup"); setMessage(""); }}>CREAR CUENTA</button>
          <button type="button" className={mode === "login" ? "selected" : ""} onClick={() => { setMode("login"); setMessage(""); }}>INICIAR SESIÓN</button>
        </div>
        <form onSubmit={submit} className="auth-form">
          {mode === "signup" && <>
            <label>Nombre artístico<input required minLength={2} maxLength={24} value={artistName} onChange={e => setArtistName(e.target.value)} placeholder="Tu nombre de MC" /></label>
            <label>País <input value={country} onChange={e => setCountry(e.target.value)} placeholder="Ej. España" maxLength={60} /></label>
          </>}
          <label>Correo electrónico<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" /></label>
          <label>Contraseña<input required type="password" minLength={6} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" /></label>
          <button className="button button-red auth-submit" disabled={busy}>{busy ? "UN MOMENTO..." : mode === "signup" ? "CREAR MI CUENTA" : "ENTRAR AL DISTRITO"}</button>
        </form>
        <div className="auth-divider"><span /> O CONTINÚA CON <span /></div>
        <button type="button" className="google-button" onClick={googleLogin} disabled={busy}><strong>G</strong> CONTINUAR CON GOOGLE</button>
        {message && <p className="auth-message" role="status">{message}</p>}
        <p className="auth-back"><Link href="/">← Volver a RAP DISTRICT</Link></p>
      </section>
    </main>
  );
}
