# Lyo Website

Marketing website for LYO - Virtual Fitting Room platform.

## Overview

The Lyo Website is a modern, responsive marketing site built with React that showcases:
- Product features and benefits
- How it works (3-step process)
- Pricing plans
- Interactive demos
- Call-to-action sections

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.0
- **Routing**: React Router (if needed)
- **Animations**: CSS animations and transitions

## Project Structure

```
src/
├── app/              # Application setup
├── components/       # React components
│   ├── Hero.tsx      # Hero section
│   ├── HowItWorks.tsx # How it works section
│   ├── Pricing.tsx   # Pricing section
│   ├── Wardrobe.tsx  # Wardrobe showcase
│   └── ...
├── lib/              # Utilities
│   └── auth.ts       # Authentication helpers
└── styles.css        # Global styles
```

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm nx serve lyo-website

# Build for production
pnpm nx build lyo-website

# Preview production build
pnpm nx preview lyo-website

# Run tests
pnpm nx test lyo-website
```

## Key Features

- **Responsive Design**: Mobile-first, works on all screen sizes
- **Interactive Elements**: Animated browser mockups and demos
- **Modern UI**: Clean, minimalist design with smooth animations
- **SEO Optimized**: Meta tags and Open Graph images
- **Performance**: Optimized assets and lazy loading

## Sections

1. **Hero**: Main value proposition and CTA
2. **How It Works**: 3-step process explanation
3. **Pricing**: Pricing plans and features
4. **Wardrobe**: Showcase of virtual wardrobe feature
5. **Footer**: Links and additional information

## Styling

- Uses Tailwind CSS 4.0 with custom theme
- Responsive typography with `clamp()` for fluid scaling
- Custom animations for interactive elements
- Brand colors and typography (Manrope, Tenor Sans)

## Deployment

The website is typically deployed to Vercel or similar platforms. The build output is in `dist/` directory.

