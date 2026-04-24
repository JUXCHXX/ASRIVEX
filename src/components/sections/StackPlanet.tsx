import { useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Tech {
  name: string;
  slug: string; // simple-icons slug
  color: string; // hex
  group: "Frontend" | "Backend" | "Automation" | "DevOps";
  description: string;
}

const TECHS: Tech[] = [
  // Frontend
  { name: "React", slug: "react", color: "61DAFB", group: "Frontend", description: "Construimos interfaces modernas, accesibles y altamente componibles, con foco en performance y mantenibilidad." },
  { name: "TypeScript", slug: "typescript", color: "3178C6", group: "Frontend", description: "Tipado estricto end-to-end para reducir errores en tiempo de ejecución y escalar bases de código sin fricción." },
  { name: "Tailwind", slug: "tailwindcss", color: "06B6D4", group: "Frontend", description: "Sistemas de diseño consistentes, atómicos y rápidos de iterar a través de tokens semánticos." },
  { name: "Vite", slug: "vite", color: "646CFF", group: "Frontend", description: "Tooling moderno con HMR instantáneo y builds optimizados para producción." },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E", group: "Frontend", description: "Lenguaje base de la web — utilizado con criterio donde TypeScript no es viable." },

  // Backend
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E", group: "Backend", description: "Servicios asíncronos de alto throughput, APIs REST/GraphQL y workers para tareas en segundo plano." },
  { name: "Express", slug: "express", color: "E5E7EB", group: "Backend", description: "Capa HTTP minimalista para microservicios, middlewares y APIs con baja latencia." },
  { name: "Python", slug: "python", color: "3776AB", group: "Backend", description: "Procesamiento de datos, scripting de operaciones y servicios de IA con ecosistema maduro." },
  { name: "FastAPI", slug: "fastapi", color: "009688", group: "Backend", description: "APIs Python tipadas, ultra rápidas, con documentación OpenAPI generada automáticamente." },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1", group: "Backend", description: "Base de datos relacional robusta para modelos de datos transaccionales y consultas complejas." },

  // Automation
  { name: "n8n", slug: "n8n", color: "EA4B71", group: "Automation", description: "Orquestación visual de flujos de automatización entre sistemas, APIs y bases de datos." },
  { name: "Claude", slug: "anthropic", color: "D97757", group: "Automation", description: "LLMs de razonamiento profundo para flujos críticos donde la calidad del output es prioritaria." },
  { name: "Airtable", slug: "airtable", color: "FCB400", group: "Automation", description: "Bases de datos colaborativas conectadas a flujos automatizados y dashboards operativos." },
  { name: "Telegram", slug: "telegram", color: "26A5E4", group: "Automation", description: "Bots conversacionales para notificaciones, comandos operativos y soporte interno." },

  // DevOps
  { name: "Git", slug: "git", color: "F05032", group: "DevOps", description: "Control de versiones distribuido, base de todo flujo de desarrollo profesional." },
  { name: "GitHub", slug: "github", color: "E5E7EB", group: "DevOps", description: "Control de versiones, CI/CD y revisión de código como columna vertebral del flujo de entrega." },
  { name: "Docker", slug: "docker", color: "2496ED", group: "DevOps", description: "Contenerización de servicios para entornos reproducibles y despliegues consistentes." },
  { name: "Linux", slug: "linux", color: "FCC624", group: "DevOps", description: "Sistemas operativos servidor, scripting y administración de infraestructura crítica." },
];

interface OrbitItemProps {
  tech: Tech;
  radius: number;
  speed: number;
  phase: number;
  inclination: number;
  paused: boolean;
  onSelect: (t: Tech) => void;
  selected: boolean;
}

function OrbitItem({ tech, radius, speed, phase, inclination, paused, onSelect, selected }: OrbitItemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);
  const angleRef = useRef(phase);

  useFrame((_, delta) => {
    if (!paused) angleRef.current += delta * speed;
    const a = angleRef.current;
    const x = Math.cos(a) * radius;
    const z = Math.sin(a) * radius;
    const y = Math.sin(a * 0.7) * inclination;
    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
      groupRef.current.lookAt(0, 0, 0);
      groupRef.current.rotateY(Math.PI);
    }
  });

  const lift = selected ? 1.35 : hover ? 1.18 : 1;

  return (
    <group ref={groupRef}>
      <Html center distanceFactor={8} zIndexRange={[10, 0]} occlude={false}>
        <button
          data-cursor="hover"
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onClick={() => onSelect(tech)}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md transition-all duration-300"
          style={{
            transform: `scale(${lift})`,
            boxShadow:
              hover || selected
                ? `0 0 30px hsl(199 89% 60% / 0.7), 0 0 60px hsl(199 89% 60% / 0.35)`
                : `0 0 12px hsl(199 89% 60% / 0.18)`,
            borderColor: hover || selected ? "hsl(199 89% 60% / 0.7)" : undefined,
          }}
          aria-label={tech.name}
        >
          <img
            src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
            alt={tech.name}
            className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            draggable={false}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </button>
      </Html>
    </group>
  );
}

function Planet() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.08;
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.05;
      wireRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group>
      {/* Solid core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#0b1226"
          metalness={0.6}
          roughness={0.35}
          emissive="#0a1a3a"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Neural-net wireframe overlay */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.55, 3]} />
        <meshBasicMaterial
          color="#0EA5E9"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>
      {/* Atmospheric halo */}
      <mesh>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial color="#0EA5E9" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

function OrbitRings() {
  const rings = [2.6, 3.4, 4.2, 5.0];
  return (
    <>
      {rings.map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.005, r + 0.005, 128]} />
          <meshBasicMaterial color="#0EA5E9" transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  );
}

const StackPlanet = () => {
  const [selected, setSelected] = useState<Tech | null>(null);

  const orbits = useMemo(() => {
    const radii = [2.6, 3.4, 4.2, 5.0];
    return TECHS.map((t, i) => {
      const ringIdx = i % radii.length;
      return {
        tech: t,
        radius: radii[ringIdx],
        speed: 0.12 + (ringIdx % 2 ? 0.05 : 0.02) * (i % 3 === 0 ? 1 : -1),
        phase: (i / TECHS.length) * Math.PI * 2 + ringIdx * 0.6,
        inclination: 0.25 + ringIdx * 0.12,
      };
    });
  }, []);

  return (
    <section
      id="stack"
      className="relative overflow-hidden bg-space-deep py-28 text-white md:py-36"
    >
      {/* Bg glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
              <span className="h-px w-8 bg-accent" />
              02 / Stack tecnológico
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Un núcleo. <span className="text-gradient-accent">Múltiples órbitas</span>
              <br /> de tecnología.
            </h2>
          </div>
          <p className="max-w-md text-white/60">
            Arrastra para rotar, haz zoom y selecciona cualquier tecnología
            para conocer cómo la integramos en proyectos reales.
          </p>
        </div>

        <div className="relative h-[640px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_center,_hsl(222_47%_10%),_hsl(224_71%_4%))]">
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 2.5, 9], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <ambientLight intensity={0.35} />
              <pointLight position={[10, 10, 10]} intensity={1.2} color="#0EA5E9" />
              <pointLight position={[-10, -5, -10]} intensity={0.8} color="#1E3A8A" />
              <directionalLight position={[5, 5, 5]} intensity={0.5} />

              <Stars
                radius={60}
                depth={30}
                count={2500}
                factor={2}
                saturation={0}
                fade
                speed={0.5}
              />
              <Planet />
              <OrbitRings />

              {orbits.map((o) => (
                <OrbitItem
                  key={o.tech.name}
                  tech={o.tech}
                  radius={o.radius}
                  speed={o.speed}
                  phase={o.phase}
                  inclination={o.inclination}
                  paused={!!selected}
                  selected={selected?.name === o.tech.name}
                  onSelect={setSelected}
                />
              ))}

              <OrbitControls
                enablePan={false}
                enableZoom
                minDistance={6}
                maxDistance={14}
                autoRotate={!selected}
                autoRotateSpeed={0.4}
                enableDamping
                dampingFactor={0.08}
              />

              <EffectComposer>
                <Bloom intensity={0.6} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
              </EffectComposer>
            </Canvas>
          </Suspense>

          {/* Hint overlay */}
          <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            <span>Drag · Zoom · Click</span>
            <span>{TECHS.length} tecnologías</span>
          </div>
        </div>

        {/* Group legend */}
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {(["Frontend", "Backend", "Automation", "DevOps"] as const).map((g) => (
            <div
              key={g}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-md"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                {g}
              </div>
              <div className="mt-1 text-sm text-white/70">
                {TECHS.filter((t) => t.group === g).length} stacks integrados
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-space-deep/70 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-accent/30 bg-space-mid/90 p-8 text-white shadow-glow-strong"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.06] backdrop-blur-md">
                  <img
                    src={`https://cdn.simpleicons.org/${selected.slug}/${selected.color}`}
                    alt={selected.name}
                    className="h-9 w-9"
                  />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    {selected.group}
                  </div>
                  <h3 className="font-display text-2xl font-semibold">{selected.name}</h3>
                </div>
              </div>

              <p className="relative mt-6 text-sm leading-relaxed text-white/75">
                {selected.description}
              </p>

              <div className="relative mt-8 flex items-center justify-between border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                <span>Aplicación en producción</span>
                <span className="text-accent">// astrivex.core</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default StackPlanet;
