# Build stage
FROM node:18-alpine AS builder

# Install pnpm v9 (compatible with lockfile)
RUN npm install -g pnpm@9

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with pnpm
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Check if build.config.js exists to determine build mode
RUN if [ -f "build.config.js" ]; then \
      echo "Build config found, checking build mode..."; \
      cat build.config.js; \
    fi

# Build the application with BUILD_MODE=standalone for proper S3 loading
# Set NEXT_PUBLIC_LANDING_CLIENT_URL for landing client integration
RUN BUILD_MODE=standalone NEXT_PUBLIC_LANDING_CLIENT_URL=https://landing.3gal.ch pnpm build

# Runtime stage - for standalone builds
FROM node:18-alpine AS runner-standalone

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3000

# Copy built application (standalone mode)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy template data (if exists)
COPY --from=builder /app/src/data ./src/data

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error('Unhealthy')})" || exit 1

EXPOSE 3000

# Start the application (standalone mode)
CMD ["node", "server.js"]

# Runtime stage - for static export
FROM nginx:alpine AS runner-static

# Copy static files
COPY --from=builder /app/out /usr/share/nginx/html

# Copy nginx configuration if needed
RUN echo 'server { \
    listen 3000; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/health { \
        return 200 "OK"; \
        add_header Content-Type text/plain; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 3000

# Use the standalone runner by default (can be overridden with --target)
FROM runner-standalone
