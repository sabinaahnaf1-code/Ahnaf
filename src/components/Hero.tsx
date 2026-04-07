import { motion } from "motion/react";
import { Typewriter } from "react-simple-typewriter";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-brand-blue mb-8 border-brand-blue/20"
        >
          <Sparkles size={14} />
          <span>Available for new projects</span>
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-extrabold mb-6 tracking-tight">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent animate-gradient">
            Ahnaf Muttaki
          </span>
        </h1>

        <div className="text-xl md:text-3xl text-white/60 font-medium mb-12 h-8">
          <Typewriter
            words={["Student", "Creator", "Tech Enthusiast", "Web Developer"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-brand-blue text-white rounded-2xl font-bold flex items-center gap-2 glow-blue hover:bg-brand-blue/90 transition-all"
          >
            View Projects
            <ArrowRight size={18} />
          </motion.a>
          <motion.button
            onClick={onContactClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass text-white rounded-2xl font-bold hover:bg-white/10 transition-all"
          >
            Contact Me
          </motion.button>
        </div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 md:left-20 w-12 h-12 glass rounded-xl rotate-12 flex items-center justify-center"
      >
        <div className="w-6 h-6 rounded-full bg-brand-blue/40 blur-sm" />
      </motion.div>
      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 right-10 md:right-20 w-16 h-16 glass rounded-full -rotate-12 flex items-center justify-center"
      >
        <div className="w-8 h-8 rounded-full bg-brand-cyan/40 blur-sm" />
      </motion.div>
    </section>
  );
};
