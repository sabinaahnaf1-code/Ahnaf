import { motion } from "motion/react";
import { User, Cpu, Code2 } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-32 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid md:grid-cols-2 gap-16 items-center"
      >
        <div>
          <div className="inline-flex items-center gap-2 text-brand-green mb-4 font-bold tracking-widest uppercase text-xs">
            <User size={14} />
            <span>About Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-8 leading-tight">
            Passionate about building the <span className="text-brand-green">future</span> of tech.
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mb-6">
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
            className="glass p-8 rounded-3xl flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
              <Code2 size={24} />
            </div>
            <h3 className="text-xl font-bold">Web Dev</h3>
            <p className="text-sm text-white/40">Creating smooth, animated digital experiences.</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="glass p-8 rounded-3xl flex flex-col gap-4 mt-8"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-green/20 flex items-center justify-center text-brand-green">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold">IoT & DIY</h3>
            <p className="text-sm text-white/40">Experimenting with ESP8266 and smart systems.</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
