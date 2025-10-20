#!/bin/bash
# Docker MCP Wrapper Script for Frontapp
# This script allows Claude Code to communicate with the MCP server running in Docker

set -e

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Load environment variables if .env exists
if [ -f "$SCRIPT_DIR/.env" ]; then
    export $(grep -v '^#' "$SCRIPT_DIR/.env" | xargs)
fi

# Check if API token is set
if [ -z "$FRONTAPP_API_TOKEN" ]; then
    echo "Error: FRONTAPP_API_TOKEN environment variable is not set" >&2
    echo "Please set it in .env file or export it" >&2
    exit 1
fi

# Container name
CONTAINER_NAME="frontapp-mcp-server"

# Check if container is running
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "Starting Frontapp MCP server container..." >&2
    
    # Start the container with docker compose
    cd "$SCRIPT_DIR"
    docker compose up -d
    
    # Wait for container to be ready
    sleep 2
fi

# Execute the MCP server inside the container with stdio
# This pipes stdin/stdout between Claude Code and the container
exec docker exec -i \
    -e FRONTAPP_API_TOKEN="$FRONTAPP_API_TOKEN" \
    "$CONTAINER_NAME" \
    node dist/index.js
