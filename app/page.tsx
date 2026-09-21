"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Phoenix3D from "./components/Phoenix3D";
import DepthText from "./components/DepthText";
import CinematicStorySection from "./components/CinematicStorySection";
import PhoenixDiscoverySection from "./components/PhoenixDiscoverySection";
import { PHOENIX_PROJECTS, PhoenixProject } from "./data/phoenixProjects";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<PhoenixProject | null>(null);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  return (
    <div className="w-full bg-[#000000] text-white selection:bg-white/20 selection:text-white relative font-sans overflow-x-clip">
      {/* 
        EXISTING HERO SECTION (Preserved completely with Fluid Glass UI)
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

        {/* Top Minimal Navigation — Fluid Glass Treatment */}
        <header className="w-full flex items-center justify-between relative z-30 shrink-0">
          <Link
            href="/"
            className="group flex items-center gap-3.5 px-4 py-2 rounded-full glass-pill hover:border-amber-400/60 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.85)]"
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

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill text-zinc-100 text-xs font-mono tracking-widest uppercase">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            <span className="font-semibold text-white tracking-[0.22em]">ENGINEERING PORTFOLIO</span>
          </div>
        </header>

        {/* 
          Background Letters: PHOENIX + Tagline + Scroll to rise
          - Eyebrow pill: BUILD. CREATE. RISE. sits neatly above PHOENIX in open sky
          - Big PHOENIX Letters (z-10, behind Phoenix model)
          - Scroll to rise pill (z-30, in front and clickable)
        */}
        <main className="w-full flex-1 flex flex-col items-center justify-start text-center relative pt-1 sm:pt-2 md:pt-4 select-none">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center px-4">
            {/* Tagline Eyebrow Pill: BUILD. CREATE. RISE. in Fluid Glass */}
            <div className="mb-2 sm:mb-3 relative z-30 inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full glass-pill">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
              <p className="text-xs sm:text-sm md:text-base font-bold tracking-[0.32em] sm:tracking-[0.36em] uppercase text-zinc-100">
                BUILD. CREATE. RISE.
              </p>
            </div>

            {/* 3D Extruded PHOENIX Title (React Bits DepthText synced with Phoenix fire theme) */}
            <h1 className="relative z-10 select-none leading-none flex items-center justify-center my-1 sm:my-2">
              <DepthText
                text="PHOENIX"
                layers={34}
                depth={2.4}
                faceColor="#f8fafc"
                depthColor="#F97316"
                tilt={7.5}
                pointerTracking
                smoothing={0.14}
                perspective={900}
                autoOrbit
                orbitSpeed={0.35}
                fontSize="clamp(3.5rem, 12.5vw, 10.5rem)"
                fontWeight={900}
                shadow
              />
            </h1>

            {/* Below that: Scroll to rise in Fluid Glass */}
            <button
              onClick={() => {
                document.getElementById("phoenix-story-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-2.5 sm:mt-3 relative z-30 flex flex-col items-center gap-1.5 text-xs tracking-[0.25em] uppercase text-zinc-200 select-none cursor-pointer group hover:text-white transition-colors"
              aria-label="Scroll to explore Phoenix story section"
            >
              <div className="px-4 py-1.5 rounded-full glass-pill flex items-center gap-2.5 shadow-lg group-hover:border-amber-400/60 transition-colors">
                <span className="font-semibold text-zinc-100 text-xs tracking-[0.25em]">Scroll to rise</span>
                <div className="w-4 h-5 rounded-full border border-zinc-400/60 flex items-start justify-center p-0.5 group-hover:border-white transition-colors">
                  <span className="w-1 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                </div>
              </div>
            </button>
          </div>
        </main>

        {/* Bottom Area: Production Systems Bar (5 Canonical Projects in Fluid Glass Dock) */}
        <footer className="w-full flex flex-col items-center gap-2.5 sm:gap-3 relative z-30 shrink-0">
          <div className="px-4 py-1 rounded-full glass-pill shadow-md">
            <p className="text-xs text-zinc-100 font-bold tracking-[0.28em] uppercase text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Production Systems & Architecture
            </p>
          </div>

          {/* Horizontal Systems Dock with Crystal Transparent Fluid Glass */}
          <div className="relative w-full max-w-5xl rounded-2xl glass-dock overflow-hidden shadow-[0_16px_45px_rgba(0,0,0,0.7)] text-zinc-100 select-none p-2 sm:p-2.5">
            {/* Interactive Project Controls floating on the glass */}
            <div className="relative z-10 w-full flex flex-wrap items-center justify-center gap-y-2 gap-x-2 sm:gap-x-3">
              {PHOENIX_PROJECTS.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group flex items-center gap-2 px-3.5 py-1.5 rounded-lg glass-tab cursor-pointer text-zinc-100 font-semibold text-xs"
                  title={`${project.title} — ${project.category} (${project.destinationLabel})`}
                >
                  <span className="font-mono text-[10px] text-amber-400 font-bold">0{idx + 1}</span>
                  <span className="font-bold tracking-wide">{project.title}</span>
                  {project.destinationType === "LIVE PLATFORM" ? (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-400/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded glass-chip text-zinc-300">
                      GH
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </footer>
      </section>

      {/* 
        CINEMATIC SCROLL-DRIVEN STORYTELLING EXHIBITION SECTION
        - Initial 9:16 vertical portrait with generous negative space
        - Progressively expands to full-screen on scroll
        - Asymmetric "organized chaos" editorial text
        - Transforms into interactive Phoenix world project map with 5 architectural hotspots
      */}
      <CinematicStorySection />

      {/* 
        PHOENIX DISCOVERY DIGITAL ARCHIVE & MONUMENTAL FOOTER
        - Interactive digital archive of the 5 canonical builds: VoiceShieldAI, Phoenix Pulse, Phoenix Research AI, Phoenix AutoScribe, Phoenix Microservices.
      */}
      <PhoenixDiscoverySection />

      {/* Interactive Project Detail Modal with Fluid Glass Treatment */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-[99999] animate-in fade-in duration-200">
          <div className="glass-modal max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 text-zinc-300 hover:text-white p-1.5 rounded-lg glass-chip hover:border-amber-400/50 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-mono font-bold mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
              <span>Project Chronicle • {selectedProject.codename}</span>
            </div>

            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-3xl font-black text-white tracking-tight">
                {selectedProject.title}
              </h3>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                  selectedProject.destinationType === "LIVE PLATFORM"
                    ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                    : "glass-chip text-zinc-100"
                }`}
              >
                {selectedProject.destinationType}
              </span>
            </div>

            <p className="text-xs text-zinc-300 tracking-wide uppercase font-mono mb-4 font-semibold">
              Domain: <span className="text-white">{selectedProject.category}</span>
            </p>

            <p className="text-sm sm:text-base text-zinc-100 leading-relaxed mb-4 border-t border-white/10 pt-4 font-normal">
              {selectedProject.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {selectedProject.specs.slice(0, 5).map((spec) => (
                <span
                  key={spec}
                  className="px-2.5 py-0.5 rounded glass-chip text-[11px] font-mono text-zinc-200"
                >
                  {spec}
                </span>
              ))}
            </div>

            <a
              href={selectedProject.destinationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setSelectedProject(null)}
              className="block text-center w-full py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-200 text-black font-bold text-xs sm:text-sm hover:from-amber-300 hover:to-white transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.4)] tracking-wider uppercase hover:scale-[1.01]"
            >
              Honor {selectedProject.title}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
