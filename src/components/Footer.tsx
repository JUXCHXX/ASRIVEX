import Logo from "./Logo";
import { Github, Instagram, MessageCircle, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-background py-16">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <Logo size={28} />
              <span className="font-display text-sm font-semibold tracking-[0.28em]">
                ASTRIVEX
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">
              Software · Automatización · Innovación. Firma de ingeniería
              tecnológica para empresas que buscan escalar con criterio.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Navegación
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="#servicios" className="text-foreground/80 hover:text-accent">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#equipo" className="text-foreground/80 hover:text-accent">
                  Equipo
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-foreground/80 hover:text-accent">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Redes
            </div>
            <div className="mt-5 flex items-center gap-3">
              {[
                { i: MessageCircle, l: "WhatsApp", h: "#contacto" },
                { i: Instagram, l: "Instagram", h: "#contacto" },
                { i: Github, l: "GitHub", h: "#contacto" },
                { i: Mail, l: "Email", h: "#contacto" },
              ].map((s) => (
                <a
                  key={s.l}
                  href={s.h}
                  aria-label={s.l}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent hover:shadow-glow"
                >
                  <s.i className="h-4 w-4" strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} ASTRIVEX. Todos los derechos reservados.</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Sistemas operativos · Estatus nominal
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
