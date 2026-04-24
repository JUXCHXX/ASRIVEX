import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
  monochrome?: boolean;
  animated?: boolean;
}

export const BRAND_LOGO_SRC = "/logo-astrivex.png";

const Logo = ({ className = "", size = 32, monochrome = false, animated = false }: LogoProps) => {
  const sharedProps = {
    src: BRAND_LOGO_SRC,
    alt: "",
    "aria-hidden": true,
    width: size,
    height: size,
    loading: animated ? "eager" : "lazy",
    decoding: "async" as const,
    draggable: false,
    className: cn(
      "select-none rounded-[22%] object-cover shadow-[0_10px_28px_hsl(224_71%_5%/0.2)]",
      className,
    ),
    style: monochrome
      ? {
          filter: "grayscale(1) brightness(1.18)",
        }
      : undefined,
  };

  if (animated) {
    return (
      <motion.img
        initial={{ opacity: 0, scale: 0.84, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        {...sharedProps}
      />
    );
  }

  return <img {...sharedProps} />;
};

export default Logo;
