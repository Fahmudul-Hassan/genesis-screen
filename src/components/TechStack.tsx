import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

const techStack = {
  Frontend: {
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Redux", "Tailwind CSS", "Shadcn UI", "MUI", "Ant Design"],
    color: "#06b6d4"
  },
  Backend: {
    skills: ["Node.js", "Express.js", "MongoDB", "Mongoose", "PostgreSQL", "Prisma"],
    color: "#ec4899"
  },
  Languages: {
    skills: ["Python", "C", "C++", "Java"],
    color: "#8b5cf6"
  },
  Tools: {
    skills: ["Git", "GitHub", "Figma", "Netlify", "Vercel", "Stripe", "Firebase", "NextAuth", "AppWrite"],
    color: "#10b981"
  },
};

// Skill Orb Component
const SkillOrb = ({ 
  position, 
  color, 
  skill, 
  category 
}: { 
  position: [number, number, number]; 
  color: string; 
  skill: string; 
  category: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(clock.getElapsedTime() + position[0]) * 0.001;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[hovered ? 0.25 : 0.18, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.5 : 0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
      {hovered && (
        <group>
          <mesh position={[0, 0.5, 0]}>
            <planeGeometry args={[1.5, 0.3]} />
            <meshBasicMaterial color="#000" opacity={0.8} transparent />
          </mesh>
        </group>
      )}
    </group>
  );
};

// 3D Galaxy Component
const TechGalaxy = () => {
  const allSkills = Object.entries(techStack).flatMap(([category, { skills, color }]) =>
    skills.map((skill) => ({ skill, category, color }))
  );

  // Create positions in a spherical galaxy pattern
  const positions = allSkills.map((_, index) => {
    const phi = Math.acos(-1 + (2 * index) / allSkills.length);
    const theta = Math.sqrt(allSkills.length * Math.PI) * phi;
    const radius = 3 + Math.random() * 1.5;
    
    return [
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi),
    ] as [number, number, number];
  });

  // Create connections between nearby orbs
  const connections: Array<{ start: [number, number, number]; end: [number, number, number] }> = [];
  positions.forEach((pos1, i) => {
    positions.slice(i + 1).forEach((pos2, j) => {
      const distance = Math.sqrt(
        Math.pow(pos1[0] - pos2[0], 2) +
        Math.pow(pos1[1] - pos2[1], 2) +
        Math.pow(pos1[2] - pos2[2], 2)
      );
      if (distance < 2.5 && Math.random() > 0.7) {
        connections.push({ start: pos1, end: pos2 });
      }
    });
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />

      {/* Render Skill Orbs */}
      {allSkills.map(({ skill, category, color }, index) => (
        <SkillOrb
          key={skill}
          position={positions[index]}
          color={color}
          skill={skill}
          category={category}
        />
      ))}

      {/* Render Connection Lines */}
      {connections.map((connection, index) => (
        <Line
          key={index}
          points={[connection.start, connection.end]}
          color="#06b6d4"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}

      {/* Rotating Particle Field */}
      <Particles />
    </>
  );
};

// Background Particles
const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const radius = 8 + Math.random() * 4;
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
      <pointsMaterial size={0.03} color="#06b6d4" transparent opacity={0.4} />
    </points>
  );
};

const TechStack = () => {
  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="gradient-aurora glow-text-cyan">My Developer Galaxy</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg">
            Drag to rotate • Hover to explore each technology
          </p>
        </motion.div>

        {/* 3D Interactive Galaxy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative h-[600px] w-full max-w-6xl mx-auto rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-sm rounded-2xl" />
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <TechGalaxy />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              minDistance={6}
              maxDistance={15}
            />
          </Canvas>

          {/* Glow Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          {Object.entries(techStack).map(([category, { color }]) => (
            <div key={category} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}`,
                }}
              />
              <span className="text-sm text-muted-foreground font-medium">{category}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
