import { useEffect, useRef } from "react";
import { animate, stagger, createTimeline, remove } from "animejs";

const BOOT_LINES = [
  "$ esteban@dev --init",
  "inicializando módulos...",
  "react ✓  node ✓  postgres ✓  docker ✓",
];

function IntroLoader({ onDone = () => {}, minDuration = 2700 }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const animated = [
      root,
      ...root.querySelectorAll(
        ".intro-letter, .intro-log > div, .intro-logo, .intro-bar-fill, .intro-num",
      ),
    ];
    const letters = Array.from(root.querySelectorAll(".intro-letter"));
    const logLines = Array.from(root.querySelectorAll(".intro-log > div"));
    const logoEl = root.querySelector(".intro-logo");
    const numEl = root.querySelector(".intro-num");
    const barEl = root.querySelector(".intro-bar-fill");
    const progress = { n: 0 };

    const tl = createTimeline({ defaults: { ease: "outExpo" } });
    tl.add(logoEl, { opacity: [0, 1], scale: [0.5, 1], rotate: [-12, 0], duration: 800, delay: 120 });
    tl.add(letters, {
      opacity: [0, 1],
      translateY: [36, 0],
      filter: ["blur(12px)", "blur(0px)"],
      duration: 820,
      delay: stagger(44, { start: 300 }),
    });
    tl.add(logLines, {
      opacity: [0, 1],
      translateX: [-18, 0],
      duration: 320,
      delay: stagger(150, { start: 800 }),
    });
    tl.add(progress, {
      n: 100,
      delay: 1200,
      duration: 950,
      ease: "inOutSine",
      onUpdate: () => {
        if (numEl) numEl.textContent = `${Math.round(progress.n)}%`;
        if (barEl) barEl.style.transform = `scaleX(${progress.n / 100})`;
      },
    });
    tl.play();

    const exit = animate(root, {
      translateY: ["0%", "-104%"],
      duration: 820,
      ease: "inOutQuint",
      delay: minDuration,
      onComplete: () => {
        document.documentElement.style.overflow = prevOverflow;
        onDone();
      },
    });

    return () => {
      exit.pause();
      remove(animated);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [onDone, minDuration]);

  return (
    <div ref={rootRef} className="intro-overlay" aria-hidden="true">
      <div className="flex flex-col items-center justify-center min-h-full px-6">
        <div className="intro-logo flex items-center gap-2.5 mb-8 opacity-0">
          <img
            src="/logo.png"
            alt=""
            className="h-10 w-auto object-contain rounded-md"
          />
          <span className="font-display text-lg font-semibold tracking-tight">
            esteban<span className="text-red-600">.dev</span>
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-tight text-center select-none">
          {"Esteban".split("").map((char, i) => (
            <span key={`f-${i}`} className="intro-letter inline-block text-white">
              {char}
            </span>
          ))}
          <br />
          <span className="inline-block animated-gradient-text">
            {"Ríos".split("").map((char, i) => (
              <span key={`l-${i}`} className="intro-letter inline-block">
                {char}
              </span>
            ))}
          </span>
        </h1>

        <div className="intro-log mt-10 w-full max-w-xs font-mono text-[12px] text-gray-400 text-left mx-auto">
          {BOOT_LINES.map((line) => (
            <div key={line} className="leading-6 opacity-0">
              {line}
            </div>
          ))}
        </div>

        <div className="w-full max-w-xs mt-8">
          <div className="h-[2px] rounded-full bg-white/10 overflow-hidden">
            <div className="intro-bar-fill h-full w-full bg-gradient-to-r from-red-600 to-red-400 origin-left shadow-[0_0_12px_rgba(220,38,38,0.7)]" />
          </div>
          <div className="mt-2 flex justify-end">
            <span className="intro-num font-mono text-xs text-gray-500">
              0%
            </span>
          </div>
        </div>
      </div>
      <p className="absolute bottom-8 left-0 right-0 text-center text-[10px] uppercase tracking-[0.4em] text-gray-600">
        Full Stack Developer — 2026
      </p>
    </div>
  );
}

export default IntroLoader;