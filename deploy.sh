#!/bin/bash

# Production deployment script for Profile Sharing App

set -e  # Exit on any error

echo "🚀 Starting production deployment..."

# Check if Node.js and npm are installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "📋 Node.js version: $(node --version)"
echo "📋 npm version: $(npm --version)"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf .angular/cache/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --no-audit

# Run tests (optional, comment out if no tests)
# echo "🧪 Running tests..."
# npm run test:ci

# Build for production
echo "🔨 Building application for production..."
npm run build:prod

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Create logs directory
    mkdir -p logs
    
    # Create production environment check
    echo "🔍 Verifying production build..."
    if [ -f "dist/profiles-sharing-app/server/server.mjs" ]; then
        echo "✅ Server build found"
    else
        echo "❌ Server build not found"
        exit 1
    fi
    
    if [ -d "dist/profiles-sharing-app/browser" ]; then
        echo "✅ Client build found"
    else
        echo "❌ Client build not found"
        exit 1
    fi
    
    echo "📊 Build size analysis:"
    du -sh dist/
    
    echo ""
    echo "🎉 Application ready for deployment!"
    echo ""
    echo "Deployment options:"
    echo ""
    echo "1. 🖥️  Start production server directly:"
    echo "   npm run start:prod"
    echo ""
    echo "2. 🔧 Start with PM2 (process manager):"
    echo "   npm run pm2:start"
    echo ""
    echo "3. 🐳 Build and run with Docker:"
    echo "   npm run docker:build"
    echo "   npm run docker:run"
    echo ""
    echo "4. 🚢 Deploy with Docker Compose:"
    echo "   docker-compose up -d"
    echo ""
    echo "🔗 Health check will be available at: http://localhost:4000/health"
    echo ""
else
    echo "❌ Build failed!"
    exit 1
fi
