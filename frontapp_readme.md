# Frontapp MCP Server

A comprehensive Model Context Protocol (MCP) server for Frontapp API integration. This server enables Claude Code to interact with your Frontapp account, managing conversations, messages, contacts, teammates, and more.

## Features

### 🔧 Core Functionality

- **Conversations**: List, search, get, and update conversations
- **Messages**: Send messages, reply to conversations, list conversation messages
- **Contacts**: Create, read, update, and list contacts
- **Teammates**: List and get teammate information
- **Tags**: Create and list tags, apply tags to conversations
- **Inboxes**: List and get inbox details
- **Comments**: Add internal comments to conversations
- **Analytics**: Retrieve analytics data

### 🎯 Key Capabilities

- Full CRUD operations for contacts and messages
- Advanced conversation search with Front's query syntax
- Message sending and replying
- Tag management and application
- Internal comments/discussions
- Pagination support for large datasets
- Comprehensive error handling

### 🐳 Docker Support

- Multi-stage optimized builds
- Non-root user security
- Health checks
- Auto-restart on failure
- Easy deployment with Docker Compose

## Prerequisites

- **Docker Method (Recommended)**:
  - Docker 20.10 or higher
  - Docker Compose v2.0 or higher
  - A Frontapp API token

- **Node.js Method**:
  - Node.js 18 or higher
  - npm or yarn
  - A Frontapp API token

## Installation

### Method 1: Docker (Recommended) 🐳

#### 1. Clone/Create Project

```bash
git clone <repository-url> frontapp-mcp-server
# or
mkdir frontapp-mcp-server
cd frontapp-mcp-server
```

#### 2. Create Required Files

Create the project structure:
```
frontapp-mcp-server/
├── src/
│   └── index.ts
├── Dockerfile
├── docker-compose.yml
├── docker-mcp-wrapper.sh
├── docker-mcp-wrapper.bat
├── package.json
├── tsconfig.json
├── .dockerignore
├── .env.example
├── Makefile
└── README.md
```

#### 3. Set Up Environment

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` and add your API token:
```
FRONTAPP_API_TOKEN=your_api_token_here
```

#### 4. Make Wrapper Script Executable

**Linux/macOS:**
```bash
chmod +x docker-mcp-wrapper.sh
```

**Windows:**
No action needed - use `docker-mcp-wrapper.bat`

#### 5. Build and Start

```bash
# Using Make (recommended)
make build
make up

# Or using Docker Compose directly
docker compose build
docker compose up -d
```

#### 6. Configure Claude Code

Add this to your Claude Code configuration:

**macOS/Linux:** `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "frontapp": {
      "command": "/absolute/path/to/frontapp-mcp-server/docker-mcp-wrapper.sh"
    }
  }
}
```

**For Windows, use:**
```json
{
  "mcpServers": {
    "frontapp": {
      "command": "C:\\absolute\\path\\to\\frontapp-mcp-server\\docker-mcp-wrapper.bat"
    }
  }
}
```

#### 7. Restart Claude Code

The MCP server will automatically start when Claude Code launches.

### Method 2: Node.js (Direct) 📦

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Set Environment Variable

```bash
export FRONTAPP_API_TOKEN="your_api_token_here"
```

#### 3. Build

```bash
npm run build
```

#### 4. Configure Claude Code

```json
{
  "mcpServers": {
    "frontapp": {
      "command": "node",
      "args": ["/absolute/path/to/frontapp-mcp-server/dist/index.js"],
      "env": {
        "FRONTAPP_API_TOKEN": "your_api_token_here"
      }
    }
  }
}
```

## Docker Management

### Using Make Commands

```bash
# Build the image
make build

# Start the server
make up

# Stop the server
make down

# Restart the server
make restart

# View logs
make logs

# Open shell in container
make shell

# Test connection
make test

# Clean up everything
make clean

# Make wrapper executable
make wrapper
```

### Using Docker Compose Directly

```bash
# Build
docker compose build

# Start
docker compose up -d

# Stop
docker compose down

# View logs
docker compose logs -f

# Restart
docker compose restart

# Rebuild and restart
docker compose up -d --build
```

### Docker Commands

```bash
# View running containers
docker ps

# View all containers
docker ps -a

# Check logs
docker logs frontapp-mcp-server

# Execute command in container
docker exec -it frontapp-mcp-server sh

# Remove container
docker rm -f frontapp-mcp-server

# Remove image
docker rmi frontapp-mcp-server
```

## Usage Examples

Once configured, you can ask Claude Code to interact with Frontapp:

### List Recent Conversations

```
"Show me the 10 most recent conversations in Frontapp"
```

### Search for Specific Conversations

```
"Find all open conversations tagged with 'urgent' in Frontapp"
```

### Get Conversation Details

```
"Get the full details of conversation cnv_abc123"
```

### Send a Message

```
"Send an email from inbox inb_123 to john@example.com with subject 'Follow-up' 
and body 'Thanks for reaching out...'"
```

### Reply to a Conversation

```
"Reply to conversation cnv_abc123 saying 'I'll look into this and get back to you soon'"
```

### Create a Contact

```
"Create a new contact named 'Jane Smith' with email jane@example.com"
```

### Update a Conversation

```
"Assign conversation cnv_abc123 to teammate tea_456 and add tag tag_urgent"
```

### Add Internal Comment

```
"Add an internal comment to conversation cnv_abc123 saying 
'This needs to be escalated to engineering'"
```

## Available Tools

### Conversation Tools
- `list_conversations` - List conversations with filtering
- `get_conversation` - Get conversation details
- `search_conversations` - Search with Front's query syntax
- `update_conversation` - Update status, assignee, tags

### Message Tools
- `list_conversation_messages` - List messages in a conversation
- `get_message` - Get message details
- `send_message` - Send new message (creates conversation)
- `reply_to_conversation` - Reply to existing conversation

### Contact Tools
- `list_contacts` - List all contacts
- `get_contact` - Get contact details
- `create_contact` - Create new contact
- `update_contact` - Update contact information

### Teammate Tools
- `list_teammates` - List all teammates
- `get_teammate` - Get teammate details

### Tag Tools
- `list_tags` - List all tags
- `create_tag` - Create new tag

### Inbox Tools
- `list_inboxes` - List all inboxes
- `get_inbox` - Get inbox details

### Comment Tools
- `list_conversation_comments` - List comments in conversation
- `add_comment` - Add internal comment

### Analytics Tools
- `get_analytics` - Retrieve analytics data

## Resources

The server exposes these resources for quick access:

- `frontapp://conversations/recent` - Most recent conversations
- `frontapp://teammates` - All teammates
- `frontapp://inboxes` - All inboxes
- `frontapp://tags` - All tags

## Query Syntax for Searching

Front supports powerful search queries. Examples:

- `status:open` - Open conversations
- `status:archived` - Archived conversations
- `tag:urgent` - Tagged with "urgent"
- `assignee:me` - Assigned to you
- `is:unassigned` - Unassigned conversations
- `inbox:support` - In support inbox
- `after:2024-01-01` - After specific date
- Combine with `AND`, `OR`: `status:open AND tag:urgent`

## Troubleshooting

### Docker Issues

**Container won't start:**
```bash
# Check logs
docker logs frontapp-mcp-server

# Check if port is in use
docker ps

# Rebuild image
make clean
make build
make up
```

**API token not working:**
```bash
# Verify token in .env file
cat .env

# Check if container has the token
docker exec frontapp-mcp-server printenv FRONTAPP_API_TOKEN

# Restart with new token
make restart
```

**Wrapper script not executable:**
```bash
# Linux/macOS
chmod +x docker-mcp-wrapper.sh

# Or use make
make wrapper
```

### Claude Code Issues

**Server not appearing:**
1. Check wrapper script path is absolute
2. Verify wrapper script is executable
3. Check Docker is running
4. Restart Claude Code completely

**Connection errors:**
1. Check container is running: `docker ps`
2. View container logs: `make logs`
3. Test manually: `./docker-mcp-wrapper.sh`

### Performance Issues

**Slow responses:**
- Check Docker resource limits
- Monitor container stats: `docker stats frontapp-mcp-server`
- Increase Docker memory/CPU allocation

**Container keeps restarting:**
- Check logs: `make logs`
- Verify API token is valid
- Check network connectivity

## Security Best Practices

### Docker Security

- ✅ Runs as non-root user (uid 1001)
- ✅ Minimal Alpine Linux base image
- ✅ Multi-stage build (smaller attack surface)
- ✅ No unnecessary packages
- ✅ Health checks enabled
- ✅ Read-only root filesystem (optional)

### API Token Security

- **Never commit `.env` to version control**
- Store tokens in environment variables
- Use Docker secrets for production
- Rotate tokens regularly
- Use tokens with minimal required permissions

### Production Deployment

For production, consider:

```yaml
# docker-compose.prod.yml
services:
  frontapp-mcp:
    restart: always
    read_only: true
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    secrets:
      - frontapp_token
    environment:
      - FRONTAPP_API_TOKEN_FILE=/run/secrets/frontapp_token

secrets:
  frontapp_token:
    external: true
```

## Development

### Local Development with Docker

```bash
# Development with live reload
docker compose -f docker-compose.dev.yml up

# Run tests in container
docker compose exec frontapp-mcp npm test

# Lint code
docker compose exec frontapp-mcp npm run lint

# Access shell
make shell
```

### Building Multi-Architecture Images

```bash
# Build for multiple platforms
docker buildx build --platform linux/amd64,linux/arm64 -t frontapp-mcp:latest .

# Push to registry
docker buildx build --platform linux/amd64,linux/arm64 -t your-registry/frontapp-mcp:latest --push .
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build image
        run: docker compose build
      - name: Run tests
        run: docker compose run --rm frontapp-mcp npm test
```

## Monitoring

### Health Checks

The container includes health checks:

```bash
# Check health status
docker inspect --format='{{.State.Health.Status}}' frontapp-mcp-server

# View health check logs
docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' frontapp-mcp-server
```

### Resource Monitoring

```bash
# Monitor resource usage
docker stats frontapp-mcp-server

# Set resource limits in docker-compose.yml
services:
  frontapp-mcp:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

## API Documentation

For full Frontapp API documentation, visit:
https://dev.frontapp.com/reference/introduction

## Contributing

Contributions are welcome! Areas for improvement:

- Additional endpoints (drafts, rules, shifts)
- Webhook support
- Enhanced error messages
- Unit tests
- Kubernetes deployment manifests
- Rate limit handling with retries

## License

MIT

## Support

For issues with:
- **This MCP server**: Create an issue in the repository
- **Docker**: Check Docker documentation
- **Frontapp API**: Visit https://help.front.com
- **Claude Code**: Check https://docs.claude.com

## Changelog

### v1.0.0
- Initial release
- Docker support with multi-stage builds
- Full CRUD for conversations, messages, contacts
- Search functionality
- Tag and inbox management
- Comment support
- Analytics integration
- Security hardening
