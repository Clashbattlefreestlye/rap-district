# RAP DISTRICT

Plataforma de freestyle, batallas y comunidad urbana.

## Stack
- Next.js 15 (App Router)
- React 19 + TypeScript
- Supabase (Auth y base de datos, en preparación)
- CSS responsive propio

## Desarrollo local
1. Instala Node.js 20.9 o superior.
2. Instala las dependencias con `npm install`.
3. Copia `.env.example` a `.env.local`.
4. Añade la URL del proyecto Supabase y su clave publishable.
5. Arranca el servidor con `npm run dev`.
6. Abre http://localhost:3000.

## Estado actual
La página de inicio responsive está creada. Las cifras del ranking y el catálogo de beats son datos de demostración. El registro, las batallas en directo, las votaciones, las subidas de vídeo y las descargas de instrumentales todavía necesitan implementación.

## Seguridad
Nunca añadas claves secretas o service_role al frontend ni al repositorio. Usa políticas RLS en Supabase para proteger los datos.
