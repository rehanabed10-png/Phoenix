"use client";

import React, { useState } from "react";

interface ProjectArtifact {
  id: string;
  title: string;
  codename: string;
  category: string;
  status: string;
  year: string;
  description: string;
  specs: string[];
  image: string;
  accentColor: string;
  accentHex: string;
  accentGlow: string;
  colSpan: string;
  githubUrl?: string;
}

export default function PhoenixDiscoverySection() {
  const [activeProject, setActiveProject] = useState<ProjectArtifact | null>(null);

  const projects: ProjectArtifact[] = [
    {
      id: "voiceshield",
      title: "VOICESHIELD AI",
      codename: "PXV-DEFENSE-01",
      category: "AI BIOMETRIC INTELLIGENCE // SOVEREIGN ACOUSTIC DEFENSE",
      status: "SYSTEM ACTIVE",
      year: "2026",
      description:
        "Personally engineered real-time voice-cloning detection and acoustic threat mitigation engine. Operates with sub-10ms latency to continuously verify sovereign human vocal harmonics against deepfake neural impersonations, synthetic speech duplicates, and unauthorized voice synthesis.",
      specs: [
        "Sub-10ms Zero-Latency Pipeline",
        "Acoustic Biometric Harmonic Verification",
        "Deepfake Synthetic Pattern Denier",
        "Autonomous Anomaly Classification",
      ],
      image: "/projects/voiceshield.jpg",
      accentColor: "amber",
      accentHex: "#f59e0b",
      accentGlow: "rgba(245, 158, 11, 0.22)",
      colSpan: "lg:col-span-7",
      githubUrl: "https://github.com/rehanabed10-png/voiceshield",
    },
    {
      id: "autoscribe",
      title: "PHOENIX AUTOSCRIBE",
      codename: "ROBOTIC-CNC-V3",
      category: "ROBOTICS & CNC AUTOMATION // PHYSICAL HARDWARE",
      status: "PROTOTYPE BUILT & TESTED",
      year: "2026",
      description:
        "Team Phoenix automated handwriting machine engineered with dual-axis CNC mechanical motion. Integrates an Arduino UNO, CNC Shield V3, A4988 microstepping drivers, and high-torque NEMA 17 motors to physically reproduce digital text on paper using a servo-driven pen-lift mechanism and GT2 timing belts.",
      specs: [
        "Arduino UNO + CNC Shield V3",
        "Dual NEMA 17 Stepper Motors",
        "A4988 Stepper Drivers + GT2 Belts",
        "SG90 Micro Servo Pen-Lift Mechanism",
      ],
      image: "/projects/autoscribe.jpg",
      accentColor: "orange",
      accentHex: "#ea580c",
      accentGlow: "rgba(234, 88, 12, 0.25)",
      colSpan: "lg:col-span-5",
      githubUrl: "https://github.com/rehanabed10-png/Pheonix-autoscribe-",
    },
    {
      id: "microservices",
      title: "EVENT-DRIVEN MICROSERVICES",
      codename: "ARCH-MESH-09",
      category: "DISTRIBUTED SYSTEMS // INTERNSHIP ASSIGNMENT BUILD",
      status: "PRODUCTION ARCHITECTURE",
      year: "2026",
      description:
        "High-throughput distributed backend architecture built as an internship engineering implementation. Orchestrates a central API Gateway with JWT authentication, Helmet security, and rate limiting, decoupled from User Services and Notification Workers via an asynchronous NATS JetStream event mesh and MongoDB Atlas.",
      specs: [
        "NATS & JetStream Asynchronous Event Mesh",
        "Node.js & Express REST API Gateway",
        "MongoDB Atlas & Mongoose Schemas",
        "Decoupled Worker Notification Consumers",
      ],
      image: "/projects/microservices.jpg",
      accentColor: "cyan",
      accentHex: "#06b6d4",
      accentGlow: "rgba(6, 182, 212, 0.22)",
      colSpan: "lg:col-span-5",
      githubUrl: "https://github.com/rehanabed10-png/phoenix-microservices",
    },
    {
      id: "hardware",
      title: "HARDWARE EXPERIMENTS LAB",
      codename: "EMBEDDED-CORE-LAB",
      category: "PHYSICAL COMPUTING // HARDWARE EXPERIMENTATION ARCHIVE",
      status: "ONGOING LABORATORY ARCHIVE",
      year: "2026",
      description:
        "An authentic hands-on archive of hardware prototyping and embedded experimentation. Features custom circuit assemblies with ESP32 microcontrollers, Arduino boards, stepper and servo motor motion controllers, precision sensors, breadboard interconnects, and benchtop testing.",
      specs: [
        "ESP32 & Arduino Microcontroller Prototyping",
        "Multi-Channel Stepper & Servo Kinematics",
        "Hardware PWM & Digital Sensor Integration",
        "Benchtop Power & Circuit Telemetry Testing",
      ],
      image: "/projects/hardware.jpg",
      accentColor: "rose",
      accentHex: "#f43f5e",
      accentGlow: "rgba(244, 63, 94, 0.22)",
      colSpan: "lg:col-span-7",
    },
    {
      id: "pulse-and-engineering",
      title: "PHOENIX PULSE & SYSTEMS ENGINEERING",
      codename: "SYS-TELEMETRY-2026",
      category: "PERFORMANCE TELEMETRY & FULL-STACK SOFTWARE FOUNDATIONS",
      status: "DEPLOYED SYSTEM",
      year: "2026",
      description:
        "High-performance website SEO, latency, and DOM forensic analyzer engineered by Rehan Abed using Node.js, Express, Axios, and Cheerio. Powers systemic audit workflows alongside modern full-stack web engineering: Next.js App Router, Three.js WebGL vertex shaders, and asynchronous microservices pipelines.",
      specs: [
        "Real-Time Response Latency & Status Audit",
        "Cheerio Server-Side DOM Extraction Engine",
        "Three.js GPU Vertex Shader Mathematical Pipelines",
        "Axios Forensic HTTP Pipeline with Jest Test Suite",
      ],
      image: "/projects/microservices.jpg",
      accentColor: "amber",
      accentHex: "#d97706",
      accentGlow: "rgba(217, 119, 6, 0.22)",
      colSpan: "lg:col-span-12",
      githubUrl: "https://github.com/rehanabed10-png/phoenix-pulse",
    },
  ];

  const scrollToFooter = () => {
    const footerEl = document.getElementById("phoenix-monument-footer");
    if (footerEl) {
      footerEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full bg-[#000000] text-white selection:bg-amber-500/20">
      {/* 
        ========================================================================
        OVERSIZED FLOATING BACKGROUND WORDS (Atmospheric Engineering Journal)
        ========================================================================
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <span className="absolute top-[3%] -left-[4%] font-black text-[14vw] leading-none tracking-tighter text-zinc-900/35 uppercase">
          BUILD
        </span>
        <span className="absolute top-[22%] -right-[6%] font-black text-[13vw] leading-none tracking-tighter text-zinc-900/30 uppercase">
          INTELLIGENCE
        </span>
        <span className="absolute top-[45%] -left-[6%] font-black text-[15vw] leading-none tracking-tighter text-zinc-900/25 uppercase">
          ENGINEER
        </span>
        <span className="absolute top-[68%] -right-[4%] font-black text-[13vw] leading-none tracking-tighter text-zinc-900/30 uppercase">
          EXPERIMENT
        </span>
        <span className="absolute top-[88%] left-[8%] font-black text-[14vw] leading-none tracking-tighter text-zinc-900/30 uppercase">
          RISE
        </span>
      </div>

      {/* 
        ========================================================================
        PHOENIX DISCOVERY HEADER & DOSSIER
        ========================================================================
      */}
      <section
        id="phoenix-discovery-section"
        className="relative z-10 pt-28 sm:pt-36 pb-16 sm:pb-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto"
      >
        {/* Top Metadata Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-12 sm:mb-16 font-mono text-xs sm:text-sm tracking-[0.25em] text-zinc-300 uppercase">
          <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            <span className="text-zinc-100 font-semibold">PHOENIX ARCHIVE / 2026</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-zinc-300">
            <span>FIELD NOTES // ARCHIVE 03</span>
            <span className="text-zinc-500">•</span>
            <span>BUILT / TESTED / ITERATED</span>
          </div>
          <div className="text-amber-300 font-semibold px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800/50">
            CSM / PROJECT ARCHIVE
          </div>
        </div>

        {/* Monumental Headline */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono tracking-[0.25em] uppercase text-zinc-200 mb-6 backdrop-blur-md shadow-sm font-semibold">
            AI • ROBOTICS • DISTRIBUTED SYSTEMS • HARDWARE
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.92] mb-8">
            DISCOVER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
              PHOENIX.
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-zinc-200 font-normal leading-relaxed max-w-3xl">
            An interactive archive of machines, software systems, intelligence models, and physical builds I have engineered. From real-time acoustic biometric shields and automated CNC robotics to high-throughput event-driven microservices.
          </p>
        </div>

        {/* 
          ======================================================================
          ASYMMETRIC EDITORIAL GRID (4–6 Authentic Builds)
          ======================================================================
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {projects.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveProject(item)}
              className={`group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-md p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:border-zinc-600 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between ${item.colSpan}`}
              style={{
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.8)",
              }}
            >
              {/* Subtle accent hover glow behind card */}
              <div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(400px circle at top right, ${item.accentGlow}, transparent 75%)`,
                }}
              />

              {/* Top Card Meta */}
              <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
                      style={{ backgroundColor: item.accentHex, color: item.accentHex }}
                    />
                    <span className="font-mono text-xs sm:text-[13px] tracking-[0.22em] uppercase text-zinc-100 font-bold">
                      {item.category}
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="inline-block px-3 py-1 rounded-md bg-zinc-900 border border-zinc-600 font-mono text-xs tracking-wider text-zinc-100 uppercase font-semibold shadow-sm">
                      {item.codename}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-xs tracking-widest px-3 py-1 rounded-md bg-zinc-900 border border-zinc-600 text-white uppercase font-bold shadow-sm">
                  {item.year}
                </span>
              </div>

              {/* Visual Container */}
              <div className="relative z-10 w-full h-[230px] sm:h-[300px] md:h-[350px] rounded-xl overflow-hidden mb-6 border border-zinc-800 bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

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

              {/* Card Text & Specs */}
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-3.5 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-[15.5px] text-zinc-100 font-normal leading-[1.75] mb-6">
                  {item.description}
                </p>

                {/* Specifications Pills */}
                <div className="flex flex-wrap gap-2.5 pt-4 border-t border-zinc-800">
                  {item.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-100 tracking-wide font-medium shadow-sm hover:border-zinc-500 hover:text-white transition-colors"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Interactive Link indicator */}
                <div className="mt-6 flex items-center justify-between text-xs sm:text-sm font-mono tracking-widest text-amber-300 group-hover:text-amber-200 transition-colors uppercase pt-2 font-bold">
                  <span>Inspect Build Dossier</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform text-base">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 
          ======================================================================
          CENTERED CALL TO ACTION
          ======================================================================
        */}
        <div className="mt-28 sm:mt-36 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-zinc-400 mb-4">
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
        MODAL: FULL PROJECT DOSSIER INSPECTION
        ========================================================================
      */}
      {activeProject && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 z-50 animate-in fade-in duration-200">
          <div className="bg-[#09090b]/95 border border-zinc-800 max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-zinc-300 mb-3">
              <span
                className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                style={{ backgroundColor: activeProject.accentHex, color: activeProject.accentHex }}
              />
              <span className="font-bold">ARTIFACT DOSSIER • {activeProject.codename}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase mb-2">
              {activeProject.title}
            </h3>

            <p className="font-mono text-xs sm:text-sm text-zinc-300 uppercase tracking-widest mb-5 font-semibold">
              Category: <span className="text-white">{activeProject.category}</span>
            </p>

            <div className="w-full h-56 sm:h-72 rounded-xl overflow-hidden mb-6 border border-zinc-700 bg-black">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-base text-zinc-100 leading-relaxed mb-6 font-normal">
              {activeProject.description}
            </p>

            <div className="border-t border-zinc-800 pt-5 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-300 block mb-3 font-semibold">
                Architectural Specifications:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs sm:text-sm text-zinc-200">
                {activeProject.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 rounded-full bg-white text-black font-bold text-xs sm:text-sm text-center uppercase tracking-widest hover:bg-amber-400 transition-colors cursor-pointer shadow-lg"
                >
                  View Source on GitHub ↗
                </a>
              )}
              <button
                onClick={() => setActiveProject(null)}
                className="flex-1 py-3.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-100 hover:text-white hover:bg-zinc-800 font-bold text-xs sm:text-sm text-center uppercase tracking-widest transition-colors cursor-pointer"
              >
                Close Archive
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
              Forging sovereign intelligence, robotic automation, and distributed software systems. Built with precision and intent by Rehan Abed.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-zinc-400 uppercase">
              <span className="font-medium text-zinc-300">EST. 2026</span>
              <span>•</span>
              <span className="font-medium text-zinc-300">CHENNAI / GLOBAL</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                CORE 09 ONLINE
              </span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-white font-bold mb-6 border-b border-zinc-800 pb-2.5">
              BUILD ARCHIVE
            </h4>
            <ul className="space-y-3.5 font-mono text-xs sm:text-[13px] text-zinc-300">
              <li>
                <a
                  href="https://github.com/rehanabed10-png/voiceshield"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">VoiceShield AI</span>
                  <span className="text-zinc-500 font-bold">01</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rehanabed10-png/Pheonix-autoscribe-"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Phoenix AutoScribe</span>
                  <span className="text-zinc-500 font-bold">02</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rehanabed10-png/phoenix-microservices"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Microservices Mesh</span>
                  <span className="text-zinc-500 font-bold">03</span>
                </a>
              </li>
              <li>
                <a
                  href="#phoenix-discovery-section"
                  className="hover:text-amber-400 transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Hardware Prototyping</span>
                  <span className="text-zinc-500 font-bold">04</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rehanabed10-png/phoenix-pulse"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Phoenix Pulse Analyzer</span>
                  <span className="text-zinc-500 font-bold">05</span>
                </a>
              </li>
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
                  href="mailto:rehanabed@example.com"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Contact / Comm</span>
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
          (The final page of a luxury engineering book)
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
