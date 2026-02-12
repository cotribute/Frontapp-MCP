#!/usr/bin/env node

import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express, { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

import { CotributeMCPServer } from "./server.js";

// Required env vars
const frontappToken = process.env.FRONTAPP_API_TOKEN;
if (!frontappToken) {
  console.error("Error: FRONTAPP_API_TOKEN environment variable is required");
  process.exit(1);
}

// Optional Pipedrive env vars
const pipedriveToken = process.env.PIPEDRIVE_API_TOKEN;
const pipedriveDomain = process.env.PIPEDRIVE_DOMAIN;

if (pipedriveToken && !pipedriveDomain) {
  console.error(
    "Error: PIPEDRIVE_DOMAIN is required when PIPEDRIVE_API_TOKEN is set"
  );
  process.exit(1);
}

const mcpApiKey = process.env.MCP_API_KEY;

const app = express();
app.use(express.json());

// Health check (no auth required)
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", server: "switchboard" });
});

// Auth middleware for MCP endpoint — accepts Bearer header OR token in URL path
function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (!mcpApiKey) {
    next();
    return;
  }
  const headerToken = req.headers.authorization?.replace("Bearer ", "");
  const pathToken = req.params.token;
  if (headerToken !== mcpApiKey && pathToken !== mcpApiKey) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

// Track transports by session ID for stateful connections
const transports = new Map<string, StreamableHTTPServerTransport>();

// MCP handler shared by both routes
async function handleMcp(req: Request, res: Response) {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;

  if (req.method === "POST" && !sessionId) {
    // New session — create a new MCP server + transport pair (Server is 1:1 with transport)
    const newSessionId = randomUUID();
    const mcpServer = new CotributeMCPServer(
      frontappToken,
      pipedriveToken,
      pipedriveDomain
    );
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => newSessionId,
    });

    transport.onclose = () => {
      transports.delete(newSessionId);
    };

    await mcpServer.getServer().connect(transport);

    // Store BEFORE handleRequest — handleRequest may hold the connection open for SSE
    // and not resolve, so we must register the session first.
    transports.set(newSessionId, transport);

    await transport.handleRequest(req, res, req.body);
    return;
  }

  // Existing session — look up the transport
  if (sessionId) {
    const transport = transports.get(sessionId);
    if (!transport) {
      res.status(404).json({ error: "Session not found" });
      return;
    }
    await transport.handleRequest(req, res, req.body);
    return;
  }

  res.status(400).json({ error: "Missing mcp-session-id header" });
}

// /mcp — auth via Authorization header (Claude Code)
app.all("/mcp", authMiddleware, handleMcp);
// /mcp/:token — auth via URL path (Claude Desktop / Cowork connectors)
app.all("/mcp/:token", authMiddleware, handleMcp);

const port = parseInt(process.env.PORT || "3000", 10);
app.listen(port, () => {
  const services = ["Front.app"];
  if (pipedriveToken) services.push("Pipedrive");
  console.log(
    `Switchboard MCP server listening on port ${port} (${services.join(" + ")})`
  );
});
