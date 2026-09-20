"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Phoenix3D from "./components/Phoenix3D";
import CinematicStorySection from "./components/CinematicStorySection";
import PhoenixDiscoverySection from "./components/PhoenixDiscoverySection";

interface GreekGod {
  name: string;
  title: string;
  realm: string;
  symbol: string;
  lore: string;
  svg: React.ReactNode;
}

export default function Home() {
  const [selectedGod, setSelectedGod] = useState<GreekGod | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // References for smooth cursor lerp tracking without triggering React component re-renders
  const heroRef = useRef<HTMLDivElement | null>(null);
  const revealLayerRef = useRef<HTMLDivElement | null>(null);
  const targetPos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    let animId: number;
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const handlePointer = (e: MouseEvent | PointerEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const inHero =
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right;

      if (inHero) {
        targetPos.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        setIsHovered(true);
      } else {
        setIsHovered(false);
        targetPos.current = { x: -1000, y: -1000 };
      }
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("mousemove", handlePointer, { passive: true });

    const animateMask = () => {
      // Easing / lerp for smooth fluid cursor following
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.16);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.16);

      if (revealLayerRef.current) {
        // 260px radius soft feathered circular spotlight
        const maskGradient = `radial-gradient(circle 260px at ${currentPos.current.x}px ${currentPos.current.y}px, black 0%, black 130px, rgba(0, 0, 0, 0.6) 200px, transparent 260px)`;
        revealLayerRef.current.style.maskImage = maskGradient;
        revealLayerRef.current.style.webkitMaskImage = maskGradient;
      }

      animId = requestAnimationFrame(animateMask);
    };

    animId = requestAnimationFrame(animateMask);

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("mousemove", handlePointer);
      cancelAnimationFrame(animId);
    };
  }, []);

  const greekGods: GreekGod[] = [
    {
      name: "ZEUS",
      title: "King of Olympus",
      realm: "Sky, Thunder & Sovereignty",
      symbol: "Aegis & Lightning",
      lore: "Ruler of the celestial heavens, who cast the divine spark into the pyre from which the Phoenix first drew immortal flame.",
      svg: (
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-current" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
          </svg>
          <span className="font-semibold tracking-widest text-xs uppercase">Zeus</span>
        </div>
      ),
    },
    {
      name: "POSEIDON",
      title: "Lord of the Oceans",
      realm: "Seas, Storms & Earthquakes",
      symbol: "Trident",
      lore: "Wielder of the oceanic depths, calming the tempests so the firebird may ascend through storm and tempest alike.",
      svg: (
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="2" x2="12" y2="22" />
            <path d="M5 2v5a7 7 0 0 0 14 0V2" />
          </svg>
          <span className="font-semibold tracking-widest text-xs uppercase">Poseidon</span>
        </div>
      ),
    },
    {
      name: "APOLLO",
      title: "God of the Sun & Light",
      realm: "Solar Fire, Truth & Music",
      symbol: "Solar Chariot & Lyre",
      lore: "Bringer of eternal dawn, whose golden rays guide the Phoenix across epochs of recreation and enlightenment.",
      svg: (
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
          <span className="font-semibold tracking-widest text-xs uppercase">Apollo</span>
        </div>
      ),
    },
    {
      name: "ATHENA",
      title: "Goddess of Wisdom",
      realm: "Strategic War, Craft & Reason",
      symbol: "Sacred Owl & Aegis",
      lore: "Master of eternal wisdom, imparting the divine blueprint to build civilizations that withstand the decay of ages.",
      svg: (
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <circle cx="12" cy="11" r="3" fill="currentColor" />
          </svg>
          <span className="font-semibold tracking-widest text-xs uppercase">Athena</span>
        </div>
      ),
    },
    {
      name: "ARES",
      title: "God of Valor & War",
      realm: "Courage, Strength & Combat",
      symbol: "Spear & Helm",
      lore: "The unyielding spirit of raw determination, driving creators to break through every obstacle with fearless fortitude.",
      svg: (
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3v18M3 12h18" />
          </svg>
          <span className="font-semibold tracking-widest text-xs uppercase">Ares</span>
        </div>
      ),
    },
    {
      name: "HERMES",
      title: "Herald of the Gods",
      realm: "Speed, Travel & Transcendence",
      symbol: "Caduceus & Winged Helm",
      lore: "Swift messenger between mortal realms and the divine summit, carrying the sparks of innovation across boundaries.",
      svg: (
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
          </svg>
          <span className="font-semibold tracking-widest text-xs uppercase">Hermes</span>
        </div>
      ),
    },
    {
      name: "HADES",
      title: "Lord of the Underworld",
      realm: "The Unseen, Riches & Eternity",
      symbol: "Bident & Crown of Darkness",
      lore: "Guardian of the crucible of rebirth, where all ancient ashes are purified before the eternal resurrection.",
      svg: (
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3v7a6 6 0 0 0 12 0V3M12 16v6" />
          </svg>
          <span className="font-semibold tracking-widest text-xs uppercase">Hades</span>
        </div>
      ),
    },
    {
      name: "ARTEMIS",
      title: "Goddess of the Hunt",
      realm: "Wilderness, Moon & Precision",
      symbol: "Silver Bow & Starlight",
      lore: "The keen-eyed archer of the cosmic wild, navigating untouched frontiers with relentless clarity and grace.",
      svg: (
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
          </svg>
          <span className="font-semibold tracking-widest text-xs uppercase">Artemis</span>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-[#000000] text-white selection:bg-white/20 selection:text-white relative font-sans overflow-x-clip">
      {/* 
        EXISTING HERO SECTION (Preserved completely)
      */}
      <section
        id="hero-top"
        ref={heroRef}
        className="h-screen w-full bg-[#000000] text-white relative overflow-hidden flex flex-col justify-between px-6 sm:px-10 md:px-14 lg:px-16 pt-6 sm:pt-7 pb-6 sm:pb-8 lg:pb-10 cursor-default"
      >
        {/* 
          LAYER 0: Base Image (BG_IMAGE_1 - Night Moonlit Olympus)
          Positioned below the reveal layer and all UI elements.
        */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <img
            src="/bg-base.jpg"
          alt="Olympus Moonlit Citadel"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle dark cinematic grading ensuring high-contrast editorial text */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
      </div>

      {/* 
        LAYER 1: Reveal Image (BG_IMAGE_2 - Day Sunlit Olympus)
        - Soft circular spotlight centered on cursor (radius 260px)
        - Soft feathered/glowing edge
        - Smooth cursor-following movement with lerp
        - Completely invisible outside the spotlight
        - pointer-events: none
        - Above existing hero background, below all UI elements
      */}
      <div
        ref={revealLayerRef}
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden select-none"
      >
        <img
          src="/bg-reveal.jpg"
          alt="Olympus Sunlit Citadel Reveal"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft atmospheric overlay */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      </div>

      {/* 
        3D Emberwing Phoenix Model
        - Positioned dead-center of hero section
        - Head looks directly forward at the viewer ("look at me") and tracks cursor
        - Z-index 20 so it flies in front of giant background PHOENIX letters (z-10)
      */}
      <div
        className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden"
      >
        <Phoenix3D />
      </div>

      {/* 
        LAYER 2: All UI Elements (relative z-30)
        Guaranteed to sit above the 3D model and background layers
      */}

      {/* Top Minimal Navigation */}
      <header className="w-full flex items-center justify-between relative z-30 shrink-0">
        <Link
          href="/"
          className="group flex items-center gap-3.5 px-4 py-2 rounded-full bg-black/75 hover:bg-zinc-900 border border-white/20 hover:border-amber-400/50 backdrop-blur-md transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.85)]"
        >
          {/* Stylized Phoenix Ember Star Crest */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 flex items-center justify-center p-1.5 shadow-[0_0_16px_rgba(245,158,11,0.6)] group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black">
              <path d="M12 1L13.8 6.2L18.5 3.5L16.2 8.5L21.5 8.2L17.5 11.8L22 14.5L16.8 15.2L18.5 20.5L14 18L12 23L10 18L5.5 20.5L7.2 15.2L2 14.5L6.5 11.8L2.5 8.2L7.8 8.5L5.5 3.5L10.2 6.2L12 1Z" />
            </svg>
          </div>
          {/* Brand Wordmark & Edition */}
          <div className="flex items-baseline gap-2">
            <span className="font-black tracking-[0.24em] text-white text-sm sm:text-base uppercase group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              PHOENIX
            </span>
            <span className="text-[10px] font-mono text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-400/15 border border-amber-400/35">
              ®
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/75 border border-white/20 text-zinc-100 text-xs font-mono tracking-widest uppercase backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.85)]">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
          <span className="font-semibold text-white tracking-[0.22em]">OLYMPUS EDITION</span>
        </div>
      </header>

      {/* 
        Background Letters: PHOENIX + Tagline + Scroll to rise
        - Eyebrow pill: RISE, BUILD, CREATE sits neatly above PHOENIX in open sky
        - Big PHOENIX Letters (z-10, behind Phoenix model)
        - Scroll to rise pill (z-30, in front and clickable)
      */}
      <main className="w-full flex-1 flex flex-col items-center justify-start text-center relative pt-1 sm:pt-2 md:pt-4 select-none">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center px-4">
          {/* Tagline Eyebrow Pill: rise,build,create */}
          <div className="mb-2 sm:mb-3 relative z-30 inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
            <p className="text-xs sm:text-sm md:text-base font-bold tracking-[0.32em] sm:tracking-[0.36em] uppercase text-zinc-100">
              Rise, Build, Create
            </p>
          </div>

          {/* Big PHOENIX Letters: Positioned behind 3D Phoenix (z-10) */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10.5rem] 2xl:text-[12rem] font-black tracking-[-0.035em] text-white leading-none select-none drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)] relative z-10">
            PHOENIX
          </h1>

          {/* Below that: Scroll to rise */}
          <button
            onClick={() => {
              document.getElementById("phoenix-story-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-2.5 sm:mt-3 relative z-30 flex flex-col items-center gap-1.5 text-xs tracking-[0.25em] uppercase text-zinc-200 select-none cursor-pointer group hover:text-white transition-colors"
            aria-label="Scroll to explore Phoenix story section"
          >
            <div className="px-4 py-1.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-md flex items-center gap-2.5 shadow-lg group-hover:border-amber-400/60 transition-colors">
              <span className="font-semibold text-zinc-100 text-xs tracking-[0.25em]">Scroll to rise</span>
              <div className="w-4 h-5 rounded-full border border-zinc-400/60 flex items-start justify-center p-0.5 group-hover:border-white transition-colors">
                <span className="w-1 h-1.5 bg-amber-400 rounded-full animate-bounce" />
              </div>
            </div>
          </button>
        </div>
      </main>

      {/* Bottom Area: Greek Gods */}
      <footer className="w-full flex flex-col items-center gap-2.5 sm:gap-3 relative z-30 shrink-0">
        <div className="px-4 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-md shadow-md">
          <p className="text-xs text-zinc-100 font-bold tracking-[0.28em] uppercase text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Greek Gods of Olympus
          </p>
        </div>

        {/* Horizontal Greek Gods Row */}
        <div className="w-full max-w-5xl flex flex-wrap items-center justify-center gap-y-2.5 gap-x-2.5 sm:gap-x-3.5 md:gap-x-4 px-4 py-2.5 rounded-2xl bg-black/80 border border-white/20 backdrop-blur-lg shadow-[0_10px_35px_rgba(0,0,0,0.9)] text-zinc-100 select-none">
          {greekGods.map((god) => (
            <button
              key={god.name}
              onClick={() => setSelectedGod(god)}
              className="px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-amber-400/60 hover:text-amber-200 hover:scale-105 transition-all duration-200 cursor-pointer text-zinc-100 font-semibold shadow-sm"
              title={`${god.name} — ${god.title}`}
            >
              {god.svg}
            </button>
          ))}
        </div>
      </footer>
      </section>

      {/* 
        CINEMATIC SCROLL-DRIVEN STORYTELLING EXHIBITION SECTION
        - Initial 9:16 vertical portrait with generous negative space
        - Progressively expands to full-screen on scroll
        - Asymmetric "organized chaos" editorial text (Voice Shield AI, Phoenix Research AI, Phoenix Pulse AI)
        - Text elements gracefully animate out with staggered fades, slides, and scale
        - Pure black background with interactive digital art exhibition immersion
      */}
      <CinematicStorySection />

      {/* 
        PHOENIX DISCOVERY DIGITAL ARCHIVE & MONUMENTAL FOOTER
        - Interactive digital archive of real builds: VoiceShield AI, Phoenix AutoScribe, Distributed Microservices, Hardware Lab, Phoenix Pulse.
        - Asymmetric editorial grid with deep forensic inspection modals.
        - Monumental luxury book epilogue footer.
      */}
      <PhoenixDiscoverySection />

      {/* Interactive God Detail Modal */}
      {selectedGod && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-[99999] animate-in fade-in duration-200">
          <div className="bg-[#09090b]/95 border border-zinc-700 max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedGod(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-mono font-bold mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
              <span>Pantheon Chronicle • {selectedGod.symbol}</span>
            </div>

            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-3xl font-black text-white tracking-tight">
                {selectedGod.name}
              </h3>
              <span className="text-xs text-zinc-100 font-semibold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700">
                {selectedGod.title}
              </span>
            </div>

            <p className="text-xs text-zinc-300 tracking-wide uppercase font-mono mb-4 font-semibold">
              Domain: <span className="text-white">{selectedGod.realm}</span>
            </p>

            <p className="text-sm sm:text-base text-zinc-100 leading-relaxed mb-6 border-t border-zinc-800 pt-4 font-normal">
              {selectedGod.lore}
            </p>

            <button
              onClick={() => setSelectedGod(null)}
              className="w-full py-3 rounded-full bg-white text-black font-bold text-xs sm:text-sm hover:bg-amber-400 transition-colors cursor-pointer shadow-lg tracking-wider uppercase"
            >
              Honor {selectedGod.name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
