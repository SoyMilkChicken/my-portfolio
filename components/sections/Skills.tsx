'use client';

import { RevealText } from '@/components/animations/RevealText';

const rows = [
  ['Python', 'JavaScript', 'TypeScript', 'R', 'SQL', 'HTML/CSS', 'Node.js', 'Next.js', 'React', 'Tailwind CSS'],
  ['Statistical Analysis', 'Regression', 'R Shiny', 'Data Visualization', 'RAG', 'LangChain', 'Vector DBs', 'Prompt Engineering', 'OpenAI', 'FastAPI'],
  ['PostgreSQL', 'Supabase', 'MongoDB', 'Git', 'Vercel', 'VS Code', 'Jupyter', 'Pinecone', 'SAS', 'REST APIs'],
];

const animClasses = ['animate-marquee', 'animate-marquee-reverse', 'animate-marquee-slow'];

function Pill({ skill }: { skill: string }) {
  return (
    <span className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm font-medium text-neutral-600 whitespace-nowrap select-none">
      {skill}
    </span>
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
              A comprehensive toolkit for building modern, data-driven applications.
            </p>
          </RevealText>
        </div>
      </div>

      <div className="space-y-4">
        {rows.map((row, i) => (
          <div key={i} className="marquee-row overflow-hidden">
            <div
              className={`flex gap-3 ${animClasses[i]}`}
              style={{ width: 'max-content' }}
            >
              {[...row, ...row].map((skill, j) => (
                <Pill key={j} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
