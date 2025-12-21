'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Trophy, ArrowUpRight, X, Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  award?: string;
  tech: string[];
  image: string;
  featured?: boolean;
  links?: {
    github?: string;
    live?: string;
  };
}

const projects: Project[] = [
  {
    id: 'ragtire',
    title: 'RAGTIRE',
    subtitle: 'AI-Powered Robo-Advisor',
    description: 'First-place winning robo-advisor utilizing RAG technology for personalized investment recommendations in the Taiwanese market.',
    longDescription: 'RAGTIRE is an innovative AI-powered financial advisor that leverages Retrieval-Augmented Generation (RAG) technology to provide personalized investment recommendations.\n\nKey achievements:\n• Built a complete RAG pipeline using LangChain and OpenAI\n• Integrated real-time market data from Taiwanese stock exchanges\n• Developed a user-friendly chat interface for natural language queries\n• Implemented vector database for efficient document retrieval\n• Won 1st place among 50+ project submissions',
    award: '1st Place — SYSTEX 2025',
    tech: ['Python', 'LangChain', 'OpenAI', 'FastAPI', 'Pinecone', 'React'],
    image: '/images/ragtire.jpg',
    featured: true,
    links: {
      github: 'https://github.com/stanfeng/ragtire',
    },
  },
  {
    id: 'luxury-caller',
    title: 'Luxury Caller ID',
    subtitle: 'Premium Caller Identification',
    description: 'Backend development for a premium caller identification application serving the US market.',
    longDescription: 'A sophisticated caller identification service designed for the premium market segment.\n\nMy contributions:\n• Architected scalable serverless backend using Next.js API routes\n• Designed PostgreSQL database schema for efficient caller lookups\n• Implemented real-time data sync with Supabase\n• Built RESTful API with sub-100ms response times\n• Set up authentication and subscription management',
    tech: ['Next.js', 'Supabase', 'TypeScript', 'PostgreSQL'],
    image: '/images/caller-id.png',
    featured: false,
  },
  {
    id: 'house-price-prediction',
    title: 'House Price Prediction',
    subtitle: 'Statistical Regression Analysis (Stat 512)',
    description: 'Developed a multiple linear regression model to predict real estate prices. Performed extensive variable selection, residual analysis, and diagnostic testing to identify key market drivers and optimize prediction accuracy.',
    longDescription: 'A comprehensive statistical analysis project from STAT 512 focusing on real estate price prediction.\n\nMethodology:\n• Performed exploratory data analysis on 1,400+ property records\n• Applied multiple variable selection techniques (Forward, Backward, Stepwise)\n• Conducted residual analysis and diagnostic testing\n• Identified multicollinearity issues using VIF analysis\n• Applied Box-Cox transformation for normality\n• Achieved R² of 0.89 on test data\n\nKey findings:\n• Square footage and location are the strongest predictors\n• Age of property has non-linear relationship with price\n• Seasonal patterns affect sale prices significantly',
    tech: ['R', 'SAS', 'Linear Regression', 'Statistical Modeling'],
    image: '/images/house-price.png',
    featured: false,
    links: {
      github: 'https://github.com/stanfeng/house-price-prediction',
    },
  },
];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-8 pb-0">
          <div>
            {project.award && (
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-medium text-amber-600">{project.award}</span>
              </div>
            )}
            <h2 className="text-2xl font-semibold text-neutral-900">{project.title}</h2>
            <p className="text-sm text-neutral-500 mt-1">{project.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[60vh]">
          <div className="mb-6">
            {project.longDescription.split('\n').map((paragraph, index) => (
              <p key={index} className="text-base text-neutral-600 mb-3 whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-neutral-100 border border-neutral-200 rounded-lg text-xs text-neutral-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.links && (project.links.github || project.links.live) && (
            <div className="flex gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding bg-blueprint-dark">
      <div className="container-main">
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

        <div className="space-y-6">
          {projects.filter(p => p.featured).map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bento-card overflow-hidden"
            >
              <div className="grid lg:grid-cols-2">
                <div className="aspect-[4/4] relative bg-neutral-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  {project.award && (
                    <div className="flex items-center gap-2 mb-4">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span className="font-mono text-xs text-amber-600 uppercase tracking-wider">
                        {project.award}
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-500 mb-4">
                    {project.subtitle}
                  </p>
                  <p className="text-base text-neutral-600 mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="link-text"
                  >
                    View project
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="grid md:grid-cols-2 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bento-card group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[16/10] relative bg-neutral-100 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-1 flex items-center justify-between">
                    {project.title}
                    <ArrowUpRight className="w-5 h-5 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-neutral-500 mb-3">
                    {project.subtitle}
                  </p>
                  <p className="text-sm text-neutral-600 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-white border border-neutral-200 rounded text-xs text-neutral-500"
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

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
