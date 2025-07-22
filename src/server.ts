/**
 * Netlify-compatible server entry point for Angular SSR
 * This file is designed to work with @netlify/angular-runtime
 */

import { AngularNodeAppEngine, createNodeRequestHandler, writeResponseToNodeResponse } from '@angular/ssr/node';

// Create the Angular app engine
const angularApp = new AngularNodeAppEngine();

/**
 * The main request handler that Netlify Angular Runtime will use
 * This is the entry point that Netlify will use for SSR
 */
export const reqHandler = createNodeRequestHandler(async (req, res, next) => {
  try {
    // Let Angular handle the request
    const response = await angularApp.handle(req);
    
    if (response) {
      // Use Angular's built-in response writer
      writeResponseToNodeResponse(response, res);
    } else {
      // If Angular can't handle it, pass to next middleware
      next();
    }
  } catch (error) {
    console.error('Angular SSR Error:', error);
    // On error, pass to next middleware (likely serving static files)
    next();
  }
});

// Export as default for compatibility
export default reqHandler;
