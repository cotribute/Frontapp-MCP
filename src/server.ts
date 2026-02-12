import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import axios, { AxiosInstance } from "axios";

import { tools as frontappTools } from "./frontapp/tools.js";
import { createHandlers as createFrontappHandlers } from "./frontapp/handlers.js";
import { tools as pipedriveTools } from "./pipedrive/tools.js";
import { createHandlers as createPipedriveHandlers } from "./pipedrive/handlers.js";

export class CotributeMCPServer {
  private server: Server;
  private frontappAxios: AxiosInstance;
  private pipedriveAxios: AxiosInstance | null;
  private handlers: Record<string, (args: any) => Promise<any>>;

  constructor(
    frontappToken: string,
    pipedriveToken?: string,
    pipedriveDomain?: string
  ) {
    this.server = new Server(
      { name: "switchboard", version: "2.0.0" },
      { capabilities: { tools: {}, resources: {} } }
    );

    this.frontappAxios = axios.create({
      baseURL: "https://api2.frontapp.com",
      headers: {
        Authorization: `Bearer ${frontappToken}`,
        "Content-Type": "application/json",
      },
    });

    // Merge handlers from Front.app
    this.handlers = { ...createFrontappHandlers(this.frontappAxios) };

    // Conditionally add Pipedrive if configured
    if (pipedriveToken && pipedriveDomain) {
      this.pipedriveAxios = axios.create({
        baseURL: `https://${pipedriveDomain}.pipedrive.com/api/v1`,
        headers: {
          "x-api-token": pipedriveToken,
          "Content-Type": "application/json",
        },
      });
      Object.assign(
        this.handlers,
        createPipedriveHandlers(this.pipedriveAxios)
      );
    } else {
      this.pipedriveAxios = null;
    }

    this.setupHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error("[MCP Error]", error);
    };

    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupHandlers(): void {
    // Merge tool definitions
    const allTools = [
      ...frontappTools,
      ...(this.pipedriveAxios ? pipedriveTools : []),
    ];

    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: allTools,
    }));

    // Front.app resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: "frontapp://conversations/recent",
          name: "Recent Conversations",
          description: "Most recently updated conversations",
          mimeType: "application/json",
        },
        {
          uri: "frontapp://teammates",
          name: "Teammates",
          description: "List of all teammates",
          mimeType: "application/json",
        },
        {
          uri: "frontapp://inboxes",
          name: "Inboxes",
          description: "List of all inboxes",
          mimeType: "application/json",
        },
        {
          uri: "frontapp://tags",
          name: "Tags",
          description: "List of all tags",
          mimeType: "application/json",
        },
      ],
    }));

    this.server.setRequestHandler(
      ReadResourceRequestSchema,
      async (request) => {
        const uri = request.params.uri.toString();
        const resourceMap: Record<string, string> = {
          "frontapp://conversations/recent": "/conversations?limit=20",
          "frontapp://teammates": "/teammates",
          "frontapp://inboxes": "/inboxes",
          "frontapp://tags": "/tags",
        };

        const endpoint = resourceMap[uri];
        if (!endpoint) throw new Error(`Unknown resource: ${uri}`);

        const response = await this.frontappAxios.get(endpoint.split("?")[0], {
          params: endpoint.includes("?") ? { limit: 20 } : undefined,
        });

        return {
          contents: [
            {
              uri,
              mimeType: "application/json",
              text: JSON.stringify(response.data, null, 2),
            },
          ],
        };
      }
    );

    // Unified tool call handler
    const handlers = this.handlers;
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      const typedArgs = args as any;

      try {
        const handler = handlers[name];
        if (!handler) throw new Error(`Unknown tool: ${name}`);

        const result = await handler(typedArgs);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message;
        return {
          content: [{ type: "text", text: `Error: ${errorMessage}` }],
          isError: true,
        };
      }
    });
  }

  getServer(): Server {
    return this.server;
  }
}
