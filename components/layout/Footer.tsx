'use client';

import { Github, Linkedin, Mail } from 'lucide-react';

const footerLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#timeline' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, url: 'https://github.com/stanfeng', label: 'GitHub' },
  { icon: Linkedin, url: 'https://linkedin.com/in/stanfeng', label: 'LinkedIn' },
  { icon: Mail, url: 'mailto:stan.feng@purdue.edu', label: 'Email' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="container-main py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Copyright */}
          <p className="text-body-sm text-text-muted">
            © {currentYear} Stan Feng. All rights reserved.
          </p>

          {/* Center - Links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-body-sm text-text-muted hover:text-text-primary transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right - Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
