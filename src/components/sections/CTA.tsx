import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-space-deep py-28 text-white md:py-36">
      {/* bg layers */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_hsl(224_64%_33%/0.5),_transparent_60%)]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-accent/30 blur-3xl" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-accent backdrop-blur-md">
            Próximo paso
          </div>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            ¿Listo para escalar tu
            <br />
            <span className="text-gradient-bright">infraestructura digital?</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-white/60">
            Una llamada de 30 minutos. Sin compromiso. Diagnóstico técnico
            ejecutivo y próximos pasos accionables.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contacto"
              data-cursor="hover"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-space-deep transition-all hover:shadow-glow-strong"
            >
              <span className="relative z-10">Reservar llamada estratégica</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent to-primary-glow transition-transform duration-500 group-hover:translate-x-0" />
              <span className="absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:[--tw-text-opacity:1] group-hover:text-white" />
            </a>
            <a
              href="#stack"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:border-accent/60 hover:text-white"
            >
              Ver capacidades técnicas
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
