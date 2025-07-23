# Heroku Deployment Guide

This Angular 19 application is now configured for Heroku deployment with client-side rendering and Express server.

## 🚀 Quick Deployment

### Prerequisites
1. Heroku CLI installed
2. Git repository initialized
3. Heroku account

### Deploy to Heroku
```bash
# Login to Heroku
heroku login

# Create a new Heroku app
heroku create your-app-name

# Set Node.js buildpack
heroku buildpacks:set heroku/nodejs

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

## 📦 Configuration

### Build Process
- **heroku-postbuild**: Automatically runs `npm run build:prod` after dependencies are installed
- **Procfile**: Defines the web process as `node server.js`
- **Server**: Simple Express server serving the Angular SPA

### Environment Variables
```bash
# Set production environment
heroku config:set NODE_ENV=production

# Optional: Set custom port (Heroku sets PORT automatically)
heroku config:set PORT=4000
```

### Package.json Scripts
- `start`: Express server for production
- `dev`: Development server
- `build:prod`: Production build
- `heroku-postbuild`: Heroku build hook

## 🏗️ Architecture

### Server Configuration
- **Express Server**: Lightweight server serving static files
- **Angular SPA**: Client-side rendered Angular application
- **Health Checks**: `/health` and `/api/health` endpoints
- **SPA Routing**: All routes serve the Angular index.html

### File Structure
```
dist/profiles-sharing-app/
└── browser/          # Client-side files (index.html, assets)
server.js             # Express server entry point
```

## 🔧 Development

### Local Development
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build:prod

# Test production build locally
npm start
```

### Testing the Build
```bash
# Build and test locally before deploying
npm run build:prod
npm start

# Visit http://localhost:4000
```

## 🌐 Production Features

### Performance
- **Static File Serving**: Optimized static file delivery
- **Compression**: Automatic gzip compression by Heroku
- **Optimization**: Angular build optimizations enabled
- **Caching**: Browser caching for static assets

### Security
- **HTTPS**: Automatic HTTPS on Heroku
- **SPA Security**: Angular built-in XSS protection
- **Express Security**: Basic Express security headers

### Monitoring
- **Health Endpoint**: `/health` for uptime monitoring
- **Simple Logging**: Server startup and error logging
- **Process Management**: Graceful shutdown handling

## ⚡ Server-Side Rendering (SSR) Note

Currently, the application is configured for **client-side rendering** for simplicity and reliability. If you need SSR for SEO or performance reasons, you can:

1. Re-enable SSR in `angular.json`
2. Update the server to use Angular Universal
3. Modify the build scripts

The current setup provides:
- ✅ Fast deployment
- ✅ Reliable builds
- ✅ Easy debugging
- ✅ Full Angular functionality

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs
   heroku logs --tail
   
   # Test build locally
   npm run build:prod
   ```

2. **Server Not Starting**
   ```bash
   # Check server logs
   heroku logs --tail --app your-app-name
   
   # Verify Procfile
   cat Procfile
   ```

3. **Routing Issues**
   - All client-side routes are handled by Angular Router
   - Express serves `index.html` for all non-API routes
   - Ensure `routerLink` is used instead of `href`

### Logs and Debugging
```bash
# View real-time logs
heroku logs --tail

# View specific number of lines
heroku logs -n 500

# Check dyno status
heroku ps
```

## 📋 Deployment Checklist

- [ ] Build working locally (`npm run build:prod && npm start`)
- [ ] Environment variables configured
- [ ] Health endpoints responding
- [ ] SSL/HTTPS enabled
- [ ] Domain configured (if custom)

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Deploy to Heroku
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"
```

## 📈 Scaling

### Horizontal Scaling
```bash
# Scale web dynos
heroku ps:scale web=2

# Use different dyno types
heroku ps:scale web=1:standard-2x
```

### Performance Optimization
- Enable Angular service worker for caching
- Use CDN for static assets
- Implement lazy loading for routes
- Monitor with Heroku metrics

## 🆘 Support

- [Heroku Dev Center](https://devcenter.heroku.com/)
- [Angular Documentation](https://angular.io/docs)
- [Express.js Documentation](https://expressjs.com/)

For issues specific to this application, check the application logs and ensure all build steps complete successfully.
