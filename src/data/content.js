export const PROFILE = {
  name: "Esteban Ríos",
  firstName: "Esteban",
  lastName: "Ríos",
  role: "Full Stack Developer",
  roles: [
    "Full Stack Developer",
    "Desarrollador Frontend",
    "Desarrollador Backend",
    "DevOps Entusiasta",
  ],
  email: "esteban_690@hotmail.com",
  github: "https://github.com/EstebanRioss",
  linkedin: "https://www.linkedin.com/in/esteban-rios-b6056a309/",
  cvUrl: "/cv prog-2.pdf",
  location: "Argentina · Remoto 🔗",
  heroSummary:
    "Construyo aplicaciones web y móviles escalables de punta a punta: interfaces modulares con React y React Native, APIs REST seguras en el backend, integraciones con inteligencia artificial y despliegues containerizados listos para producción.",
  specialties: [
    "SaaS & Sistemas de Suscripciones",
    "Arquitectura en Capas y APIs REST",
    "Auditoría: Base de datos y despliegues productivos",
    "Bots de WhatsApp con IA",
  ],
  terminal: {
    prompt: "esteban@dev",
    content: {
      nombre: "Esteban Ríos",
      rol: "Full Stack Developer",
      stack: ["React", "Node.js", "PostgreSQL", "Docker"],
      foco: "SaaS · APIs · Alta disponibilidad",
      disponible: true,
    },
  },
  stats: [
    { value: "7", label: "Proyectos fullstack" },
    { value: "45+", label: "Tecnologías dominadas" },
    { value: "4", label: "Áreas de especialización" },
    { value: "2", label: "Idiomas · ES / EN" },
  ],
};

export const SOCIALS = [
  {
    name: "GitHub",
    href: PROFILE.github,
    icon: "Github",
    handle: "@EstebanRioss",
  },
  {
    name: "LinkedIn",
    href: PROFILE.linkedin,
    icon: "Linkedin",
    handle: "esteban-rios",
  },
  {
    name: "Email",
    href: `mailto:${PROFILE.email}`,
    icon: "Mail",
    handle: PROFILE.email,
  },
];

export const ABOUT_CARDS = [
  {
    icon: "Layers",
    title: "Arquitectura en capas",
    description:
      "Backends modulares separando presentación, lógica de negocio y acceso a datos, siguiendo SOLID y patrones de diseño.",
  },
  {
    icon: "Code2",
    title: "Frontend moderno",
    description:
      "Interfaces limpias y reutilizables con React, Next.js y Angular, consumiendo APIs reactivamente.",
  },
  {
    icon: "Database",
    title: "Datos y persistencia",
    description:
      "Modelado relacional y NoSQL con PostgreSQL, MySQL y MongoDB, incluyendo replicación y backups automatizados.",
  },
  {
    icon: "Rocket",
    title: "De producción para afuera",
    description:
      "Despliegues containerizados con Docker, monitoreo con Prometheus/Grafana y CI/CD con GitHub Actions.",
  },
];

export const PROJECTS = [
  {
    title: "Memoryals",
    tagline: "SaaS de membresías y suscripciones",
    category: "SaaS",
    description:
      "Plataforma de membresías con cuotas mensuales automatizadas. Autenticación JWT con roles (cliente/admin), aprobación de cuentas, recordatorios por email y panel administrativo con métricas en tiempo real.",
    tech: ["MEAN Stack", "MercadoPago", "JWT", "Cron Jobs", "Dashboard Analytics"],
    repo: "https://github.com/EstebanRioss/Memoryals-Frontend",
  },
  {
    title: "Canchas",
    tagline: "SaaS de alquiler deportivo",
    category: "SaaS",
    description:
      "Reservas deportivas sobre una infraestructura de producción: PostgreSQL replicado (Primary/Replica), monitoreo con Prometheus y Grafana, backups automáticos y despliegue con Docker Compose + CI/CD.",
    tech: ["Next.js 14", "PostgreSQL Replication", "Docker", "Prometheus", "CI/CD"],
    repo: "https://github.com/EstebanRioss/HiaFinal",
  },
  {
    title: "AI WhatsApp Assistant",
    tagline: "Scraping + LLM en tiempo real",
    category: "IA & Bots",
    description:
      "Bot conversacional de WhatsApp que genera respuestas con Mistral 7B (OpenRouter) enriquecidas con contenido scrapado en vivo. Sesiones persistentes con Baileys y arquitectura modular para mensajes en tiempo real.",
    tech: ["Node.js", "Baileys", "Puppeteer", "OpenRouter", "Mistral 7B"],
    repo: "https://github.com/EstebanRioss/chatbotwp",
  },
  {
    title: "Event Manager",
    tagline: "Plataforma de eventos y facturación",
    category: "Aplicaciones Web",
    description:
      "Fullstack para gestión de eventos, entradas y facturas: Express + MongoDB (Mongoose) con APIs REST, JWT y bcrypt, backend de emails con Nodemailer, y frontend Angular 19 con SSR, RxJS y panel de métricas.",
    tech: ["Express", "MongoDB", "Angular 19", "JWT", "RxJS", "SSR"],
    repo: "https://github.com/EstebanRioss/proyfrontendgrupo08",
  },
  {
    title: "JFit",
    tagline: "Plataforma fitness",
    category: "Aplicaciones Web",
    description:
      "App de fitness con autenticación y panel administrativo sobre Supabase. Gestión de usuarios, ejercicios y estadísticas con componentes reutilizables, pensada para despliegue serverless.",
    tech: ["React", "Vite", "Supabase", "TailwindCSS", "Admin Panel"],
    repo: "https://github.com/EstebanRioss/fitness",
  },
  {
    title: "Gestión de Reservas",
    tagline: "Sistema con patrón DAO",
    category: "Aplicaciones Web",
    description:
      "Sistema de reservas en Java con arquitectura en capas y patrón DAO. Persistencia con JPA + Hibernate, validación de conflictos de horarios y tests unitarios con JUnit.",
    tech: ["Java", "JPA", "Hibernate", "MySQL", "DAO Pattern", "JUnit"],
    repo: "https://github.com/EstebanRioss/Trabajo_Final",
  },
  {
    title: "Gastify",
    tagline: "Asistente financiero con IA",
    category: "Móvil & IA",
    description:
      "App móvil para gestión de finanzas personales con inteligencia artificial. Registra gastos e ingresos automáticamente desde texto libre o fotos de recibos usando Google Gemini. OCR local con Tesseract.js como fallback sin conexión, dashboard con gráficos, metas de presupuesto y transacciones recurrentes. Incluye un servidor MCP para integración con agentes de IA.",
    tech: [
      "React Native",
      "Expo SDK 54",
      "Node.js",
      "Express 5",
      "MongoDB",
      "Google Gemini",
      "Tesseract.js",
      "MCP Protocol",
      "TypeScript",
      "Zod",
    ],
    repo: "https://github.com/EstebanRioss/bot_busqueda",
  },
];

export const PROJECT_CATEGORIES = [
  { label: "Todos", value: "all" },
  { label: "SaaS", value: "SaaS" },
  { label: "IA & Bots", value: "IA & Bots" },
  { label: "Aplicaciones Web", value: "Aplicaciones Web" },
  { label: "Móvil & IA", value: "Móvil & IA" },
];

export const STACK_GROUPS = [
  {
    icon: "Layout",
    title: "Frontend",
    items: [
      "React 18",
      "Next.js 14",
      "Angular 20",
      "TypeScript 5",
      "React Native",
      "Expo SDK 54",
      "Vite",
      "TailwindCSS",
      "Framer Motion",
      "Chart.js",
    ],
  },
  {
    icon: "Server",
    title: "Backend & APIs",
    items: [
      "Node.js (Express 5)",
      "Next.js API Routes",
      ".NET",
      "Java (Maven)",
      "APIs RESTful",
      "JWT (httpOnly Cookies)",
      "Arquitectura en Capas",
      "Pattern DAO",
      "Principios SOLID",
    ],
  },
  {
    icon: "Database",
    title: "Bases de Datos",
    items: [
      "PostgreSQL (Primary/Replica)",
      "MongoDB (Mongoose)",
      "MySQL 8",
      "JPA 2.2",
      "Hibernate 5",
      "Supabase",
      "Modelado Relacional",
    ],
  },
  {
    icon: "Container",
    title: "Infraestructura & DevOps",
    items: [
      "Docker (Multi-stage)",
      "Docker Compose",
      "CI/CD (GitHub Actions)",
      "Prometheus & Grafana",
      "pg_dump Backups",
      "Linux",
      "Git & GitHub",
    ],
  },
  {
    icon: "Zap",
    title: "Integraciones & IA",
    items: [
      "MercadoPago SDK",
      "Baileys (WhatsApp)",
      "Puppeteer (Scraping)",
      "OpenRouter (Mistral 7B)",
      "Google Gemini (Texto + Visión)",
      "Tesseract.js (OCR)",
      "MCP Protocol",
      "Nodemailer / SendGrid / Resend",
      "node-cron",
      "Axios",
    ],
  },
  {
    icon: "ShieldCheck",
    title: "Testing & Calidad",
    items: [
      "JUnit 5",
      "Jasmine / Karma",
      "Validaciones de negocio",
      "Manejo de excepciones",
    ],
  },
];

export const EXTRA_EXPERIENCE = [
  "Integraciones con Webhooks",
  "Seguridad (JWT · bcrypt · httpOnly)",
  "Replicación y backups en PostgreSQL",
  "Prototipos rápidos con Vite",
];

export const NAV_LINKS = [
  { name: "Sobre mí", href: "#about" },
  { name: "Proyectos", href: "#projects" },
  { name: "Stack", href: "#stack" },
  { name: "Contacto", href: "#contact" },
];