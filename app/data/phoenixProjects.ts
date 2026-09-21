export interface ProjectDossier {
  overview: string;
  problem: string;
  approach: string;
  technology: string[];
  buildProcess: string[];
  result: string;
}

export interface PhoenixProject {
  id: string;
  title: string;
  codename: string;
  category: string;
  status: string;
  year: string;
  description: string;
  specs: string[];
  image: string;
  accentHex: string;
  accentGlow: string;
  accentBorder: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  githubUrl: string;
  liveUrl?: string;
  destinationUrl: string;
  destinationType: "LIVE PLATFORM" | "GITHUB";
  destinationLabel: string;
  rotationDeg: number;
  hoverRotationDeg: number;
  colSpanClass: string;
  offsetClass: string;
  minHeightClass: string;
  imageHeightClass: string;
  dossier: ProjectDossier;
}

/**
 * CANONICAL SINGLE SOURCE OF TRUTH
 * Exactly the five official portfolio projects of Rehan Abed.
 * Factual technology stacks and architecture verified from actual repositories.
 */
export const PHOENIX_PROJECTS: PhoenixProject[] = [
  {
    id: "voiceshield",
    title: "VoiceShieldAI",
    codename: "VSHIELD-DEFENSE-01",
    category: "AI / Voice Security",
    status: "BUILT & VALIDATED",
    year: "2026",
    description:
      "An AI-powered real-time system built to detect and prevent voice-cloning impersonation attacks.",
    specs: [
      "Wav2Vec2",
      "ECAPA-TDNN",
      "FastAPI",
      "Audio Preprocessing / VAD",
      "Speaker Verification",
      "Risk Engine",
    ],
    image: "/projects/voiceshield.jpg",
    accentHex: "#f59e0b",
    accentGlow: "rgba(245, 158, 11, 0.25)",
    accentBorder: "rgba(245, 158, 11, 0.7)",
    badgeBg: "bg-amber-950/90",
    badgeBorder: "border-amber-500/70",
    badgeText: "text-amber-300",
    rotationDeg: -1.5,
    hoverRotationDeg: -0.4,
    colSpanClass: "lg:col-span-7",
    offsetClass: "lg:translate-y-0",
    minHeightClass: "min-h-[540px] sm:min-h-[580px]",
    imageHeightClass: "h-[250px] sm:h-[320px] md:h-[360px]",
    githubUrl: "https://github.com/rehanabed10-png/voiceshieldAI",
    destinationUrl: "https://github.com/rehanabed10-png/voiceshieldAI",
    destinationType: "GITHUB",
    destinationLabel: "GITHUB",
    dossier: {
      overview:
        "An AI-powered system built and developed by Rehan Abed to detect and prevent voice-cloning impersonation attacks.",
      problem:
        "Rapid proliferation of generative speech synthesis and voice cloning tools creates vulnerabilities for voice authentication and telephony security.",
      approach:
        "Processes incoming audio frames, applies Voice Activity Detection (VAD) and preprocessing to isolate clean vocal features, extracts embeddings via Wav2Vec2 and ECAPA-TDNN, and scores speaker identity against a calibrated acoustic risk engine.",
      technology: [
        "Wav2Vec2",
        "ECAPA-TDNN",
        "FastAPI",
        "Audio Preprocessing / VAD",
        "Speaker Verification",
        "Risk Engine",
        "Python",
      ],
      buildProcess: [
        "Constructed FastAPI service endpoints for audio chunk ingestion and processing",
        "Built audio preprocessing and VAD pipeline to remove silence and background noise",
        "Integrated Wav2Vec2 neural feature extraction with ECAPA-TDNN speaker embedding architecture",
        "Engineered threshold-based risk engine to evaluate speaker consistency and flag synthetic acoustic indicators",
      ],
      result:
        "Implemented and validated voice security system capable of detecting synthetic impersonation attacks. Source code published on GitHub.",
    },
  },
  {
    id: "phoenix-pulse",
    title: "Phoenix Pulse",
    codename: "PULSE-SYS-AUDIT",
    category: "Web / Performance / Systems",
    status: "DEPLOYED & TESTED",
    year: "2026",
    description:
      "Website SEO and performance analyzer engineered with Node.js, Express, Axios, and Cheerio to audit page response metrics, metadata tags, and structural DOM health.",
    specs: [
      "Node.js",
      "Express",
      "Axios",
      "Cheerio",
      "REST API",
    ],
    image: "/projects/software-runtime.jpg",
    accentHex: "#06b6d4",
    accentGlow: "rgba(6, 182, 212, 0.25)",
    accentBorder: "rgba(6, 182, 212, 0.7)",
    badgeBg: "bg-cyan-950/90",
    badgeBorder: "border-cyan-500/70",
    badgeText: "text-cyan-300",
    rotationDeg: 1.8,
    hoverRotationDeg: 0.5,
    colSpanClass: "lg:col-span-5",
    offsetClass: "lg:translate-y-12",
    minHeightClass: "min-h-[500px] sm:min-h-[540px]",
    imageHeightClass: "h-[230px] sm:h-[280px] md:h-[310px]",
    githubUrl: "https://github.com/rehanabed10-png/phoenix-pulse",
    liveUrl: "https://phoenix-pulse.onrender.com/",
    destinationUrl: "https://phoenix-pulse.onrender.com/",
    destinationType: "LIVE PLATFORM",
    destinationLabel: "LIVE PLATFORM",
    dossier: {
      overview:
        "Website SEO & Performance Analyzer built by Rehan Abed using Node.js, Express, Axios, and Cheerio, with a modern liquid glass interface.",
      problem:
        "Websites frequently suffer from unindexed meta tags, missing image accessibility attributes, slow response times, and broken heading hierarchies.",
      approach:
        "Dispatches HTTP requests through Axios to capture exact response times and status codes, then loads raw HTML into Cheerio to extract title tags, meta descriptions, H1 counts, missing alt tags, and word count statistics.",
      technology: [
        "Node.js",
        "Express",
        "Axios",
        "Cheerio",
        "REST API",
      ],
      buildProcess: [
        "Developed Express server with structured routes and audit controllers",
        "Configured Axios HTTP client capturing round-trip response time and HTTP status codes",
        "Built Cheerio parsing routines extracting page title, meta description, H1 count, images missing alt text, and word count",
        "Crafted a modern responsive Liquid Glass frontend interface displaying clean visual audit metrics",
      ],
      result:
        "A verified website analysis application providing comprehensive SEO and performance audits. Source code available on GitHub.",
    },
  },
  {
    id: "phoenix-research-ai",
    title: "Phoenix Research AI",
    codename: "RESEARCH-SYNTH-AI",
    category: "AI / Research / Intelligence",
    status: "PROTOTYPE ACTIVE",
    year: "2026",
    description:
      "Next.js and Google Gemini AI research platform implementing a deterministic ASK → CLARIFY → DEFINE → TEST → LEARN workflow with 3D Three.js visualization, historical backtesting, and hypothesis verdicts.",
    specs: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Three.js",
      "React Three Fiber",
      "Drei",
      "Anime.js",
      "Google Gemini API",
    ],
    image: "/projects/phoenix-research.jpg",
    accentHex: "#a855f7",
    accentGlow: "rgba(168, 85, 247, 0.25)",
    accentBorder: "rgba(168, 85, 247, 0.7)",
    badgeBg: "bg-purple-950/90",
    badgeBorder: "border-purple-500/70",
    badgeText: "text-purple-300",
    rotationDeg: -1.2,
    hoverRotationDeg: -0.3,
    colSpanClass: "lg:col-span-5",
    offsetClass: "lg:-translate-y-6",
    minHeightClass: "min-h-[480px] sm:min-h-[520px]",
    imageHeightClass: "h-[220px] sm:h-[260px] md:h-[290px]",
    githubUrl: "https://github.com/rehanabed10-png/phoenix-research-ai",
    liveUrl: "https://phoenix-research-ai-rhkg.onrender.com/",
    destinationUrl: "https://phoenix-research-ai-rhkg.onrender.com/",
    destinationType: "LIVE PLATFORM",
    destinationLabel: "LIVE PLATFORM",
    dossier: {
      overview:
        "A research and intelligence platform built with Next.js, TypeScript, Three.js, and Google Gemini API, executing an explicit ASK → CLARIFY → DEFINE → TEST → LEARN methodology.",
      problem:
        "Traditional research workflows blur the line between raw quantitative evidence and generative AI interpretation, leading to unverified claims and look-ahead bias.",
      approach:
        "Separates natural-language Gemini-assisted clarification from deterministic backtesting. Constructs structured ResearchExperiment objects with parameter provenance, runs zero-look-ahead simulation runs, and enforces separation between empirical trade logs and AI analysis.",
      technology: [
        "Next.js",
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Three.js",
        "React Three Fiber",
        "Drei",
        "Anime.js",
        "Google Gemini API",
      ],
      buildProcess: [
        "Constructed modular Next.js application architecture across app/, components/, lib/, types/, and scripts/",
        "Implemented multi-stage pipeline: natural-language questions, ambiguity clarification, experiment definition, and verdict output",
        "Integrated Google Gemini API for intelligent question clarification and structured parameter extraction",
        "Engineered deterministic historical backtesting engine enforcing zero-look-ahead rules and quantitative metric tracking",
        "Authored and verified 22 automated unit and integration tests validating pipeline correctness",
      ],
      result:
        "A verified research intelligence system combining interactive 3D UI, Google Gemini clarification, and deterministic hypothesis verdicts. Source code on GitHub.",
    },
  },
  {
    id: "autoscribe",
    title: "Phoenix AutoScribe",
    codename: "AUTOSCRIBE-CNC-V3",
    category: "Robotics / Hardware / Automation",
    status: "PROTOTYPE BUILT & TESTED",
    year: "2026",
    description:
      "A physical handwriting machine developed as part of Team Phoenix, combining CNC motion, stepper motors, servo control and custom software to transform digital text into physical handwriting.",
    specs: [
      "Arduino UNO R3",
      "CNC Shield V3",
      "A4988",
      "NEMA 17",
      "SG90",
      "GT2",
      "GRBL 1.1h",
      "Inkscape",
      "G-Code",
    ],
    image: "/projects/autoscribe.jpg",
    accentHex: "#ea580c",
    accentGlow: "rgba(234, 88, 12, 0.28)",
    accentBorder: "rgba(234, 88, 12, 0.7)",
    badgeBg: "bg-amber-950/90",
    badgeBorder: "border-amber-500/70",
    badgeText: "text-amber-300",
    rotationDeg: 1.0,
    hoverRotationDeg: 0.2,
    colSpanClass: "lg:col-span-7",
    offsetClass: "lg:translate-y-8",
    minHeightClass: "min-h-[500px] sm:min-h-[540px]",
    imageHeightClass: "h-[240px] sm:h-[290px] md:h-[330px]",
    githubUrl: "https://github.com/rehanabed10-png/Pheonix-autoscribe-",
    destinationUrl: "https://github.com/rehanabed10-png/Pheonix-autoscribe-",
    destinationType: "GITHUB",
    destinationLabel: "GITHUB",
    dossier: {
      overview:
        "A physical handwriting machine developed as part of Team Phoenix, combining CNC motion, stepper motors, servo control and custom software to transform digital text into physical handwriting.",
      problem:
        "Standard printers produce uniform, sterile outputs lacking the organic pressure variance, genuine ink bleed, and natural stroke imperfections of real human pen-on-paper handwriting.",
      approach:
        "Constructed a dual-axis CNC mechanical gantry powered by NEMA 17 steppers and GT2 timing belts, using an SG90 servo for pen engagement (Z-axis). Firmware on an Arduino UNO executes G-code generated from vector paths.",
      technology: [
        "Arduino UNO R3",
        "CNC Shield V3",
        "A4988",
        "NEMA 17",
        "SG90",
        "GT2",
        "GRBL 1.1h",
        "Inkscape",
        "G-Code",
      ],
      buildProcess: [
        "Assembled rigid gantry frame with smooth linear guide rods and GT2 timing belt drive",
        "Wired CNC Shield V3 with A4988 microstepping drivers and adjusted reference voltages (VREF)",
        "Flashed and calibrated GRBL 1.1h parameters including step/mm ratios, max rates, and acceleration curves",
        "Created an Inkscape vector pipeline converting digital text paths into coordinate-accurate G-code routines",
      ],
      result:
        "A fully assembled, wired, and tested physical prototype successfully executing handwriting trajectories with real pens on paper. Source code on GitHub.",
    },
  },
  {
    id: "microservices",
    title: "Phoenix Microservices",
    codename: "INTERN-SERVICE-MESH",
    category: "Internship Build / Backend / Software Engineering",
    status: "IMPLEMENTED & TESTED",
    year: "2026",
    description:
      "Distributed backend architecture implemented as an internship engineering build, decoupling API routing, authentication, and notification workers through an asynchronous event mesh.",
    specs: [
      "Node.js",
      "Express",
      "NATS / NATS JetStream",
      "MongoDB / MongoDB Atlas",
      "Mongoose",
      "JWT",
      "Rate Limiting",
      "Helmet",
    ],
    image: "/projects/microservices.jpg",
    accentHex: "#10b981",
    accentGlow: "rgba(16, 185, 129, 0.25)",
    accentBorder: "rgba(16, 185, 129, 0.7)",
    badgeBg: "bg-emerald-950/90",
    badgeBorder: "border-emerald-500/70",
    badgeText: "text-emerald-300",
    rotationDeg: -1.6,
    hoverRotationDeg: -0.3,
    colSpanClass: "lg:col-span-12",
    offsetClass: "lg:-translate-y-2",
    minHeightClass: "min-h-[440px] sm:min-h-[480px]",
    imageHeightClass: "h-[200px] sm:h-[240px] md:h-[270px]",
    githubUrl: "https://github.com/rehanabed10-png/phoenix-microservices",
    destinationUrl: "https://github.com/rehanabed10-png/phoenix-microservices",
    destinationType: "GITHUB",
    destinationLabel: "GITHUB",
    dossier: {
      overview:
        "An event-driven microservices architecture implemented and tested as an engineering internship build to achieve decoupled, reliable service communication.",
      problem:
        "Tightly coupled REST endpoints suffer from latency cascade and service lockup when background tasks like notifications and data writes block client request threads.",
      approach:
        "Architected an API Gateway for perimeter verification, rate limiting, and JWT authentication, publishing domain events directly onto a NATS JetStream event mesh where decoupled workers consume and process tasks asynchronously.",
      technology: [
        "Node.js",
        "Express",
        "NATS / NATS JetStream",
        "MongoDB / MongoDB Atlas",
        "Mongoose",
        "JWT Authentication",
        "Rate Limiting",
        "Helmet",
      ],
      buildProcess: [
        "Constructed API Gateway handling authentication, request validation, and payload signing",
        "Configured NATS JetStream message streams with subject routing and persistent message guarantees",
        "Developed decoupled background worker services to consume event topics and process notifications",
        "Defined Mongoose schemas and data persistence models connected to MongoDB Atlas",
      ],
      result:
        "An implemented and verified backend build demonstrating asynchronous event streaming and clean service separation. Source available on GitHub.",
    },
  },
];
