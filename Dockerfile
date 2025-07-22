# Multi-stage build for optimized production image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build:prod

# Production stage
FROM node:20-alpine AS production

# Create app directory and user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S angular -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=angular:nodejs /app/dist ./dist

# Create logs directory
RUN mkdir -p logs && chown -R angular:nodejs logs

# Switch to non-root user
USER angular

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:4000/health || exit 1

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Start the server
CMD ["node", "dist/profiles-sharing-app/server/server.mjs"]
