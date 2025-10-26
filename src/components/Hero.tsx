import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sphere } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import profileImage from "@/assets/profile.png";
import * as THREE from "three";

// Orbiting Tech Icons Component
const OrbitingIcon = ({ position, icon, speed }: { position: [number, number, number]; icon: string; speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * speed;
      meshRef.current.position.x = Math.cos(t) * position[0];
      meshRef.current.position.z = Math.sin(t) * position[0];
      meshRef.current.position.y = position[1] + Math.sin(t * 2) * 0.3;
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color={hovered ? "#00ffff" : "#0ea5e9"}
        emissive={hovered ? "#00ffff" : "#0ea5e9"}
        emissiveIntensity={hovered ? 2 : 0.5}
      />
    </mesh>
  );
};

// Animated Particles
const AnimatedParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
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
      <pointsMaterial size={0.05} color="#06b6d4" transparent opacity={0.6} />
    </points>
  );
};

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background with Stars and Orbiting Icons */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={0.5} />
          <AnimatedParticles />
          <OrbitingIcon position={[3, 0, 0]} icon="React" speed={0.3} />
          <OrbitingIcon position={[3.5, 0.5, 0]} icon="Next.js" speed={0.25} />
          <OrbitingIcon position={[4, -0.3, 0]} icon="Node.js" speed={0.35} />
          <OrbitingIcon position={[3.2, 0.8, 0]} icon="TypeScript" speed={0.28} />
          <OrbitingIcon position={[3.8, -0.6, 0]} icon="PostgreSQL" speed={0.32} />
        </Canvas>
      </div>

      {/* Deep Navy to Black Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/80 via-background/90 to-background z-0" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Layered 3D Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Name with 3D Layered Effect */}
            <div className="relative">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="gradient-aurora glow-text-cyan block">
                  Fahmudul Hassan
                </span>
                <span className="gradient-aurora glow-text-magenta block mt-2">
                  Siam
                </span>
              </motion.h1>
              
              {/* 3D Shadow Layers */}
              <div className="absolute top-1 left-1 text-5xl md:text-6xl lg:text-7xl font-bold opacity-20 blur-sm -z-10 text-primary">
                Fahmudul Hassan Siam
              </div>
            </div>

            {/* Subtitle with Staggered Animation */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.p
                className="text-xl md:text-2xl font-semibold text-foreground glow-text-cyan"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Full Stack Developer
              </motion.p>
              <motion.p
                className="text-lg md:text-xl text-primary/90"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                MERN / PERN | Web3 Enthusiast
              </motion.p>
              <motion.p
                className="text-base md:text-lg text-muted-foreground max-w-xl"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Turning complex ideas into elegant, scalable web experiences
              </motion.p>
            </motion.div>

            {/* CTA Button with Neon Pulse */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="relative overflow-hidden group"
                >
                  <span className="relative z-10">Explore My Work</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-50"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </Button>
              </motion.div>

              <Button
                variant="glass"
                size="lg"
                onClick={() => window.open("/resume.pdf", "_blank")}
              >
                <Download className="mr-2 h-5 w-5" />
                Resume
              </Button>

              <Button
                variant="glass"
                size="lg"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:text-primary smooth-transition"
                onClick={() => window.open("https://github.com/yourusername", "_blank")}
              >
                <Github className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:text-primary smooth-transition"
                onClick={() => window.open("https://linkedin.com/in/yourusername", "_blank")}
              >
                <Linkedin className="h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Holographic Floating Portrait with Parallax Tilt */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative flex items-center justify-center order-1 lg:order-2"
          >
            <motion.div
              className="relative group perspective-1000"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Orbiting Glow Rings */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "radial-gradient(circle, hsl(var(--cyber-cyan) / 0.3), transparent 70%)",
                  filter: "blur(40px)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Holographic Glass Card */}
              <motion.div
                className="relative holographic-card rounded-2xl p-1 overflow-hidden"
                whileHover={{ scale: 1.02, z: 50 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Shimmer Effect Overlay */}
                <div className="absolute inset-0 shimmer-effect pointer-events-none z-10" />

                {/* Holographic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 pointer-events-none z-10 mix-blend-overlay" />

                {/* Profile Image */}
                <motion.img
                  src={profileImage}
                  alt="Fahmudul Hassan Siam - Full Stack Developer"
                  className="relative w-full max-w-md rounded-xl z-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Animated Neon Border */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, transparent, hsl(var(--cyber-cyan)), transparent)",
                    opacity: 0.5,
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Floating Particles around Image */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-primary/60 blur-sm particle"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
