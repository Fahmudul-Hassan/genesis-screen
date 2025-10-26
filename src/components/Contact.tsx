import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  subject: z.string()
    .trim()
    .min(3, { message: "Subject must be at least 3 characters" })
    .max(200, { message: "Subject must be less than 200 characters" }),
  message: z.string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const contactInfo = [
  { icon: Mail, label: "Email", value: "fahmudul234@gmail.com", link: "mailto:fahmudul234@gmail.com", color: "from-cyan-500 to-blue-500" },
  { icon: Phone, label: "Phone", value: "+880 1333098378", link: "tel:+8801333098378", color: "from-purple-500 to-pink-500" },
  { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh", link: null, color: "from-emerald-500 to-teal-500" },
];

const socialLinks = [
  { icon: Github, label: "GitHub", link: "https://github.com/yourusername", color: "#06b6d4" },
  { icon: Linkedin, label: "LinkedIn", link: "https://linkedin.com/in/yourusername", color: "#ec4899" },
];

// Animated Background Blobs
const AnimatedMeshBlob = ({ index }: { index: number }) => {
  return (
    <motion.div
      className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl blob-morph pointer-events-none"
      style={{
        background: `radial-gradient(circle, hsl(${160 + index * 60}, 90%, 60%), transparent)`,
        top: `${20 + index * 30}%`,
        left: `${10 + index * 25}%`,
      }}
      animate={{
        x: [0, 100, 0],
        y: [0, -100, 0],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 20 + index * 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Contact Info Card
const ContactCard = ({ 
  item, 
  index 
}: { 
  item: typeof contactInfo[0]; 
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [8, -8]);
  const rotateY = useTransform(mouseX, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05, z: 50 }}
      className="relative group"
    >
      <div className="holographic-card rounded-xl p-6 relative overflow-hidden">
        {/* Glow Effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 blur-xl`}
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Shimmer on Hover */}
        {isHovered && (
          <div className="absolute inset-0 shimmer-effect" />
        )}

        <div className="relative z-10 text-center">
          <motion.div
            className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${item.color} mb-4`}
            animate={{
              boxShadow: isHovered
                ? `0 0 30px hsl(var(--primary) / 0.6)`
                : "0 0 0px hsl(var(--primary) / 0)",
            }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <item.icon className="h-6 w-6 text-white" />
          </motion.div>
          
          <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            {item.label}
          </h3>
          
          {item.link ? (
            <a
              href={item.link}
              className="text-foreground hover:text-primary smooth-transition font-semibold text-base block"
            >
              {item.value}
            </a>
          ) : (
            <p className="text-foreground font-semibold text-base">{item.value}</p>
          )}
        </div>

        {/* Floating Particles */}
        {isHovered && [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, -30],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Floating Label Input
const FloatingInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  isTextarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  isTextarea?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  const InputComponent = isTextarea ? "textarea" : "input";

  return (
    <div className="relative group">
      <InputComponent
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full px-4 py-3 bg-background/50 backdrop-blur-xl 
          border-2 rounded-lg text-foreground
          transition-all duration-300 outline-none
          ${isTextarea ? "min-h-[120px] resize-none" : ""}
          ${isFocused || hasValue ? "pt-6 pb-2" : ""}
          ${isFocused ? "border-primary shadow-[0_0_20px_hsl(var(--primary)/0.5)]" : "border-border/50"}
          ${error ? "border-destructive" : ""}
          hover:border-primary/50
        `}
      />
      
      <motion.label
        htmlFor={id}
        className={`
          absolute left-4 pointer-events-none transition-all duration-300
          ${isFocused || hasValue ? "top-2 text-xs text-primary font-medium" : "top-1/2 -translate-y-1/2 text-base text-muted-foreground"}
        `}
        animate={{
          textShadow: isFocused
            ? "0 0 10px hsl(var(--primary) / 0.8)"
            : "0 0 0px hsl(var(--primary) / 0)",
        }}
      >
        {label}
      </motion.label>

      {/* Neon Focus Ring */}
      {isFocused && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            boxShadow: "0 0 30px hsl(var(--primary) / 0.3)",
          }}
        />
      )}

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-destructive mt-1 flex items-center gap-1"
        >
          <AlertCircle className="h-3 w-3" />
          {error}
        </motion.p>
      )}

      {/* Hover Shimmer */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "200% 0%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Main Contact Component
const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Cursor trail effect
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const result = contactFormSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as keyof ContactFormData] = error.message;
        }
      });
      setErrors(fieldErrors);
      
      toast({
        title: "Validation Error",
        description: "Please check the form fields and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call (replace with actual backend integration)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      toast({
        title: "Message Sent! 🎉",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });

      // Reset form after success
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSubmitSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Animated Mesh Background */}
      {[...Array(4)].map((_, i) => (
        <AnimatedMeshBlob key={i} index={i} />
      ))}

      {/* Cursor Trail */}
      <motion.div
        className="fixed w-8 h-8 rounded-full bg-primary/20 blur-xl pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
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
          >
            <span className="gradient-aurora glow-text-cyan">Get In Touch</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg md:text-xl">
            Let's build something extraordinary together
          </p>
        </motion.div>

        {/* Main Content - Split Layout */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-8">
          {/* Left Side - Contact Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item, index) => (
              <ContactCard key={item.label} item={item} index={index} />
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {socialLinks.map((social) => {
                const [isHovered, setIsHovered] = useState(false);
                
                return (
                  <motion.div
                    key={social.label}
                    className="flex-1"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => window.open(social.link, "_blank")}
                      className="w-full group relative overflow-hidden holographic-card"
                    >
                      <motion.div
                        className="absolute inset-0 opacity-0 blur-xl"
                        style={{ backgroundColor: social.color }}
                        animate={{
                          opacity: isHovered ? 0.3 : 0,
                        }}
                      />
                      <motion.div
                        animate={{
                          rotate: isHovered ? 360 : 0,
                          scale: isHovered ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <social.icon className="h-5 w-5 mr-2" />
                      </motion.div>
                      <span className="relative z-10">{social.label}</span>
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bottom Text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-xl text-center"
            >
              <p className="text-muted-foreground text-sm">
                Open to opportunities and collaborations
              </p>
            </motion.div>
          </div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="holographic-card rounded-2xl p-8 relative overflow-hidden">
              {/* Glowing Background */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1s" }} />

              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-bold gradient-aurora mb-6">Send a Message</h3>

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FloatingInput
                    id="name"
                    label="Your Name"
                    value={formData.name}
                    onChange={(value) => handleInputChange("name", value)}
                    error={errors.name}
                  />
                  
                  <FloatingInput
                    id="email"
                    label="Your Email"
                    type="email"
                    value={formData.email}
                    onChange={(value) => handleInputChange("email", value)}
                    error={errors.email}
                  />
                </div>

                <FloatingInput
                  id="subject"
                  label="Subject"
                  value={formData.subject}
                  onChange={(value) => handleInputChange("subject", value)}
                  error={errors.subject}
                />

                <FloatingInput
                  id="message"
                  label="Your Message"
                  value={formData.message}
                  onChange={(value) => handleInputChange("message", value)}
                  error={errors.message}
                  isTextarea
                />

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || submitSuccess}
                    className="w-full relative overflow-hidden group bg-gradient-to-r from-primary via-accent to-secondary hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)]"
                  >
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-accent"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Button Content */}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          Sending...
                        </>
                      ) : submitSuccess ? (
                        <>
                          <CheckCircle className="h-5 w-5" />
                          Sent Successfully!
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </span>

                    {/* Ripple Effect */}
                    {isSubmitting && (
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-lg"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                        }}
                      />
                    )}
                  </Button>
                </motion.div>

                {/* Success Confetti */}
                {submitSuccess && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          background: `hsl(${Math.random() * 360}, 90%, 60%)`,
                          left: "50%",
                          top: "50%",
                        }}
                        initial={{ scale: 0, x: 0, y: 0 }}
                        animate={{
                          scale: [0, 1, 0],
                          x: (Math.random() - 0.5) * 400,
                          y: (Math.random() - 0.5) * 400,
                          opacity: [1, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.03,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
