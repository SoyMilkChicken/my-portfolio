'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Trophy, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    id: 'ragtire',
    title: 'RAGTIRE',
    subtitle: 'AI-Powered Robo-Advisor',
    description: 'First-place winning robo-advisor utilizing RAG technology for personalized investment recommendations in the Taiwanese market.',
    award: '1st Place — SYSTEX 2025',
    tech: ['Python', 'LangChain', 'OpenAI', 'FastAPI'],
    image: '/images/ragtire.png',
    featured: true,
  },
  {
    id: 'luxury-caller',
    title: 'Luxury Caller ID',
    subtitle: 'Premium Caller Identification',
    description: 'Backend development for a premium caller identification application serving the US market.',
    tech: ['Next.js', 'Supabase', 'TypeScript'],
    image: '/images/caller-id.png',
  },
  {
    id: 'house-price-prediction',
    title: 'House Price Prediction',
    subtitle: 'Statistical Regression Analysis (Stat 512)',
    description: 'Developed a multiple linear regression model to predict real estate prices. Performed extensive variable selection, residual analysis, and diagnostic testing to identify key market drivers and optimize prediction accuracy.',
    tech: ['R', 'SAS', 'Linear Regression', 'Statistical Modeling'],
    image: '/images/house-price.png',
  },


];

export function Projects() {
  return (
    <section id="projects" className="section-padding bg-blueprint-dark">
      <div className="container-main">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="tag-mono mb-3">Projects</p>
          <h2 className="section-title mb-4">Selected work</h2>
          <p className="section-subtitle">
            A selection of projects showcasing my expertise in AI, full-stack development, and data analysis.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {/* Featured Project */}
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bento-card overflow-hidden"
            >
              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="aspect-[4/3] lg:aspect-auto relative bg-neutral-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[64px] font-bold text-neutral-200">
                      {project.title}
                    </span>
                  </div>
                  {/* Uncomment when you have the image */}
                  {/* <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  /> */}
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  {/* Award Badge */}
                  {project.award && (
                    <div className="flex items-center gap-2 mb-4">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span className="font-mono text-mono-xs text-amber-600 uppercase tracking-wider">
                        {project.award}
                      </span>
                    </div>
                  )}

                  <h3 className="text-headline-sm text-text-primary mb-2">
                    {project.title}
                  </h3>
                  <p className="text-body-sm text-text-muted mb-4">
                    {project.subtitle}
                  </p>
                  <p className="text-body text-text-secondary mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white border border-neutral-200 rounded-lg text-mono-xs text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <button className="link-text">
                    View project
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Other Projects */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bento-card group cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-[16/10] relative bg-neutral-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[40px] font-bold text-neutral-200">
                      {project.title}
                    </span>
                  </div>
                  {/* Uncomment when you have the image */}
                  {/* <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  /> */}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-title text-text-primary mb-1 flex items-center justify-between">
                    {project.title}
                    <ArrowUpRight className="w-5 h-5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-body-sm text-text-muted mb-3">
                    {project.subtitle}
                  </p>
                  <p className="text-body-sm text-text-secondary mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-white border border-neutral-200 rounded text-mono-xs text-text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/stanfeng"
            target="_blank"
            rel="noopener noreferrer"
            className="link-text"
          >
            View more on GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
