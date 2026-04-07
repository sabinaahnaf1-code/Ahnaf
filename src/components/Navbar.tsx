import { motion } from "motion/react";
import { Github, Youtube } from "lucide-react";
import { ReactNode } from "react";

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const NavItem = ({ href, children }: { href: string; children: ReactNode }) => (
  <motion.a
    href={href}
    whileHover={{ y: -2 }}
    className="text-sm font-medium text-white/60 hover:text-brand-green transition-colors"
  >
    {children}
  </motion.a>
);

export const Navbar = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-6"
    >
      <div className="glass glass-hover px-4 sm:px-8 py-2.5 sm:py-3 rounded-full flex items-center gap-4 sm:gap-8 shadow-2xl max-w-[95vw] sm:max-w-none overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3 sm:gap-6 whitespace-nowrap">
          <NavItem href="#about">About</NavItem>
          <NavItem href="#projects">Projects</NavItem>
          <NavItem href="#skills">Skills</NavItem>
          <button
            onClick={onContactClick}
            className="text-xs sm:text-sm font-medium text-white/60 hover:text-brand-green transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>
        
        <div className="hidden min-[450px]:block w-px h-4 bg-white/10 shrink-0" />
        
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <motion.a
            href="https://github.com/sabinaahnaf1-code"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            className="text-white/60 hover:text-brand-green transition-colors"
          >
            <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
          </motion.a>
          <motion.a
            href="https://www.youtube.com/@Black.Birdd.production"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            className="text-white/60 hover:text-brand-green transition-colors"
          >
            <Youtube size={16} className="sm:w-[18px] sm:h-[18px]" />
          </motion.a>
          <motion.a
            href="https://x.com/fuel_soul3026"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            className="text-white/60 hover:text-brand-green transition-colors"
          >
            <XIcon size={16} />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};
