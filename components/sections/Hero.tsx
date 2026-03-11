'use client';

import {
  motion, AnimatePresence, useInView,
  useScroll, useTransform, useMotionValue, useSpring,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then(m => m.HeroScene),
  { ssr: false }
);

const roles = ['Developer', 'Analyst', 'Creator'];

function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Indigo blob — top left */}
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute rounded-full"
        style={{
          top: '-15rem',
          left: '-15rem',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
      />
      {/* Violet blob — bottom right */}
      <motion.div
        animate={{ x: [0, -50, 30, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute rounded-full"
        style={{
          bottom: '-15rem',
          right: '-10rem',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
      />
      {/* Blue blob — mid right */}
      <motion.div
        animate={{ x: [0, 30, -40, 0], y: [0, -20, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute rounded-full"
        style={{
          top: '30%',
          right: '15%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
      />
    </div>
  );
}

function WordCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % roles.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-flex items-center gap-0" style={{ minWidth: '7rem' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-accent inline-block"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
      <span>.</span>
    </span>
  );
}

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr, 10);
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(eased * target);
      setDisplay(`${prefix}${current}${suffix}`);
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <div ref={ref}>
      <p className="text-title font-bold text-accent">{display}</p>
      <p className="text-body-sm text-text-muted">{label}</p>
    </div>
  );
}

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ── Cinematic motion ─────────────────────────────────────────────────────
  const heroRef = useRef<HTMLElement>(null);

  // Scroll-driven parallax: tracks how far hero has been scrolled past
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const textScrollY  = useTransform(scrollYProgress, [0, 1], [0,  -60]);
  const photoScrollY = useTransform(scrollYProgress, [0, 1], [0, -120]); // photo moves 2× faster

  // Mouse parallax raw values (-1 → 1)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Photo layer: moves OPPOSITE cursor (appears closer to viewer)
  const photoX = useSpring(useTransform(rawX, [-1, 1], [18, -18]), { stiffness: 80, damping: 20 });
  const photoY = useSpring(useTransform(rawY, [-1, 1],  [9,  -9]), { stiffness: 80, damping: 20 });

  // Text layer: moves SAME direction as cursor (appears further, very subtle)
  const textX  = useSpring(useTransform(rawX, [-1, 1], [-4,  4]), { stiffness: 60, damping: 30 });
  const textYM = useSpring(useTransform(rawY, [-1, 1], [-2,  2]), { stiffness: 60, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width)  * 2 - 1);
    rawY.set(((e.clientY - r.top)  / r.height) * 2 - 1);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center bg-blueprint overflow-hidden"
    >
      <GradientBackground />

      {/* Three.js: wireframe + particles — right half */}
      <div
        className="absolute top-0 right-0 w-1/2 h-screen pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <HeroScene />
      </div>

      <div className="container-main py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Text (scroll layer → mouse layer) */}
          <motion.div className="order-2 lg:order-1" style={{ y: textScrollY }}>
            <motion.div style={{ x: textX, y: textYM }}>

              {/* Word-cycling tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="tag-mono mb-4"
              >
                <WordCycler />
              </motion.p>

              {/* "Hi, I'm" — small muted label */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="text-xl text-neutral-400 font-medium mb-1"
              >
                Hi, I&apos;m
              </motion.p>

              {/* Name — display size, no decoration */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-display-sm sm:text-display-md lg:text-display text-text-primary mb-6"
              >
                Stan Feng
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-body-lg text-text-secondary max-w-lg mb-8"
              >
                Data Analysis student at Purdue University building intelligent solutions
                at the intersection of AI, data science, and financial technology.
                1st place winner of the SYSTEX Competition 2025.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <MagneticButton onClick={scrollToProjects} className="btn-primary">
                  View My Work
                  <ArrowRight className="w-4 h-4 ml-2" />
                </MagneticButton>
                <MagneticButton onClick={scrollToContact} className="btn-secondary">
                  Get in Touch
                </MagneticButton>
              </motion.div>

              {/* Animated stat counters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex gap-8 mt-12 pt-8 border-t border-neutral-200"
              >
                {[
                  { value: '1st', label: 'Place Winner' },
                  { value: '3+',  label: 'Projects' },
                  { value: '2',   label: 'Languages' },
                ].map((stat) => (
                  <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </motion.div>

            </motion.div>
          </motion.div>

          {/* Right — Portrait (scroll layer → mouse layer) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            style={{ y: photoScrollY }}
          >
            <motion.div style={{ x: photoX, y: photoY }}>
              <div className="relative">
                <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] lg:w-96 lg:h-[500px]">
                  {/* Stacked background shapes */}
                  <div className="absolute -top-4 -right-4 w-full h-full bg-neutral-100 rounded-3xl" />
                  <div className="absolute -top-2 -right-2 w-full h-full bg-neutral-50 rounded-3xl" />

                  {/* Portrait with subtle accent ring */}
                  <div
                    className="relative w-full h-full rounded-3xl overflow-hidden bg-white"
                    style={{
                      boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 0 0 1.5px rgba(99,102,241,0.18)',
                    }}
                  >
                    <motion.div
                      initial={{ filter: 'saturate(0.3)' }}
                      animate={{ filter: 'saturate(1)' }}
                      transition={{ duration: 1.2, delay: 1.5, ease: 'easeOut' }}
                      className="w-full h-full"
                    >
                      <Image
                        src="/images/profile.jpg"
                        alt="Stan Feng"
                        fill
                        className="object-cover object-top"
                        priority
                      />
                    </motion.div>
                  </div>

                  {/* Floating code badge */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-6 -left-6 w-16 h-16 rounded-2xl flex items-center justify-center bg-accent"
                  >
                    <span className="text-white font-mono text-mono-sm">{'</>'}</span>
                  </motion.div>

                  {/* Floating border square */}
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-6 -left-3 w-12 h-12 rounded-xl"
                    style={{ border: '2px solid rgba(99,102,241,0.35)' }}
                  />

                  {/* Floating dot */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/4 -right-8 w-8 h-8 bg-neutral-200 rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
