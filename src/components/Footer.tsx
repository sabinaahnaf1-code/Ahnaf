import { motion } from "motion/react";
import { Github, Youtube, Mail, Heart, ShieldCheck } from "lucide-react";

const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer = ({ onContactClick }: { onContactClick: () => void }) => {
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
            <motion.a 
              href="https://github.com/sabinaahnaf1-code" 
              target="_blank"
              whileHover={{ y: -5 }} 
              className="text-white/40 hover:text-brand-blue transition-colors"
            >
              <Github size={24} />
            </motion.a>
            <motion.a 
              href="https://www.youtube.com/@Black.Birdd.production" 
              target="_blank"
              whileHover={{ y: -5 }} 
              className="text-white/40 hover:text-brand-green transition-colors"
            >
              <Youtube size={24} />
            </motion.a>
            <motion.a 
              href="https://x.com/fuel_soul3026" 
              target="_blank"
              whileHover={{ y: -5 }} 
              className="text-white/40 hover:text-white transition-colors"
            >
              <XIcon size={24} />
            </motion.a>
            <motion.button 
              onClick={onContactClick}
              whileHover={{ y: -5 }} 
              className="text-white/40 hover:text-brand-blue transition-colors"
            >
              <Mail size={24} />
            </motion.button>
          </div>
          <div className="text-xs font-bold tracking-widest text-white/20 uppercase">
            Stay Connected
          </div>
        </div>

        <div className="text-center md:text-right text-sm text-white/40">
          <p>© 2026 Ahnaf Muttaki</p>
          <div className="flex items-center justify-center md:justify-end gap-3 mt-2">
            <p className="flex items-center gap-1">
              Made with <Heart size={14} className="text-brand-blue fill-brand-blue" /> in Bangladesh
            </p>
            <motion.a 
              href="/admin-portal"
              className="text-white/5 hover:text-white/20 transition-colors"
              title="Admin Portal"
            >
              <ShieldCheck size={10} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};
