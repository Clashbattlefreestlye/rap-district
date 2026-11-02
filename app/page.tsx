"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  Headphones,
  Menu,
  Mic2,
  Play,
  Swords,
  Trophy,
  X
} from "lucide-react";

const ranking = [
  { place: "01", name: "MC SHADOW", country: "ESPAÑA", points: "2.840", wins: 28 },
  { place: "02", name: "KILLER FLOW", country: "ARGENTINA", points: "2.610", wins: 25 },
  { place: "03", name: "ZETA", country: "MÉXICO", points: "2.390", wins: 22 },
  { place: "04", name: "DARK RHYME", country: "CHILE", points: "2.150", wins: 19 }
];

const beats = [
  { name: "Concrete Jungle", style: "BOOM BAP · 92 BPM", price: "GRATIS" },
  { name: "Red Zone", style: "TRAP · 140 BPM", price: "GRATIS" },
  { name: "Underground", style: "DRILL · 142 BPM", price: "GRATIS" }
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("GLOBAL");

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <div className="topline"><span className="pulse-dot" /> EL DISTRITO ESTÁ ACTIVO <span className="topline-right">FREESTYLE CULTURE · EST. 2026</span></div>

      <header className="site-header">
        <a className="brand" href="#inicio" onClick={closeMenu} aria-label="RAP DISTRICT inicio">
          <span className="brand-mark">R<span>D</span></span>
          <span className="brand-name">RAP<span>DISTRICT</span></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <a href="#batallas" onClick={closeMenu}>BATALLAS</a>
          <a href="#minuto" onClick={closeMenu}>MINUTO LIBRE</a>
          <a href="#ranking" onClick={closeMenu}>RANKING</a>
          <a href="#beats" onClick={closeMenu}>BEATS</a>
        </nav>
        <a className="header-login" href="/login">ENTRAR <ArrowRight size={15} /></a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="eyebrow"><span /> TU VOZ. TU BARRIO. TU LEGADO.</div>
          <h1>DEMUESTRA<br />LO QUE <span>VALES.</span><br />CONQUISTA<br />EL DISTRITO<span className="red-dot">.</span></h1>
          <p className="hero-copy">El punto de encuentro de los MCs. Reta, improvisa y escala hasta lo más alto. Aquí las palabras tienen peso.</p>
          <div className="hero-actions">
            <a className="button button-red" href="#batallas"><Swords size={17} /> ENTRAR EN BATALLA <ArrowRight size={17} /></a>
            <a className="button button-outline" href="#minuto"><Mic2 size={17} /> MINUTO LIBRE</a>
          </div>
          <div className="hero-foot"><span>01 / 04</span><span className="hero-line" /><span>EL DISTRITO TE ESPERA</span></div>
        </div>
        <div className="hero-stamp"><span>RAP</span><strong>RD</strong><span>DISTRICT</span></div>
        <a href="#batallas" className="scroll-cue"><ArrowDown size={16} /> SCROLL PARA EXPLORAR</a>
      </section>

      <section className="ticker" aria-label="Lema"><div>NO HAY GUIÓN <b>✳</b> SOLO TALENTO <b>✳</b> RESPETO EN EL MICRO <b>✳</b> NO HAY GUIÓN <b>✳</b> SOLO TALENTO <b>✳</b> RESPETO EN EL MICRO <b>✳</b></div></section>

      <section className="section battle-section" id="batallas">
        <div className="section-heading">
          <div><div className="eyebrow"><span /> EL MOMENTO DE LA VERDAD</div><h2>SUBE AL <em>RING.</em></h2></div>
          <p>Dos MCs. Un micro. Cuatro minutos para demostrar quién domina el distrito.</p>
        </div>
        <div className="battle-card">
          <div className="battle-art"><div className="ring-circle ring-one" /><div className="ring-circle ring-two" /><Swords size={72} strokeWidth={1} /><span className="art-label">RD / ARENA 001</span></div>
          <div className="battle-info"><span className="tag">MODO COMPETITIVO</span><h3>BATALLAS<br /><span>1 VS 1</span></h3><p>Encuentra rival, entra en directo y deja que el público decida. Cada victoria cuenta para tu camino hacia la cima.</p><div className="battle-meta"><span><AudioLines size={16} /> 4 MINUTOS</span><span><Trophy size={16} /> PUNTOS DE RANKING</span></div><a className="text-link" href="#unete">PRÓXIMAMENTE <ArrowRight size={16} /></a></div>
        </div>
      </section>

      <section className="section minute-section" id="minuto">
        <div className="minute-copy"><div className="eyebrow"><span /> 60 SEGUNDOS. CERO EXCUSAS.</div><h2>EL MICRO<br />ES <em>TUYO.</em></h2><p>Un beat, un minuto y todo lo que llevas dentro. Sube tu improvisación, reta a la comunidad y demuestra que tienes lo que hace falta.</p><a className="button button-light" href="/login"><Mic2 size={17} /> QUIERO MI MINUTO <ArrowRight size={17} /></a></div>
        <div className="minute-visual"><div className="minute-number">60<span>s</span></div><div className="sound-bars">{Array.from({ length: 34 }, (_, i) => <i key={i} style={{ height: `${18 + ((i * 37) % 75)}px` }} />)}</div><div className="minute-caption"><span>REC ●</span><span>RAP DISTRICT SESSIONS</span></div></div>
      </section>

      <section className="section ranking-section" id="ranking">
        <div className="section-heading">
          <div><div className="eyebrow"><span /> SOLO LOS QUE LO DEMUESTRAN</div><h2>EL <em>RANKING.</em></h2></div>
          <div className="ranking-tabs">{["GLOBAL", "ESPAÑA", "LATAM"].map(tab => <button key={tab} className={activeTab === tab ? "tab active" : "tab"} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div>
        </div>
        <div className="ranking-table">
          <div className="ranking-head"><span>POS.</span><span>MC / ARTISTA</span><span>VICTORIAS</span><span>PUNTOS</span></div>
          {ranking.map((mc, index) => <div className="ranking-row" key={mc.place}><span className={index === 0 ? "rank-number first" : "rank-number"}>{mc.place}</span><div className="mc-name"><span className="avatar">{mc.name.slice(0, 1)}</span><div><strong>{mc.name}</strong><small>{activeTab === "GLOBAL" ? mc.country : activeTab}</small></div></div><span className="wins">{mc.wins} <small>W</small></span><strong className="points">{mc.points}</strong></div>)}
        </div>
        <p className="demo-note">CLASIFICACIÓN DE DEMOSTRACIÓN · LOS DATOS REALES LLEGARÁN CON LA COMPETICIÓN.</p>
      </section>

      <section className="section beats-section" id="beats">
        <div className="section-heading"><div><div className="eyebrow"><span /> ENCUENTRA TU SONIDO</div><h2>BEATS DEL <em>DISTRITO.</em></h2></div><p>Instrumentales para soltar barras y encontrar tu estilo.</p></div>
        <div className="beats-grid">
          {beats.map((beat, i) => <article className="beat-card" key={beat.name}><div className={`beat-cover cover-${i + 1}`}><Headphones size={36} strokeWidth={1.2} /><span>RD BEATS / 00{i + 1}</span><button aria-label={`Vista previa de ${beat.name}`}><Play size={17} fill="currentColor" /></button></div><div className="beat-details"><div><h3>{beat.name}</h3><p>{beat.style}</p></div><span>{beat.price}</span></div></article>)}
        </div>
        <p className="demo-note">CATÁLOGO DE MUESTRA · LAS LICENCIAS Y DESCARGAS SE ACTIVARÁN AL PUBLICAR EL CATÁLOGO.</p>
      </section>

      <section className="join-section" id="unete"><div className="join-glow" /><div className="eyebrow"><span /> TU SITIO ESTÁ AQUÍ</div><h2>EL DISTRITO<br />NO SE <em>EXPLICA.</em><br />SE CONQUISTA.</h2><p>Crea tu perfil de MC y prepárate para entrar en la escena.</p><a className="button button-red" href="/login">CREAR MI PERFIL <ArrowRight size={17} /></a><small>REGISTRO E INICIO DE SESIÓN</small></section>

      <footer className="footer"><a className="brand" href="#inicio"><span className="brand-mark">R<span>D</span></span><span className="brand-name">RAP<span>DISTRICT</span></span></a><p>LA CULTURA SE RESPETA. EL TALENTO SE DEMUESTRA.</p><span>© 2026 RAP DISTRICT</span></footer>
    </main>
  );
}
