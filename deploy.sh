#!/bin/bash

# Production deployment script for Profile Sharing App

echo "🚀 Starting production deployment..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build for production
echo "🔨 Building application for production..."
npm run build:prod

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🎉 Application ready for deployment!"
    echo ""
    echo "To start the production server:"
    echo "  npm run serve:ssr"
    echo ""
    echo "To build Docker image:"
    echo "  docker build -t profiles-sharing-app ."
    echo "  docker run -p 4000:4000 profiles-sharing-app"
    echo ""
else
    echo "❌ Build failed!"
    exit 1
fi
