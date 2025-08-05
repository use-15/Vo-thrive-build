#!/bin/bash

# Thrive PWA Deployment Script
set -e

echo "🚀 Starting Thrive PWA deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Type checking
echo "🔍 Running type checks..."
npm run type-check

# Linting
echo "🧹 Running linter..."
npm run lint

# Build the application
echo "🏗️  Building application..."
npm run build

# Generate PWA assets (if needed)
echo "🎨 Generating PWA assets..."
# Uncomment if you have pwa-asset-generator configured
# npx pwa-asset-generator public/logo.svg public/icons --background "#4A90E2" --theme-color "#4A90E2"

# Run Lighthouse audit (optional)
if command -v lighthouse &> /dev/null; then
    echo "🔍 Running Lighthouse audit..."
    npm run lighthouse
    echo "📊 Lighthouse report generated: lighthouse-report.html"
fi

# Deploy based on platform
if [ "$1" = "vercel" ]; then
    echo "🚀 Deploying to Vercel..."
    npm run deploy:vercel
elif [ "$1" = "netlify" ]; then
    echo "🚀 Deploying to Netlify..."
    npm run deploy:netlify
else
    echo "✅ Build completed successfully!"
    echo "📁 Built files are in the .next directory"
    echo ""
    echo "To deploy:"
    echo "  Vercel: npm run deploy:vercel"
    echo "  Netlify: npm run deploy:netlify"
    echo "  Manual: Copy .next directory to your server"
fi

echo "🎉 Deployment process completed!"
