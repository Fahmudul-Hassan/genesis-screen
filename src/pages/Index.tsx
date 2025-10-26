import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import DeveloperReactor from "@/components/DeveloperReactor";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <TechStack />
      <DeveloperReactor />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
