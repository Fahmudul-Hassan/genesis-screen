import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "American International University-Bangladesh (AIUB)",
    period: "2024 - 2028",
    icon: GraduationCap,
  },
];

const certifications = [
  {
    title: "Complete Web Development",
    issuer: "Programming Hero",
    icon: Award,
  },
  {
    title: "Next Level Web Development",
    issuer: "Programming Hero",
    icon: Award,
  },
];

const Education = () => {
  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Education & Certifications</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Continuous learning and skill development
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">Education</h3>
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl hover:border-primary/50 smooth-transition"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <edu.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-foreground mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-muted-foreground mb-2">{edu.institution}</p>
                    <p className="text-sm text-accent">{edu.period}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-secondary">Certifications</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card p-6 rounded-xl hover:border-secondary/50 smooth-transition group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 smooth-transition">
                      <cert.icon className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-secondary smooth-transition">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{cert.issuer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
