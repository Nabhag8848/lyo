# Lyo Dashboard

User dashboard web application for managing avatars, viewing wardrobe, and account settings.

## Overview

The Lyo Dashboard is a React-based single-page application that provides users with:

- Avatar creation and management
- Reference photo upload and selection
- Wardrobe viewing
- Account settings
- Responsive design for mobile, tablet, and desktop

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.0
- **Routing**: React Router
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Fetch API
- **Form Handling**: React Hook Form (if used)
- **Icons**: SVG icons

## Project Structure

```
src/
├── app/              # Application setup and routing
│   ├── components/   # App-level components
│   ├── context/      # React contexts (Query Client, etc.)
│   ├── hooks/       # Custom hooks
│   ├── layout/       # Layout components
│   └── utils/       # Utility functions
├── modules/          # Feature modules
│   ├── auth/        # Authentication
│   ├── onboarding/  # Avatar onboarding flow
│   ├── settings/    # Settings page
│   ├── sidebar/     # Sidebar navigation
│   └── user/        # User management
└── styles.css       # Global styles
```

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm nx serve lyo-dashboard

# Build for production
pnpm nx build lyo-dashboard

# Run tests
pnpm nx test lyo-dashboard

# Preview production build
pnpm nx preview lyo-dashboard
```

## Key Features

- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Avatar Onboarding**: Step-by-step flow for creating avatars
- **Reference Photo Management**: Upload, select, and manage reference photos
- **Authentication**: Integrated with backend auth system
- **Real-time Updates**: Uses React Query for data fetching and caching

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1023px (sm, md)
- **Desktop**: 1024px+ (lg, xl, 2xl)

## Styling

- Uses Tailwind CSS 4.0 with custom theme configuration
- Responsive font sizing with `clamp()` for fluid typography
- Custom color palette and animations
- Relative units (rem, em, %) for responsive design

## Environment Variables

- `VITE_SERVER_URL`: Backend API URL
- `VITE_FRONT_URL`: Frontend URL
- `VITE_SENTRY_DSN`: Sentry DSN for error tracking
