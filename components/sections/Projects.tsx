'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionProps,
} from 'framer-motion';
import { ArrowRight, Trophy, ArrowUpRight, X, Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { RevealText } from '@/components/animations/RevealText';

// ─── Tilt card ────────────────────────────────────────────────────────────────

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotate?: number;
  onClick?: () => void;
  initial?: MotionProps['initial'];
  whileInView?: MotionProps['whileInView'];
  transition?: MotionProps['transition'];
  viewport?: MotionProps['viewport'];
}

function TiltCard({
  children,
  className = '',
  maxRotate = 8,
  onClick,
  initial,
  whileInView,
  transition,
  viewport,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [maxRotate, -maxRotate]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-maxRotate, maxRotate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.div
        ref={ref}
        initial={initial}
        whileInView={whileInView}
        transition={transition}
        viewport={viewport}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        onClick={onClick}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Image slideshow ──────────────────────────────────────────────────────────

function ImageSlideshow({
  images,
  alt,
  className = '',
}: {
  images: string[];
  alt: string;
  className?: string;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setCurrent(p => (p + 1) % images.length), 3000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`${alt} — screenshot ${current + 1}`}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setCurrent(i); }}
              aria-label={`Go to image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-5 bg-white'
                  : 'w-1.5 bg-white/45 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  award?: string;
  tech: string[];
  /** Multiple images — cycle every 3 s. First image is used as thumbnail fallback. */
  images: string[];
  featured?: boolean;
  links?: { github?: string; live?: string };
}

const projects: Project[] = [
  {
    id: 'ragtire',
    title: 'RAGTIRE',
    subtitle: 'AI-Powered Robo-Advisor',
    description:
      'First-place winning robo-advisor utilizing RAG technology for personalized investment recommendations in the Taiwanese market.',
    longDescription:
      'RAGTIRE is an innovative AI-powered financial advisor that leverages Retrieval-Augmented Generation (RAG) technology to provide personalized investment recommendations.\n\nKey achievements:\n• Built a complete RAG pipeline using LangChain and OpenAI\n• Integrated real-time market data from Taiwanese stock exchanges\n• Developed a user-friendly chat interface for natural language queries\n• Implemented vector database for efficient document retrieval\n• Won 1st place among 50+ project submissions',
    award: '1st Place — SYSTEX Aug 2025',
    tech: ['Python', 'LangChain', 'OpenAI', 'FastAPI', 'Pinecone', 'React'],
    images: ['/images/ragtire.jpg'],
    featured: true,
    links: { github: 'https://github.com/stanfeng/ragtire' },
  },
  {
    id: 'alpha-factory',
    title: 'Alpha Factory Native',
    subtitle: 'iOS Wealth Intelligence & LifeOS',
    description:
      'A modular iOS app for tracking net worth, expenses with opportunity cost analysis, fitness PRs, career CRM, and deep work — all local-first with Face ID security.',
    longDescription:
      'Alpha Factory Native is a comprehensive "LifeOS" iOS application designed around wealth intelligence and personal optimization.\n\nCore Modules:\n• Wealth — Net worth dashboard with multi-currency support (USD/TWD), real-time stock quotes via Yahoo Finance API, and expense logging that calculates 10-year opportunity cost at 8% CAGR\n• Iron — Fitness tracking with exercise library and personal record progression\n• Rainmaker — Career CRM with contact management and job application Kanban board\n• Protocol — Deep work timer with calendar integration and objective tracking\n\nTechnical Highlights:\n• Built with Swift 6 and strict concurrency\n• SwiftUI + SwiftData for local-first persistence (no cloud dependency)\n• Three custom themes with neumorphic design system\n• Face ID/Touch ID authentication\n• Apple Calendar sync for expense tracking\n• Bilingual support (English & Traditional Chinese)',
    tech: ['Swift', 'SwiftUI', 'SwiftData', 'EventKit', 'Yahoo Finance API'],
    // ← Add more screenshots here: '/images/alpha-factory-2.png', '/images/alpha-factory-3.png'
    images: ['/images/alpha-factory.png'],
    featured: false,
    links: { github: 'https://github.com/stanfeng/alpha-factory-native' },
  },
  {
    id: 'house-price-prediction',
    title: 'House Price Prediction',
    subtitle: 'Statistical Regression Analysis (Stat 512)',
    description:
      'Developed a multiple linear regression model to predict real estate prices. Performed extensive variable selection, residual analysis, and diagnostic testing to identify key market drivers.',
    longDescription:
      'A comprehensive statistical analysis project from STAT 512 focusing on real estate price prediction.\n\nMethodology:\n• Performed exploratory data analysis on 1,400+ property records\n• Applied multiple variable selection techniques (Forward, Backward, Stepwise)\n• Conducted residual analysis and diagnostic testing\n• Identified multicollinearity issues using VIF analysis\n• Applied Box-Cox transformation for normality\n• Achieved R² of 0.89 on test data\n\nKey findings:\n• Square footage and location are the strongest predictors\n• Age of property has non-linear relationship with price\n• Seasonal patterns affect sale prices significantly',
    tech: ['R', 'SAS', 'Linear Regression', 'Statistical Modeling'],
    images: ['/images/house-price.png'],
    featured: false,
    links: { github: 'https://github.com/stanfeng/house-price-prediction' },
  },
];

// ─── Modal ────────────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

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
        onClick={e => e.stopPropagation()}
      >
        {/* Modal image slideshow */}
        <div className="aspect-video relative bg-neutral-100">
          <ImageSlideshow images={project.images} alt={project.title} />
        </div>

        <div className="flex items-start justify-between px-8 pt-6 pb-0">
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

        <div className="p-8 overflow-y-auto max-h-[45vh]">
          <div className="mb-6">
            {project.longDescription.split('\n').map((para, i) => (
              <p key={i} className="text-base text-neutral-600 mb-3 whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1 bg-neutral-100 border border-neutral-200 rounded-lg text-xs text-neutral-600">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {project.links && (project.links.github || project.links.live) && (
            <div className="flex gap-3">
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2">
                  <Github className="w-4 h-4" /> View Code
                </a>
              )}
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const handleOpen = useCallback((p: Project) => setSelectedProject(p), []);
  const handleClose = useCallback(() => setSelectedProject(null), []);

  return (
    <section id="projects" className="section-padding bg-blueprint-dark">
      <div className="container-main">
        <div className="mb-16">
          <RevealText delay={0}><p className="tag-mono mb-3">Projects</p></RevealText>
          <RevealText delay={0.1}><h2 className="section-title mb-4">Selected work</h2></RevealText>
          <RevealText delay={0.2}>
            <p className="section-subtitle">
              A selection of projects showcasing my expertise in AI, full-stack development, and data analysis.
            </p>
          </RevealText>
        </div>

        <div className="space-y-6">
          {/* Featured (large) cards */}
          {projects.filter(p => p.featured).map(project => (
            <TiltCard
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              maxRotate={5}
              className="bento-card overflow-hidden"
            >
              <div className="grid lg:grid-cols-2">
                <div className="aspect-square relative bg-neutral-100">
                  <ImageSlideshow images={project.images} alt={project.title} />
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
                  <h3 className="text-2xl font-semibold text-neutral-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-neutral-500 mb-4">{project.subtitle}</p>
                  <p className="text-base text-neutral-600 mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-600">{t}</span>
                    ))}
                  </div>

                  <button onClick={() => handleOpen(project)} className="link-text">
                    View project <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}

          {/* Grid cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => (
              <TiltCard
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                maxRotate={9}
                className="bento-card group cursor-pointer h-full"
                onClick={() => handleOpen(project)}
              >
                <div className="aspect-[16/10] relative bg-neutral-100 overflow-hidden">
                  <ImageSlideshow images={project.images} alt={project.title} />
                  {/* hover overlay arrow */}
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowUpRight className="w-4 h-4 text-neutral-700" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-1">{project.title}</h3>
                  <p className="text-sm text-neutral-500 mb-3">{project.subtitle}</p>
                  <p className="text-sm text-neutral-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map(t => (
                      <span key={t} className="px-2 py-0.5 bg-white border border-neutral-200 rounded text-xs text-neutral-500">{t}</span>
                    ))}
                  </div>
                </div>
              </TiltCard>
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
          <a href="https://github.com/stanfeng" target="_blank" rel="noopener noreferrer" className="link-text">
            View more on GitHub <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
}
