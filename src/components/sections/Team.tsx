import { motion } from "framer-motion";
import { Github, ArrowUpRight, Sparkles } from "lucide-react";

const team = [
  {
    name: "Juan Florian",
    role: "Lead Software Architect",
    initials: "JF",
    tagline: "Arquitectura backend y sistemas de alto rendimiento",
    skills: [
      "Arquitectura backend",
      "Sistemas escalables",
      "Ingeniería estructural",
      "Optimización & rendimiento",
      "Enfoque estratégico",
    ],
    handle: "DevFlorian",
    accent: "199 89% 60%",
  },
  {
    name: "Nicolas Maldonado",
    role: "Lead Developer",
    initials: "NM",
    tagline: "Full-stack, integración de sistemas y automatización avanzada",
    skills: [
      "Desarrollo full-stack",
      "Infraestructura moderna",
      "Integración de sistemas",
      "Optimización de procesos",
      "Automatización avanzada",
    ],
    handle: "DevMaldonado",
    accent: "217 91% 65%",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const Team = () => {
  return (
    <section id="equipo" className="relative py-28 md:py-36">
      {/* Decorative bg */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
              className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent"
            >
              <span className="h-px w-8 bg-accent" />
              03 / Equipo
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl"
            >
              Dos perfiles. <span className="text-gradient-accent">Una práctica</span>
              <br />de ingeniería.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="max-w-md text-foreground/75"
          >
            Trabajamos directo, sin capas de gestión innecesarias. Cada
            decisión técnica está respaldada por experiencia operativa real.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {team.map((p, idx) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: idx * 0.15, ease }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-card p-8 backdrop-blur-md transition-all duration-500 hover:border-accent/40 hover:shadow-elegant md:p-10"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-accent/15 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

              {/* Animated portrait */}
              <div className="absolute right-6 top-6 h-32 w-32 md:h-40 md:w-40">
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/15 blur-2xl" />
                  <div className="relative flex h-full w-full items-center justify-center rounded-full border border-border/70 bg-background/60 backdrop-blur-md">
                    {/* Rotating concentric rings */}
                    <motion.svg
                      className="absolute inset-0 h-full w-full"
                      viewBox="0 0 100 100"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                      <defs>
                        <linearGradient id={`g-${p.initials}`} x1="0" x2="1" y1="0" y2="1">
                          <stop offset="0%" stopColor={`hsl(${p.accent})`} stopOpacity="0.7" />
                          <stop offset="100%" stopColor="hsl(217 91% 60%)" stopOpacity="0.15" />
                        </linearGradient>
                      </defs>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <circle
                          key={i}
                          cx="50"
                          cy="50"
                          r={20 + i * 5}
                          stroke={`url(#g-${p.initials})`}
                          strokeWidth="0.4"
                          fill="none"
                          strokeDasharray={i % 2 ? "2 4" : "none"}
                        />
                      ))}
                    </motion.svg>

                    {/* Counter-rotating orbital dot */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    >
                      <span
                        className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full"
                        style={{
                          background: `hsl(${p.accent})`,
                          boxShadow: `0 0 12px hsl(${p.accent} / 0.8)`,
                        }}
                      />
                    </motion.div>

                    <motion.span
                      className="font-display text-2xl font-semibold tracking-wider text-foreground/85"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {p.initials}
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Header */}
              <div className="relative max-w-[60%]">
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  <Sparkles className="h-3 w-3" />
                  {p.role}
                </div>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {p.tagline}
                </p>
              </div>

              {/* Skills with stagger */}
              <motion.ul
                className="relative mt-10 space-y-2.5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 + idx * 0.15 } },
                }}
              >
                {p.skills.map((s) => (
                  <motion.li
                    key={s}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
                    }}
                    className="flex items-center gap-3 text-sm text-foreground/80"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                      style={{ boxShadow: "0 0 8px hsl(var(--accent) / 0.6)" }}
                    />
                    {s}
                  </motion.li>
                ))}
              </motion.ul>

              {/* Footer */}
              <div className="relative mt-10 flex items-center justify-between border-t border-border/60 pt-6">
                <a
                  href={`https://github.com/${p.handle}`}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 text-sm text-foreground/65 transition-colors hover:text-accent"
                >
                  <Github className="h-4 w-4" />
                  <span className="font-mono">{p.handle}</span>
                </a>
                <a
                  href="#contacto"
                  data-cursor="hover"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-accent"
                >
                  Conectar <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
