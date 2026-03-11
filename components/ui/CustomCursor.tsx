'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 180, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 20 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest('a, button, [role="button"]'));
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      {/* Dot — instant follow, hides on interactive elements */}
      <motion.div
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        style={{
          x: mouseX,
          y: mouseY,
          position: 'fixed',
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#6366f1',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      {/* Ring — spring follow, expands on interactive elements */}
      <motion.div
        animate={{
          scale: hovering ? 1.6 : 1,
          borderColor: hovering ? 'rgba(99,102,241,0.9)' : 'rgba(99,102,241,0.45)',
          backgroundColor: hovering ? 'rgba(99,102,241,0.07)' : 'transparent',
        }}
        transition={{ duration: 0.2 }}
        style={{
          x: springX,
          y: springY,
          position: 'fixed',
          top: -16,
          left: -16,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(99,102,241,0.45)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
    </>
  );
}
