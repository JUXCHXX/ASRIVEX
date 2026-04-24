import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Instagram,
  Github,
  Mail,
  Phone,
  X,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

type Channel = {
  id: string;
  label: string;
  sublabel: string;
  icon: typeof Mail;
  type: "redirect" | "modal";
  href?: string;
  data?: { label: string; value: string; copyable?: boolean }[];
};

const channels: Channel[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    sublabel: "Respuesta directa · 24h",
    icon: MessageCircle,
    type: "redirect",
    href: "https://wa.me/?text=Hola%20ASTRIVEX%2C%20me%20gustar%C3%ADa%20coordinar%20una%20llamada%20estrat%C3%A9gica.",
  },
  {
    id: "instagram",
    label: "Instagram",
    sublabel: "@astrivex",
    icon: Instagram,
    type: "redirect",
    href: "https://instagram.com/",
  },
  {
    id: "gh-florian",
    label: "GitHub — DevFlorian",
    sublabel: "Juan Florian · Lead Software Architect",
    icon: Github,
    type: "redirect",
    href: "https://github.com/DevFlorian",
  },
  {
    id: "gh-maldonado",
    label: "GitHub — DevMaldonado",
    sublabel: "Nicolas Maldonado · Lead Developer",
    icon: Github,
    type: "redirect",
    href: "https://github.com/DevMaldonado",
  },
  {
    id: "email",
    label: "Correo Corporativo",
    sublabel: "Para propuestas y briefings",
    icon: Mail,
    type: "modal",
    data: [{ label: "Email", value: "contacto@astrivex.dev", copyable: true }],
  },
  {
    id: "phone",
    label: "Teléfono Corporativo",
    sublabel: "Atención ejecutiva",
    icon: Phone,
    type: "modal",
    data: [{ label: "Teléfono", value: "+57 300 000 0000", copyable: true }],
  },
];

const CopyValue = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-accent/50 hover:text-accent"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copiado" : "Copiar"}
    </button>
  );
};

const Contact = () => {
  const [active, setActive] = useState<Channel | null>(null);

  const handleClick = (c: Channel) => {
    if (c.type === "redirect" && c.href) {
      window.open(c.href, "_blank", "noopener,noreferrer");
    } else {
      setActive(c);
    }
  };

  return (
    <section id="contacto" className="relative py-28 md:py-36">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            <span className="h-px w-8 bg-accent" />
            04 / Contacto
            <span className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Conectemos <span className="text-gradient-accent">estratégicamente</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Escoge el canal que prefieras. Información sensible protegida hasta
            la interacción.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {channels.map((c, i) => (
            <motion.button
              key={c.id}
              onClick={() => handleClick(c)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              data-cursor="hover"
              className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-border bg-gradient-card p-5 text-left backdrop-blur-md transition-all duration-500 hover:border-accent/40 hover:shadow-glow"
            >
              <div className="pointer-events-none absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-accent/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-background/60 text-foreground transition-all duration-500 group-hover:border-accent/60 group-hover:text-accent group-hover:shadow-glow">
                <c.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div className="relative flex-1">
                <div className="font-display text-base font-semibold">{c.label}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">{c.sublabel}</div>
              </div>
              <ExternalLink className="relative h-4 w-4 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-space-deep/70 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-accent/30 bg-space-mid/90 p-8 text-white shadow-glow-strong"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.06] text-accent">
                  <active.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    Contacto
                  </div>
                  <h3 className="font-display text-xl font-semibold">{active.label}</h3>
                </div>
              </div>

              <div className="relative mt-6 space-y-3">
                {active.data?.map((d) => (
                  <div
                    key={d.label}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                        {d.label}
                      </div>
                      <div className="mt-0.5 text-sm text-white/90">{d.value}</div>
                    </div>
                    {d.copyable && <CopyValue value={d.value} />}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
