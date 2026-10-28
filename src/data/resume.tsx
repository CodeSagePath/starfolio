import { Icons } from "@/components/icons";
import { BookOpen, House, Images } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Docker } from "@/components/ui/svgs/docker";
import { Flutter } from "@/components/ui/svgs/flutter";

export interface WorkItem {
  company: string;
  href: string;
  badges?: readonly string[];
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end?: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  href?: string;
  dates: string;
  active: boolean;
  description: string;
  caseStudy?: {
    challenge: string;
    approach: readonly string[];
    outcome: string;
  };
  technologies: readonly string[];
  links: readonly {
    type: string;
    href: string;
    icon: React.ReactNode;
  }[];
  image?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  previews?: readonly {
    src: string;
    alt: string;
  }[];
  video?: string;
}

export interface Photo {
  src: string;
  alt: string;
}

export interface PhotoCollection {
  slug: string;
  title: string;
  location: string;
  date: string;
  coverImage: string;
  photos: readonly Photo[];
}

export const DATA = {
  name: "Rishi Garg",
  initials: "RG",
  url: "https://codesagepath.dev",
  location: "Bengaluru, IN",
  locationLink: "https://www.google.com/maps/place/bengaluru+in",
  description:
    "Software engineer and product builder creating AI systems, mobile applications, backend services, and developer tools through CodeSagePath.",
  summary:
    "I build end-to-end software with a focus on thoughtful product engineering: **AI systems, mobile apps, backend services, and reusable Flutter packages**. My work ranges from a multi-tenant RAG SaaS platform and self-hosted routing infrastructure to local-first notes and developer-focused open-source libraries.",
  avatarUrl: "/picofme.png",
  ogImage: "/og_image.png",
  resumeUrl: "https://files.codesagepath.dev/e/Rishi_Garg.pdf",
  sections: {
    about: { order: 1, enabled: true, heading: "What I build" },
    work: { order: 2, enabled: false, heading: "Work Experience", presentLabel: "Present" },
    education: { order: 4, enabled: true, heading: "Education" },
    skills: { order: 3, enabled: true, heading: "Core toolkit" },
    projects: {
      order: 2, enabled: true,
      label: "Selected work",
      heading: "Things I have taken from idea to implementation",
      text: "A selection of product work, infrastructure, and open-source packages. Each project reflects a different engineering problem worth solving.",
    },
    hackathons: {
      order: 7, enabled: false,
      label: "Hackathons",
      heading: "I like building things",
      text: "During my time in university, I attended {count}+ hackathons. People from around the country would come together and build incredible things in 2-3 days. It was eye-opening to see the endless possibilities brought to life by a group of motivated and passionate individuals.",
    },
    photos: {
      order: 6, enabled: true,
      heading: "Photography",
    },
    contact: {
      order: 8, enabled: true,
      label: "Contact",
      heading: "Get in Touch",
      text: "Have a product idea, an engineering problem, or an interesting collaboration in mind? Reach out by email or connect through GitHub and LinkedIn.",
    },
  },
  photoCollections: [
    {
      slug: "lalbagh-in-bloom-2026-10-24",
      title: "Lalbagh in bloom",
      location: "Lalbagh Botanical Garden, Bengaluru",
      date: "2026-10-24",
      coverImage: "/photos/lalbagh-01.jpg",
      photos: [
        { src: "/photos/lalbagh-01.jpg", alt: "Flower photographed at Lalbagh Botanical Garden, Bengaluru" },
        { src: "/photos/lalbagh-02.jpg", alt: "Flower photographed at Lalbagh Botanical Garden, Bengaluru" },
        { src: "/photos/lalbagh-03.jpg", alt: "Flower photographed at Lalbagh Botanical Garden, Bengaluru" },
        { src: "/photos/lalbagh-04.jpg", alt: "Flower photographed at Lalbagh Botanical Garden, Bengaluru" },
        { src: "/photos/lalbagh-05.jpg", alt: "Flower photographed at Lalbagh Botanical Garden, Bengaluru" },
        { src: "/photos/lalbagh-06.jpg", alt: "Flower photographed at Lalbagh Botanical Garden, Bengaluru" },
        { src: "/photos/lalbagh-07.jpg", alt: "Flower photographed at Lalbagh Botanical Garden, Bengaluru" },
        { src: "/photos/lalbagh-08.jpg", alt: "Flower photographed at Lalbagh Botanical Garden, Bengaluru" },
        { src: "/photos/lalbagh-09.jpg", alt: "Flower photographed at Lalbagh Botanical Garden, Bengaluru" },
        { src: "/photos/lalbagh-10.jpg", alt: "Flower photographed at Lalbagh Botanical Garden, Bengaluru" },
        { src: "/photos/lalbagh-11.jpg", alt: "Flower photographed at Lalbagh Botanical Garden, Bengaluru" },
        { src: "/photos/lalbagh-12.jpg", alt: "Flower photographed at Lalbagh Botanical Garden, Bengaluru" },
        { src: "/photos/lalbagh-13.jpg", alt: "Flower photographed at Lalbagh Botanical Garden, Bengaluru" },
        { src: "/photos/lalbagh-14.jpg", alt: "Flower photographed at Lalbagh Botanical Garden, Bengaluru" },
        { src: "/photos/lalbagh-15.jpg", alt: "Flower photographed at Lalbagh Botanical Garden, Bengaluru" },
      ],
    },
  ] as const satisfies readonly PhotoCollection[],
  skills: [
    { name: "Flutter", icon: Flutter },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: ReactLight },
    { name: "Node.js", icon: Nodejs },
    { name: "Docker", icon: Docker },
  ],
  skillGroups: [
    {
      title: "Product & frontend",
      description: "Interfaces that feel clear, fast, and useful.",
      skills: ["React", "Next.js", "Flutter", "Tailwind CSS"],
    },
    {
      title: "Backend & data",
      description: "APIs and data systems built for real product flows.",
      skills: ["Node.js", "Express", "PostgreSQL", "Redis"],
    },
    {
      title: "AI & infrastructure",
      description: "Self-hosted systems that stay observable and deployable.",
      skills: ["Server (VPS) setup", "Nginx", "Cloudflare DNS", "Docker", "GitHub Actions", "RAG", "pgvector", "llama.cpp"],
    },
  ],
  navbar: [
    { href: "/", icon: House, label: "Home" },
    { href: "/photography/", icon: Images, label: "Photography" },
    { href: "/blog", icon: BookOpen, label: "Blog" },
  ],
  contact: {
    email: "rishigarg185@gmail.com",
    tel: "+91 6393284606",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/CodeSagePath",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/codesagepath",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/rishi__garg",
        icon: Icons.x,
        navbar: true,
      },
      // Youtube: {
      //   name: "Youtube",
      //   url: "https://youtube.com",
      //   icon: Icons.youtube,
      //   navbar: true,
      // },
      email: {
        name: "Send Email",
        url: "mailto:rishigarg185@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [] as WorkItem[],
  education: [
    {
      school: "PES University",
      href: "https://pes.edu",
      degree: "Master of Computer Applications",
      // logoUrl: "https://pesuimsr.pes.edu/wp-content/uploads/2025/07/PESUIMSR-LOGO-website.png",
      logoUrl: "/pes-logo.png",
      start: "2021",
      end: "2023",
    },
    {
      school: "Institute of Management Education (IME)",
      href: "https://imesahibabad.ac.in/",
      degree: "Bachelor of Computer Applications",
      // logoUrl: "https://imesahibabad.ac.in/assets/images/New-logo-3-1jpg-578f.webp",
      logoUrl: "/ime-logo.jpg",
      start: "2018",
      end: "2021",
    },
    // {
    //   school: "Simon Fraser University",
    //   href: "https://sfu.ca",
    //   degree: "Bachelor of Business Administration",
    //   logoUrl: "https://www.google.com/s2/favicons?domain=sfu.ca&sz=128",
    //   start: "2018",
    //   end: "2023",
    // },
    // {
    //   school: "International Baccalaureate",
    //   href: "https://ibo.org",
    //   degree: "IB Diploma",
    //   logoUrl: "https://www.google.com/s2/favicons?domain=ibo.org&sz=128",
    //   start: "2014",
    //   end: "2018",
    // },
  ],
  projects: [
    {
      title: "AskZentic",
      href: "https://askzentic.com",
      image: "/project-previews/askzentic.webp",
      imageAlt: "AskZentic customer support portal answering a product setup question",
      dates: "2026 — Present",
      active: true,
      description:
        "A white-label, multi-tenant RAG SaaS platform that turns company documents into branded, AI-powered Q&A experiences. Built hybrid retrieval with **pgvector, BM25, and Reciprocal Rank Fusion**; streamed local LLM answers; and designed an OCR, chunking, and embedding pipeline for PDF, DOCX, and spreadsheet ingestion. The system separates web and compute workloads across two VPSs connected by WireGuard.",
      caseStudy: {
        challenge:
          "Build a document question-answering workflow that can handle different file formats and present a branded experience for separate tenants.",
        approach: [
          "Process PDF, DOCX, and spreadsheet uploads through OCR, chunking, and embedding stages.",
          "Combine pgvector semantic retrieval with BM25 keyword retrieval, then merge results with Reciprocal Rank Fusion.",
          "Stream answers from a locally hosted language model and keep web and compute workloads on separate VPSs connected by WireGuard.",
        ],
        outcome:
          "The implemented platform connects document ingestion, hybrid retrieval, and streamed answers in a multi-tenant Q&A product.",
      },
      technologies: ["Next.js", "Express", "PostgreSQL", "pgvector", "Redis", "BullMQ", "Docker"],
      links: [
        { type: "Live site", href: "https://askzentic.com", icon: <Icons.globe className="size-3" /> },
      ],
    },
    {
      title: "AnantYatra",
      href: "https://anantyatra.codesagepath.dev/",
      image: "/project-previews/anantyatra.webp",
      imageAlt: "AnantYatra route planner over a map of India and South Asia",
      dates: "2026",
      active: true,
      description:
        "A map-first route planner for complex road trips without waypoint limits. It supports multi-vehicle routing, drag-and-drop itineraries, scheduling, rest-stop suggestions, trip sharing, live check-ins, and SVG/PDF route exports. I paired a React interface with a Node/Prisma API and a self-hosted Valhalla routing engine in Docker.",
      caseStudy: {
        challenge:
          "Plan multi-stop road trips with flexible waypoint ordering and different transport profiles, while keeping the route visible in a map-first interface.",
        approach: [
          "Use OpenStreetMap data with a self-hosted Valhalla routing engine running in Docker.",
          "Let travelers reorder stops with drag-and-drop and recalculate routes for driving, motorcycles, cycling, walking, and trucks.",
          "Pair the React and TypeScript client with a Node.js and Prisma API; the repository documents saved routes, JWT authentication, and a SQLite database.",
        ],
        outcome:
          "The project brings itinerary editing, multiple transport profiles, and self-hosted routing together in one documented application. Its repository includes setup and VPS deployment scripts.",
      },
      technologies: ["React", "TypeScript", "Express", "Prisma", "OpenStreetMap", "Valhalla", "Docker"],
      links: [
        { type: "Live site", href: "https://anantyatra.codesagepath.dev/", icon: <Icons.globe className="size-3" /> },
        { type: "GitHub", href: "https://github.com/CodeSagePath/AnantYatra", icon: <Icons.github className="size-3" /> },
      ],
    },
    {
      title: "Whisper Kit",
      href: "https://github.com/CodeSagePath/whisper_kit",
      image: "/project-previews/whisper-kit.svg",
      imageAlt: "Whisper Kit workflow: local audio input, on-device whisper.cpp transcription, and text output",
      dates: "2025 — Present",
      active: true,
      description:
        "A Flutter package for on-device speech-to-text powered by **whisper.cpp**. It provides offline transcription after model download, language detection, optional translation, timestamped segments, download progress, and typed error handling across Android, iOS beta, and experimental macOS support.",
      caseStudy: {
        challenge:
          "Expose local Whisper transcription through a Flutter package while handling model downloads, platform-specific native code, and audio-input errors clearly.",
        approach: [
          "Run Whisper through whisper.cpp so transcription can happen locally after a model has been downloaded.",
          "Provide a small transcription API with language selection, optional translation, timestamped segments, and model-download progress.",
          "Use typed exceptions for model, audio, transcription, and permission failures. The documented native core accepts 16 kHz, 16-bit PCM WAV audio.",
        ],
        outcome:
          "The repository documents Android as working, iOS as beta, and macOS as experimental. It provides a stable API for transcription and manual model downloads.",
      },
      technologies: ["Flutter", "Dart", "C++", "whisper.cpp", "Android", "iOS"],
      links: [
        { type: "GitHub", href: "https://github.com/CodeSagePath/whisper_kit", icon: <Icons.github className="size-3" /> },
      ],
    },
    {
      title: "Parallel Timeline",
      href: "https://github.com/CodeSagePath/parallel_timeline",
      image: "/project-previews/parallel-timeline.svg",
      imageAlt: "Dual-column timeline comparing planned and actual event times",
      dates: "2026",
      active: false,
      description:
        "A reusable Flutter timeline package for comparing planned and actual work against the same clock. It includes time-positioned dual tracks, overlap lanes, a current-time indicator, configurable grids, custom event cards, and drag-to-move or resize editing callbacks for the actual timeline.",
      technologies: ["Flutter", "Dart", "CustomPainter", "Widget testing"],
      links: [
        { type: "GitHub", href: "https://github.com/CodeSagePath/parallel_timeline", icon: <Icons.github className="size-3" /> },
      ],
    },
    {
      title: "Secure Nonce",
      href: "https://github.com/CodeSagePath/secure_nonce",
      image: "/project-previews/secure-nonce.svg",
      imageAlt: "SecureNonce Dart example generating hex, byte, and URL-safe token values",
      dates: "2025 — Present",
      active: true,
      description:
        "A small, dependency-free Dart package for generating cryptographically secure nonces. It exposes hex, raw-byte, Base64, URL-safe Base64, and human-friendly alphanumeric outputs, uses `Random.secure()`, and accepts an injectable random source for deterministic tests.",
      technologies: ["Dart", "Flutter", "Cryptography", "Testing"],
      links: [
        { type: "GitHub", href: "https://github.com/CodeSagePath/secure_nonce", icon: <Icons.github className="size-3" /> },
      ],
    },
    {
      title: "VividNotes",
      href: "https://play.google.com/store/apps/details?id=net.codesagepath.colornote&pcampaignid=web_share",
      image: "/project-previews/vividnotes-icon.webp",
      imageAlt: "VividNotes app icon",
      imageFit: "contain",
      dates: "2024 — Present",
      active: true,
      description:
        "A local-first notes and to-do app for Android and iOS. The current release focuses on rapid note capture, rich text, search, reminders, theming, and backup/export in a phone-first experience, while keeping authentication infrastructure ready for a future return.",
      technologies: ["Flutter", "Dart", "Firebase", "Android", "iOS"],
      links: [
        {
          type: "Play Store",
          href: "https://play.google.com/store/apps/details?id=net.codesagepath.colornote&pcampaignid=web_share",
          icon: <Icons.globe className="size-3" />,
        },
      ],
    },
  ] as readonly ProjectItem[],
  hackathons: [] as any[],
} as const;
