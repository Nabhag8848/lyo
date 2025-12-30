# Lyo Extension

Browser extension for Myntra that enables virtual try-on functionality directly on the shopping website.

## Overview

The Lyo Extension is a Chrome extension built with WXT that:

- Integrates with Myntra shopping pages
- Provides virtual try-on functionality via side panel
- Manages user session and authentication
- Handles garment selection and try-on requests
- Displays try-on results in real-time

## Tech Stack

- **Framework**: WXT (Browser Extension Framework)
- **UI Library**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Build**: Vite (via WXT)
- **Storage**: Chrome Storage API

## Project Structure

```
src/
├── entrypoints/      # Extension entry points
│   ├── background/  # Background service worker
│   ├── sidepanel/   # Side panel UI
│   └── *.content/   # Content scripts for Myntra pages
├── lib/             # Shared utilities
│   ├── api.ts       # API client
│   ├── storage.ts   # Storage utilities
│   └── utils.ts     # Helper functions
└── assets/          # Static assets
```

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm nx dev lyo-extension

# Build for production
pnpm nx build lyo-extension

# Build for specific browser
pnpm nx build:chrome lyo-extension
```

## Extension Architecture

### Entry Points

1. **Background Script** (`background/index.ts`)

   - Service worker for extension lifecycle
   - Handles extension events
   - Manages side panel behavior

2. **Side Panel** (`sidepanel/`)

   - Main UI for try-on interface
   - React-based component
   - Communicates with content scripts

3. **Content Scripts** (`*.content/`)
   - Injected into Myntra pages
   - Detects product pages
   - Handles "Try On" button integration

### Permissions

- `sidePanel`: Access to Chrome side panel API
- `storage`: Local storage access
- `cookies`: Cookie access for authentication
- `host_permissions`: Access to lyo.fashion domains

## Key Features

- **Myntra Integration**: Seamlessly integrates with Myntra product pages
- **Side Panel UI**: Modern React-based interface
- **Real-time Updates**: Live status updates for try-on generation
- **Session Management**: Handles user authentication and sessions
- **Storage**: Local storage for user preferences and cache

## Build Output

The extension builds to `dist/chrome-mv3/` directory with:

- `manifest.json`: Extension manifest
- `background.js`: Background service worker
- `sidepanel.html`: Side panel entry point
- Content scripts and assets

## Configuration

Extension configuration is in `wxt.config.ts`:

- Manifest permissions
- Host permissions
- Build settings
- Vite plugins
