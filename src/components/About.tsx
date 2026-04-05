import { motion } from "motion/react";
import { User, Cpu, Code2 } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <div className="inline-flex items-center gap-2 text-brand-blue mb-4 font-bold tracking-widest uppercase text-xs">
            <User size={14} />
            <span>About Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 leading-tight">
            Passionate about building the <span className="text-brand-blue">future</span> of tech.
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mb-4">
            I'm a Bangladeshi student with a deep fascination for how things work. 
            From the lines of code that power the web to the hardware that interacts 
            with the physical world, I love exploring the intersection of design and engineering.
          </p>
          <p className="text-lg text-white/60 leading-relaxed">
            My journey involves building animated websites that feel alive and 
            smart IoT systems that solve real-world problems. I believe in 
            minimalism, performance, and creating experiences that leave an impact.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            whileHover={{ y: -5 }}
            className="glass glass-hover p-4 rounded-2xl flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0">
              <Code2 size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Web Dev</h3>
              <p className="text-xs text-white/40 leading-snug">Creating smooth, animated digital experiences.</p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="glass glass-hover p-4 rounded-2xl flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-green/20 flex items-center justify-center text-brand-green shrink-0">
              <Cpu size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">IoT & DIY</h3>
              <p className="text-xs text-white/40 leading-snug">Experimenting with ESP8266 and smart systems.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
