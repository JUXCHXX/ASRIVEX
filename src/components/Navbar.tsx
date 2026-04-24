import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Stack", href: "#stack" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container">
        <div
          className={`flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 ${
            scrolled
              ? "border-border/70 bg-background/70 backdrop-blur-xl shadow-card"
              : "border-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <Logo size={28} />
            <span className="font-display text-sm font-semibold tracking-[0.28em]">
              ASTRIVEX
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contacto"
            className="hidden items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-glow md:inline-flex"
          >
            Hablemos
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-full p-2 md:hidden"
            aria-label="Menú"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex flex-col gap-1 rounded-2xl border border-border/70 bg-background/90 p-3 backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;
