# Docker Setup Guide for Frontapp MCP Server

This guide walks you through setting up the Frontapp MCP Server using Docker with Claude Code.

## Quick Start (5 Minutes)

### Prerequisites Check

```bash
# Check Docker is installed
docker --version
# Should show: Docker version 20.10 or higher

# Check Docker Compose is installed
docker compose version
# Should show: Docker Compose version v2.0 or higher

# Check Docker is running
docker ps
# Should show container list (may be empty)
```

### Step 1: Get Your Frontapp API Token

1. Log into Frontapp: https://app.frontapp.com
2. Navigate to: **Settings → Developers → API tokens**
3. Click **"Create token"**
4. Give it a name (e.g., "MCP Server")
5. Copy the token - **you'll only see it once!**

### Step 2: Setup Project

```bash
# Create project directory
mkdir frontapp-mcp-server
cd frontapp-mcp-server

# Create environment file
cat > .env << 'EOF'
FRONTAPP_API_TOKEN=your_token_here
EOF

# Replace 'your_token_here' with your actual token
nano .env  # or use your favorite editor
```

### Step 3: Create Files

Save all the provided files in your project directory:

```
frontapp-mcp-server/
├── src/
│   └── index.ts              # MCP server code
├── Dockerfile                 # Docker image definition
├── docker-compose.yml         # Docker Compose config
├── docker-mcp-wrapper.sh      # Linux/macOS wrapper
├── docker-mcp-wrapper.bat     # Windows wrapper
├── package.json               # Node.js dependencies
├── tsconfig.json              # TypeScript config
├── .dockerignore              # Docker ignore rules
├── .env                       # Your API token (don't commit!)
├── .env.example               # Template for .env
├── Makefile                   # Convenience commands
└── README.md                  # Documentation
```

### Step 4: Make Wrapper Executable

**Linux/macOS:**
```bash
chmod +x docker-mcp-wrapper.sh
```

**Windows:**
No action needed - the .bat file is ready to use.

### Step 5: Build and Start

```bash
# Build the Docker image
docker compose build

# Start the container
docker compose up -d

# Verify it's running
docker ps
```

You should see `frontapp-mcp-server` in the list of running containers.

### Step 6: Configure Claude Code

#### Find Config Location

**macOS:**
```bash
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Linux:**
```bash
nano ~/.config/Claude/claude_desktop_config.json
```

**Windows:**
```powershell
notepad %APPDATA%\Claude\claude_desktop_config.json
```

#### Add Configuration

**Linux/macOS:**
```json
{
  "mcpServers": {
    "frontapp": {
      "command": "/absolute/path/to/frontapp-mcp-server/docker-mcp-wrapper.sh"
    }
  }
}
```

**Windows:**
```json
{
  "mcpServers": {
    "frontapp": {
      "command": "C:\\absolute\\path\\to\\frontapp-mcp-server\\docker-mcp-wrapper.bat"
    }
  }
}
```

**Important:** Use absolute paths! Replace the path with your actual project location.

### Step 7: Restart Claude Code

1. Completely quit Claude Code
2. Start Claude Code again
3. The MCP server will start automatically

### Step 8: Test It!

In Claude Code, try:

```
"List the 5 most recent conversations in Frontapp"
```

If it works, you'll see conversation data! 🎉

## Understanding the Architecture

```
┌─────────────────┐
│  Claude Code    │
│                 │
└────────┬────────┘
         │
         │ stdio (pipe)
         │
┌────────▼────────────────────────────┐
│  docker-mcp-wrapper.sh              │
│  (Starts container & pipes I/O)     │
└────────┬────────────────────────────┘
         │
         │ docker exec
         │
┌────────▼────────────────────────────┐
│  Docker Container                   │
│  ┌──────────────────────────────┐   │
│  │  Frontapp MCP Server         │   │
│  │  (Node.js)                   │   │
│  └────────┬─────────────────────┘   │
└───────────┼─────────────────────────┘
            │
            │ HTTPS
            │
┌───────────▼─────────────────────────┐
│  Frontapp API                       │
│  (api2.frontapp.com)                │
└─────────────────────────────────────┘
```

## Common Commands

### Using Make (Recommended)

```bash
# Start server
make up

# Stop server
make down

# View logs
make logs

# Restart server
make restart

# Rebuild image
make build

# Open shell in container
make shell

# Clean everything
make clean
```

### Using Docker Compose

```bash
# Start
docker compose up -d

# Stop
docker compose down

# View logs
docker compose logs -f

# Restart
docker compose restart

# Rebuild
docker compose build

# Status
docker compose ps
```

### Using Docker Commands

```bash
# View running containers
docker ps

# View logs
docker logs frontapp-mcp-server

# Stop container
docker stop frontapp-mcp-server

# Start container
docker start frontapp-mcp-server

# Remove container
docker rm frontapp-mcp-server

# Execute command in container
docker exec -it frontapp-mcp-server sh
```

## Troubleshooting

### Container Won't Start

**Check logs:**
```bash
docker logs frontapp-mcp-server
```

**Common issues:**
- API token not set or invalid
- Port already in use
- Docker daemon not running

**Solutions:**
```bash
# Verify token in .env
cat .env

# Check Docker is running
docker ps

# Rebuild completely
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Claude Code Can't Connect

**Check wrapper script:**
```bash
# Test the wrapper manually
./docker-mcp-wrapper.sh

# Check if it's executable
ls -la docker-mcp-wrapper.sh

# Make it executable if needed
chmod +x docker-mcp-wrapper.sh
```

**Check Claude Code config:**
```bash
# View config
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Verify path is absolute
pwd  # Show current directory
```

**Check container is running:**
```bash
docker ps | grep frontapp
```

### API Errors

**Check token:**
```bash
# Test token manually
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api2.frontapp.com/conversations?limit=1
```

**Common errors:**
- `401 Unauthorized` - Invalid token
- `403 Forbidden` - Token lacks permissions
- `429 Too Many Requests` - Rate limited

**Solutions:**
```bash
# Update token in .env
nano .env

# Restart container
docker compose restart
```

### Performance Issues

**Check resource usage:**
```bash
docker stats frontapp-mcp-server
```

**Increase Docker resources:**
- Docker Desktop → Settings → Resources
- Increase CPU and Memory limits

### Wrapper Script Errors

**Linux/macOS issues:**
```bash
# Check script has Unix line endings
file docker-mcp-wrapper.sh
# Should show: "ASCII text"

# Convert if needed
dos2unix docker-mcp-wrapper.sh

# Verify shebang
head -n 1 docker-mcp-wrapper.sh
# Should show: #!/bin/bash
```

**Windows issues:**
- Use `docker-mcp-wrapper.bat` instead
- Ensure paths use backslashes: `C:\path\to\file`
- Run as Administrator if needed

## Advanced Configuration

### Custom Docker Compose

Create `docker-compose.override.yml`:

```yaml
version: '3.8'

services:
  frontapp-mcp:
    # Custom environment variables
    environment:
      - DEBUG=true
      - LOG_LEVEL=debug
    
    # Resource limits
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
    
    # Custom network
    networks:
      - custom-network

networks:
  custom-network:
    external: true
```

### Environment Variables

Create `.env` with additional settings:

```bash
# API Configuration
FRONTAPP_API_TOKEN=your_token_here
FRONTAPP_BASE_URL=https://api2.frontapp.com

# Logging
LOG_LEVEL=info
DEBUG=false

# Performance
REQUEST_TIMEOUT=30000
MAX_RETRIES=3
```

### Production Deployment

Use Docker secrets for sensitive data:

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  frontapp-mcp:
    secrets:
      - frontapp_token
    environment:
      - FRONTAPP_API_TOKEN_FILE=/run/secrets/frontapp_token
    restart: always
    security_opt:
      - no-new-privileges:true

secrets:
  frontapp_token:
    external: true
```

Create secret:
```bash
echo "your_token_here" | docker secret create frontapp_token -
```

### Health Monitoring

Monitor container health:

```bash
# Check health status
docker inspect --format='{{.State.Health.Status}}' frontapp-mcp-server

# Continuous monitoring
watch -n 5 'docker inspect --format="{{.State.Health.Status}}" frontapp-mcp-server'
```

### Logging Configuration

Customize logging in `docker-compose.yml`:

```yaml
services:
  frontapp-mcp:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "5"
        labels: "production"
```

View logs:
```bash
# Last 100 lines
docker logs --tail 100 frontapp-mcp-server

# Follow logs
docker logs -f frontapp-mcp-server

# Since 1 hour ago
docker logs --since 1h frontapp-mcp-server
```

## Security Best Practices

### 1. Protect Your API Token

```bash
# Never commit .env
echo ".env" >> .gitignore

# Use restricted file permissions
chmod 600 .env

# Verify permissions
ls -la .env
# Should show: -rw------- (only owner can read/write)
```

### 2. Use Minimal Permissions

- Create API token with only required scopes
- Use separate tokens for different environments
- Rotate tokens regularly

### 3. Network Security

```yaml
# Isolate on custom network
services:
  frontapp-mcp:
    networks:
      - isolated-network

networks:
  isolated-network:
    driver: bridge
    internal: true  # No external access except through proxy
```

### 4. Container Security

Already implemented in Dockerfile:
- ✅ Non-root user (uid 1001)
- ✅ Minimal Alpine base image
- ✅ Multi-stage build
- ✅ No unnecessary packages

Additional hardening:
```yaml
services:
  frontapp-mcp:
    read_only: true  # Read-only filesystem
    cap_drop:
      - ALL  # Drop all capabilities
    security_opt:
      - no-new-privileges:true
```

## Updating

### Update the Server

```bash
# Pull latest code
git pull

# Rebuild and restart
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Update Docker Image

```bash
# Update base images
docker compose pull

# Rebuild with new bases
docker compose build --pull
docker compose up -d
```

## Backup and Recovery

### Backup Configuration

```bash
# Backup .env and config
tar -czf backup.tar.gz .env docker-compose.yml src/
```

### Restore Configuration

```bash
# Extract backup
tar -xzf backup.tar.gz

# Rebuild and start
docker compose build
docker compose up -d
```

## Monitoring and Logs

### Real-time Monitoring

```bash
# Terminal 1: Watch container status
watch -n 2 'docker ps --filter name=frontapp'

# Terminal 2: Follow logs
docker logs -f frontapp-mcp-server

# Terminal 3: Monitor resources
docker stats frontapp-mcp-server
```

### Log Analysis

```bash
# Search logs for errors
docker logs frontapp-mcp-server 2>&1 | grep -i error

# Count requests
docker logs frontapp-mcp-server 2>&1 | grep -c "request"

# Export logs
docker logs frontapp-mcp-server > logs.txt
```

## Getting Help

1. **Check logs:** `docker logs frontapp-mcp-server`
2. **Test manually:** `./docker-mcp-wrapper.sh`
3. **Verify Docker:** `docker ps`
4. **Check config:** Review Claude Code configuration
5. **Test API:** Use curl to test Frontapp API directly

## Next Steps

- ✅ Server is running
- ✅ Connected to Claude Code
- ⏭️ Try example queries
- ⏭️ Explore all available tools
- ⏭️ Customize for your workflow
- ⏭️ Set up monitoring
- ⏭️ Configure backups

## Resources

- [Docker Documentation](https://docs.docker.com)
- [Docker Compose Documentation](https://docs.docker.com/compose)
- [Frontapp API Reference](https://dev.frontapp.com/reference/introduction)
- [Claude Code Documentation](https://docs.claude.com)
- [MCP Protocol Specification](https://modelcontextprotocol.io)
