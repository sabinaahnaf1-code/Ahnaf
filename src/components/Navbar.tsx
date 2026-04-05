import { motion } from "motion/react";
import { Github, Youtube } from "lucide-react";
import { ReactNode } from "react";

const NavItem = ({ href, children }: { href: string; children: ReactNode }) => (
  <motion.a
    href={href}
    whileHover={{ y: -2 }}
    className="text-sm font-medium text-white/60 hover:text-white transition-colors"
  >
    {children}
  </motion.a>
);

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6"
    >
      <div className="glass px-8 py-3 rounded-full flex items-center gap-8 shadow-2xl">
        <div className="flex items-center gap-6">
          <NavItem href="#about">About</NavItem>
          <NavItem href="#projects">Projects</NavItem>
          <NavItem href="#skills">Skills</NavItem>
        </div>
        
        <div className="w-px h-4 bg-white/10" />
        
        <div className="flex items-center gap-4">
          <motion.a
            href="https://github.com"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            className="text-white/60 hover:text-white transition-colors"
          >
            <Github size={18} />
          </motion.a>
          <motion.a
            href="https://youtube.com"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            className="text-white/60 hover:text-white transition-colors"
          >
            <Youtube size={18} />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};
