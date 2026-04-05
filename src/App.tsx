import { motion, useScroll, useSpring } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Footer } from "./components/Footer";
import { Background } from "./components/Background";
import { ContactModal } from "./components/ContactModal";
import { AdminDashboard } from "./components/AdminDashboard";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function MainApp({ onContactClick }: { onContactClick: () => void }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen selection:bg-brand-blue/30 selection:text-white">
      <Background />
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-blue z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar onContactClick={onContactClick} />
      
      <main>
        <Hero onContactClick={onContactClick} />
        <About />
        <Projects />
        <Skills />
      </main>

      <Footer onContactClick={onContactClick} />
    </div>
  );
}

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp onContactClick={() => setIsContactModalOpen(true)} />} />
        <Route path="/admin-portal" element={<AdminDashboard />} />
      </Routes>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </BrowserRouter>
  );
}
