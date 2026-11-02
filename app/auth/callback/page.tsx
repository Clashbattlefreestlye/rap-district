"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [message, setMessage] = useState("Estamos verificando tu acceso...");
  useEffect(() => {
    let active = true;
    async function finish() {
      if (!supabase) {
        setMessage("No se pudo conectar con Supabase.");
        return;
      }
      const code = params.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setMessage("No se pudo completar el acceso: " + error.message);
          return;
        }
      }
      const { data } = await supabase.auth.getSession();
      if (data.session && active) router.replace("/perfil");
      else if (active) setMessage("No se ha encontrado una sesión activa. Vuelve a iniciar sesión.");
    }
    finish();
    return () => { active = false; };
  }, [params, router]);
  return <main className="auth-page"><section className="auth-card"><h1>RAP <em>DISTRICT.</em></h1><p className="auth-intro">{message}</p></section></main>;
}
