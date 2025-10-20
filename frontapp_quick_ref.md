# Frontapp MCP Server - Quick Reference

## 🚀 Quick Start Commands

```bash
# Build and start
make build && make up

# Stop
make down

# View logs
make logs

# Restart
make restart
```

## 📁 File Structure

```
frontapp-mcp-server/
├── src/index.ts              # Main server code
├── Dockerfile                # Docker image
├── docker-compose.yml        # Compose config
├── docker-mcp-wrapper.sh     # Wrapper script
├── .env                      # API token (SECRET!)
└── package.json              # Dependencies
```

## ⚙️ Configuration

**Claude Code Config Location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

**Config Content:**
```json
{
  "mcpServers": {
    "frontapp": {
      "command": "/absolute/path/to/docker-mcp-wrapper.sh"
    }
  }
}
```

## 🛠️ Common Make Commands

| Command | Description |
|---------|-------------|
| `make build` | Build Docker image |
| `make up` | Start server |
| `make down` | Stop server |
| `make restart` | Restart server |
| `make logs` | View logs |
| `make shell` | Open container shell |
| `make test` | Test connection |
| `make clean` | Remove everything |
| `make wrapper` | Make script executable |

## 🐳 Docker Commands

### Container Management
```bash
# Start
docker compose up -d

# Stop
docker compose down

# Restart
docker compose restart

# Rebuild
docker compose build --no-cache
```

### Monitoring
```bash
# Status
docker ps

# Logs
docker logs -f frontapp-mcp-server

# Resources
docker stats frontapp-mcp-server

# Shell access
docker exec -it frontapp-mcp-server sh
```

### Cleanup
```bash
# Stop and remove
docker compose down -v

# Remove image
docker rmi frontapp-mcp-server

# Prune system
docker system prune -af
```

## 🔧 Troubleshooting

### Container Won't Start
```bash
# Check logs
docker logs frontapp-mcp-server

# Verify token
cat .env

# Rebuild
make clean && make build && make up
```

### Claude Code Not Connecting
```bash
# Test wrapper
./docker-mcp-wrapper.sh

# Make executable
chmod +x docker-mcp-wrapper.sh

# Check container
docker ps | grep frontapp
```

### API Errors
```bash
# Test token manually
curl -H "Authorization: Bearer $FRONTAPP_API_TOKEN" \
  https://api2.frontapp.com/conversations?limit=1

# Update token
nano .env
make restart
```

## 📊 Available Tools

### Conversations
- `list_conversations` - List with filters
- `get_conversation` - Get details
- `search_conversations` - Advanced search
- `update_conversation` - Update properties

### Messages
- `list_conversation_messages` - List messages
- `get_message` - Get details
- `send_message` - Send new message
- `reply_to_conversation` - Send reply

### Contacts
- `list_contacts` - List all
- `get_contact` - Get details
- `create_contact` - Create new
- `update_contact` - Update existing

### Teammates
- `list_teammates` - List all
- `get_teammate` - Get details

### Tags
- `list_tags` - List all
- `create_tag` - Create new

### Inboxes
- `list_inboxes` - List all
- `get_inbox` - Get details

### Comments
- `list_conversation_comments` - List comments
- `add_comment` - Add comment

### Analytics
- `get_analytics` - Get metrics

## 💬 Example Queries

### Search & Filter
```
"Find all open conversations tagged urgent"
"Show me unassigned conversations from today"
"List conversations assigned to me that are open"
```

### Read & Analyze
```
"Get details of conversation cnv_abc123"
"Show me the last 10 messages in cnv_abc123"
"What are the most recent conversations?"
```

### Send & Reply
```
"Send an email to john@example.com saying hello"
"Reply to cnv_abc123 with an update"
"Add an internal comment to cnv_abc123"
```

### Manage & Organize
```
"Create a contact for jane@example.com"
"Assign cnv_abc123 to teammate tea_456"
"Add tag 'urgent' to conversation cnv_abc123"
"Archive conversation cnv_abc123"
```

## 🔍 Search Syntax

| Query | Description |
|-------|-------------|
| `status:open` | Open conversations |
| `status:archived` | Archived |
| `tag:urgent` | Tagged urgent |
| `assignee:me` | Assigned to you |
| `is:unassigned` | Unassigned |
| `inbox:support` | In support inbox |
| `after:2024-01-01` | After date |
| `before:2024-12-31` | Before date |

**Combine with AND/OR:**
```
status:open AND tag:urgent
assignee:me OR is:unassigned
```

## 🔐 Security Checklist

- [ ] API token in `.env` file
- [ ] `.env` in `.gitignore`
- [ ] File permissions set: `chmod 600 .env`
- [ ] Wrapper script executable: `chmod +x docker-mcp-wrapper.sh`
- [ ] Container running as non-root user
- [ ] Tokens rotated regularly

## 📈 Performance Tips

### Resource Limits
```yaml
# Add to docker-compose.yml
deploy:
  resources:
    limits:
      cpus: '1.0'
      memory: 1G
```

### Monitor Usage
```bash
# Real-time stats
docker stats frontapp-mcp-server

# Set alerts
watch -n 10 'docker stats --no-stream frontapp-mcp-server'
```

## 🔄 Update Process

```bash
# 1. Pull latest
git pull

# 2. Stop
make down

# 3. Rebuild
make build

# 4. Start
make up

# 5. Verify
make test
```

## 🆘 Emergency Commands

### Server Crashed
```bash
make restart
```

### Complete Reset
```bash
make clean
make build
make up
```

### Force Rebuild
```bash
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

### Check Everything
```bash
docker ps                              # Container running?
docker logs frontapp-mcp-server        # Any errors?
cat .env                               # Token set?
./docker-mcp-wrapper.sh                # Script works?
```

## 📞 Support

| Issue | Solution |
|-------|----------|
| Docker not running | `docker ps` fails |
| Container won't start | Check `docker logs` |
| API errors | Verify token in `.env` |
| Claude can't connect | Check wrapper path |
| Permission denied | `chmod +x wrapper script` |

## 🎯 Quick Health Check

```bash
# Run all checks
echo "=== Docker Status ===" && docker ps | grep frontapp
echo "=== Container Health ===" && docker inspect --format='{{.State.Health.Status}}' frontapp-mcp-server 2>/dev/null || echo "No health check"
echo "=== Recent Logs ===" && docker logs --tail 5 frontapp-mcp-server 2>&1
echo "=== Token Set ===" && [ -n "$FRONTAPP_API_TOKEN" ] && echo "✓ Set" || echo "✗ Not set"
```

## 📚 Useful Links

- [Full Documentation](./README.md)
- [Docker Setup Guide](./DOCKER_SETUP_GUIDE.md)
- [Frontapp API Docs](https://dev.frontapp.com/reference/introduction)
- [MCP Specification](https://modelcontextprotocol.io)

## 🎓 Learning Path

1. ✅ Quick Start (5 min)
2. ✅ Basic queries (10 min)
3. ⏭️ Advanced search (15 min)
4. ⏭️ Workflow automation (30 min)
5. ⏭️ Custom integrations (1 hour)

---

**Pro Tip:** Keep this file open while working with the MCP server!
