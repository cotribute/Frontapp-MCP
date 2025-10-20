.PHONY: help build up down restart logs shell test clean prune

# Default target
help:
	@echo "Frontapp MCP Server - Docker Commands"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  build      - Build the Docker image"
	@echo "  up         - Start the MCP server container"
	@echo "  down       - Stop the MCP server container"
	@echo "  restart    - Restart the container"
	@echo "  logs       - View container logs"
	@echo "  shell      - Open shell in container"
	@echo "  test       - Test the MCP server"
	@echo "  clean      - Stop and remove containers"
	@echo "  prune      - Clean up Docker resources"
	@echo "  wrapper    - Make wrapper script executable"

# Build the Docker image
build:
	@echo "Building Frontapp MCP server image..."
	docker compose build

# Start the container
up:
	@echo "Starting Frontapp MCP server..."
	docker compose up -d
	@echo "Container started successfully!"
	@echo "Use 'make logs' to view logs"

# Stop the container
down:
	@echo "Stopping Frontapp MCP server..."
	docker compose down

# Restart the container
restart: down up

# View logs
logs:
	docker compose logs -f frontapp-mcp

# Open shell in container
shell:
	docker compose exec frontapp-mcp sh

# Test the server
test:
	@echo "Testing MCP server connection..."
	@docker compose ps frontapp-mcp | grep -q "Up" && echo "✓ Container is running" || echo "✗ Container is not running"

# Clean up
clean:
	@echo "Cleaning up containers and volumes..."
	docker compose down -v
	@echo "Cleanup complete!"

# Prune Docker resources
prune:
	@echo "Pruning Docker resources..."
	docker system prune -f
	@echo "Prune complete!"

# Make wrapper scripts executable
wrapper:
	chmod +x docker-mcp-wrapper.sh
	@echo "Wrapper script is now executable"
