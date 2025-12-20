'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-blueprint"
    >
      <div className="container-main py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Text content */}
          <div className="order-2 lg:order-1">
            {/* Monospace tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="tag-mono mb-4"
            >
              Developer. Analyst. Creator.
            </motion.p>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display-sm sm:text-display-md lg:text-display text-text-primary mb-6"
            >
              Hi, I'm Stan Feng
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-body-lg text-text-secondary max-w-lg mb-8"
            >
              CNIT student at Purdue University building intelligent solutions 
              at the intersection of AI, data science, and financial technology. 
              1st place winner of the SYSTEX Competition 2025.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button onClick={scrollToProjects} className="btn-primary">
                View My Work
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button onClick={scrollToContact} className="btn-secondary">
                Get in Touch
              </button>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-8 mt-12 pt-8 border-t border-neutral-200"
            >
              {[
                { value: '1st', label: 'Place Winner' },
                { value: '3+', label: 'Projects' },
                { value: '2', label: 'Languages' },
              ].map((stat, index) => (
                <div key={stat.label}>
                  <p className="text-title text-text-primary">{stat.value}</p>
                  <p className="text-body-sm text-text-muted">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right side - Portrait / Abstract shape */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Main portrait container */}
              <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] lg:w-96 lg:h-[500px]">
                {/* Background abstract shapes */}
                <div className="absolute -top-4 -right-4 w-full h-full bg-neutral-100 rounded-3xl" />
                <div className="absolute -top-2 -right-2 w-full h-full bg-neutral-50 rounded-3xl" />
                
                {/* Portrait image */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-white shadow-elevated">
                  <Image
                    src="/images/profile.jpg"
                    alt="Stan Feng"
                    fill
                    className="object-cover object-top saturate-[0.6] hover:saturate-100 transition-all duration-500"
                    priority
                  />
                </div>

                {/* Decorative elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary-black rounded-2xl flex items-center justify-center"
                >
                  <span className="text-white font-mono text-mono-sm">{'</>'}</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -left-3 w-12 h-12 border-2 border-neutral-300 rounded-xl"
                />

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 -right-8 w-8 h-8 bg-neutral-200 rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
