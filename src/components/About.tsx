import { motion } from "framer-motion";
import { Code2, Zap, Brain, Trophy } from "lucide-react";

const skills = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Node.js", icon: "📗" },
  { name: "TypeScript", icon: "🔷" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Prisma", icon: "🔺" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Tailwind", icon: "🎨" },
];

const highlights = [
  { icon: Code2, title: "Full Stack Mastery", desc: "MERN/PERN specialist with TypeScript expertise" },
  { icon: Zap, title: "Performance First", desc: "Building fast, scalable, and efficient applications" },
  { icon: Brain, title: "Critical Thinker", desc: "Problem-solving with creative and analytical approach" },
  { icon: Trophy, title: "Wushu Black Belt", desc: "Discipline and dedication in every project" },
];

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Based in Dhaka, Bangladesh • Fluent in English & Bangla
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Skills Orbs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-96 flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              {skills.map((skill, index) => {
                const angle = (index / skills.length) * 2 * Math.PI;
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={skill.name}
                    className="absolute glass-card p-4 rounded-2xl shadow-lg hover:shadow-primary/50 smooth-transition cursor-pointer"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      y: {
                        duration: 2 + index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <div className="text-4xl">{skill.icon}</div>
                    <p className="text-xs mt-2 font-medium text-foreground">{skill.name}</p>
                  </motion.div>
                );
              })}
              
              {/* Center Glow */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 blur-3xl animate-glow-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Right: Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl hover:border-primary/50 smooth-transition group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 smooth-transition">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
