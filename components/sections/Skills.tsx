'use client';

import { motion } from 'framer-motion';
import { Code, Database, BarChart3, Brain, Globe, Server } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming',
    icon: Code,
    skills: ['R', 'SQL', 'JavaScript', 'Python', 'HTML/CSS'],
    description: 'Building robust applications',
  },
  {
    title: 'Frameworks',
    icon: Globe,
    skills: ['Next.js', 'React', 'Tailwind CSS', 'Node.js'],
    description: 'Modern web development',
  },
  {
    title: 'Data Science',
    icon: BarChart3,
    skills: ['Statistical Analysis', 'Regression', 'R Shiny', 'Visualization'],
    description: 'Data-driven insights',
  },
  {
    title: 'AI & ML',
    icon: Brain,
    skills: ['RAG', 'LangChain', 'Vector DBs', 'Prompt Engineering'],
    description: 'Intelligent solutions',
  },
  {
    title: 'Databases',
    icon: Database,
    skills: ['PostgreSQL', 'Supabase', 'MongoDB'],
    description: 'Data management',
  },
  {
    title: 'Tools',
    icon: Server,
    skills: ['Git', 'Vercel', 'VS Code', 'Jupyter'],
    description: 'Development workflow',
  },
];

export function Skills() {
  return (
    <section id="skills" className="section-padding bg-blueprint">
      <div className="container-main">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="tag-mono mb-3">Skills</p>
          <h2 className="section-title mb-4">What I work with</h2>
          <p className="section-subtitle">
            A comprehensive toolkit for building modern, data-driven applications.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bento-card p-6"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center mb-4">
                <category.icon className="w-5 h-5 text-text-primary" />
              </div>

              {/* Title & Description */}
              <h3 className="text-title text-text-primary mb-1">
                {category.title}
              </h3>
              <p className="text-body-sm text-text-muted mb-4">
                {category.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-white border border-neutral-200 rounded-lg text-mono-xs text-text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
