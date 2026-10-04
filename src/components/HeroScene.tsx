import { useEffect, useRef, useState } from "react";
import type { HeroSceneHandle } from "../three/heroScene";

function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Idle-time loader so the 3D bundle never competes with first paint. */
function whenIdle(cb: () => void): () => void {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (typeof w.requestIdleCallback === "function") {
    const id = w.requestIdleCallback(cb, { timeout: 800 });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(cb, 250);
  return () => window.clearTimeout(id);
}

/** Abstract architectural arches — shown while loading and as the no-WebGL fallback. */
function ArchFallback({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 640"
      fill="none"
      aria-hidden
      className={`h-full w-full transition-opacity duration-1000 ${className ?? ""}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="archGlow" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#e9dfc9" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e9dfc9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="260" cy="270" r="240" fill="url(#archGlow)" />
      {[210, 168, 126, 84].map((r, i) => (
        <path
          key={r}
          d={`M ${260 - r} 500 A ${r} ${r} 0 0 1 ${260 + r} 500`}
          stroke={i === 1 ? "#a98a5f" : "#cfc3ab"}
          strokeWidth={i === 1 ? 1.8 : 1.2}
          strokeOpacity={i === 1 ? 0.9 : 0.75}
        />
      ))}
      <path d="M60 500h400" stroke="#cfc3ab" strokeWidth="1.2" strokeOpacity="0.75" />
      <path d="M120 540h280" stroke="#cfc3ab" strokeWidth="1" strokeOpacity="0.45" />
      <circle cx="260" cy="212" r="5" fill="#a98a5f" />
      <path d="M260 96v111" stroke="#a98a5f" strokeWidth="1.2" />
      <ellipse cx="260" cy="516" rx="150" ry="8" fill="#cfc3ab" opacity="0.35" />
    </svg>
  );
}

type SceneState = "loading" | "ready" | "fallback";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<SceneState>("loading");

  useEffect(() => {
    let cancelled = false;
    let handle: HeroSceneHandle | null = null;

    if (!webglAvailable()) {
      setState("fallback");
      return;
    }

    const cancelIdle = whenIdle(() => {
      import("../three/heroScene")
        .then(({ createHeroScene }) => {
          if (cancelled || !containerRef.current || !canvasRef.current) return;
          const mobile =
            window.matchMedia("(max-width: 768px)").matches || (navigator.hardwareConcurrency ?? 8) <= 4;
          const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          handle = createHeroScene(containerRef.current, canvasRef.current, { mobile, reducedMotion });
          if (cancelled) {
            handle.dispose();
            handle = null;
          } else {
            setState("ready");
          }
        })
        .catch(() => {
          if (!cancelled) setState("fallback");
        });
    });

    return () => {
      cancelled = true;
      cancelIdle();
      handle?.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden>
      <ArchFallback className={state === "ready" ? "opacity-0" : "opacity-100"} />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
          state === "ready" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
