'use client';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { RevealText } from '@/components/animations/RevealText';

const rows = [
  {
    label: 'Languages & Frameworks',
    anim: 'animate-marquee',
    color: 'bg-indigo-50 border-indigo-200/80 text-indigo-700',
    dot: 'bg-indigo-400',
    skills: ['Python', 'JavaScript', 'TypeScript', 'R', 'SQL', 'Swift', 'HTML / CSS', 'Node.js', 'Next.js', 'React', 'Tailwind CSS', 'FastAPI'],
  },
  {
    label: 'AI & Data Science',
    anim: 'animate-marquee-reverse',
    color: 'bg-violet-50 border-violet-200/80 text-violet-700',
    dot: 'bg-violet-400',
    skills: ['RAG', 'LangChain', 'OpenAI', 'Prompt Engineering', 'Vector DBs', 'Pinecone', 'Statistical Analysis', 'Regression', 'R Shiny', 'Data Visualization', 'SAS'],
  },
  {
    label: 'Tools & Infrastructure',
    anim: 'animate-marquee-slow',
    color: 'bg-sky-50 border-sky-200/80 text-sky-700',
    dot: 'bg-sky-400',
    skills: ['PostgreSQL', 'Supabase', 'MongoDB', 'Git', 'Vercel', 'Jupyter', 'VS Code', 'REST APIs', 'SwiftUI', 'SwiftData', 'Xcode'],
  },
  {
    label: 'Creative & Marketing',
    anim: 'animate-marquee-reverse',
    color: 'bg-rose-50 border-rose-200/80 text-rose-700',
    dot: 'bg-rose-400',
    skills: ['Photoshop', 'Lightroom', 'Premiere Pro', 'Video Editing', 'Photography', 'Content Creation', 'Brand Strategy', 'Social Media', 'Canva', 'Digital Marketing', 'SEO'],
  },
];

function Pill({ skill, color, dot }: { skill: string; color: string; dot: string }) {
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium whitespace-nowrap select-none transition-transform duration-200 hover:scale-105 ${color}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
      {skill}
    </span>
  );
}

function SkillRow({ row }: { row: typeof rows[number] }) {
  const [paused, setPaused] = useState(false);

  return (
    <div>
      {/* Row header: label + pause toggle */}
      <div className="container-main mb-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${row.dot}`} />
          <span className="tag-mono">{row.label}</span>
        </span>

        <button
          onClick={() => setPaused(p => !p)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-800 hover:border-neutral-300 transition-all duration-200 text-xs font-medium"
          aria-label={paused ? 'Resume' : 'Pause'}
        >
          {paused
            ? <><Play  className="w-3 h-3" /> Resume</>
            : <><Pause className="w-3 h-3" /> Pause</>
          }
        </button>
      </div>

      {/* Faded marquee track */}
      <div
        className="overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={`flex gap-3 ${row.anim}`}
          style={{
            width: 'max-content',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {[...row.skills, ...row.skills].map((skill, j) => (
            <Pill key={j} skill={skill} color={row.color} dot={row.dot} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-padding bg-blueprint overflow-hidden">
      <div className="container-main">
        <div className="mb-16">
          <RevealText delay={0}><p className="tag-mono mb-3">Skills</p></RevealText>
          <RevealText delay={0.1}><h2 className="section-title mb-4">What I work with</h2></RevealText>
          <RevealText delay={0.2}>
            <p className="section-subtitle">
              A toolkit spanning engineering, data science, and creative production.
            </p>
          </RevealText>
        </div>
      </div>

      <div className="space-y-8">
        {rows.map((row, i) => (
          <SkillRow key={i} row={row} />
        ))}
      </div>
    </section>
  );
}
