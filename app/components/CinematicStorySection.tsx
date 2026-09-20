"use client";

import React, { useEffect, useRef, useState } from "react";

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
          background: `radial-gradient(280px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${accentGlow}, transparent 70%)`,
        }}
      />

      {/* Card Content with relative z-index */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function CinematicStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [manualExpanded, setManualExpanded] = useState(false);
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

  // Escape key to exit manual fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && manualExpanded) {
        setManualExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [manualExpanded]);

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
          - Highlighting Phoenix's Company Portfolio:
            - Voice Shield AI
            - Phoenix Research AI
            - Phoenix Pulse AI
            - Sanctuary Citadel Dossier
        */}

        {/* ELEMENT 1: Top-Left — VOICE SHIELD AI */}
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
            accentGlow="rgba(16, 185, 129, 0.28)"
            accentBorder="rgba(16, 185, 129, 0.7)"
          >
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/70 mb-2.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-emerald-300 font-bold">
                VOICE SHIELD AI • IMMUNIZED
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-none mb-3">
              Voice Shield AI
            </h3>
            <p className="text-sm sm:text-[15px] text-zinc-100 font-normal leading-relaxed mb-1">
              Zero-latency acoustic biometric defense. Immunizing sovereign speech against deepfake duplicates and unauthorized voice cloning.
            </p>
            <div className="mt-3.5 text-xs font-mono text-zinc-200 uppercase tracking-wider border-t border-zinc-700/80 pt-2.5 flex items-center justify-between font-semibold">
              <span className="text-emerald-400">Latency: 8.4ms</span>
              <span className="text-zinc-300">PXV-01</span>
            </div>
          </EditorialInfoCard>
        </div>

        {/* ELEMENT 2: Top-Right — PHOENIX RESEARCH AI */}
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
            accentGlow="rgba(245, 158, 11, 0.28)"
            accentBorder="rgba(245, 158, 11, 0.7)"
            className="text-right"
          >
            <div className="inline-flex items-center justify-end gap-2 px-2.5 py-1 rounded-full bg-amber-950/90 border border-amber-500/70 mb-2.5 shadow-sm">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-amber-300 font-bold">
                DEEP RECURSION // ACTIVE
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-none mb-3">
              Phoenix Research AI
            </h3>
            <p className="text-sm sm:text-[15px] text-zinc-100 font-normal leading-relaxed mb-1">
              Autonomous multi-agent research synthesis. Navigating vast hypothesis spaces to unearth foundational scientific and technical breakthroughs.
            </p>
            <div className="mt-3.5 text-xs font-mono text-zinc-200 uppercase tracking-wider border-t border-zinc-700/80 pt-2.5 flex items-center justify-between font-semibold">
              <span className="text-zinc-300">CORE 09</span>
              <span className="text-amber-400">HYPOTHESIS ENGINE</span>
            </div>
          </EditorialInfoCard>
        </div>

        {/* ELEMENT 3: Bottom-Left — PHOENIX PULSE AI */}
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
            accentGlow="rgba(6, 182, 212, 0.28)"
            accentBorder="rgba(6, 182, 212, 0.7)"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-950/95 border border-cyan-500/80 text-xs font-mono tracking-wider text-cyan-300 uppercase mb-2.5 font-bold shadow-sm">
              TELEMETRY VITALITY
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-white leading-tight mb-2.5">
              Phoenix Pulse AI
            </h3>
            <p className="text-sm sm:text-[15px] text-zinc-100 leading-relaxed font-normal mb-1">
              Predictive neural telemetry engine. Anticipating systemic anomaly vectors and latency degradation before execution.
            </p>
            <div className="mt-3.5 text-xs font-mono text-zinc-200 uppercase tracking-wider border-t border-zinc-700/80 pt-2.5 flex items-center justify-between font-semibold">
              <span className="text-cyan-400">Jitter: 0.02%</span>
              <span className="text-zinc-300">PULSE-SYS</span>
            </div>
          </EditorialInfoCard>
        </div>

        {/* ELEMENT 4: Bottom-Right — SECTOR 07 CITADEL DOSSIER */}
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
            accentGlow="rgba(168, 85, 247, 0.28)"
            accentBorder="rgba(168, 85, 247, 0.7)"
            className="text-right"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-purple-950/95 border border-purple-500/80 text-xs font-mono tracking-wider text-purple-300 uppercase mb-2.5 font-bold shadow-sm">
              SECTOR 07 • AETHER CITADEL
            </div>
            <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-2">
              Living Hydro-Colossus
            </h4>
            <p className="text-sm sm:text-[15px] text-zinc-100 leading-relaxed font-normal mb-1">
              A sanctuary where neural architectures breathe through waterfalls, governed by the golden dragon core of Phoenix synthesis.
            </p>
            <div className="mt-3.5 text-xs font-mono text-zinc-200 uppercase tracking-wider border-t border-zinc-700/80 pt-2.5 flex items-center justify-between font-semibold">
              <span className="text-zinc-300">SANCTUARY</span>
              <span className="text-purple-400">DRAGON REALM</span>
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
          Subtle minimal caption when full screen is reached
        */}
        <div
          style={{
            opacity: finalCueOpacity,
            pointerEvents: finalCueOpacity > 0.5 ? "auto" : "none",
          }}
          className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-8 sm:p-12 md:p-16 transition-opacity duration-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              PHOENIX FOUNDRY // DISCOVERY EXPEDITION
            </span>
            <button
              onClick={() => setManualExpanded(false)}
              className="text-xs font-mono text-white/80 hover:text-white px-3 py-1 rounded-full bg-black/40 border border-white/20 pointer-events-auto cursor-pointer backdrop-blur-xs"
            >
              Contract View [Esc]
            </button>
          </div>

          <div className="max-w-xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-300/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              THE CELESTIAL WATERFALL CITADEL
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mt-1 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Where Intelligent Systems Become Living Worlds.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
