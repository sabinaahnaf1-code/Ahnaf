import { motion } from "motion/react";
import { ExternalLink, Github, Layers } from "lucide-react";

const projects = [
  {
    title: "Smart IoT Alert System",
    description: "A real-time alert system built with ESP8266 for home monitoring and automation.",
    tags: ["IoT", "ESP8266", "Arduino"],
    color: "blue",
  },
  {
    title: "Animated Portfolio",
    description: "A high-performance personal website with smooth transitions and glassmorphism.",
    tags: ["React", "Motion", "Tailwind"],
    color: "green",
  },
  {
    title: "DIY Tech Experiments",
    description: "A collection of hardware hacks and creative coding projects.",
    tags: ["Hardware", "C++", "Creative"],
    color: "yellow",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 text-brand-blue mb-4 font-bold tracking-widest uppercase text-xs">
          <Layers size={14} />
          <span>Portfolio</span>
        </div>
        <h2 className="text-4xl md:text-6xl">Featured Projects</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative glass p-8 rounded-[2rem] overflow-hidden"
          >
            {/* Glow effect on hover */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] transition-opacity opacity-0 group-hover:opacity-20 bg-brand-${project.color}`} />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-brand-${project.color}/20 flex items-center justify-center text-brand-${project.color}`}>
                  <Layers size={20} />
                </div>
                <div className="flex gap-3">
                  <motion.a href="#" whileHover={{ scale: 1.1 }} className="text-white/40 hover:text-white">
                    <Github size={18} />
                  </motion.a>
                  <motion.a href="#" whileHover={{ scale: 1.1 }} className="text-white/40 hover:text-white">
                    <ExternalLink size={18} />
                  </motion.a>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-blue transition-colors">
                {project.title}
              </h3>
              <p className="text-white/60 mb-8 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-wider text-white/40 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
