import { motion } from "framer-motion";
import {
  Server,
  Network,
  Workflow,
  Plug,
  CloudCog,
} from "lucide-react";

const services = [
  {
    icon: Server,
    title: "Arquitectura Backend",
    desc: "Diseño de APIs, microservicios y capas de datos preparadas para alta concurrencia.",
    code: "// resilient by design",
  },
  {
    icon: Network,
    title: "Sistemas Distribuidos",
    desc: "Infraestructura cloud-native que crece con tu carga sin sacrificar latencia.",
    code: "// horizontal scaling",
  },
  {
    icon: Workflow,
    title: "Automatización Empresarial",
    desc: "Flujos críticos automatizados end-to-end con n8n, webhooks e IA aplicada.",
    code: "// zero-touch ops",
  },
  {
    icon: Plug,
    title: "Integración de APIs",
    desc: "Conectamos sistemas heterogéneos con contratos tipados, seguros y observables.",
    code: "// systems as one",
  },
  {
    icon: CloudCog,
    title: "Infraestructura Cloud & DevOps",
    desc: "CI/CD, observabilidad y contenerización para despliegues predecibles y rápidos.",
    code: "// ship with confidence",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const Services = () => {
  return (
    <section id="servicios" className="relative py-28 md:py-36">
      <div className="container">
        <div className="mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent"
          >
            <span className="h-px w-8 bg-accent" />
            01 / Capacidades
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl"
          >
            Ingeniería que <span className="text-gradient-accent">sostiene</span>
            <br /> tu producto a escala.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-6 max-w-2xl text-lg text-foreground/75"
          >
            Cinco disciplinas integradas en una única práctica. Sin
            intermediarios, sin fricción, con criterio técnico ejecutivo en
            cada decisión.
          </motion.p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease }}
          className="h-px w-full origin-left bg-gradient-to-r from-transparent via-border to-transparent"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-card p-7 backdrop-blur-md transition-all duration-500 hover:border-accent/40 hover:shadow-elegant"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background/60 text-accent transition-all group-hover:border-accent/60 group-hover:shadow-glow">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-foreground/50">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {s.desc}
                </p>
                <div className="mt-6 border-t border-border/60 pt-4 font-mono text-[11px] text-foreground/50">
                  {s.code}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
