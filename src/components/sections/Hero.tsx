import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

function CountUp({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // particle layer
  const particles = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = particles.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    let w = (cv.width = cv.offsetWidth * devicePixelRatio);
    let h = (cv.height = cv.offsetHeight * devicePixelRatio);
    const dots = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.4 + 0.3,
    }));
    let raf = 0;
    const onResize = () => {
      w = cv.width = cv.offsetWidth * devicePixelRatio;
      h = cv.height = cv.offsetHeight * devicePixelRatio;
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.fillStyle = "hsla(199, 89%, 60%, 0.55)";
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32"
    >
      {/* Layer 1: gradient bg */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 -z-30 bg-gradient-hero"
      />
      {/* Layer 2: grid */}
      <motion.div style={{ y: yMid }} className="absolute inset-0 -z-20 grid-bg opacity-60" />
      {/* Layer 3: particles */}
      <canvas ref={particles} className="absolute inset-0 -z-10 h-full w-full" />
      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent/15 blur-3xl" />

      <motion.div style={{ opacity }} className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="font-mono uppercase tracking-[0.18em]">
            Software · Automatización · Innovación
          </span>
        </motion.div>

        <h1 className="mx-auto max-w-5xl text-balance text-center font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
          <span className="text-gradient-hero">Arquitectura digital</span>
          <br />
          <span className="text-gradient-hero">para escalar </span>
          <span className="relative inline-block">
            <span className="text-gradient-accent">sin límites</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-gradient-accent"
            />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-balance text-center text-lg text-muted-foreground md:text-xl"
        >
          Diseñamos sistemas backend resilientes, automatizamos operaciones
          críticas y construimos infraestructura cloud lista para crecer al
          ritmo de tu negocio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background transition-all hover:bg-accent hover:shadow-glow-strong"
          >
            Reservar llamada estratégica
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#stack"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-7 py-4 text-sm font-medium backdrop-blur-md transition-colors hover:border-accent/40 hover:text-accent"
          >
            Explorar el stack
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-24 grid max-w-3xl grid-cols-3 divide-x divide-border/60 rounded-2xl border border-border/60 bg-background/60 backdrop-blur-md shadow-card"
        >
          {[
            { node: <CountUp to={99.9} suffix="%" decimals={1} />, v: "Uptime garantizado" },
            { node: <CountUp to={10} suffix="x" />, v: "Despliegues más rápidos" },
            { node: <span>24/7</span>, v: "Sistemas autónomos" },
          ].map((s, i) => (
            <div key={i} className="px-4 py-6 text-center">
              <div className="font-display text-2xl font-semibold text-foreground md:text-3xl [text-shadow:0_0_24px_hsl(var(--accent)/0.25)]">
                {s.node}
              </div>
              <div className="mt-1 text-xs text-foreground/70 md:text-sm">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
