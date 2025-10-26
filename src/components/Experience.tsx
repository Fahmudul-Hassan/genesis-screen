import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Software Engineering Intern",
    company: "Hovi",
    location: "Remote, Finland",
    period: "Recent",
    highlights: [
      "Built and deployed three Web3-based education demo apps",
      "Elevara Career Flow - career pathway simulation with verifiable credentials",
      "SkillProof Academy - skill verification and learning platform",
      "Identity Harvest - decentralized digital identity ownership system",
      "Contributed to Core SDK and Cloud Wallet SDK documentation",
    ],
    color: "primary",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Building the future of Web3 and decentralized applications
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

              {/* Timeline Dot */}
              <div className="absolute left-6 top-8 w-5 h-5 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary)/0.6)] animate-glow-pulse" />

              {/* Content Card */}
              <div className="ml-20 mb-12">
                <motion.div
                  className="glass-card p-8 rounded-2xl hover:border-primary/50 smooth-transition group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary smooth-transition">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                        <Briefcase className="h-4 w-4" />
                        {exp.company}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {exp.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {exp.period}
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="text-accent mt-1">▹</span>
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
