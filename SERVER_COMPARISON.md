# Server Configuration Comparison

## Overview
This project now has two server configurations to support different deployment targets:

## 🖥️ **Node.js Server** (`src/server.ts`)
**Used for**: Production Node.js deployments, Docker, PM2, VPS

**Features:**
- Full Express.js server with middleware
- Security headers and request logging
- Health check endpoints (`/health`, `/api/health`)
- Error handling and graceful shutdown
- Process management support
- Static file serving with caching

**Build Commands:**
- `npm run build:prod` → Uses this server
- `npm run start:prod` → Runs this server

**Output:** `dist/profiles-sharing-app/server/server.mjs` (~843 kB)

## ☁️ **Netlify Server** (`src/server.netlify.ts`)
**Used for**: Netlify Functions and serverless deployments

**Features:**
- Lightweight Angular SSR handler
- Minimal function-based architecture
- Compatible with `@netlify/angular-runtime`
- Automatic error handling with fallback
- Optimized for serverless environments

**Build Commands:**
- `npm run build:netlify` → Uses this server

**Output:** `dist/profiles-sharing-app/server/server.mjs` (~1.89 kB)

## 🔄 **Automatic Selection**
The Angular build system automatically selects the correct server based on the build configuration:

- **Production builds** → Full Node.js server
- **Netlify builds** → Lightweight Netlify server

## 📁 **File Structure**
```
src/
├── server.ts          # Full Node.js server
├── server.netlify.ts  # Netlify-compatible server
└── main.server.ts     # Angular bootstrap (shared)
```

## 🚀 **Deployment Targets**

| Platform | Server File | Build Command | Features |
|----------|-------------|---------------|----------|
| **Netlify** | `server.netlify.ts` | `npm run build:netlify` | SSR via Functions |
| **Docker** | `server.ts` | `npm run build:prod` | Full server + PM2 |
| **VPS/Cloud** | `server.ts` | `npm run build:prod` | Express + monitoring |
| **Heroku** | `server.ts` | `npm run build:prod` | Process management |

This dual-server approach ensures optimal performance and compatibility across all major deployment platforms! 🎯
