import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Line } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

const skillLayers = {
  Frontend: {
    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
    color: "#06b6d4",
    radius: 3,
  },
  Backend: {
    skills: ["Node.js", "Express", "PostgreSQL", "Prisma"],
    color: "#ec4899",
    radius: 4.5,
  },
  Tools: {
    skills: ["Git", "Docker", "Vercel", "Firebase"],
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
  onHover,
}: {
  skill: string;
  angle: number;
  radius: number;
  color: string;
  onHover: (skill: string | null) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * 0.3;
      meshRef.current.position.x = Math.cos(t + angle) * radius;
      meshRef.current.position.z = Math.sin(t + angle) * radius;
      meshRef.current.position.y = Math.sin(t * 2) * 0.3;
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => {
        setHovered(true);
        onHover(skill);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      <boxGeometry args={hovered ? [0.35, 0.35, 0.35] : [0.25, 0.25, 0.25]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 2 : 0.8}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
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
        skills.map((skill, index) => {
          const angle = (index / skills.length) * Math.PI * 2;
          return (
            <group key={`${layer}-${skill}`}>
              <OrbitingSkill
                skill={skill}
                angle={angle}
                radius={radius}
                color={color}
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
