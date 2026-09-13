import { useEffect, useRef, useState } from "react";
import { PROFILE, PROJECTS, SOCIALS, STACK_GROUPS } from "../data/content";

/* ---------- helpers ---------- */

const CMD_MAP = {
  help: { desc: "Lista los comandos disponibles" },
  whoami: { desc: "Quién soy en una línea" },
  ls: { desc: "Estructura del sitio" },
  cat: {
    desc: "Lee un archivo: cat <about|stack|projects|contact>.md",
  },
  projects: { desc: "Lista los proyectos" },
  open: { desc: "Abre un proyecto: open <n>" },
  contact: { desc: "Canales de contacto" },
  social: { desc: "social github | linkedin | email" },
  echo: { desc: "Repite lo que escribas" },
  date: { desc: "Fecha y hora actuales" },
  clear: { desc: "Limpia la terminal" },
  sudo: { desc: "Modo administrador… (requiere password)" },
};

const MAX_LINES = 200;

const bootLines = () => [
  { type: "dim", text: `${PROFILE.name} — entorno interactivo` },
  { type: "dim", text: 'escribí `help` para ver los comandos' },
];

function spanColor(type) {
  switch (type) {
    case "err":
      return "text-red-400";
    case "warn":
      return "text-amber-400";
    case "ok":
      return "text-green-400";
    case "dim":
    case "muted":
      return "text-gray-500";
    case "link":
      return "text-sky-400 underline underline-offset-2 hover:text-sky-300";
    case "input":
      return "text-red-300";
    default:
      return "text-gray-300";
  }
}

function buildHelp() {
  const entries = Object.entries(CMD_MAP);
  const pad = Math.max(...entries.map(([k]) => k.length));
  return [
    { type: "dim", text: "Comandos disponibles:" },
    ...entries.map(([k, v]) => ({
      type: "ok",
      text: `${k.padEnd(pad + 2)}· ${v.desc}`,
    })),
  ];
}

const fileStore = {
  "about.md": [
    { type: "info", text: `${PROFILE.name} — ${PROFILE.role}` },
    { type: "dim", text: PROFILE.location },
    { type: "info", text: PROFILE.heroSummary },
    { type: "muted", text: `especialidades: ${PROFILE.specialties.join(" · ")}` },
  ],
  "stack.md": [
    { type: "dim", text: "stack técnico:" },
    ...STACK_GROUPS.flatMap((g) => [
      { type: "ok", text: g.title },
      { type: "muted", text: `  ${g.items.join(" · ")}` },
    ]),
  ],
  "projects.md": PROJECTS.map((p, i) => ({
    type: "ok",
    text: `${i + 1}. ${p.title} — ${p.tagline}`,
  })),
  "contact.md": [
    { type: "info", text: `email : ${PROFILE.email}` },
    { type: "link", text: `github: ${PROFILE.github}`, href: PROFILE.github },
    { type: "link", text: `linkedin: ${PROFILE.linkedin}`, href: PROFILE.linkedin },
    { type: "link", text: `cv    : ${PROFILE.cvUrl}`, href: PROFILE.cvUrl },
  ],
};

/* ---------- main component ---------- */

export default function InteractiveTerminal({ withDelay = true }) {
  const [lines, setLines] = useState(() => (withDelay ? [] : bootLines()));
  const [current, setCurrent] = useState("");
  const [focused, setFocused] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const historyRef = useRef([]);
  const histIdxRef = useRef(-1);

  useEffect(() => {
    if (!withDelay) return;
    const t = setTimeout(() => setLines(bootLines()), 600);
    return () => clearTimeout(t);
  }, [withDelay]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    if (!focused) return;
    const onGlobalKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      inputRef.current?.focus();
    };
    document.addEventListener("keydown", onGlobalKey);
    return () => document.removeEventListener("keydown", onGlobalKey);
  }, [focused]);

  function push(block) {
    const arr = Array.isArray(block) ? block : [block];
    setLines((prev) => [...prev, ...arr].slice(-MAX_LINES));
  }

  function run(rawInput) {
    const raw = (rawInput || "").trim();
    setCurrent("");
    push({ type: "input", text: `$ ${raw}` });
    if (!raw) return;

    const [name = "", ...args] = raw.split(/\s+/);

    switch (name) {
      case "help":
        push(buildHelp());
        break;

      case "whoami":
        push([
          { type: "ok", text: `${PROFILE.name} — ${PROFILE.role}` },
          { type: "info", text: PROFILE.heroSummary },
          { type: "dim", text: PROFILE.location },
        ]);
        break;

      case "ls":
        push({ type: "muted", text: "README.md   about.md   stack.md" });
        push({ type: "muted", text: "projects.md   contact.md   cv/" });
        break;

      case "cat": {
        const file = (args[0] || "").toLowerCase().replace(/^\.\//, "");
        const content = fileStore[file];
        if (!content) {
          push({
            type: "err",
            text: `cat: ${file || "…"}: archivo no encontrado (probá about.md, stack.md, projects.md o contact.md)`,
          });
        } else {
          push(content);
        }
        break;
      }

      case "projects":
        push(PROJECTS.map((p, i) => ({
          type: "ok",
          text: `${i + 1}. ${p.title} — ${p.tagline}`,
        })));
        push({ type: "muted", text: "usá `open <n>` para ver un proyecto" });
        break;

      case "open": {
        const n = parseInt(args[0], 10);
        const p = PROJECTS[n - 1];
        if (!p) {
          push({ type: "err", text: `open: el proyecto #${args[0] ?? ""} no existe` });
          break;
        }
        push([
          { type: "ok", text: `> ${p.title} — ${p.tagline}` },
          { type: "info", text: p.description },
          { type: "muted", text: `stack: ${p.tech.join(" · ")}` },
          { type: "link", text: `repo: ${p.repo}`, href: p.repo },
        ]);
        break;
      }

      case "contact":
        push(SOCIALS.map((s) => ({
          type: "info",
          text: `${s.name.padEnd(10)}${s.handle}`,
        })));
        break;

      case "social": {
        const target = (args[0] || "").toLowerCase();
        const s = SOCIALS.find(
          (x) => x.name.toLowerCase() === target || x.icon.toLowerCase() === target,
        );
        if (s) {
          window.open(s.href, "_blank", "noopener,noreferrer");
          push({ type: "ok", text: `abriendo ${s.name} en una pestaña nueva…` });
        } else {
          push({ type: "err", text: "social: opción inválida — usá github, linkedin o email" });
        }
        break;
      }

      case "echo":
        push({ type: "info", text: args.join(" ") });
        break;

      case "date":
        push({
          type: "info",
          text: new Date().toLocaleString("es-AR", {
            dateStyle: "full",
            timeStyle: "short",
          }),
        });
        break;

      case "clear":
        setLines([]);
        break;

      case "sudo":
        push({ type: "warn", text: "zsh: acceso denegado — el admin está ocupado construyendo apps" });
        break;

      case "touch":
      case "mkdir":
      case "rm":
        push({ type: "err", text: `zsh: read-only filesystem: ${name}` });
        break;

      default:
        push({ type: "err", text: `zsh: command not found: ${name}` });
    }
  }

  const onKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = current.trim();
      if (value) historyRef.current = [...historyRef.current, value];
      histIdxRef.current = -1;
      run(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const h = historyRef.current;
      if (h.length === 0) return;
      const idx =
        histIdxRef.current === -1 ? h.length - 1 : Math.max(0, histIdxRef.current - 1);
      histIdxRef.current = idx;
      setCurrent(h[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const h = historyRef.current;
      if (histIdxRef.current === -1) return;
      const next = histIdxRef.current + 1;
      if (next >= h.length) {
        histIdxRef.current = -1;
        setCurrent("");
      } else {
        histIdxRef.current = next;
        setCurrent(h[next]);
      }
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/70 backdrop-blur-sm cursor-text">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <span className="ml-2 text-[10px] font-mono text-gray-500">
          {PROFILE.terminal.prompt}: ~/portafolio
        </span>
      </div>

      <div
        ref={bodyRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[12px] leading-6 select-text"
      >
        {lines.map((l, i) => (
          <p key={i} className={`whitespace-pre-wrap break-words ${spanColor(l.type)}`}>
            {l.href ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={spanColor(l.type)}
              >
                {l.text}
              </a>
            ) : (
              l.text
            )}
          </p>
        ))}
      </div>

      <div className="flex items-center gap-2 px-4 py-2.5 border-t border-white/10 bg-white/[0.02]">
        <span className="text-red-500 select-none">$</span>
        <input
          ref={inputRef}
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          onKeyDown={onKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Escribí un comando… (help)"
          className="flex-1 bg-transparent outline-none text-green-300 placeholder-gray-600"
        />
        <span
          className={`h-4 w-2 bg-red-500/80 ${focused ? "opacity-100" : "opacity-30"}`}
          style={{ animation: "caret-blink 1s step-end infinite" }}
        />
      </div>
    </div>
  );
}