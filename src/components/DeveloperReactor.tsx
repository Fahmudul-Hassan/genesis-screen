import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

const techStack = [
  // Inner orbit - Primary stack (large)
  { name: 'React', color: '#61DAFB', orbit: 'inner', size: 'large', icon: 'react' },
  { name: 'Next.js', color: '#000000', orbit: 'inner', size: 'large', icon: 'nextdotjs' },
  { name: 'TypeScript', color: '#3178C6', orbit: 'inner', size: 'large', icon: 'typescript' },
  { name: 'Node.js', color: '#339933', orbit: 'inner', size: 'large', icon: 'nodedotjs' },
  { name: 'PostgreSQL', color: '#4169E1', orbit: 'inner', size: 'large', icon: 'postgresql' },
  { name: 'MongoDB', color: '#47A248', orbit: 'inner', size: 'medium', icon: 'mongodb' },
  
  // Middle orbit - Secondary stack (medium)
  { name: 'Tailwind CSS', color: '#06B6D4', orbit: 'middle', size: 'medium', icon: 'tailwindcss' },
  { name: 'Redux', color: '#764ABC', orbit: 'middle', size: 'medium', icon: 'redux' },
  { name: 'Express.js', color: '#000000', orbit: 'middle', size: 'medium', icon: 'express' },
  { name: 'Prisma', color: '#2D3748', orbit: 'middle', size: 'medium', icon: 'prisma' },
  { name: 'Git', color: '#F05032', orbit: 'middle', size: 'medium', icon: 'git' },
  { name: 'Vercel', color: '#000000', orbit: 'middle', size: 'medium', icon: 'vercel' },
  { name: 'Shadcn UI', color: '#000000', orbit: 'middle', size: 'medium', icon: 'shadcnui' },
  
  // Outer orbit - Additional technologies (small)
  { name: 'HTML5', color: '#E34F26', orbit: 'outer', size: 'small', icon: 'html5' },
  { name: 'CSS3', color: '#1572B6', orbit: 'outer', size: 'small', icon: 'css3' },
  { name: 'JavaScript', color: '#F7DF1E', orbit: 'outer', size: 'small', icon: 'javascript' },
  { name: 'Python', color: '#3776AB', orbit: 'outer', size: 'small', icon: 'python' },
  { name: 'C++', color: '#00599C', orbit: 'outer', size: 'small', icon: 'cplusplus' },
  { name: 'C', color: '#A8B9CC', orbit: 'outer', size: 'small', icon: 'c' },
  { name: 'Java', color: '#007396', orbit: 'outer', size: 'small', icon: 'openjdk' },
  { name: 'Firebase', color: '#FFCA28', orbit: 'outer', size: 'small', icon: 'firebase' },
  { name: 'Stripe', color: '#635BFF', orbit: 'outer', size: 'small', icon: 'stripe' },
  { name: 'Figma', color: '#F24E1E', orbit: 'outer', size: 'small', icon: 'figma' },
  { name: 'GitHub', color: '#181717', orbit: 'outer', size: 'small', icon: 'github' },
  { name: 'MUI', color: '#007FFF', orbit: 'outer', size: 'small', icon: 'mui' },
  { name: 'Ant Design', color: '#0170FE', orbit: 'outer', size: 'small', icon: 'antdesign' },
  { name: 'Mongoose', color: '#880000', orbit: 'outer', size: 'small', icon: 'mongoose' },
  { name: 'NextAuth.js', color: '#000000', orbit: 'outer', size: 'small', icon: 'nextdotjs' },
  { name: 'Appwrite', color: '#FD366E', orbit: 'outer', size: 'small', icon: 'appwrite' },
  { name: 'Netlify', color: '#00C7B7', orbit: 'outer', size: 'small', icon: 'netlify' },
];

const orbitConfig = {
  inner: { radius: 3, speed: 0.3 },
  middle: { radius: 4.5, speed: 0.2 },
  outer: { radius: 6, speed: 0.15 },
};

const sizeConfig = {
  large: { base: 70, hover: 90 },
  medium: { base: 55, hover: 70 },
  small: { base: 45, hover: 60 },
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

// Orbiting Tech Logo
const OrbitingLogo = ({
  tech,
  angle,
  index,
  onHover,
}: {
  tech: typeof techStack[0];
  angle: number;
  index: number;
  onHover: (skill: string | null) => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  const { radius, speed } = orbitConfig[tech.orbit as keyof typeof orbitConfig];
  const { base, hover } = sizeConfig[tech.size as keyof typeof sizeConfig];

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() * speed;
      // Orbital motion
      groupRef.current.position.x = Math.cos(t + angle) * radius;
      groupRef.current.position.z = Math.sin(t + angle) * radius;
      // Floating/bobbing animation
      groupRef.current.position.y = Math.sin(t * 2 + angle + index) * 0.3;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => {
        setHovered(true);
        onHover(tech.name);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      <Html center distanceFactor={8}>
        <div
          className="relative flex items-center justify-center transition-all duration-500"
          style={{
            width: hovered ? `${hover}px` : `${base}px`,
            height: hovered ? `${hover}px` : `${base}px`,
            perspective: '1200px',
          }}
        >
          {/* Multi-layered glow effect */}
          <div
            className="absolute inset-0 rounded-2xl blur-2xl transition-all duration-500"
            style={{
              backgroundColor: tech.color,
              opacity: hovered ? 0.9 : 0.5,
              transform: hovered ? 'scale(1.5)' : 'scale(1.1)',
              boxShadow: `0 0 ${hovered ? '60px' : '30px'} ${tech.color}, 0 0 ${hovered ? '90px' : '45px'} ${tech.color}`,
            }}
          />
          <div
            className="absolute inset-0 rounded-2xl blur-xl transition-all duration-500"
            style={{
              backgroundColor: tech.color,
              opacity: hovered ? 0.7 : 0.3,
              transform: hovered ? 'scale(1.3)' : 'scale(1)',
            }}
          />
          
          {/* 3D Logo container with depth */}
          <div
            className="relative flex items-center justify-center rounded-2xl transition-all duration-500 backdrop-blur-md"
            style={{
              backgroundColor: tech.color === '#000000' ? '#ffffff15' : `${tech.color}20`,
              border: `2px solid ${tech.color}`,
              width: '100%',
              height: '100%',
              transform: hovered 
                ? 'perspective(1200px) rotateY(15deg) rotateX(10deg) translateZ(30px) scale(1.15)' 
                : 'perspective(1200px) rotateY(5deg) rotateX(5deg) translateZ(0px) scale(1)',
              boxShadow: hovered 
                ? `0 10px 40px ${tech.color}80, inset 0 0 20px ${tech.color}30`
                : `0 5px 20px ${tech.color}60, inset 0 0 10px ${tech.color}20`,
              background: `linear-gradient(135deg, ${tech.color}25, ${tech.color}10)`,
            }}
          >
            {/* Shine/glass effect overlay */}
            <div
              className="absolute inset-0 rounded-2xl opacity-30 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                opacity: hovered ? 0.6 : 0.3,
              }}
            />
            
            {/* Logo from Simple Icons CDN */}
            <img
              src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color.replace('#', '')}`}
              alt={tech.name}
              className="relative z-10 transition-all duration-500"
              style={{
                width: hovered ? '60%' : '55%',
                height: hovered ? '60%' : '55%',
                filter: `drop-shadow(0 0 ${hovered ? '15px' : '8px'} ${tech.color})`,
                animation: 'float 3s ease-in-out infinite, rotate-slow 20s linear infinite',
              }}
            />
          </div>
          
          {/* Glassmorphism Tooltip */}
          {hovered && (
            <div
              className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none animate-in fade-in-0 zoom-in-95 duration-200"
            >
              <div
                className="relative px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap backdrop-blur-md"
                style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${tech.color}80`,
                  boxShadow: `0 4px 12px ${tech.color}50, 0 0 20px ${tech.color}30`,
                  color: '#ffffff',
                }}
              >
                {tech.name}
                {/* Arrow pointer */}
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                  style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    borderRight: `1px solid ${tech.color}80`,
                    borderBottom: `1px solid ${tech.color}80`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Html>
    </group>
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

      {/* Technology Logos in Orbits */}
      {techStack.map((tech, index) => {
        const orbitTechs = techStack.filter(t => t.orbit === tech.orbit);
        const orbitIndex = orbitTechs.findIndex(t => t.name === tech.name);
        const angle = (orbitIndex / orbitTechs.length) * Math.PI * 2;
        
        return (
          <OrbitingLogo
            key={tech.name}
            tech={tech}
            angle={angle}
            index={index}
            onHover={setHoveredSkill}
          />
        );
      })}

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

        {/* Orbit Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full">
            <div
              className="w-3 h-3 rounded-full animate-glow-pulse"
              style={{
                backgroundColor: '#61DAFB',
                boxShadow: '0 0 15px #61DAFB',
              }}
            />
            <span className="text-sm font-medium text-foreground">Inner Orbit - Core Stack</span>
          </div>
          <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full">
            <div
              className="w-3 h-3 rounded-full animate-glow-pulse"
              style={{
                backgroundColor: '#06B6D4',
                boxShadow: '0 0 15px #06B6D4',
              }}
            />
            <span className="text-sm font-medium text-foreground">Middle Orbit - Framework & Tools</span>
          </div>
          <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full">
            <div
              className="w-3 h-3 rounded-full animate-glow-pulse"
              style={{
                backgroundColor: '#8b5cf6',
                boxShadow: '0 0 15px #8b5cf6',
              }}
            />
            <span className="text-sm font-medium text-foreground">Outer Orbit - Languages & Services</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeveloperReactor;
