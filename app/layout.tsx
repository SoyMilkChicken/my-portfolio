import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stan Feng — Developer & Analyst',
  description:
    'Portfolio of Stan Feng - Purdue CNIT student specializing in AI, SQL, statistical analysis, and FinTech development. 1st place SYSTEX competition winner.',
  keywords: [
    'Stan Feng',
    'Purdue CNIT',
    'FinTech developer',
    'AI developer',
    'SQL expert',
    'data analysis',
    'portfolio',
  ],
  authors: [{ name: 'Stan Feng' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stanfeng.dev',
    title: 'Stan Feng — Developer & Analyst',
    description: 'AI-powered FinTech solutions and data-driven development.',
    siteName: 'Stan Feng',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-apple-blue focus:text-white focus:rounded-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
