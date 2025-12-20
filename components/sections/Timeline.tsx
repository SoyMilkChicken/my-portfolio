'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Trophy, Code } from 'lucide-react';

const timelineEvents = [
  {
    id: '1',
    title: 'Data Analysis',
    organization: 'Purdue University',
    date: '2022 — Present',
    description: 'Pursuing a Data Analysis major with a Statistics minor, focusing on data science, AI, and software development.',
    highlights: ['Statistics Minor', 'STAT 512', 'CNIT 372'],
    icon: GraduationCap,
  },
  {
    id: '2',
    title: 'Software Engineering Intern',
    organization: 'SYSTEX Corporation',
    date: 'Summer 2024',
    description: 'Developed AI-powered solutions for the financial technology sector, working on RAG applications.',
    highlights: ['RAGTIRE', 'LangChain', 'Vector DBs'],
    icon: Briefcase,
  },
  {
    id: '3',
    title: '1st Place Winner',
    organization: 'SYSTEX Competition 2025',
    date: 'January 2025',
    description: 'Won first place with RAGTIRE, an AI-powered robo-advisor using Retrieval-Augmented Generation.',
    highlights: ['50+ submissions', 'Innovation award'],
    icon: Trophy,
  },
  {
    id: '4',
    title: 'Backend Developer',
    organization: 'Luxury Caller ID App',
    date: '2024 — Present',
    description: 'Leading backend development for a premium caller identification service.',
    highlights: ['Next.js', 'Supabase', 'PostgreSQL'],
    icon: Code,
  },
];

export function Timeline() {
  return (
    <section id="timeline" className="section-padding bg-blueprint">
      <div className="container-narrow">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="tag-mono mb-3">Experience</p>
          <h2 className="section-title mb-4">My journey</h2>
          <p className="section-subtitle">
            From education to building real-world solutions.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-0">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex gap-6">
                {/* Timeline line and icon */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center z-10">
                    <event.icon className="w-5 h-5 text-text-primary" />
                  </div>
                  {index < timelineEvents.length - 1 && (
                    <div className="w-px h-full bg-neutral-200 my-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-10">
                  {/* Date */}
                  <p className="tag-mono mb-2">{event.date}</p>

                  {/* Title */}
                  <h3 className="text-title text-text-primary mb-1">
                    {event.title}
                  </h3>

                  {/* Organization */}
                  <p className="text-body-sm text-text-muted mb-3">
                    {event.organization}
                  </p>

                  {/* Description */}
                  <p className="text-body text-text-secondary mb-4">
                    {event.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {event.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded-lg text-mono-xs text-text-muted"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
