const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

// Serve static files from the Angular build
app.use(express.static(path.join(__dirname, 'dist/profiles-sharing-app/browser')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'profiles-sharing-api'
  });
});

// All other routes serve the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/profiles-sharing-app/browser/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check: http://localhost:${port}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
