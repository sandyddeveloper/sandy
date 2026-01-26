import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxOrbProps {
  className?: string;
  speed?: number;
  size?: string;
  delay?: number;
}

const ParallaxOrb = ({ className = "", speed = 0.5, size = "200px", delay = 0 }: ParallaxOrbProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.2]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, width: size, height: size }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.3, scale: 1 }}
      transition={{ duration: 1.5, delay }}
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    />
  );
};

export default function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  
  const gradientY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main gradient that moves on scroll */}
      <motion.div
        style={{ y: gradientY }}
        className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-transparent"
      />

      {/* Rotating grid pattern */}
      <motion.div
        style={{ rotate }}
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-[0.02]"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </motion.div>

      {/* Floating orbs with different speeds */}
      <ParallaxOrb
        className="bg-emerald-500/20 top-[10%] left-[5%]"
        speed={-0.3}
        size="400px"
        delay={0}
      />
      <ParallaxOrb
        className="bg-emerald-400/15 top-[30%] right-[10%]"
        speed={0.4}
        size="300px"
        delay={0.2}
      />
      <ParallaxOrb
        className="bg-emerald-600/10 top-[60%] left-[20%]"
        speed={-0.5}
        size="500px"
        delay={0.4}
      />
      <ParallaxOrb
        className="bg-emerald-300/10 top-[80%] right-[5%]"
        speed={0.6}
        size="250px"
        delay={0.6}
      />
      <ParallaxOrb
        className="bg-emerald-500/15 top-[120%] left-[40%]"
        speed={-0.4}
        size="350px"
        delay={0.3}
      />

      {/* Horizontal light rays */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
        className="absolute top-0 left-1/4 w-px h-[60vh] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
        className="absolute top-20 right-1/3 w-px h-[40vh] bg-gradient-to-b from-primary/15 via-primary/5 to-transparent"
      />
    </div>
  );
}
