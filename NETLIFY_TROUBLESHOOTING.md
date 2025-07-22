# Netlify Deployment Troubleshooting Guide

## Current Error: "onPreBuild" event in "@netlify/angular-runtime"

This error typically occurs when there's a configuration mismatch between the Netlify Angular Runtime plugin and the project structure.

## ✅ **Solutions Applied:**

### 1. **Minimal netlify.toml Configuration**
The netlify.toml has been simplified to let the plugin auto-detect settings:

```toml
[[plugins]]
  package = "@netlify/angular-runtime"
```

### 2. **Version Management**
- Installed `@netlify/angular-runtime@2.3.0` (tested stable version)
- Angular 19 is supported by this version

### 3. **Build Configuration Options**

You can try different build commands in Netlify dashboard:

#### Option A: Let Plugin Handle Everything
- **Build command**: Leave empty or use `npm run build`
- **Publish directory**: Leave empty (auto-detected)
- **netlify.toml**: Minimal (current setup)

#### Option B: Explicit Configuration
```toml
[build]
  command = "npm run build:prod"
  publish = "dist/profiles-sharing-app/browser"

[[plugins]]
  package = "@netlify/angular-runtime"
```

#### Option C: Use Standard Angular Build
```toml
[build]
  command = "npm run build"
  publish = "dist/profiles-sharing-app/browser"

[[plugins]]
  package = "@netlify/angular-runtime"
```

## 🚨 **Alternative Deployment Methods**

If the Angular Runtime plugin continues to have issues:

### Method 1: Static Site Deployment (No SSR)
```toml
[build]
  command = "npm run build"
  publish = "dist/profiles-sharing-app/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Method 2: Netlify Functions Manual Setup
```toml
[build]
  command = "npm run build:prod"
  publish = "dist/profiles-sharing-app/browser"

[functions]
  directory = "dist/profiles-sharing-app/server"
```

## 🔧 **Debugging Steps**

1. **Check Netlify Build Logs**
   - Look for specific error messages in the build log
   - Check if the plugin is detecting Angular correctly

2. **Verify Node Version**
   - Ensure Node 18+ is being used
   - Set NODE_VERSION=20 in environment variables

3. **Clear Build Cache**
   - In Netlify dashboard: Site settings > Build & deploy > Post processing
   - Click "Clear cache and deploy site"

4. **Check Package.json**
   - Ensure `@netlify/angular-runtime` is in devDependencies
   - Verify Angular version is 19.x

## 🎯 **Recommended Next Steps**

1. Try the minimal configuration first (current setup)
2. If that fails, use Option B with explicit build command
3. As last resort, deploy as static site (Method 1)
4. Contact Netlify support with specific error messages from build logs

## 📝 **Environment Variables to Set in Netlify**

```
NODE_VERSION=20
NPM_VERSION=10
```

## 🔗 **Useful Links**

- [Netlify Angular Runtime Docs](https://docs.netlify.com/frameworks/angular/)
- [Angular Deployment Guide](https://angular.dev/tools/cli/deployment)
- [Netlify Build Settings](https://docs.netlify.com/configure-builds/file-based-configuration/)

The minimal configuration should resolve most onPreBuild issues with the Angular runtime plugin.
