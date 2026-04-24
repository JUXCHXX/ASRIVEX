import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo, { BRAND_LOGO_SRC } from "./Logo";

interface LoaderProps {
  onComplete: () => void;
}

const MIN_LOADER_MS = 950;
const EXIT_DELAY_MS = 180;

const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0.14);
  const [visible, setVisible] = useState(true);
  const [particles] = useState(() =>
    Array.from({ length: 14 }, (_, index) => ({
      id: index,
      left: `${8 + Math.random() * 84}%`,
      top: `${12 + Math.random() * 70}%`,
      drift: `${-10 + Math.random() * 20}%`,
      duration: 2.6 + Math.random() * 1.8,
      delay: Math.random() * 1.2,
      scale: 0.75 + Math.random() * 0.9,
      opacity: 0.2 + Math.random() * 0.45,
    })),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 1) return 1;

        const remaining = 0.9 - current;
        if (remaining <= 0.02) return 0.9;

        return Math.min(0.9, current + Math.max(0.025, remaining * 0.22));
      });
    }, 110);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let exitTimer = 0;
    let minTimer = 0;
    let disposeWindowLoad = () => {};
    const startedAt = performance.now();

    const waitForLogo = new Promise<void>((resolve) => {
      const image = new Image();
      image.src = BRAND_LOGO_SRC;

      if (image.complete) {
        resolve();
        return;
      }

      image.onload = () => resolve();
      image.onerror = () => resolve();
    });

    const waitForWindow =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            const handleWindowLoad = () => {
              window.removeEventListener("load", handleWindowLoad);
              resolve();
            };

            window.addEventListener("load", handleWindowLoad, { once: true });
            disposeWindowLoad = () => window.removeEventListener("load", handleWindowLoad);
          });

    Promise.all([waitForLogo, waitForWindow]).then(() => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, MIN_LOADER_MS - elapsed);

      minTimer = window.setTimeout(() => {
        if (cancelled) return;

        setProgress(1);
        exitTimer = window.setTimeout(() => {
          if (!cancelled) setVisible(false);
        }, EXIT_DELAY_MS);
      }, remaining);
    });

    return () => {
      cancelled = true;
      disposeWindowLoad();
      window.clearTimeout(minTimer);
      window.clearTimeout(exitTimer);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(224 64% 18%), hsl(224 71% 4%) 70%)",
          }}
          exit={{
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-x-0 top-[-18%] h-[42vh] bg-[radial-gradient(circle_at_top,_hsl(199_89%_60%_/_0.22),_transparent_62%)]" />
          <div className="absolute inset-x-0 bottom-[-24%] h-[40vh] bg-[radial-gradient(circle_at_bottom,_hsl(217_91%_60%_/_0.18),_transparent_64%)]" />

          <div className="absolute inset-0">
            {particles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute h-1.5 w-1.5 rounded-full bg-accent/60"
                initial={{
                  left: particle.left,
                  top: particle.top,
                  opacity: 0,
                  scale: particle.scale,
                }}
                animate={{
                  opacity: [0, particle.opacity, 0],
                  x: ["0%", particle.drift],
                  y: ["0%", "-18%"],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center gap-8 px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute inset-[-16px] -z-10 rounded-[32px] bg-accent/20 blur-3xl" />
              <div className="absolute inset-[-8px] -z-10 rounded-[30px] border border-white/10" />
              <Logo size={94} animated className="rounded-[26px]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-center"
            >
              <h1 className="bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text font-display text-2xl font-semibold tracking-[0.3em] text-transparent">
                ASTRIVEX
              </h1>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-accent/80">
                Inicializando infraestructura digital
              </p>
            </motion.div>

            <div className="relative h-[3px] w-64 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="absolute inset-0 origin-left bg-gradient-to-r from-white via-accent to-primary-glow"
                animate={{ scaleX: progress }}
                transition={{ duration: progress === 1 ? 0.24 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{ boxShadow: "0 0 18px hsl(199 89% 60% / 0.75)" }}
              />
            </div>
            <div className="-mt-6 font-mono text-[10px] tracking-[0.3em] text-white/45">
              {String(Math.round(progress * 100)).padStart(3, "0")}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
