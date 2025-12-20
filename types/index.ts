// Types for the portfolio website

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  features: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  award?: string;
  role?: string;
  category: 'ai' | 'web' | 'data' | 'fintech';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'programming' | 'framework' | 'data' | 'ai' | 'tools';
  icon?: string;
  color: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  type: 'education' | 'work' | 'achievement' | 'project';
  icon?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface StockData {
  symbol: string;
  name: string;
  allocation: number;
  color: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
