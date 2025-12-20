'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="section-padding bg-blueprint-dark">
      <div className="container-main">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="tag-mono mb-3">About</p>
          <h2 className="section-title">A bit about me</h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-card">
              <Image
                src="/images/profile.jpg"
                alt="Stan Feng"
                fill
                className="object-cover object-top saturate-[0.7] hover:saturate-100 transition-all duration-500"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-body-lg text-text-secondary leading-relaxed">
              I'm a Data Analysis student at Purdue University 
              with a minor in Statistics. My journey in tech is driven by a fascination 
              with how data and AI can transform decision-making.
            </p>

            <p className="text-body text-text-secondary leading-relaxed">
              During my internship at SYSTEX Corporation, I developed RAGTIRE — an 
              AI-powered robo-advisor using Retrieval-Augmented Generation that won 
              1st place in the company-wide competition.
            </p>

            <p className="text-body text-text-secondary leading-relaxed">
              I'm passionate about FinTech, statistical analysis, and building 
              solutions that bridge the gap between complex data and actionable insights.
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-neutral-200">
              {[
                { label: 'Education', value: 'Purdue University' },
                { label: 'Major', value: 'Data Analysis' },
                { label: 'Minor', value: 'Statistics' },
                { label: 'Languages', value: 'English, Mandarin' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="tag-mono mb-1">{item.label}</p>
                  <p className="text-body font-medium text-text-primary">{item.value}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="link-text"
              >
                Get in touch
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
