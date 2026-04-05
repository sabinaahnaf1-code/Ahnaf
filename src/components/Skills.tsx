import { motion } from "motion/react";
import { Terminal } from "lucide-react";

const skills = [
  { name: "HTML / CSS", level: 95, color: "blue", bgClass: "bg-brand-blue", glowClass: "glow-blue", textClass: "text-brand-blue" },
  { name: "JavaScript", level: 85, color: "green", bgClass: "bg-brand-green", glowClass: "glow-green", textClass: "text-brand-green" },
  { name: "React / Vite", level: 80, color: "blue", bgClass: "bg-brand-blue", glowClass: "glow-blue", textClass: "text-brand-blue" },
  { name: "Arduino / IoT", level: 75, color: "yellow", bgClass: "bg-brand-yellow", glowClass: "glow-yellow", textClass: "text-brand-yellow" },
  { name: "UI/UX Design", level: 70, color: "green", bgClass: "bg-brand-green", glowClass: "glow-green", textClass: "text-brand-green" },
  { name: "ESP8266", level: 80, color: "blue", bgClass: "bg-brand-blue", glowClass: "glow-blue", textClass: "text-brand-blue" },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 max-w-5xl mx-auto">
      <div className="glass p-10 md:p-16 rounded-[3rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 blur-[100px] rounded-full" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-brand-blue mb-4 font-bold tracking-widest uppercase text-xs">
            <Terminal size={14} />
            <span>Abilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-16">Technical Arsenal</h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            {skills.map((skill, index) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-white/80">{skill.name}</span>
                  <span className={`text-xs font-bold ${skill.textClass}`}>{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                    className={`h-full rounded-full ${skill.bgClass} ${skill.glowClass}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
