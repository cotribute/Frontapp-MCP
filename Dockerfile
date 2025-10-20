# Multi-stage build for Frontapp MCP Server
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src/ ./src/

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && \
    npm cache clean --force

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S mcp && \
    adduser -S -D -H -u 1001 -h /app -s /sbin/nologin -G mcp -g mcp mcp && \
    chown -R mcp:mcp /app

# Switch to non-root user
USER mcp

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "process.exit(0)" || exit 1

# Set environment variables
ENV NODE_ENV=production

# Run the MCP server
CMD ["node", "dist/index.js"]
