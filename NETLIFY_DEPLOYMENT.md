# Netlify Deployment Guide

## Prerequisites
- Angular 19 application 
- `@netlify/angular-runtime` v2.2.0+ installed
- Netlify account

## Deployment Methods

### Method 1: Drag & Drop Deployment
1. Build the application for Netlify:
   ```bash
   npm run build:netlify
   ```
2. Drag the `dist/profiles-sharing-app/browser` folder to Netlify deploy area

### Method 2: Git-based Deployment
1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Netlify
3. Set build configuration:
   - **Build command**: `npm run build:netlify`
   - **Publish directory**: `dist/profiles-sharing-app/browser`
   - **Node version**: `20`

### Method 3: Netlify CLI
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Login to Netlify:
   ```bash
   netlify login
   ```
3. Deploy:
   ```bash
   npm run build:netlify
   netlify deploy --prod --dir=dist/profiles-sharing-app/browser
   ```

## Configuration Files

### netlify.toml
- Build settings and redirects
- Environment variables
- Headers for security and caching
- Plugin configuration

### Environment Variables
Set these in Netlify dashboard (Site settings > Environment variables):
- `NODE_VERSION`: `20`
- `NPM_VERSION`: `10`
- Any custom API keys or configuration

## Features Configured

### ✅ Security Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff  
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### ✅ Performance
- Static asset caching (1 year)
- Gzip compression (automatic)
- CDN delivery (automatic)

### ✅ SPA Support
- Client-side routing support
- Fallback to index.html for all routes

## Troubleshooting

### Build Fails
- Ensure `@netlify/angular-runtime` is installed
- Check Node.js version (should be 18+)
- Verify build command in netlify.toml

### Routing Issues
- Check `_redirects` file exists in public folder
- Verify netlify.toml redirect configuration

### SSR Issues
- Netlify Functions handle SSR automatically with Angular runtime
- Check function logs in Netlify dashboard

## URLs After Deployment
- **Production**: Your custom domain or `{site-name}.netlify.app`
- **Health Check**: `{domain}/health`
- **API Health**: `{domain}/api/health`

## Performance Tips
1. Enable Branch deploys for testing
2. Use Deploy Previews for pull requests  
3. Monitor Core Web Vitals in Netlify Analytics
4. Use Netlify Image CDN for optimized images

## Cost Optimization
- Free tier: 100GB bandwidth, 300 build minutes
- Consider upgrading for production apps
- Use Netlify Functions sparingly to avoid costs
