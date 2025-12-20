# Stan Feng Portfolio Website

A modern, animated portfolio website built with Next.js 14, featuring a cyberpunk-inspired design with neon accents, smooth animations, and interactive elements.

![Portfolio Preview](./public/og-image.png)

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Stunning Animations**: Framer Motion powered animations with scroll-triggered reveals
- **Interactive Elements**: Particle background, radar charts, skill visualizations
- **Responsive Design**: Fully responsive across all device sizes
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation support
- **Performance Optimized**: Lazy loading, optimized images, code splitting
- **Contact Form**: Working contact form with validation (Supabase ready)

## 📦 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend**: [Supabase](https://supabase.com/) (optional)
- **Deployment**: [Vercel](https://vercel.com/)

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Step-by-Step Setup (Cursor on MacBook Pro M4 Pro)

1. **Clone or create the project**

   ```bash
   # If you have the files, navigate to the project directory
   cd portfolio-website

   # Or create a new Next.js project
   npx create-next-app@latest portfolio-website --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` with your actual values (optional for development).

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Cursor IDE Tips

1. **Open the project**:
   - Open Cursor
   - File → Open Folder → Select `portfolio-website`

2. **Install recommended extensions** (Cursor will prompt):
   - ESLint
   - Tailwind CSS IntelliSense
   - TypeScript and JavaScript Language Features

3. **Terminal commands**:
   - Use `Cmd + J` to open the integrated terminal
   - Run `npm run dev` to start development

4. **AI Assistance**:
   - Use `Cmd + K` for inline code generation
   - Use `Cmd + L` to chat with AI about the codebase

## 📁 Project Structure

```
portfolio-website/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── globals.css               # Global styles & Tailwind
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main page component
├── components/
│   ├── animations/
│   │   ├── AnimatedSection.tsx   # Scroll animation wrapper
│   │   ├── ParticleBackground.tsx # Canvas particle effect
│   │   └── ScrollProgress.tsx    # Scroll progress indicator
│   ├── layout/
│   │   ├── Navbar.tsx            # Navigation bar
│   │   └── Footer.tsx            # Site footer
│   └── sections/
│       ├── Hero.tsx              # Hero section with typewriter
│       ├── About.tsx             # About me section
│       ├── Skills.tsx            # Skills with radar chart
│       ├── Projects.tsx          # Featured projects
│       ├── Statistics.tsx        # Data visualizations
│       ├── Timeline.tsx          # Experience timeline
│       └── Contact.tsx           # Contact form
├── lib/
│   ├── supabase.ts               # Supabase client config
│   └── utils.ts                  # Utility functions
├── types/
│   └── index.ts                  # TypeScript types
├── public/
│   ├── images/                   # Static images
│   └── icons/                    # Favicon & icons
├── .env.example                  # Environment variables template
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies
```

## 🎨 Customization

### Changing Colors

Edit the color palette in `tailwind.config.ts`:

```typescript
colors: {
  neon: {
    cyan: '#00f5ff',    // Primary accent
    blue: '#0066ff',    // Secondary accent
    purple: '#8b5cf6',  // Tertiary accent
    pink: '#ff00ff',    // Highlight
    green: '#00ff88',   // Success/available
  },
  dark: {
    900: '#0a0a0f',     // Darkest background
    800: '#0f0f1a',     // Card backgrounds
    // ...
  },
}
```

### Adding New Sections

1. Create a new component in `components/sections/`
2. Import and add to `app/page.tsx`
3. Add navigation link in `components/layout/Navbar.tsx`

### Modifying Content

All content is defined within each section component. Key files to edit:

- `components/sections/Hero.tsx` - Name, tagline, roles
- `components/sections/About.tsx` - Bio, highlights, interests
- `components/sections/Skills.tsx` - Skill categories and levels
- `components/sections/Projects.tsx` - Project details
- `components/sections/Timeline.tsx` - Experience events
- `components/sections/Contact.tsx` - Contact info, social links

## 🗄️ Supabase Setup (Optional)

1. Create a [Supabase](https://supabase.com/) project

2. Create the contact submissions table:

   ```sql
   CREATE TABLE contact_submissions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     subject TEXT NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

   -- Allow inserts from anyone (for the contact form)
   CREATE POLICY "Allow public inserts" ON contact_submissions
     FOR INSERT TO anon
     WITH CHECK (true);
   ```

3. Add your Supabase credentials to `.env.local`

4. Uncomment the Supabase integration in `app/api/contact/route.ts`

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com/) and import your repository

3. Configure environment variables in Vercel dashboard

4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Build for Production

```bash
npm run build
npm run start
```

## 📊 Performance

Target Lighthouse scores:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

## 🔧 Troubleshooting

### Common Issues on M4 Pro Mac

1. **Node version issues**:
   ```bash
   # Use nvm to manage Node versions
   nvm install 20
   nvm use 20
   ```

2. **Port already in use**:
   ```bash
   # Kill process on port 3000
   lsof -i :3000
   kill -9 <PID>
   ```

3. **Module not found errors**:
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules .next
   npm install
   ```

4. **Tailwind styles not applying**:
   - Ensure `content` paths in `tailwind.config.ts` include all component files
   - Restart the dev server

## 📝 License

MIT License - feel free to use this as a template for your own portfolio!

## 🙏 Acknowledgments

- Design inspiration from modern web portfolios
- Icons by [Lucide](https://lucide.dev/)
- Fonts: Orbitron, JetBrains Mono, Sora

---

Built with ❤️ by Stan Feng
