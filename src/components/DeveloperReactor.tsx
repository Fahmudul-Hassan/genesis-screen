import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Line, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Code2, Database, Server, FileCode, Boxes, GitBranch, Container, Cloud, Figma, Palette, Layers, Lock, CreditCard } from "lucide-react";

const techIcons: Record<string, any> = {
  "React": Code2,
  "Next.js": Code2,
  "TypeScript": FileCode,
  "Tailwind": Palette,
  "JavaScript": Code2,
  "Redux": Layers,
  "Shadcn UI": Boxes,
  "MUI": Boxes,
  "Node.js": Server,
  "Express": Server,
  "PostgreSQL": Database,
  "MongoDB": Database,
  "Prisma": Database,
  "Python": FileCode,
  "Git": GitBranch,
  "Docker": Container,
  "Vercel": Cloud,
  "Firebase": Cloud,
  "NextAuth": Lock,
  "Stripe": CreditCard,
  "Figma": Figma,
};

const skillLayers = {
  Frontend: {
    skills: [
      { name: "React", size: 1.2 },
      { name: "Next.js", size: 1.2 },
      { name: "TypeScript", size: 1.1 },
      { name: "Tailwind", size: 1.0 },
      { name: "JavaScript", size: 1.1 },
      { name: "Redux", size: 0.9 },
      { name: "Shadcn UI", size: 0.8 },
      { name: "MUI", size: 0.8 },
    ],
    color: "#06b6d4",
    radius: 3,
  },
  Backend: {
    skills: [
      { name: "Node.js", size: 1.1 },
      { name: "Express", size: 0.9 },
      { name: "PostgreSQL", size: 1.0 },
      { name: "MongoDB", size: 1.0 },
      { name: "Prisma", size: 0.9 },
      { name: "Python", size: 1.0 },
    ],
    color: "#ec4899",
    radius: 4.5,
  },
  Tools: {
    skills: [
      { name: "Git", size: 1.0 },
      { name: "Docker", size: 1.0 },
      { name: "Vercel", size: 0.9 },
      { name: "Firebase", size: 0.9 },
      { name: "NextAuth", size: 0.8 },
      { name: "Stripe", size: 0.8 },
      { name: "Figma", size: 0.8 },
    ],
    color: "#8b5cf6",
    radius: 6,
  },
};

// Reactor Core
const ReactorCore = ({ onHover }: { onHover: (skill: string | null) => void }) => {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Sphere ref={coreRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={1.5}
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.9}
      />
    </Sphere>
  );
};

// Orbiting Skill Icons
const OrbitingSkill = ({
  skill,
  angle,
  radius,
  color,
  size,
  onHover,
}: {
  skill: string;
  angle: number;
  radius: number;
  color: string;
  size: number;
  onHover: (skill: string | null) => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const IconComponent = techIcons[skill] || Code2;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() * 0.3;
      groupRef.current.position.x = Math.cos(t + angle) * radius;
      groupRef.current.position.z = Math.sin(t + angle) * radius;
      // Bobbing animation
      groupRef.current.position.y = Math.sin(t * 2 + angle) * 0.4;
      // Tilt and rotate
      groupRef.current.rotation.y = t + angle;
      groupRef.current.rotation.x = Math.sin(t) * 0.2;
      groupRef.current.rotation.z = Math.cos(t * 0.5) * 0.1;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => {
        setHovered(true);
        onHover(skill);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      <Html center distanceFactor={8}>
        <div
          className="relative flex items-center justify-center transition-all duration-300"
          style={{
            width: hovered ? `${size * 70}px` : `${size * 50}px`,
            height: hovered ? `${size * 70}px` : `${size * 50}px`,
          }}
        >
          {/* Glow background */}
          <div
            className="absolute inset-0 rounded-xl blur-xl transition-all duration-300"
            style={{
              backgroundColor: color,
              opacity: hovered ? 0.8 : 0.4,
              transform: hovered ? 'scale(1.3)' : 'scale(1)',
            }}
          />
          {/* Icon container */}
          <div
            className="relative flex items-center justify-center rounded-xl transition-all duration-300 backdrop-blur-sm"
            style={{
              backgroundColor: `${color}20`,
              border: `2px solid ${color}`,
              width: '100%',
              height: '100%',
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <IconComponent
              size={size * (hovered ? 32 : 24)}
              style={{ color }}
              strokeWidth={2.5}
            />
          </div>
        </div>
      </Html>
    </group>
  );
};

// Energy Streams
const EnergyStream = ({ start, end, color }: { start: THREE.Vector3; end: THREE.Vector3; color: string }) => {
  const points = [start, end];

  return (
    <Line
      points={[start.toArray(), end.toArray()]}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.4}
    />
  );
};

// 3D Scene Component
const ReactorScene = ({ hoveredSkill, setHoveredSkill }: { hoveredSkill: string | null; setHoveredSkill: (skill: string | null) => void }) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#06b6d4" />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ec4899" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#8b5cf6" />

      {/* Reactor Core */}
      <ReactorCore onHover={setHoveredSkill} />

      {/* Skill Layers */}
      {Object.entries(skillLayers).map(([layer, { skills, color, radius }]) =>
        skills.map((skillObj, index) => {
          const angle = (index / skills.length) * Math.PI * 2;
          return (
            <group key={`${layer}-${skillObj.name}`}>
              <OrbitingSkill
                skill={skillObj.name}
                angle={angle}
                radius={radius}
                color={color}
                size={skillObj.size}
                onHover={setHoveredSkill}
              />
              {/* Energy Stream from Core to Skill */}
              <EnergyStream
                start={new THREE.Vector3(0, 0, 0)}
                end={new THREE.Vector3(
                  Math.cos(angle) * radius,
                  0,
                  Math.sin(angle) * radius
                )}
                color={color}
              />
            </group>
          );
        })
      )}

      {/* Volumetric Light Particles */}
      <VolumetricParticles />
    </>
  );
};

// Volumetric Light Particles
const VolumetricParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(clock.getElapsedTime() + i) * 0.01;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const particleCount = 300;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const radius = 1 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#06b6d4"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const DeveloperReactor = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-background to-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-aurora glow-text-cyan">The Developer Reactor</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Hover over skills to see the energy flow • Core powers all layers
          </p>
        </motion.div>

        {/* 3D Reactor Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative h-[700px] w-full max-w-6xl mx-auto"
        >
          {/* Volumetric Light Rays Background */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] animate-glow-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[80px] animate-glow-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
            <ReactorScene hoveredSkill={hoveredSkill} setHoveredSkill={setHoveredSkill} />
          </Canvas>

          {/* Hovered Skill Display */}
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-card px-6 py-3 rounded-full"
            >
              <p className="text-lg font-semibold gradient-aurora">{hoveredSkill}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Layer Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          {Object.entries(skillLayers).map(([layer, { color }]) => (
            <div key={layer} className="flex items-center gap-3 glass-card px-4 py-2 rounded-full">
              <div
                className="w-3 h-3 rounded-full animate-glow-pulse"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 15px ${color}`,
                }}
              />
              <span className="text-sm font-medium text-foreground">{layer} Layer</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DeveloperReactor;
