import { motion, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

const projects = [
  {
    title: "NordCom",
    description: "Full-stack e-commerce platform for electronics with advanced filtering, persistent cart, and smooth checkout experience.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "TypeScript", "Redux"],
    gradient: "from-cyan-500 via-blue-500 to-purple-600",
    live: "#",
    github: "#",
    size: "large",
  },
  {
    title: "Opinia",
    description: "Comprehensive review portal system with admin approval, voting, comments, and premium content via integrated payments.",
    tags: ["Next.js", "Express.js", "PostgreSQL", "Shadcn", "TypeScript"],
    gradient: "from-pink-500 via-purple-500 to-indigo-600",
    live: "#",
    github: "#",
    size: "medium",
  },
  {
    title: "Elevara Career Flow",
    description: "Web3 education demo showcasing career pathway simulation with verifiable credentials and decentralized identity.",
    tags: ["Web3", "Decentralized Identity", "Verifiable Credentials"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    live: "#",
    github: "#",
    size: "medium",
  },
  {
    title: "SkillProof Academy",
    description: "Educational platform with skill verification system, enabling learners to prove their capabilities through blockchain.",
    tags: ["Web3", "Education", "Blockchain", "Verification"],
    gradient: "from-orange-500 via-red-500 to-pink-600",
    live: "#",
    github: "#",
    size: "small",
  },
  {
    title: "Identity Harvest",
    description: "Decentralized digital identity ownership system empowering users with control over their personal data.",
    tags: ["Web3", "DID", "Privacy", "Decentralization"],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    live: "#",
    github: "#",
    size: "large",
  },
];

// Animated Blob Background
const AnimatedBlob = ({ index }: { index: number }) => {
  return (
    <motion.div
      className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl blob-morph"
      style={{
        background: `radial-gradient(circle, hsl(${180 + index * 40}, 90%, 60%), transparent)`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
      animate={{
        x: [0, Math.random() * 100 - 50, 0],
        y: [0, Math.random() * 100 - 50, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 15 + index * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Project Card Component
const ProjectCard = ({ 
  project, 
  index,
  adjacentHovered 
}: { 
  project: typeof projects[0]; 
  index: number;
  adjacentHovered: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  useEffect(() => {
    if (isHovered) {
      setShowParticles(true);
    } else {
      const timeout = setTimeout(() => setShowParticles(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [isHovered]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      className={`group relative ${
        project.size === "large" ? "md:col-span-2" : 
        project.size === "medium" ? "md:col-span-1" : 
        "md:col-span-1"
      }`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={adjacentHovered ? { x: 8, y: 8 } : { x: 0, y: 0 }}
      transition={adjacentHovered ? { type: "spring", stiffness: 300, damping: 20 } : { duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {/* Floating Particles on Hover */}
      {showParticles && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary pointer-events-none"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [-20, -60],
                x: [0, (Math.random() - 0.5) * 40],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      <motion.div
        className="relative h-full holographic-card rounded-2xl overflow-hidden cursor-pointer"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.03,
          z: 50,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Animated Gradient Mesh Background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 blur-2xl`}
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Scanlines Effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary)) 2px, hsl(var(--primary)) 4px)",
            }}
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* Chromatic Aberration on Entry */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-red-500/10 translate-x-1" />
          <div className="absolute inset-0 bg-cyan-500/10 -translate-x-1" />
        </motion.div>

        {/* Card Content */}
        <div className="relative z-10 p-8 h-full flex flex-col backdrop-blur-sm">
          {/* Shimmer on Hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 shimmer-effect"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}

          <motion.h3
            className="text-2xl md:text-3xl font-bold mb-3 gradient-aurora"
            animate={{
              textShadow: isHovered
                ? "0 0 20px hsl(var(--cyber-cyan) / 0.8)"
                : "0 0 0px hsl(var(--cyber-cyan) / 0)",
            }}
          >
            {project.title}
          </motion.h3>

          <p className="text-muted-foreground mb-6 flex-1 text-sm md:text-base">
            {project.description}
          </p>

          {/* Technology Tags with Glow Effect */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                className="px-3 py-1.5 text-xs rounded-full bg-muted/30 text-primary border border-primary/30 backdrop-blur-sm relative overflow-hidden group/tag"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                whileHover={{
                  scale: 1.1,
                  borderColor: "hsl(var(--primary))",
                  boxShadow: "0 0 15px hsl(var(--primary) / 0.5)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative z-10">{tag}</span>
              </motion.span>
            ))}
          </div>

          {/* Action Buttons with Liquid Ripple */}
          <div className="flex gap-3">
            <motion.div
              className="flex-1 relative overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="default"
                size="sm"
                className="w-full relative overflow-hidden group/btn"
                onClick={() => window.open(project.live, "_blank")}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover/btn:opacity-100"
                  whileHover={{ x: ["0%", "100%"] }}
                  transition={{ duration: 0.6 }}
                />
                <ExternalLink className="h-4 w-4 mr-2 relative z-10" />
                <span className="relative z-10">Live Demo</span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="relative overflow-hidden"
                onClick={() => window.open(project.github, "_blank")}
              >
                <Github className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Ambient Light Cast */}
        <motion.div
          className={`absolute -inset-4 bg-gradient-to-br ${project.gradient} opacity-0 blur-3xl pointer-events-none`}
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Animated Blob Backgrounds */}
      {[...Array(5)].map((_, i) => (
        <AnimatedBlob key={i} index={i} />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="gradient-aurora glow-text-cyan">Featured Projects</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg">
            Innovative solutions across Web2 and Web3 ecosystems
          </p>
        </motion.div>

        {/* Asymmetric Broken Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <ProjectCard
                project={project}
                index={index}
                adjacentHovered={
                  hoveredIndex !== null &&
                  hoveredIndex !== index &&
                  Math.abs(hoveredIndex - index) === 1
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
