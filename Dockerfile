# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy built application
COPY dist/profiles-sharing-app/ ./dist/profiles-sharing-app/

# Expose port
EXPOSE 4000

# Set environment variable
ENV PORT=4000

# Start the server
CMD ["node", "dist/profiles-sharing-app/server/server.mjs"]
