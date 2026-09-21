"use client";

import React, { useEffect, useRef, useState } from "react";
import { PHOENIX_PROJECTS } from "../data/phoenixProjects";

interface EditorialInfoCardProps {
  children: React.ReactNode;
  className?: string;
  baseRotate?: number;
  globalMouse: { x: number; y: number };
  parallaxX?: number;
  parallaxY?: number;
  scrollExitX: number;
  scrollExitY: number;
  scrollExitRotate: number;
  easeProgress: number;
  textFade: number;
  accentGlow: string;
  accentBorder: string;
}

/**
 * EditorialInfoCard:
 * - Layer 1 (Global): Floats and tilts across the viewport following cursor coordinates.
 * - Layer 2 (Local): When the cursor hovers directly over the card, delivers a 3D tilt,
 *   magnetic elevation, a specular radial cursor spotlight, and an illuminated signature border.
 * - Layer 3 (Scroll): Gracefully exits outward as the central image expands into full screen.
 */
function EditorialInfoCard({
  children,
  className = "",
  baseRotate = 0,
  globalMouse,
  parallaxX = 52,
  parallaxY = 38,
  scrollExitX,
  scrollExitY,
  scrollExitRotate,
  easeProgress,
  textFade,
  accentGlow,
  accentBorder,
}: EditorialInfoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [localMouse, setLocalMouse] = useState({ x: 0, y: 0 }); // -1 to +1
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightPos({ x, y });

    // Local normalized coordinates relative to card center (-1 to +1)
    const normX = ((x / rect.width) * 2 - 1);
    const normY = ((y / rect.height) * 2 - 1);
    setLocalMouse({ x: normX, y: normY });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setLocalMouse({ x: 0, y: 0 });
  };

  // Scroll exit translation (fanning outward as image expands)
  const exitX = scrollExitX * easeProgress;
  const exitY = scrollExitY * easeProgress;
  const exitRot = scrollExitRotate * easeProgress;

  // Global floating parallax: card follows cursor direction with soft depth
  const floatX = globalMouse.x * parallaxX * (1 - easeProgress);
  const floatY = globalMouse.y * parallaxY * (1 - easeProgress);

  // Global perspective tilt facing toward cursor
  const globalTiltX = -globalMouse.y * 7 * (1 - easeProgress);
  const globalTiltY = globalMouse.x * 7 * (1 - easeProgress);

  // Local 3D tilt when hovering directly over this card
  const localTiltX = isHovered ? -localMouse.y * 14 : 0;
  const localTiltY = isHovered ? localMouse.x * 14 : 0;
  const localScale = isHovered ? 1.04 : 1.0;
  const localLiftZ = isHovered ? 20 : 0;

  const totalTranslateX = exitX + floatX;
  const totalTranslateY = exitY + floatY;
  const totalRotateZ = baseRotate + exitRot;
  const totalRotateX = globalTiltX + localTiltX;
  const totalRotateY = globalTiltY + localTiltY;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: textFade,
        transform: `perspective(1000px) translate3d(${totalTranslateX}px, ${totalTranslateY}px, ${localLiftZ}px) rotateZ(${totalRotateZ}deg) rotateX(${totalRotateX}deg) rotateY(${totalRotateY}deg) scale(${localScale})`,
        pointerEvents: textFade < 0.1 ? "none" : "auto",
        boxShadow: isHovered
          ? `0 24px 45px -12px rgba(0, 0, 0, 0.95), 0 0 35px ${accentGlow}`
          : "0 10px 25px -10px rgba(0, 0, 0, 0.7)",
        borderColor: isHovered ? accentBorder : "rgba(255, 255, 255, 0.1)",
        transition: isHovered
          ? "border-color 0.15s ease-out, box-shadow 0.15s ease-out, transform 0.08s ease-out"
          : "border-color 0.3s ease-out, box-shadow 0.3s ease-out, transform 0.25s ease-out",
      }}
      className={`group relative z-20 overflow-hidden rounded-xl border bg-zinc-950/70 p-4 sm:p-5 backdrop-blur-md cursor-pointer will-change-transform ${className}`}
    >
      {/* Specular Radial Cursor Spotlight Sheen */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-200"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(320px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${accentGlow.replace("0.25", "0.45")}, transparent 75%)`,
        }}
      />

      {/* Card Content with relative z-index */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function HousePinIcon({
  className = "w-5 h-5",
  color = "#F59E0B",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Roof Gable */}
      <path d="M3 10.5L12 3l9 7.5" stroke={color} />
      {/* House Citadel Walls */}
      <path d="M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5" stroke={color} />
      {/* Arched Sanctuary Gateway */}
      <path d="M10 21v-5a2 2 0 014 0v5" stroke={color} fill={`${color}33`} />
      {/* Sanctum Window Beacon */}
      <circle cx="12" cy="9.5" r="1.5" fill={color} stroke={color} />
      {/* Turret Spire */}
      <path d="M18 6.5V4h-2.5v2" stroke={color} />
    </svg>
  );
}

interface CitadelHotspot {
  id: string;
  projectIndex: number;
  landmark: string;
  subSector: string;
  x: number; // percentage
  y: number; // percentage
  align: "left" | "right" | "center";
  accentColor: string;
  glowColor: string;
}

const CITADEL_HOTSPOTS: CitadelHotspot[] = [
  {
    id: "bastion",
    projectIndex: 0,
    landmark: "Citadel West Bastion",
    subSector: "SECTOR 01 • DEFENSE COMMUNE",
    x: 18,
    y: 44,
    align: "left",
    accentColor: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: "spire",
    projectIndex: 1,
    landmark: "Celestial Spire / Acropolis",
    subSector: "SECTOR 02 • HIGH ZENITH",
    x: 39,
    y: 28,
    align: "left",
    accentColor: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    id: "academy",
    projectIndex: 2,
    landmark: "High Academy Dome",
    subSector: "SECTOR 03 • SYNTHESIS ACADEMY",
    x: 62,
    y: 35,
    align: "right",
    accentColor: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
  {
    id: "clockwork",
    projectIndex: 3,
    landmark: "Clockwork District",
    subSector: "SECTOR 04 • ROBOTIC FOUNDRY",
    x: 82,
    y: 52,
    align: "right",
    accentColor: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: "viaduct",
    projectIndex: 4,
    landmark: "Grand Viaduct & Aqueduct",
    subSector: "SECTOR 05 • STREAM HIGHWAY",
    x: 50,
    y: 74,
    align: "center",
    accentColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.4)",
  },
];

export default function CinematicStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [manualExpanded, setManualExpanded] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 1440, height: 900 });

  // Cursor hover parallax state with smooth spring/lerp
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  // Update window size on mount and resize
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize, { passive: true });
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Escape key to close active hotspot or exit manual fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeHotspot) {
          setActiveHotspot(null);
        } else if (manualExpanded) {
          setManualExpanded(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeHotspot, manualExpanded]);

  // Global cursor tracking with smooth lerp loop for floating hover effect
  useEffect(() => {
    let animId: number;
    let isVisible = false;
    let isRunning = true;

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      targetMouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const animateCursorHover = () => {
      if (!isVisible || !isRunning) return;

      const dx = targetMouse.current.x - currentMouse.current.x;
      const dy = targetMouse.current.y - currentMouse.current.y;

      // Only trigger React state updates when there is visible delta
      if (Math.abs(dx) > 0.0008 || Math.abs(dy) > 0.0008) {
        currentMouse.current.x += dx * 0.12;
        currentMouse.current.y += dy * 0.12;

        setMousePos({
          x: currentMouse.current.x,
          y: currentMouse.current.y,
        });
      }

      animId = requestAnimationFrame(animateCursorHover);
    };

    // Only run animation frame loop when Cinematic Story section is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        if (visible && !isVisible) {
          isVisible = true;
          animId = requestAnimationFrame(animateCursorHover);
        } else if (!visible) {
          isVisible = false;
        }
      },
      { threshold: 0.02 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      isRunning = false;
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Track scroll position inside the 340vh track
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalDistance = rect.height - windowHeight;
            const currentScroll = -rect.top;

            // Clamped progress from 0 (entry) to 1 (exit)
            const p = Math.max(0, Math.min(1, currentScroll / totalDistance));
            setScrollProgress(p);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effective progress: either scroll-driven or toggled via manual click
  const effectiveProgress = manualExpanded
    ? 1
    : Math.max(0, Math.min(1, scrollProgress / 0.68));

  // Cinematic smooth easing curve
  const easeProgress = Math.pow(effectiveProgress, 1.4);

  // Initial 9:16 portrait dimensions in pixels
  const initialWidth = Math.min(
    320,
    Math.max(240, windowSize.width * 0.22)
  );
  const initialHeight = initialWidth * (16 / 9);

  // Current interpolated width and height
  const currentWidth = initialWidth + (windowSize.width - initialWidth) * easeProgress;
  const currentHeight = initialHeight + (windowSize.height - initialHeight) * easeProgress;
  const currentBorderRadius = (1 - easeProgress) * 24;

  // Staggered fades for surrounding asymmetric editorial elements
  const textFade = Math.max(0, Math.min(1, 1 - effectiveProgress * 2.2));
  const finalCueOpacity = Math.max(0, Math.min(1, (effectiveProgress - 0.85) / 0.15));

  return (
    <section
      id="phoenix-story-section"
      ref={sectionRef}
      className="relative h-[340vh] w-full bg-[#000000] text-white selection:bg-white/20 select-none"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#000000]">
        {/* Ambient background glow */}
        <div
          style={{ opacity: Math.max(0, 1 - effectiveProgress * 1.5) }}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-radial from-amber-500/10 via-transparent to-transparent blur-3xl" />
        </div>

        {/* 
          CENTRAL IMAGE CONTAINER:
          - Starts at 9:16 vertical portrait
          - Progressively expands on scroll or click to 100vw x 100vh
          - Subtle holographic 3D tilt and inverted parallax responding to cursor
        */}
        <div
          onClick={() => setManualExpanded(!manualExpanded)}
          style={{
            width: `${currentWidth}px`,
            height: `${currentHeight}px`,
            borderRadius: `${currentBorderRadius}px`,
            boxShadow: `0 0 ${80 * (1 - easeProgress)}px rgba(0, 0, 0, ${
              0.95 * (1 - easeProgress)
            }), 0 0 ${40 * (1 - easeProgress)}px rgba(212, 175, 55, ${
              0.2 * (1 - easeProgress)
            })`,
            borderColor: `rgba(255, 255, 255, ${0.18 * (1 - easeProgress)})`,
            transform: `perspective(1000px) rotateY(${
              mousePos.x * 5 * (1 - easeProgress)
            }deg) rotateX(${-mousePos.y * 5 * (1 - easeProgress)}deg) translate3d(${
              mousePos.x * -14 * (1 - easeProgress)
            }px, ${mousePos.y * -14 * (1 - easeProgress)}px, 0)`,
          }}
          className="relative z-10 overflow-hidden border cursor-pointer transition-[border-color,box-shadow,border-radius] duration-200 ease-out will-change-[width,height,transform]"
          title={manualExpanded ? "Click to contract" : "Click or scroll to expand"}
        >
          <img
            src="/realm-city.jpg"
            alt="Phoenix Sanctuary Hydro-Citadel"
            className="w-full h-full object-cover object-center will-change-transform"
            style={{
              transform: `scale(${1.06 - easeProgress * 0.06})`,
              transition: "transform 0.2s ease-out",
            }}
          />

          {/* Film grade vignette fading out during expansion */}
          <div
            style={{ opacity: (1 - easeProgress) * 0.45 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"
          />

          {/* Interactive Expand Hint Badge on image (fades when expanding) */}
          {textFade > 0.3 && (
            <div
              style={{ opacity: textFade }}
              className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none transition-opacity"
            >
              <span className="px-3 py-1 rounded-full bg-black/75 border border-white/20 text-[10px] font-mono tracking-widest text-zinc-300 uppercase backdrop-blur-xs flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Scroll or Click to Expand</span>
              </span>
            </div>
          )}
        </div>

        {/* 
          ASYMMETRIC "ORGANIZED CHAOS" EDITORIAL TEXT ELEMENTS
          - Dual-layer cursor hovering:
            1. Global parallax float following cursor across viewport
            2. Local 3D tilt, specular spotlight, and border glow when hovering directly on cards
          - Highlighting Phoenix's Five Canonical Projects:
            - 01 VoiceShieldAI
            - 02 Phoenix Pulse
            - 03 Phoenix Research AI
            - 04 Phoenix AutoScribe
            - 05 Phoenix Microservices
        */}

        {/* ELEMENT 1: Top-Left — 01 VoiceShieldAI */}
        <div className="absolute top-[8%] sm:top-[12%] left-[4%] sm:left-[8%] lg:left-[11%] max-w-[290px] sm:max-w-[340px] z-20">
          <EditorialInfoCard
            baseRotate={-2}
            globalMouse={mousePos}
            parallaxX={54}
            parallaxY={38}
            scrollExitX={-180}
            scrollExitY={-140}
            scrollExitRotate={-6}
            easeProgress={easeProgress}
            textFade={textFade}
            accentGlow={PHOENIX_PROJECTS[0].accentGlow}
            accentBorder={PHOENIX_PROJECTS[0].accentBorder}
          >
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-950/90 border border-amber-500/70 mb-2.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-amber-300 font-bold">
                {PHOENIX_PROJECTS[0].category}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-none mb-3">
              {PHOENIX_PROJECTS[0].title}
            </h3>
            <p className="text-sm sm:text-[15px] text-zinc-100 font-normal leading-relaxed mb-1">
              {PHOENIX_PROJECTS[0].description}
            </p>
            <div className="mt-3.5 text-xs font-mono text-zinc-200 uppercase tracking-wider border-t border-zinc-700/80 pt-2.5 flex items-center justify-between font-semibold">
              <span className="text-amber-400">Wav2Vec2 • ECAPA-TDNN</span>
              <span className="text-zinc-300">FastAPI / VAD</span>
            </div>
          </EditorialInfoCard>
        </div>

        {/* ELEMENT 2: Top-Right — 02 Phoenix Pulse */}
        <div className="absolute top-[10%] sm:top-[14%] right-[4%] sm:right-[7%] lg:right-[10%] max-w-[280px] sm:max-w-[340px] z-20">
          <EditorialInfoCard
            baseRotate={2.5}
            globalMouse={mousePos}
            parallaxX={56}
            parallaxY={40}
            scrollExitX={180}
            scrollExitY={-140}
            scrollExitRotate={6}
            easeProgress={easeProgress}
            textFade={textFade}
            accentGlow={PHOENIX_PROJECTS[1].accentGlow}
            accentBorder={PHOENIX_PROJECTS[1].accentBorder}
            className="text-right"
          >
            <div className="inline-flex items-center justify-end gap-2 px-2.5 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/70 mb-2.5 shadow-sm">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300 font-bold">
                {PHOENIX_PROJECTS[1].category}
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-none mb-3">
              {PHOENIX_PROJECTS[1].title}
            </h3>
            <p className="text-sm sm:text-[15px] text-zinc-100 font-normal leading-relaxed mb-1">
              {PHOENIX_PROJECTS[1].description}
            </p>
            <div className="mt-3.5 text-xs font-mono text-zinc-200 uppercase tracking-wider border-t border-zinc-700/80 pt-2.5 flex items-center justify-between font-semibold">
              <span className="text-zinc-300">Node.js / Express</span>
              <span className="text-cyan-400">Axios / Cheerio</span>
            </div>
          </EditorialInfoCard>
        </div>

        {/* ELEMENT 3: Bottom-Left — 03 Phoenix Research AI */}
        <div className="absolute bottom-[9%] sm:bottom-[13%] left-[4%] sm:left-[7%] lg:left-[10%] max-w-[280px] sm:max-w-[330px] z-20">
          <EditorialInfoCard
            baseRotate={1.5}
            globalMouse={mousePos}
            parallaxX={50}
            parallaxY={36}
            scrollExitX={-180}
            scrollExitY={140}
            scrollExitRotate={5}
            easeProgress={easeProgress}
            textFade={textFade}
            accentGlow={PHOENIX_PROJECTS[2].accentGlow}
            accentBorder={PHOENIX_PROJECTS[2].accentBorder}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-purple-950/95 border border-purple-500/80 text-xs font-mono tracking-wider text-purple-300 uppercase mb-2.5 font-bold shadow-sm">
              {PHOENIX_PROJECTS[2].category}
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-white leading-tight mb-2.5">
              {PHOENIX_PROJECTS[2].title}
            </h3>
            <p className="text-sm sm:text-[15px] text-zinc-100 leading-relaxed font-normal mb-1">
              {PHOENIX_PROJECTS[2].description}
            </p>
            <div className="mt-3.5 text-xs font-mono text-zinc-200 uppercase tracking-wider border-t border-zinc-700/80 pt-2.5 flex items-center justify-between font-semibold">
              <span className="text-purple-400">Next.js / TypeScript</span>
              <span className="text-zinc-300">Three.js / Gemini</span>
            </div>
          </EditorialInfoCard>
        </div>

        {/* ELEMENT 4: Bottom-Right — 04 Phoenix AutoScribe */}
        <div className="absolute bottom-[8%] sm:bottom-[12%] right-[4%] sm:right-[8%] lg:right-[11%] max-w-[270px] sm:max-w-[320px] z-20">
          <EditorialInfoCard
            baseRotate={-1.5}
            globalMouse={mousePos}
            parallaxX={52}
            parallaxY={38}
            scrollExitX={180}
            scrollExitY={140}
            scrollExitRotate={-5}
            easeProgress={easeProgress}
            textFade={textFade}
            accentGlow={PHOENIX_PROJECTS[3].accentGlow}
            accentBorder={PHOENIX_PROJECTS[3].accentBorder}
            className="text-right"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-amber-950/95 border border-amber-500/80 text-xs font-mono tracking-wider text-amber-300 uppercase mb-2.5 font-bold shadow-sm">
              {PHOENIX_PROJECTS[3].category}
            </div>
            <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-2">
              {PHOENIX_PROJECTS[3].title}
            </h4>
            <p className="text-sm sm:text-[15px] text-zinc-100 leading-relaxed font-normal mb-1">
              {PHOENIX_PROJECTS[3].description}
            </p>
            <div className="mt-3.5 text-xs font-mono text-zinc-200 uppercase tracking-wider border-t border-zinc-700/80 pt-2.5 flex items-center justify-between font-semibold">
              <span className="text-zinc-300">Arduino UNO + CNC</span>
              <span className="text-amber-400">NEMA 17 / GRBL</span>
            </div>
          </EditorialInfoCard>
        </div>

        {/* ELEMENT 5: Bottom-Center — 05 Phoenix Microservices */}
        <div className="absolute bottom-[2.5%] sm:bottom-[3.5%] left-1/2 -translate-x-1/2 max-w-[290px] sm:max-w-[340px] z-20 hidden md:block">
          <EditorialInfoCard
            baseRotate={0}
            globalMouse={mousePos}
            parallaxX={46}
            parallaxY={30}
            scrollExitX={0}
            scrollExitY={150}
            scrollExitRotate={0}
            easeProgress={easeProgress}
            textFade={textFade}
            accentGlow={PHOENIX_PROJECTS[4].accentGlow}
            accentBorder={PHOENIX_PROJECTS[4].accentBorder}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/70 mb-2 shadow-sm">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-emerald-300 font-bold">
                {PHOENIX_PROJECTS[4].category}
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight mb-1.5">
              {PHOENIX_PROJECTS[4].title}
            </h4>
            <p className="text-xs sm:text-[13px] text-zinc-200 leading-relaxed font-normal mb-1">
              {PHOENIX_PROJECTS[4].description}
            </p>
            <div className="mt-2 text-xs font-mono text-zinc-300 uppercase tracking-wider border-t border-zinc-700/80 pt-1.5 flex items-center justify-between font-semibold">
              <span className="text-emerald-400">NATS JetStream</span>
              <span className="text-zinc-300">Node / MongoDB</span>
            </div>
          </EditorialInfoCard>
        </div>

        {/* ELEMENT 5: Top Header Exhibition Badge */}
        <div
          style={{
            opacity: Math.max(0, 1 - effectiveProgress * 2.8),
            transform: `translate3d(${mousePos.x * 20}px, ${
              -effectiveProgress * 90 + mousePos.y * 14
            }px, 0)`,
          }}
          className="absolute top-4 sm:top-5 z-20 flex flex-col items-center pointer-events-none will-change-transform"
        >
          <div className="px-5 py-2 rounded-full bg-black/85 border border-white/20 backdrop-blur-md shadow-xl text-center">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-amber-400 font-bold block mb-0.5">
              DIGITAL EXHIBITION // DISCOVERY 02
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-white uppercase">
              Scroll to Expand the Living World
            </span>
          </div>
        </div>

        {/* ELEMENT 6: Manual Toggle Button (Only shown when not expanded) */}
        {!manualExpanded && effectiveProgress < 0.75 && (
          <div className="absolute top-6 right-6 z-30">
            <button
              onClick={() => setManualExpanded(true)}
              className="px-3 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 text-[11px] font-mono text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg backdrop-blur-md"
            >
              Expand Image [⛶]
            </button>
          </div>
        )}

        {/* 
          FINAL IMMERSIVE STATE OVERLAY:
          Mounts ONLY after the central image is revealed (finalCueOpacity > 0.05 / effectiveProgress > 0.85).
          Never intercepts cursor hover or spotlight effects on the 5 editorial cards before revealing.
        */}
        {finalCueOpacity > 0.05 && (
          <div
            style={{
              opacity: finalCueOpacity,
            }}
            className="absolute inset-0 z-30 transition-opacity duration-300 pointer-events-none"
          >
            {/* Backdrop click dismisser when a dossier is open */}
            {activeHotspot && (
              <div
                className="fixed inset-0 z-32 pointer-events-auto cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(null);
                }}
              />
            )}

            {/* Top HUD */}
            <div className="absolute top-6 sm:top-8 inset-x-0 px-6 sm:px-12 flex items-center justify-between pointer-events-auto z-40">
              <div className="glass-pill flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-xl">
                <HousePinIcon className="w-4 h-4" color="#F59E0B" />
                <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-white/90 font-bold">
                  CITADEL REALM // ARCHITECTURAL PINS
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(null);
                  setManualExpanded(false);
                }}
                className="glass-pill text-xs font-mono text-white/80 hover:text-white px-3.5 py-1.5 rounded-full border border-white/20 pointer-events-auto cursor-pointer backdrop-blur-md transition-all hover:border-amber-400/60 shadow-xl"
              >
                Contract View [Esc]
              </button>
            </div>

            {/* 5 Canonical Architectural House Hotspots across the Citadel */}
            <div className="absolute inset-0 pointer-events-none z-35">
              {CITADEL_HOTSPOTS.map((hotspot) => {
                const project = PHOENIX_PROJECTS[hotspot.projectIndex];
                const isActive = activeHotspot === hotspot.id;

                return (
                  <div
                    key={hotspot.id}
                    style={{
                      left: `${hotspot.x}%`,
                      top: `${hotspot.y}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* House Pin Button */}
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(isActive ? null : hotspot.id)}
                      className="group relative flex items-center gap-2 cursor-pointer focus:outline-none"
                      aria-label={`Inspect ${hotspot.landmark} - ${project.title}`}
                    >
                      {/* Pulsing Radar Ring */}
                      <span
                        className="absolute -inset-2.5 rounded-full opacity-70 animate-ping pointer-events-none"
                        style={{ backgroundColor: hotspot.glowColor }}
                      />

                      {/* Architectural House Beacon Icon */}
                      <div
                        className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-all duration-300 backdrop-blur-md shadow-xl ${
                          isActive
                            ? "scale-115 border-2"
                            : "scale-100 hover:scale-110 border"
                        }`}
                        style={{
                          backgroundColor: isActive
                            ? "rgba(14, 11, 18, 0.95)"
                            : "rgba(10, 8, 14, 0.82)",
                          borderColor: isActive
                            ? hotspot.accentColor
                            : "rgba(255, 255, 255, 0.3)",
                          boxShadow: isActive
                            ? `0 0 28px ${hotspot.glowColor}`
                            : "0 4px 18px rgba(0,0,0,0.7)",
                        }}
                      >
                        <HousePinIcon
                          className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform duration-300 group-hover:scale-110"
                          color={hotspot.accentColor}
                        />
                      </div>

                      {/* House Landmark Label Pill */}
                      <div
                        className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all duration-200 backdrop-blur-md shadow-lg"
                        style={{
                          backgroundColor: isActive
                            ? "rgba(18, 14, 24, 0.94)"
                            : "rgba(10, 8, 14, 0.82)",
                          borderColor: isActive
                            ? hotspot.accentColor
                            : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: hotspot.accentColor }}
                        />
                        <span className="font-mono text-[11px] font-bold tracking-wider text-white">
                          0{hotspot.projectIndex + 1}
                        </span>
                        <span className="text-[11px] text-zinc-300 font-medium tracking-tight whitespace-nowrap">
                          {hotspot.landmark.split(" ")[0]}
                        </span>
                      </div>
                    </button>

                    {/* Floating Architectural Dossier Card */}
                    {isActive && (
                      <div
                        className={`absolute z-50 w-72 sm:w-88 max-w-[calc(100vw-32px)] p-4 rounded-2xl glass-modal border text-left shadow-2xl transition-all duration-300 ${
                          hotspot.align === "right"
                            ? "right-0 sm:right-6 top-14 sm:-top-8"
                            : hotspot.align === "center"
                            ? "-translate-x-1/2 left-1/2 bottom-14"
                            : "left-0 sm:left-6 top-14 sm:-top-8"
                        }`}
                        style={{
                          borderColor: hotspot.accentColor,
                          boxShadow: `0 16px 40px rgba(0, 0, 0, 0.9), 0 0 24px ${hotspot.glowColor}`,
                        }}
                      >
                        {/* Landmark Header & Close Button */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5">
                            <HousePinIcon className="w-3.5 h-3.5" color={hotspot.accentColor} />
                            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                              0{hotspot.projectIndex + 1} // {hotspot.landmark}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setActiveHotspot(null)}
                            className="text-zinc-400 hover:text-white text-sm px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label="Close dossier"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Project Title & Category */}
                        <div className="mb-2">
                          <div
                            className="text-[10px] font-mono tracking-widest uppercase font-bold mb-0.5"
                            style={{ color: hotspot.accentColor }}
                          >
                            {project.category}
                          </div>
                          <h4 className="text-base sm:text-lg font-black text-white tracking-tight">
                            {project.title}
                          </h4>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-zinc-200 leading-relaxed mb-3 font-normal">
                          {project.description}
                        </p>

                        {/* Tech Specs & CTA Button */}
                        <div className="pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] text-zinc-400 truncate">
                            {project.specs.slice(0, 2).join(" • ")}
                          </span>
                          <a
                            href={project.destinationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 shadow-md whitespace-nowrap cursor-pointer hover:brightness-110"
                            style={{
                              backgroundColor: hotspot.accentColor,
                              color: "#000000",
                            }}
                          >
                            {project.destinationType === "LIVE PLATFORM"
                              ? "Launch Live ↗"
                              : "GitHub →"}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom-Left Citadel Caption */}
            <div className="absolute bottom-24 sm:bottom-12 left-6 sm:left-12 max-w-sm pointer-events-auto z-35 hidden md:block">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-300/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                THE CELESTIAL WATERFALL CITADEL
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mt-1 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                Where Intelligent Systems Become Living Worlds.
              </h2>
            </div>

            {/* Bottom Architectural House Switcher Dock */}
            <div className="absolute bottom-6 sm:bottom-8 inset-x-0 z-40 flex justify-center px-4 pointer-events-auto">
              <div className="glass-dock flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl max-w-full overflow-x-auto">
                <div className="hidden lg:flex items-center gap-1.5 px-3 text-zinc-400 font-mono text-[10px] tracking-widest uppercase border-r border-white/15 mr-1">
                  <HousePinIcon className="w-4 h-4" color="#F59E0B" />
                  <span>Citadel Houses</span>
                </div>
                {CITADEL_HOTSPOTS.map((h) => {
                  const p = PHOENIX_PROJECTS[h.projectIndex];
                  const isSelected = activeHotspot === h.id;
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setActiveHotspot(isSelected ? null : h.id)}
                      className={`glass-tab flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-white/20 border-white/40 text-white shadow-lg"
                          : "text-zinc-300 hover:text-white"
                      }`}
                      style={{
                        borderColor: isSelected ? h.accentColor : undefined,
                        boxShadow: isSelected ? `0 0 16px ${h.glowColor}` : undefined,
                      }}
                    >
                      <HousePinIcon className="w-3.5 h-3.5" color={h.accentColor} />
                      <span
                        className="font-mono text-[11px] font-bold"
                        style={{ color: isSelected ? h.accentColor : undefined }}
                      >
                        0{h.projectIndex + 1}
                      </span>
                      <span className="text-[11px] font-medium hidden md:inline">
                        {p.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
