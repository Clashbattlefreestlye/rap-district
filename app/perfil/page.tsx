"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Profile = { artist_name: string | null; country: string | null; bio: string | null };

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    async function load() {
      if (!supabase) { setLoading(false); return; }
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) { router.replace("/login"); return; }
      if (!active) return;
      setEmail(auth.user.email ?? "");
      const { data } = await supabase.from("profiles").select("artist_name,country,bio").eq("id", auth.user.id).maybeSingle();
      if (active) { setProfile(data); setLoading(false); }
    }
    load();
    return () => { active = false; };
  }, [router]);
  async function logout() {
    await supabase?.auth.signOut();
    router.replace("/");
    router.refresh();
  }
  if (loading) return <main className="auth-page"><section className="auth-card"><p>Entrando en tu perfil...</p></section></main>;
  return <main className="auth-page"><section className="auth-card"><div className="eyebrow"><span /> PERFIL DE MC</div><h1>BIENVENIDO AL <em>DISTRITO.</em></h1><p className="auth-intro">Sesión iniciada como {email}</p><div className="profile-summary"><strong>{profile?.artist_name || "MC"}</strong><span>{profile?.country || "País sin indicar"}</span><p>{profile?.bio || "Tu camino en RAP DISTRICT empieza aquí."}</p></div><button className="button button-red auth-submit" onClick={logout}>CERRAR SESIÓN</button><p className="auth-back"><Link href="/">← Volver a la portada</Link></p></section></main>;
}
