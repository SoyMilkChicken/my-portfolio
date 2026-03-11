'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Deterministic pseudo-random — avoids SSR/client hydration mismatch
const sr = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

// Pre-computed background stars
const STARS = Array.from({ length: 65 }, (_, i) => ({
  w:     sr(i * 3)      * 2   + 1,
  h:     sr(i * 3 + 1)  * 2   + 1,
  left:  sr(i * 7)      * 100,
  top:   sr(i * 11)     * 100,
  op:    sr(i * 5)      * 0.4 + 0.1,
  dur:   sr(i * 13)     * 3   + 2,
  delay: sr(i * 17)     * 4,
}));

// Ambient feathers (float upward slowly while waiting for click)
const AMBIENT = [
  { xPct: 10, delay: 0,   dur: 7.5, rot0: -15, rot1: -5,  sc: 0.9 },
  { xPct: 30, delay: 2.1, dur: 8.2, rot0:  12, rot1: 22,  sc: 0.7 },
  { xPct: 58, delay: 1.0, dur: 6.8, rot0: -28, rot1: -12, sc: 1.1 },
  { xPct: 78, delay: 3.4, dur: 7.8, rot0:  22, rot1: 38,  sc: 0.8 },
  { xPct: 44, delay: 0.5, dur: 9.0, rot0:  -6, rot1:  6,  sc: 0.6 },
];

// Sweep feathers (burst across screen on click)
const SWEEP = [
  { y:  7, d: 0,    dur: 1.05, r0: -30, r1: -12, sc: 1.4, op: 0.9  },
  { y: 18, d: 0.07, dur: 0.92, r0:  22, r1:  38, sc: 0.85,op: 0.75 },
  { y: 30, d: 0.03, dur: 1.08, r0: -16, r1:  -4, sc: 1.6, op: 0.85 },
  { y: 42, d: 0.14, dur: 0.88, r0:  36, r1:  52, sc: 1.0, op: 0.8  },
  { y: 52, d: 0.06, dur: 1.12, r0: -26, r1: -10, sc: 1.25,op: 0.9  },
  { y: 62, d: 0.11, dur: 0.94, r0:  10, r1:  26, sc: 0.9, op: 0.7  },
  { y: 72, d: 0.02, dur: 1.02, r0: -42, r1: -22, sc: 1.5, op: 0.85 },
  { y: 81, d: 0.17, dur: 0.86, r0:  28, r1:  46, sc: 0.75,op: 0.65 },
  { y: 14, d: 0.22, dur: 1.06, r0: -12, r1:   4, sc: 1.1, op: 0.6  },
  { y: 89, d: 0.09, dur: 0.96, r0:  46, r1:  62, sc: 0.8, op: 0.7  },
  { y: 47, d: 0.26, dur: 0.84, r0: -50, r1: -34, sc: 1.3, op: 0.55 },
  { y: 37, d: 0.19, dur: 1.0,  r0:  16, r1:  32, sc: 0.95,op: 0.75 },
];

function Feather({ scale = 1 }: { scale?: number }) {
  return (
    <svg
      width={22 * scale}
      height={74 * scale}
      viewBox="0 0 22 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 7px rgba(180,160,255,0.65))' }}
    >
      {/* Vane */}
      <path d="M11,1 C20,17 20,50 11,73 C2,50 2,17 11,1Z" fill="rgba(255,255,255,0.8)" />
      {/* Rachis */}
      <line x1="11" y1="1"  x2="11" y2="73" stroke="rgba(255,255,255,0.95)" strokeWidth="0.8" />
      {/* Barbs L */}
      <line x1="11" y1="14" x2="4"  y2="24" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="25" x2="3"  y2="35" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="36" x2="3"  y2="45" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="46" x2="5"  y2="55" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="55" x2="8"  y2="63" stroke="rgba(255,255,255,0.32)" strokeWidth="0.7" />
      {/* Barbs R */}
      <line x1="11" y1="14" x2="18" y2="24" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="25" x2="19" y2="35" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="36" x2="19" y2="45" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="46" x2="17" y2="55" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="55" x2="14" y2="63" stroke="rgba(255,255,255,0.32)" strokeWidth="0.7" />
    </svg>
  );
}

export function IntroScreen() {
  const [phase, setPhase] = useState<'idle' | 'sweeping' | 'exit'>('idle');
  const [mounted, setMounted] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem('sf_intro_v1')) setSkip(true);
  }, []);

  if (!mounted || skip) return null;

  const handleClick = () => {
    if (phase !== 'idle') return;
    setPhase('sweeping');
    setTimeout(() => setPhase('exit'), 880);
  };

  return (
    <AnimatePresence onExitComplete={() => sessionStorage.setItem('sf_intro_v1', '1')}>
      {phase !== 'exit' && (
        <motion.div
          key="intro"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.08 },
          }}
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
          style={{
            zIndex: 9985,
            background:
              'linear-gradient(160deg, #0c0a1e 0%, #1a1040 40%, #231750 70%, #0f0c29 100%)',
          }}
          onClick={handleClick}
        >
          {/* ── Stars ──────────────────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none">
            {STARS.map((s, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{ width: s.w, height: s.h, left: `${s.left}%`, top: `${s.top}%`, opacity: s.op }}
                animate={{ opacity: [s.op, s.op * 0.15, s.op] }}
                transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
              />
            ))}
          </div>

          {/* ── Ambient feathers ───────────────────────────────── */}
          {phase === 'idle' && AMBIENT.map((f, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{ left: `${f.xPct}%` }}
              initial={{ y: '105vh', rotate: f.rot0, opacity: 0 }}
              animate={{ y: '-15vh', rotate: f.rot1, opacity: [0, 0.5, 0.5, 0] }}
              transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: 'linear' }}
            >
              <Feather scale={f.sc} />
            </motion.div>
          ))}

          {/* ── Sweep feathers (on click) ──────────────────────── */}
          {phase === 'sweeping' && SWEEP.map((f, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{ top: `${f.y}%` }}
              initial={{ x: '-70px', opacity: 0, rotate: f.r0, scale: f.sc }}
              animate={{
                x: '110vw',
                opacity: [0, f.op, f.op, 0],
                rotate: f.r1,
              }}
              transition={{ duration: f.dur, delay: f.d, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Feather scale={f.sc} />
            </motion.div>
          ))}

          {/* ── Vignette ──────────────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)',
            }}
          />

          {/* ── Center content ────────────────────────────────── */}
          <div className="relative z-10 text-center select-none pointer-events-none px-6">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 0.45, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-mono text-xs tracking-[0.35em] uppercase text-white mb-5"
            >
              Portfolio · 2025
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-white leading-none"
              style={{ fontSize: 'clamp(52px, 11vw, 124px)', letterSpacing: '-0.03em' }}
            >
              Stan Feng
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.36 }}
              transition={{ delay: 1.4, duration: 0.9 }}
              className="text-white font-light text-lg mt-4 tracking-wide"
            >
              Developer · Analyst · Creator
            </motion.p>

            {/* Pulsing enter cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4, duration: 1.0 }}
              className="mt-16 flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-14 h-14 rounded-full border border-white/25 flex items-center justify-center"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white/80" />
              </motion.div>
              <p className="text-white/30 font-mono text-[10px] tracking-[0.3em] uppercase">
                Click anywhere to enter
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
