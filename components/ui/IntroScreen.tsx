'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Camera, Code2, Rocket } from 'lucide-react';

// ─── Static data (deterministic — no SSR mismatch) ───────────────────────────

const sr = (seed: number) => { const x = Math.sin(seed + 1) * 10000; return x - Math.floor(x); };

const STARS = Array.from({ length: 65 }, (_, i) => ({
  w: sr(i * 3) * 2 + 1, h: sr(i * 3 + 1) * 2 + 1,
  left: sr(i * 7) * 100, top: sr(i * 11) * 100,
  op: sr(i * 5) * 0.4 + 0.1, dur: sr(i * 13) * 3 + 2, delay: sr(i * 17) * 4,
}));

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

// ─── Personas ─────────────────────────────────────────────────────────────────

const PERSONAS = [
  {
    id: 'photographer' as const,
    label: 'Photographer',
    sublabel: 'You know my lens',
    Icon: Camera,
    color: '#f43f5e',
    glowRgb: '244,63,94',
    scrollTo: '#gallery',
  },
  {
    id: 'engineer' as const,
    label: 'Engineer',
    sublabel: 'You need a builder',
    Icon: Code2,
    color: '#6366f1',
    glowRgb: '99,102,241',
    scrollTo: '#projects',
  },
  {
    id: 'founder' as const,
    label: 'Founder',
    sublabel: 'You believe in vision',
    Icon: Rocket,
    color: '#10b981',
    glowRgb: '16,185,129',
    scrollTo: '#timeline',
  },
] as const;

type PersonaId = typeof PERSONAS[number]['id'];
type Phase = 'idle' | 'selecting' | 'sweeping' | 'exit';

// ─── Feather SVG (reused from original) ──────────────────────────────────────

function Feather({ scale = 1 }: { scale?: number }) {
  return (
    <svg width={22 * scale} height={74 * scale} viewBox="0 0 22 74" fill="none"
      style={{ filter: 'drop-shadow(0 0 7px rgba(180,160,255,0.65))' }}>
      <path d="M11,1 C20,17 20,50 11,73 C2,50 2,17 11,1Z" fill="rgba(255,255,255,0.8)" />
      <line x1="11" y1="1"  x2="11" y2="73" stroke="rgba(255,255,255,0.95)" strokeWidth="0.8" />
      <line x1="11" y1="14" x2="4"  y2="24" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="25" x2="3"  y2="35" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="36" x2="3"  y2="45" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="46" x2="5"  y2="55" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="55" x2="8"  y2="63" stroke="rgba(255,255,255,0.32)" strokeWidth="0.7" />
      <line x1="11" y1="14" x2="18" y2="24" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="25" x2="19" y2="35" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="36" x2="19" y2="45" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="46" x2="17" y2="55" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <line x1="11" y1="55" x2="14" y2="63" stroke="rgba(255,255,255,0.32)" strokeWidth="0.7" />
    </svg>
  );
}

// ─── Vinyl Record ─────────────────────────────────────────────────────────────

function VinylRecord({
  persona,
  state,
  onClick,
}: {
  persona: typeof PERSONAS[number];
  state: 'idle' | 'selected' | 'dimmed';
  onClick: () => void;
}) {
  const isSelected = state === 'selected';
  const isDimmed   = state === 'dimmed';
  const { Icon, color, glowRgb, label, sublabel, id } = persona;

  // Groove ring radii (coarse + fine)
  const coarse = [84, 78, 72, 66, 60, 54, 48, 42];
  const fine   = [81, 75, 69, 63, 57, 51, 45, 39];

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Record wrapper */}
      <motion.div
        className="relative"
        style={{
          width:  'clamp(120px, 18vw, 165px)',
          height: 'clamp(120px, 18vw, 165px)',
          cursor: isDimmed ? 'default' : 'pointer',
        }}
        animate={{
          scale:   isSelected ? 1.12 : isDimmed ? 0.78 : 1,
          opacity: isDimmed ? 0.22 : 1,
          y:       isSelected ? -12 : 0,
          filter:  isDimmed ? 'blur(1px)' : 'blur(0px)',
        }}
        whileHover={state === 'idle' ? { scale: 1.06, y: -6 } : {}}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={state !== 'dimmed' ? onClick : undefined}
      >
        {/* Pulse glow behind selected record */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              key="glow"
              className="absolute inset-0 rounded-full pointer-events-none"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.5, 0.9, 0.5], scale: [1.2, 1.45, 1.2] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: `radial-gradient(circle, rgba(${glowRgb},0.55) 0%, transparent 70%)` }}
            />
          )}
        </AnimatePresence>

        {/* Spinning vinyl disc */}
        <motion.div
          className="absolute inset-0"
          animate={isSelected ? { rotate: 360 } : { rotate: 0 }}
          transition={
            isSelected
              ? { duration: 1.8, repeat: Infinity, ease: 'linear' }
              : { duration: 0.5, ease: 'easeOut' }
          }
          style={{ transformOrigin: 'center' }}
        >
          <svg viewBox="0 0 180 180" width="100%" height="100%">
            <defs>
              <radialGradient id={`sheen-${id}`} cx="32%" cy="28%" r="55%">
                <stop offset="0%"   stopColor="rgba(255,255,255,0.09)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
              </radialGradient>
              <radialGradient id={`label-${id}`} cx="38%" cy="32%" r="65%">
                <stop offset="0%"   stopColor="rgba(255,255,255,0.28)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.18)"       />
              </radialGradient>
            </defs>

            {/* Base disc */}
            <circle cx="90" cy="90" r="89" fill="#060606" />

            {/* Coarse grooves */}
            {coarse.map((r) => (
              <circle key={r} cx="90" cy="90" r={r} fill="none" stroke="#1e1e1e" strokeWidth="1.4" />
            ))}
            {/* Fine grooves */}
            {fine.map((r) => (
              <circle key={r} cx="90" cy="90" r={r} fill="none" stroke="#111" strokeWidth="0.5" />
            ))}

            {/* Center label */}
            <circle cx="90" cy="90" r="29" fill={color} />
            <circle cx="90" cy="90" r="29" fill={`url(#label-${id})`} />
            <circle cx="90" cy="90" r="29" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />

            {/* Center hole */}
            <circle cx="90" cy="90" r="4.5" fill="#000" />

            {/* Sheen overlay */}
            <circle cx="90" cy="90" r="89" fill={`url(#sheen-${id})`} />
          </svg>
        </motion.div>

        {/* Static icon — sits on top, doesn't spin */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Icon
            style={{
              width: 'clamp(16px, 2.8vw, 22px)',
              height: 'clamp(16px, 2.8vw, 22px)',
              color: '#fff',
              filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.6))',
            }}
          />
        </div>
      </motion.div>

      {/* Label below */}
      <motion.div
        className="text-center pointer-events-none"
        animate={{ opacity: isDimmed ? 0.2 : 1, y: isDimmed ? 4 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <p className="text-white font-semibold text-sm tracking-wide leading-none mb-1">
          {label}
        </p>
        <p className="font-mono text-[10px] tracking-widest uppercase"
          style={{ color: isDimmed ? 'rgba(255,255,255,0.2)' : color }}>
          {sublabel}
        </p>
      </motion.div>
    </div>
  );
}

// ─── Main IntroScreen ─────────────────────────────────────────────────────────

export function IntroScreen() {
  const [phase,    setPhase]    = useState<Phase>('idle');
  const [selected, setSelected] = useState<PersonaId | null>(null);
  const [mounted,  setMounted]  = useState(false);
  const [skip,     setSkip]     = useState(false);
  const scrollTarget = useRef<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem('sf_intro_v1')) setSkip(true);
  }, []);

  if (!mounted || skip) return null;

  const handleSelect = (persona: typeof PERSONAS[number]) => {
    if (phase !== 'idle') return;
    setSelected(persona.id);
    setPhase('selecting');
    scrollTarget.current = persona.scrollTo;
    // spin for 1.3s → sweep feathers → slide up
    setTimeout(() => setPhase('sweeping'), 1300);
    setTimeout(() => setPhase('exit'),     2100);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (phase !== 'idle') return;
    setPhase('sweeping');
    setTimeout(() => setPhase('exit'), 880);
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        sessionStorage.setItem('sf_intro_v1', '1');
        if (scrollTarget.current) {
          const el = document.querySelector(scrollTarget.current);
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }}
    >
      {phase !== 'exit' && (
        <motion.div
          key="intro"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.08 },
          }}
          className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
          style={{
            zIndex: 9985,
            background: 'linear-gradient(160deg, #0c0a1e 0%, #1a1040 40%, #231750 70%, #0f0c29 100%)',
          }}
        >
          {/* ── Stars ────────────────────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none">
            {STARS.map((s, i) => (
              <motion.div key={i} className="absolute rounded-full bg-white"
                style={{ width: s.w, height: s.h, left: `${s.left}%`, top: `${s.top}%`, opacity: s.op }}
                animate={{ opacity: [s.op, s.op * 0.15, s.op] }}
                transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }} />
            ))}
          </div>

          {/* ── Sweep feathers (on click) ─────────────────────────── */}
          {phase === 'sweeping' && SWEEP.map((f, i) => (
            <motion.div key={i} className="absolute pointer-events-none" style={{ top: `${f.y}%` }}
              initial={{ x: '-70px', opacity: 0, rotate: f.r0, scale: f.sc }}
              animate={{ x: '110vw', opacity: [0, f.op, f.op, 0], rotate: f.r1 }}
              transition={{ duration: f.dur, delay: f.d, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <Feather scale={f.sc} />
            </motion.div>
          ))}

          {/* ── Vignette ─────────────────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)' }} />

          {/* ── Center content ────────────────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center gap-10 select-none px-6 w-full">

            {/* Header text */}
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
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
                style={{ fontSize: 'clamp(44px, 10vw, 112px)', letterSpacing: '-0.03em' }}
              >
                Stan Feng
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: phase === 'selecting' ? 0 : 0.65, y: 0 }}
                transition={{ delay: 1.45, duration: 0.9 }}
                className="text-white text-base md:text-lg mt-4 font-light tracking-wide"
              >
                How do you know me?
              </motion.p>
            </div>

            {/* Vinyl records */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-end justify-center gap-6 md:gap-14"
            >
              {PERSONAS.map((p) => (
                <VinylRecord
                  key={p.id}
                  persona={p}
                  state={
                    selected === null ? 'idle'
                      : selected === p.id ? 'selected'
                      : 'dimmed'
                  }
                  onClick={() => handleSelect(p)}
                />
              ))}
            </motion.div>

            {/* Hint / skip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'selecting' ? 0 : 1 }}
              transition={{ delay: 2.6, duration: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <p className="text-white/30 font-mono text-[10px] tracking-[0.3em] uppercase">
                Pick your track
              </p>
              <button
                onClick={handleSkip}
                className="text-white/20 hover:text-white/50 font-mono text-[10px] tracking-widest uppercase transition-colors duration-200"
              >
                Explore all →
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
