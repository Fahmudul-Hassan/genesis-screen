import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-8 border-t border-border/50">
      {/* Subtle particle animation background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 bg-primary/5 rounded-full blur-3xl -bottom-32 -left-32 animate-glow-pulse" />
        <div className="absolute w-64 h-64 bg-secondary/5 rounded-full blur-3xl -bottom-32 -right-32 animate-glow-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Built with
            <Heart className="h-4 w-4 text-primary fill-primary animate-glow-pulse" />
            by <span className="text-foreground font-medium">Fahmudul Hassan Siam</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
