import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export const Background = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile, mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-bg-dark">
      {/* Base Dark Gradient Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#001a33_0%,transparent_50%)] opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#000a1a_0%,#000000_100%)]" />

      {/* Vibrant Mesh Gradients */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-brand-blue/10 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-green/10 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[10%] w-[50%] h-[50%] rounded-full bg-brand-blue/5 blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, -60, 0],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-brand-green/5 blur-[80px]"
      />

      {/* Interactive Mouse Glow */}
      {!isMobile && (
        <motion.div
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="absolute w-[600px] h-[600px] bg-brand-blue/5 blur-[120px] rounded-full"
        />
      )}

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.3,
          }}
          animate={{
            y: ["-10%", "110%"],
            x: (Math.random() - 0.5) * 200 + "px",
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * -20,
          }}
          className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
        />
      ))}

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};
