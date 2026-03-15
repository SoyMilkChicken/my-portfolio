'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Code2, Rocket, ArrowRight } from 'lucide-react';
import { RevealText } from '@/components/animations/RevealText';

const PERSONAS = [
  {
    id: 'photographer',
    track: '01',
    label: 'Photographer',
    tagline: 'Every frame tells a story.',
    description:
      "You've seen my work through a lens — architecture, travel, moments. I shoot on Sony and I care about light.",
    icon: Camera,
    accent: 'from-rose-500 to-orange-400',
    glow: 'shadow-rose-500/30',
    ring: 'ring-rose-400/60',
    dot: 'bg-rose-400',
    ctas: [
      { label: 'View Gallery', href: '#gallery' },
      { label: 'Book a Shoot', href: '#contact', primary: true },
    ],
  },
  {
    id: 'engineer',
    track: '02',
    label: 'Engineer',
    tagline: 'I build things that actually work.',
    description:
      "Full-stack dev, data scientist, AI integrator. You need someone who ships — from idea to production.",
    icon: Code2,
    accent: 'from-indigo-500 to-violet-500',
    glow: 'shadow-indigo-500/30',
    ring: 'ring-indigo-400/60',
    dot: 'bg-indigo-400',
    ctas: [
      { label: 'See Projects', href: '#projects', primary: true },
      { label: 'My Skills', href: '#skills' },
    ],
  },
  {
    id: 'founder',
    track: '03',
    label: 'Founder',
    tagline: 'Vision backed by execution.',
    description:
      "I start companies. Alpha Factory, Talent One — I find problems worth solving and build the team to solve them.",
    icon: Rocket,
    accent: 'from-emerald-400 to-teal-500',
    glow: 'shadow-emerald-500/30',
    ring: 'ring-emerald-400/60',
    dot: 'bg-emerald-400',
    ctas: [
      { label: 'My Journey', href: '#timeline', primary: true },
      { label: 'Get in Touch', href: '#contact' },
    ],
  },
] as const;

type PersonaId = typeof PERSONAS[number]['id'];

function DiscRing({ accent }: { accent: string }) {
  return (
    <div className="relative w-14 h-14 shrink-0">
      {/* Outer ring */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${accent} opacity-20`} />
      {/* Middle ring */}
      <div className="absolute inset-[5px] rounded-full border border-white/10 bg-neutral-900" />
      {/* Center hole */}
      <div className="absolute inset-[18px] rounded-full bg-neutral-950" />
      {/* Highlight */}
      <div className="absolute inset-[5px] rounded-full bg-gradient-to-br from-white/5 to-transparent" />
    </div>
  );
}

export function Personas() {
  const [active, setActive] = useState<PersonaId | null>(null);

  function handleSelect(id: PersonaId, href: string) {
    setActive(id);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }

  return (
    <section className="section-padding bg-neutral-950 overflow-hidden">
      <div className="container-main">
        {/* Header */}
        <div className="mb-14 text-center">
          <RevealText delay={0}>
            <p className="tag-mono text-neutral-500 mb-3">Identity</p>
          </RevealText>
          <RevealText delay={0.1}>
            <h2 className="text-headline-sm text-white mb-3">
              How do you know me?
            </h2>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="text-neutral-400 text-body max-w-md mx-auto">
              Pick the track that fits — or explore all three.
            </p>
          </RevealText>
        </div>

        {/* Track cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PERSONAS.map((p, i) => {
            const Icon = p.icon;
            const isActive = active === p.id;

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                onClick={() => setActive(isActive ? null : p.id)}
                className={`
                  relative group cursor-pointer rounded-2xl border bg-neutral-900
                  transition-all duration-400 overflow-hidden
                  ${isActive
                    ? `ring-2 ${p.ring} border-transparent shadow-2xl ${p.glow}`
                    : 'border-white/[0.06] hover:border-white/20'}
                `}
              >
                {/* Gradient wash on active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="wash"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-[0.07] pointer-events-none`}
                    />
                  )}
                </AnimatePresence>

                {/* Content */}
                <div className="relative p-7 flex flex-col gap-5 h-full">
                  {/* Track row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DiscRing accent={p.accent} />
                      <span className="font-mono text-xs text-neutral-600 tracking-widest">
                        {p.track}
                      </span>
                    </div>
                    {/* Playing indicator */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          key="bars"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-end gap-[3px] h-4"
                        >
                          {[1, 2, 3].map((b) => (
                            <motion.span
                              key={b}
                              className={`w-[3px] rounded-full bg-gradient-to-t ${p.accent}`}
                              animate={{ height: ['8px', '16px', '8px'] }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: b * 0.15,
                                ease: 'easeInOut',
                              }}
                              style={{ height: '8px' }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Icon + label */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${p.accent} bg-opacity-20`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-semibold text-lg tracking-tight">
                      {p.label}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className={`font-mono text-xs tracking-wide bg-gradient-to-r ${p.accent} bg-clip-text text-transparent`}>
                    {p.tagline}
                  </p>

                  {/* Description — revealed when active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        key="desc"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-neutral-400 text-sm leading-relaxed overflow-hidden"
                      >
                        {p.description}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* CTAs */}
                  <div className={`flex flex-wrap gap-2 mt-auto pt-2 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}>
                    {p.ctas.map((cta) => (
                      <a
                        key={cta.label}
                        href={cta.href}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(p.id, cta.href);
                        }}
                        className={`
                          inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200
                          ${'primary' in cta && cta.primary
                            ? `bg-gradient-to-r ${p.accent} text-white hover:opacity-90`
                            : 'bg-white/[0.07] text-neutral-300 hover:bg-white/[0.12]'}
                        `}
                      >
                        {cta.label}
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Divider hint */}
        <div className="mt-12 text-center">
          <p className="text-neutral-700 text-xs font-mono tracking-widest">
            — OR SCROLL TO EXPLORE ALL —
          </p>
        </div>
      </div>
    </section>
  );
}
