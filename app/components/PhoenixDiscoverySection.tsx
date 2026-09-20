"use client";

import React, { useState, useEffect, useRef } from "react";
import { PHOENIX_PROJECTS, PhoenixProject } from "../data/phoenixProjects";

export default function PhoenixDiscoverySection() {
  const [activeProject, setActiveProject] = useState<PhoenixProject | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Track passive scroll for subtle background typography parallax
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for staggered card reveal
  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealedIds(new Set(PHOENIX_PROJECTS.map((p) => p.id)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-project-id");
            if (id) {
              setRevealedIds((prev) => {
                if (prev.has(id)) return prev;
                const updated = new Set(prev);
                updated.add(id);
                return updated;
              });
            }
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeProject) {
        setActiveProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject]);

  const scrollToFooter = () => {
    const footerEl = document.getElementById("phoenix-monument-footer");
    if (footerEl) {
      footerEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full bg-[#000000] text-white selection:bg-amber-500/20 overflow-x-clip">
      {/* 
        ========================================================================
        OVERSIZED FLOATING BACKGROUND WORDS (Subtle Scroll Parallax)
        ========================================================================
      */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <span
          style={{
            transform: prefersReducedMotion
              ? "none"
              : `translate3d(0, ${scrollY * 0.04}px, 0)`,
          }}
          className="absolute top-[2%] -left-[3%] font-black text-[15vw] leading-none tracking-tighter text-zinc-900/35 uppercase will-change-transform"
        >
          BUILD
        </span>
        <span
          style={{
            transform: prefersReducedMotion
              ? "none"
              : `translate3d(0, ${scrollY * -0.03}px, 0)`,
          }}
          className="absolute top-[18%] -right-[5%] font-black text-[13vw] leading-none tracking-tighter text-zinc-900/25 uppercase will-change-transform"
        >
          INTELLIGENCE
        </span>
        <span
          style={{
            transform: prefersReducedMotion
              ? "none"
              : `translate3d(0, ${scrollY * 0.05}px, 0)`,
          }}
          className="absolute top-[38%] -left-[5%] font-black text-[15vw] leading-none tracking-tighter text-zinc-900/25 uppercase will-change-transform"
        >
          ENGINEER
        </span>
        <span
          style={{
            transform: prefersReducedMotion
              ? "none"
              : `translate3d(0, ${scrollY * -0.04}px, 0)`,
          }}
          className="absolute top-[58%] -right-[3%] font-black text-[14vw] leading-none tracking-tighter text-zinc-900/30 uppercase will-change-transform"
        >
          EXPERIMENT
        </span>
        <span
          style={{
            transform: prefersReducedMotion
              ? "none"
              : `translate3d(0, ${scrollY * 0.03}px, 0)`,
          }}
          className="absolute top-[76%] left-[4%] font-black text-[14vw] leading-none tracking-tighter text-zinc-900/25 uppercase will-change-transform"
        >
          CREATE
        </span>
        <span
          style={{
            transform: prefersReducedMotion
              ? "none"
              : `translate3d(0, ${scrollY * -0.02}px, 0)`,
          }}
          className="absolute top-[91%] right-[6%] font-black text-[15vw] leading-none tracking-tighter text-zinc-900/30 uppercase will-change-transform"
        >
          RISE
        </span>
      </div>

      {/* 
        ========================================================================
        PHOENIX DISCOVERY HEADER & ASYMMETRIC GRID
        ========================================================================
      */}
      <section
        id="phoenix-discovery-section"
        className="relative z-10 pt-28 sm:pt-36 pb-20 sm:pb-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto"
      >
        {/* Top Field Notes Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-6 mb-12 sm:mb-16 font-mono text-xs sm:text-[13px] tracking-[0.25em] text-zinc-300 uppercase">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            <span className="text-zinc-100 font-semibold">05 CANONICAL BUILDS</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-zinc-300">
            <span>FIELD NOTES</span>
            <span className="text-zinc-600">•</span>
            <span>BUILT / TESTED / ITERATED</span>
            <span className="text-zinc-600">•</span>
            <span>AI / WEB / ROBOTICS / BACKEND</span>
          </div>

          <div className="text-amber-300 font-semibold px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-800/50">
            CSM / PROJECT ARCHIVE
          </div>
        </div>

        {/* Cinematic Introduction */}
        <div className="max-w-4xl mb-16 sm:mb-24">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700 text-xs font-mono tracking-[0.25em] uppercase text-zinc-200 mb-6 backdrop-blur-md shadow-sm font-semibold">
            ENGINEERING FIELD JOURNAL • SCIENTIFIC ARCHIVE
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.92] mb-8">
            DISCOVER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
              PHOENIX.
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-zinc-200 font-normal leading-relaxed max-w-3xl">
            An archive of the five canonical systems I have engineered: VoiceShieldAI, Phoenix Pulse,
            Phoenix Research AI, Phoenix AutoScribe, and Phoenix Microservices.
          </p>
        </div>

        {/* 
          ======================================================================
          ASYMMETRIC EDITORIAL GRID (The 5 Canonical Projects)
          - Varied card heights & vertical offsets
          - Subtle rotations on desktop (straightens on hover, clamped on mobile)
          - Staggered scroll reveals (Card 1: 0ms, 2: 120ms, 3: 240ms, 4: 360ms, 5: 480ms)
          ======================================================================
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {PHOENIX_PROJECTS.map((item, idx) => {
            const isRevealed = prefersReducedMotion || revealedIds.has(item.id);
            const staggerDelay = idx * 120; // 0ms, 120ms, 240ms, 360ms, 480ms

            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(item.id, el);
                  else cardRefs.current.delete(item.id);
                }}
                data-project-id={item.id}
                onClick={() => setActiveProject(item)}
                style={{
                  transform: isRevealed
                    ? `rotate(var(--card-rot)) translate3d(0, 0, 0)`
                    : `translate3d(0, 32px, 0) scale(0.94)`,
                  opacity: isRevealed ? 1 : 0,
                  transitionDelay: `${staggerDelay}ms`,
                  ["--card-rot" as any]: `${item.rotationDeg}deg`,
                  ["--card-rot-hover" as any]: `${item.hoverRotationDeg}deg`,
                }}
                className={`group relative overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950/85 backdrop-blur-md p-6 sm:p-8 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between hover:border-zinc-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.95)] hover:-translate-y-1.5 lg:hover:[transform:rotate(var(--card-rot-hover))_translate3d(0,-6px,0)] max-w-full ${item.colSpanClass} ${item.offsetClass} ${item.minHeightClass}`}
              >
                {/* Subtle radial glow on hover */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(450px circle at top right, ${item.accentGlow}, transparent 75%)`,
                  }}
                />

                {/* Top Card Meta */}
                <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                        style={{ backgroundColor: item.accentHex, color: item.accentHex }}
                      />
                      <span className="font-mono text-xs sm:text-[13px] tracking-[0.22em] uppercase text-zinc-100 font-bold">
                        {item.category}
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="inline-block px-3 py-1 rounded-md bg-zinc-900 border border-zinc-700 font-mono text-xs tracking-wider text-zinc-200 uppercase font-semibold shadow-sm">
                        {item.codename}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs tracking-widest px-3 py-1 rounded-md bg-zinc-900 border border-zinc-700 text-white uppercase font-bold shadow-sm shrink-0">
                    {item.year}
                  </span>
                </div>

                {/* Visual Container */}
                <div
                  className={`relative z-10 w-full rounded-xl overflow-hidden mb-6 border border-zinc-800 bg-black ${item.imageHeightClass}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Status Pill on Image */}
                  <div className="absolute bottom-3.5 left-3.5">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/90 border border-white/25 text-xs font-mono tracking-wider text-white backdrop-blur-md flex items-center gap-2 shadow-xl">
                      <span
                        className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
                        style={{ backgroundColor: item.accentHex, color: item.accentHex }}
                      />
                      <span className="font-bold">{item.status}</span>
                    </span>
                  </div>
                </div>

                {/* Card Text & Specifications */}
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-3 group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-[15.5px] text-zinc-200 font-normal leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Specifications Pills */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/80">
                    {item.specs.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-200 tracking-wide font-medium shadow-sm group-hover:border-zinc-700 transition-colors"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Dossier Callout */}
                  <div className="mt-6 flex items-center justify-between text-xs sm:text-sm font-mono tracking-widest text-amber-300 group-hover:text-amber-200 transition-colors uppercase pt-2 font-bold">
                    <span>Inspect Case Study Dossier</span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform text-base">
                      →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-28 sm:mt-36 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-zinc-400 mb-4">
            INITIATE DEEP EXPEDITION
          </span>

          <button
            onClick={scrollToFooter}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-black font-semibold text-sm sm:text-base tracking-widest uppercase hover:bg-amber-400 transition-all duration-300 shadow-[0_0_50px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(245,158,11,0.4)] cursor-pointer"
          >
            <span>ENTER THE WORLD</span>
            <span className="transform group-hover:translate-x-1.5 transition-transform">
              →
            </span>
          </button>
        </div>
      </section>

      {/* 
        ========================================================================
        MODAL: FULL PROJECT CASE STUDY DOSSIER
        - OVERVIEW
        - PROBLEM
        - APPROACH
        - TECHNOLOGY
        - BUILD PROCESS
        - RESULT / CURRENT STATE
        ========================================================================
      */}
      {activeProject && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 z-50 animate-in fade-in duration-200">
          <div className="bg-[#09090b]/98 border border-zinc-800 max-w-3xl w-full rounded-2xl p-6 sm:p-9 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
              aria-label="Close dossier modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Dossier Header */}
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-zinc-300 mb-3">
              <span
                className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                style={{
                  backgroundColor: activeProject.accentHex,
                  color: activeProject.accentHex,
                }}
              />
              <span className="font-bold">ENGINEERING CASE STUDY • {activeProject.codename}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase mb-2">
              {activeProject.title}
            </h3>

            <p className="font-mono text-xs sm:text-sm text-zinc-300 uppercase tracking-widest mb-6 font-semibold">
              Category: <span className="text-white">{activeProject.category}</span>
            </p>

            {/* Media Image */}
            <div className="w-full h-56 sm:h-72 rounded-xl overflow-hidden mb-8 border border-zinc-800 bg-black">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Dossier Section 1: OVERVIEW */}
            <div className="mb-6">
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 font-bold mb-2">
                // OVERVIEW
              </h4>
              <p className="text-sm sm:text-base text-zinc-100 leading-relaxed font-normal">
                {activeProject.dossier.overview}
              </p>
            </div>

            {/* Dossier Section 2: PROBLEM */}
            <div className="mb-6">
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 font-bold mb-2">
                // PROBLEM
              </h4>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
                {activeProject.dossier.problem}
              </p>
            </div>

            {/* Dossier Section 3: APPROACH */}
            <div className="mb-6">
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 font-bold mb-2">
                // APPROACH
              </h4>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
                {activeProject.dossier.approach}
              </p>
            </div>

            {/* Dossier Section 4: TECHNOLOGY */}
            <div className="mb-6">
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 font-bold mb-3">
                // TECHNOLOGY
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.dossier.technology.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-100 tracking-wide font-medium shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Dossier Section 5: BUILD PROCESS */}
            <div className="mb-6 border-t border-zinc-800/80 pt-6">
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 font-bold mb-3">
                // BUILD PROCESS
              </h4>
              <ul className="space-y-2.5">
                {activeProject.dossier.buildProcess.map((step, bIdx) => (
                  <li
                    key={bIdx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs sm:text-sm text-zinc-200 font-normal leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dossier Section 6: RESULT / CURRENT STATE */}
            <div className="mb-8 border-t border-zinc-800/80 pt-6">
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 font-bold mb-2">
                // RESULT / CURRENT STATE
              </h4>
              <p className="text-sm sm:text-base text-zinc-100 leading-relaxed font-normal">
                {activeProject.dossier.result}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-800">
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] py-3.5 rounded-full bg-white text-black font-bold text-xs sm:text-sm text-center uppercase tracking-widest hover:bg-amber-400 transition-colors cursor-pointer shadow-lg"
              >
                View Source on GitHub ↗
              </a>
              <button
                onClick={() => setActiveProject(null)}
                className="flex-1 min-w-[140px] py-3.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-100 hover:text-white hover:bg-zinc-800 font-bold text-xs sm:text-sm text-center uppercase tracking-widest transition-colors cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 
        ========================================================================
        PHOENIX MONUMENTAL FOOTER (Art / Engineering Book Final Page)
        ========================================================================
      */}
      <footer
        id="phoenix-monument-footer"
        className="relative z-10 border-t border-zinc-900 bg-[#000000] pt-24 sm:pt-32 pb-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 mb-20 sm:mb-28">
          {/* Brand Column */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 flex items-center justify-center p-1.5 shadow-[0_0_14px_rgba(245,158,11,0.6)]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black">
                  <path d="M12 1L13.8 6.2L18.5 3.5L16.2 8.5L21.5 8.2L17.5 11.8L22 14.5L16.8 15.2L18.5 20.5L14 18L12 23L10 18L5.5 20.5L7.2 15.2L2 14.5L6.5 11.8L2.5 8.2L7.8 8.5L5.5 3.5L10.2 6.2L12 1Z" />
                </svg>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-zinc-100 font-bold block">
                PHOENIX ARCHITECTURE // EPILOGUE
              </span>
            </div>

            <p className="text-xl sm:text-2xl md:text-[26px] text-zinc-100 font-normal leading-relaxed max-w-lg mb-6">
              Building at the intersection of software, artificial intelligence, hardware and experimentation.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono tracking-widest text-zinc-400 uppercase">
              <span className="font-medium text-zinc-300">EST. 2026</span>
              <span>•</span>
              <span className="font-medium text-zinc-300">VISAKHAPATNAM / INDIA</span>
              <span>•</span>
              <span className="text-amber-400 font-semibold">05 CANONICAL BUILDS</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-white font-bold mb-6 border-b border-zinc-800 pb-2.5">
              BUILD ARCHIVE
            </h4>
            <ul className="space-y-3.5 font-mono text-xs sm:text-[13px] text-zinc-300">
              {PHOENIX_PROJECTS.map((proj, pIdx) => (
                <li key={proj.id}>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-400 transition-colors flex items-center justify-between group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{proj.title}</span>
                    <span className="text-zinc-500 font-bold">0{pIdx + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-white font-bold mb-6 border-b border-zinc-800 pb-2.5">
              SYSTEM NETWORK
            </h4>
            <ul className="space-y-3.5 font-mono text-xs sm:text-[13px] text-zinc-300">
              <li>
                <a
                  href="https://github.com/rehanabed10-png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">GitHub</span>
                  <span className="text-zinc-500">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:rehanabed10@gmail.com"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">rehanabed10@gmail.com</span>
                  <span className="text-zinc-500">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="#hero-top"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Ascend to Apex (Top)</span>
                  <span className="text-amber-400 font-bold">↑</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 
          MONUMENTAL OVERSIZED PHOENIX TYPOGRAPHY
        */}
        <div className="w-full border-t border-zinc-900 pt-10 sm:pt-14 pb-8 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/[0.06] via-transparent to-transparent pointer-events-none" />
          <h1 className="text-[19vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-700 uppercase select-none text-center group-hover:from-amber-300 group-hover:via-amber-500 group-hover:to-amber-800 transition-all duration-700 cursor-default drop-shadow-[0_10px_50px_rgba(0,0,0,0.95)]">
            PHOENIX
          </h1>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs tracking-[0.25em] text-zinc-300 uppercase pt-4 border-t border-zinc-900">
          <span>© 2026 PHOENIX // REHAN ABED. ALL RIGHTS RESERVED.</span>
          <span className="text-zinc-400">CURATED FIELD JOURNAL // EDITION 01</span>
        </div>
      </footer>
    </div>
  );
}
