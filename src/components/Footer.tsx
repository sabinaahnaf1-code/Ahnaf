import { motion } from "motion/react";
import { Github, Youtube, Mail, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Ahnaf Muttaki</h2>
          <p className="text-white/40 max-w-xs">
            Building digital experiences that matter. 
            Based in Bangladesh, exploring the world of tech.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-6">
            <motion.a href="#" whileHover={{ y: -5 }} className="text-white/40 hover:text-brand-blue transition-colors">
              <Github size={24} />
            </motion.a>
            <motion.a href="#" whileHover={{ y: -5 }} className="text-white/40 hover:text-brand-green transition-colors">
              <Youtube size={24} />
            </motion.a>
            <motion.a href="mailto:contact@ahnaf.com" whileHover={{ y: -5 }} className="text-white/40 hover:text-brand-yellow transition-colors">
              <Mail size={24} />
            </motion.a>
          </div>
          <div className="text-xs font-bold tracking-widest text-white/20 uppercase">
            Stay Connected
          </div>
        </div>

        <div className="text-center md:text-right text-sm text-white/40">
          <p>© 2026 Ahnaf Muttaki</p>
          <p className="flex items-center justify-center md:justify-end gap-1 mt-2">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};
