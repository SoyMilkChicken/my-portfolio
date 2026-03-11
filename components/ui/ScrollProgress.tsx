'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        scaleY,
        transformOrigin: 'top',
        position: 'fixed',
        right: 0,
        top: 0,
        width: 3,
        height: '100vh',
        backgroundColor: '#6366f1',
        opacity: 0.55,
        zIndex: 9998,
        pointerEvents: 'none',
      }}
    />
  );
}
