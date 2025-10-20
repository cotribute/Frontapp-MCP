#!/usr/bin/env node

/**
 * Frontapp MCP Server
 * 
 * A comprehensive Model Context Protocol server for Frontapp API integration.
 * Allows Claude Code to interact with conversations, messages, contacts, and more.
 * 
 * Setup:
 * 1. npm install @modelcontextprotocol/sdk axios
 * 2. Set FRONTAPP_API_TOKEN environment variable
 * 3. Run: node frontapp-mcp-server.js
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://api2.frontapp.com';

class FrontappMCPServer {
  private server: Server;
  private axiosInstance: AxiosInstance;

  constructor(apiToken: string) {
    this.server = new Server(
      {
        name: 'frontapp-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    // Configure axios with API token
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    this.setupHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        // Conversation tools
        {
          name: 'list_conversations',
          description: 'List conversations in Front. Returns conversations in reverse chronological order (most recently updated first). Supports pagination and filtering via query parameter.',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number', description: 'Number of results (max 100, default 50)' },
              page_token: { type: 'string', description: 'Pagination token from previous response' },
              q: { type: 'string', description: 'Query string for filtering (e.g., "status:archived")' },
            },
          },
        },
        {
          name: 'get_conversation',
          description: 'Get details of a specific conversation by ID',
          inputSchema: {
            type: 'object',
            properties: {
              conversation_id: { type: 'string', description: 'Conversation ID (e.g., cnv_abc123)' },
            },
            required: ['conversation_id'],
          },
        },
        {
          name: 'search_conversations',
          description: 'Search for conversations using Front search syntax. Supports complex queries with status, tags, assignees, etc.',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string', description: 'Search query (e.g., "tag:urgent status:open")' },
              limit: { type: 'number', description: 'Number of results (max 100, default 50)' },
            },
            required: ['query'],
          },
        },
        {
          name: 'update_conversation',
          description: 'Update conversation properties like assignee, tags, status',
          inputSchema: {
            type: 'object',
            properties: {
              conversation_id: { type: 'string', description: 'Conversation ID' },
              assignee_id: { type: 'string', description: 'Teammate ID to assign' },
              status: { type: 'string', enum: ['archived', 'deleted', 'open'], description: 'Conversation status' },
              tag_ids: { type: 'array', items: { type: 'string' }, description: 'Array of tag IDs' },
            },
            required: ['conversation_id'],
          },
        },

        // Message tools
        {
          name: 'list_conversation_messages',
          description: 'List all messages in a conversation in reverse chronological order (newest first)',
          inputSchema: {
            type: 'object',
            properties: {
              conversation_id: { type: 'string', description: 'Conversation ID' },
              limit: { type: 'number', description: 'Number of results (max 100, default 50)' },
              page_token: { type: 'string', description: 'Pagination token' },
            },
            required: ['conversation_id'],
          },
        },
        {
          name: 'get_message',
          description: 'Get details of a specific message by ID',
          inputSchema: {
            type: 'object',
            properties: {
              message_id: { type: 'string', description: 'Message ID (e.g., msg_abc123)' },
            },
            required: ['message_id'],
          },
        },
        {
          name: 'send_message',
          description: 'Send a new message to a channel (creates a new conversation)',
          inputSchema: {
            type: 'object',
            properties: {
              channel_id: { type: 'string', description: 'Channel ID to send from' },
              to: { type: 'array', items: { type: 'string' }, description: 'Recipient email addresses or handles' },
              subject: { type: 'string', description: 'Message subject' },
              body: { type: 'string', description: 'Message body (text or HTML)' },
              text: { type: 'string', description: 'Plain text version of body' },
              cc: { type: 'array', items: { type: 'string' }, description: 'CC recipients' },
              bcc: { type: 'array', items: { type: 'string' }, description: 'BCC recipients' },
              tag_ids: { type: 'array', items: { type: 'string' }, description: 'Tags to apply' },
            },
            required: ['channel_id', 'to', 'body'],
          },
        },
        {
          name: 'reply_to_conversation',
          description: 'Send a reply to an existing conversation',
          inputSchema: {
            type: 'object',
            properties: {
              conversation_id: { type: 'string', description: 'Conversation ID to reply to' },
              type: { type: 'string', enum: ['comment', 'reply'], description: 'Type of reply' },
              body: { type: 'string', description: 'Reply body' },
              text: { type: 'string', description: 'Plain text version' },
              author_id: { type: 'string', description: 'Teammate ID sending the reply' },
              channel_id: { type: 'string', description: 'Channel to send from (required for reply type)' },
            },
            required: ['conversation_id', 'type', 'body'],
          },
        },

        // Contact tools
        {
          name: 'list_contacts',
          description: 'List contacts in Front with pagination support',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number', description: 'Number of results (max 100, default 50)' },
              page_token: { type: 'string', description: 'Pagination token' },
              sort_by: { type: 'string', description: 'Sort field' },
              sort_order: { type: 'string', enum: ['asc', 'desc'], description: 'Sort order' },
            },
          },
        },
        {
          name: 'get_contact',
          description: 'Get details of a specific contact by ID',
          inputSchema: {
            type: 'object',
            properties: {
              contact_id: { type: 'string', description: 'Contact ID (e.g., crd_abc123)' },
            },
            required: ['contact_id'],
          },
        },
        {
          name: 'create_contact',
          description: 'Create a new contact in Front',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Contact name' },
              description: { type: 'string', description: 'Contact description' },
              handles: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    handle: { type: 'string', description: 'Email, phone, or social handle' },
                    source: { type: 'string', description: 'Source type (email, phone, twitter, etc.)' },
                  },
                },
                description: 'Contact handles (email, phone, etc.)',
              },
              custom_fields: { type: 'object', description: 'Custom field key-value pairs' },
            },
            required: ['handles'],
          },
        },
        {
          name: 'update_contact',
          description: 'Update an existing contact',
          inputSchema: {
            type: 'object',
            properties: {
              contact_id: { type: 'string', description: 'Contact ID' },
              name: { type: 'string', description: 'Updated name' },
              description: { type: 'string', description: 'Updated description' },
              handles: { type: 'array', items: { type: 'object' }, description: 'Updated handles' },
              custom_fields: { type: 'object', description: 'Updated custom fields' },
            },
            required: ['contact_id'],
          },
        },

        // Teammate tools
        {
          name: 'list_teammates',
          description: 'List all teammates in the Front account',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number', description: 'Number of results' },
              page_token: { type: 'string', description: 'Pagination token' },
            },
          },
        },
        {
          name: 'get_teammate',
          description: 'Get details of a specific teammate by ID',
          inputSchema: {
            type: 'object',
            properties: {
              teammate_id: { type: 'string', description: 'Teammate ID (e.g., tea_abc123)' },
            },
            required: ['teammate_id'],
          },
        },

        // Tag tools
        {
          name: 'list_tags',
          description: 'List all tags in the Front account',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number', description: 'Number of results' },
              page_token: { type: 'string', description: 'Pagination token' },
            },
          },
        },
        {
          name: 'create_tag',
          description: 'Create a new tag',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Tag name' },
              highlight: {
                type: 'string',
                enum: ['grey', 'pink', 'red', 'orange', 'yellow', 'green', 'light-blue', 'blue', 'purple'],
                description: 'Tag color',
              },
              is_private: { type: 'boolean', description: 'Whether tag is private' },
            },
            required: ['name'],
          },
        },

        // Inbox tools
        {
          name: 'list_inboxes',
          description: 'List all inboxes accessible to the API token',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number', description: 'Number of results' },
              page_token: { type: 'string', description: 'Pagination token' },
            },
          },
        },
        {
          name: 'get_inbox',
          description: 'Get details of a specific inbox by ID',
          inputSchema: {
            type: 'object',
            properties: {
              inbox_id: { type: 'string', description: 'Inbox ID (e.g., inb_abc123)' },
            },
            required: ['inbox_id'],
          },
        },

        // Comment tools
        {
          name: 'list_conversation_comments',
          description: 'List all comments (internal discussions) in a conversation',
          inputSchema: {
            type: 'object',
            properties: {
              conversation_id: { type: 'string', description: 'Conversation ID' },
            },
            required: ['conversation_id'],
          },
        },
        {
          name: 'add_comment',
          description: 'Add an internal comment to a conversation',
          inputSchema: {
            type: 'object',
            properties: {
              conversation_id: { type: 'string', description: 'Conversation ID' },
              body: { type: 'string', description: 'Comment body' },
              author_id: { type: 'string', description: 'Teammate ID posting the comment' },
            },
            required: ['conversation_id', 'body'],
          },
        },

        // Analytics tools
        {
          name: 'get_analytics',
          description: 'Get analytics data for conversations, messages, or teammates',
          inputSchema: {
            type: 'object',
            properties: {
              start: { type: 'number', description: 'Start timestamp (Unix time)' },
              end: { type: 'number', description: 'End timestamp (Unix time)' },
              metrics: {
                type: 'array',
                items: { type: 'string' },
                description: 'Metrics to retrieve (e.g., avg_first_response_time)',
              },
              filters: { type: 'object', description: 'Filters to apply' },
            },
            required: ['start', 'end'],
          },
        },
      ],
    }));

    // List resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'frontapp://conversations/recent',
          name: 'Recent Conversations',
          description: 'Most recently updated conversations',
          mimeType: 'application/json',
        },
        {
          uri: 'frontapp://teammates',
          name: 'Teammates',
          description: 'List of all teammates',
          mimeType: 'application/json',
        },
        {
          uri: 'frontapp://inboxes',
          name: 'Inboxes',
          description: 'List of all inboxes',
          mimeType: 'application/json',
        },
        {
          uri: 'frontapp://tags',
          name: 'Tags',
          description: 'List of all tags',
          mimeType: 'application/json',
        },
      ],
    }));

    // Read resources
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const uri = request.params.uri.toString();

      if (uri === 'frontapp://conversations/recent') {
        const response = await this.axiosInstance.get('/conversations', {
          params: { limit: 20 },
        });
        return {
          contents: [{
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(response.data, null, 2),
          }],
        };
      }

      if (uri === 'frontapp://teammates') {
        const response = await this.axiosInstance.get('/teammates');
        return {
          contents: [{
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(response.data, null, 2),
          }],
        };
      }

      if (uri === 'frontapp://inboxes') {
        const response = await this.axiosInstance.get('/inboxes');
        return {
          contents: [{
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(response.data, null, 2),
          }],
        };
      }

      if (uri === 'frontapp://tags') {
        const response = await this.axiosInstance.get('/tags');
        return {
          contents: [{
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(response.data, null, 2),
          }],
        };
      }

      throw new Error(`Unknown resource: ${uri}`);
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        let result;

        switch (name) {
          // Conversation operations
          case 'list_conversations':
            result = await this.listConversations(args);
            break;
          case 'get_conversation':
            result = await this.getConversation((args as any).conversation_id);
            break;
          case 'search_conversations':
            result = await this.searchConversations((args as any).query, (args as any).limit);
            break;
          case 'update_conversation':
            result = await this.updateConversation(args);
            break;

          // Message operations
          case 'list_conversation_messages':
            result = await this.listConversationMessages(args);
            break;
          case 'get_message':
            result = await this.getMessage((args as any).message_id);
            break;
          case 'send_message':
            result = await this.sendMessage(args);
            break;
          case 'reply_to_conversation':
            result = await this.replyToConversation(args);
            break;

          // Contact operations
          case 'list_contacts':
            result = await this.listContacts(args);
            break;
          case 'get_contact':
            result = await this.getContact((args as any).contact_id);
            break;
          case 'create_contact':
            result = await this.createContact(args);
            break;
          case 'update_contact':
            result = await this.updateContact(args);
            break;

          // Teammate operations
          case 'list_teammates':
            result = await this.listTeammates(args);
            break;
          case 'get_teammate':
            result = await this.getTeammate((args as any).teammate_id);
            break;

          // Tag operations
          case 'list_tags':
            result = await this.listTags(args);
            break;
          case 'create_tag':
            result = await this.createTag(args);
            break;

          // Inbox operations
          case 'list_inboxes':
            result = await this.listInboxes(args);
            break;
          case 'get_inbox':
            result = await this.getInbox((args as any).inbox_id);
            break;

          // Comment operations
          case 'list_conversation_comments':
            result = await this.listConversationComments((args as any).conversation_id);
            break;
          case 'add_comment':
            result = await this.addComment(args);
            break;

          // Analytics
          case 'get_analytics':
            result = await this.getAnalytics(args);
            break;

          default:
            throw new Error(`Unknown tool: ${name}`);
        }

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true,
        };
      }
    });
  }

  // Conversation methods
  private async listConversations(params: any) {
    const response = await this.axiosInstance.get('/conversations', { params });
    return response.data;
  }

  private async getConversation(conversationId: string) {
    const response = await this.axiosInstance.get(`/conversations/${conversationId}`);
    return response.data;
  }

  private async searchConversations(query: string, limit?: number) {
    const response = await this.axiosInstance.get('/conversations/search', {
      params: { q: query, limit },
    });
    return response.data;
  }

  private async updateConversation(params: any) {
    const { conversation_id, ...data } = params;
    const response = await this.axiosInstance.patch(`/conversations/${conversation_id}`, data);
    return response.data;
  }

  // Message methods
  private async listConversationMessages(params: any) {
    const { conversation_id, ...queryParams } = params;
    const response = await this.axiosInstance.get(
      `/conversations/${conversation_id}/messages`,
      { params: queryParams }
    );
    return response.data;
  }

  private async getMessage(messageId: string) {
    const response = await this.axiosInstance.get(`/messages/${messageId}`);
    return response.data;
  }

  private async sendMessage(params: any) {
    const { channel_id, ...data } = params;
    const response = await this.axiosInstance.post(`/channels/${channel_id}/messages`, data);
    return response.data;
  }

  private async replyToConversation(params: any) {
    const { conversation_id, type, ...data } = params;
    const endpoint = type === 'comment' ? 'comments' : 'messages';
    const response = await this.axiosInstance.post(
      `/conversations/${conversation_id}/${endpoint}`,
      data
    );
    return response.data;
  }

  // Contact methods
  private async listContacts(params: any) {
    const response = await this.axiosInstance.get('/contacts', { params });
    return response.data;
  }

  private async getContact(contactId: string) {
    const response = await this.axiosInstance.get(`/contacts/${contactId}`);
    return response.data;
  }

  private async createContact(params: any) {
    const response = await this.axiosInstance.post('/contacts', params);
    return response.data;
  }

  private async updateContact(params: any) {
    const { contact_id, ...data } = params;
    const response = await this.axiosInstance.patch(`/contacts/${contact_id}`, data);
    return response.data;
  }

  // Teammate methods
  private async listTeammates(params: any) {
    const response = await this.axiosInstance.get('/teammates', { params });
    return response.data;
  }

  private async getTeammate(teammateId: string) {
    const response = await this.axiosInstance.get(`/teammates/${teammateId}`);
    return response.data;
  }

  // Tag methods
  private async listTags(params: any) {
    const response = await this.axiosInstance.get('/tags', { params });
    return response.data;
  }

  private async createTag(params: any) {
    const response = await this.axiosInstance.post('/tags', params);
    return response.data;
  }

  // Inbox methods
  private async listInboxes(params: any) {
    const response = await this.axiosInstance.get('/inboxes', { params });
    return response.data;
  }

  private async getInbox(inboxId: string) {
    const response = await this.axiosInstance.get(`/inboxes/${inboxId}`);
    return response.data;
  }

  // Comment methods
  private async listConversationComments(conversationId: string) {
    const response = await this.axiosInstance.get(`/conversations/${conversationId}/comments`);
    return response.data;
  }

  private async addComment(params: any) {
    const { conversation_id, ...data } = params;
    const response = await this.axiosInstance.post(
      `/conversations/${conversation_id}/comments`,
      data
    );
    return response.data;
  }

  // Analytics methods
  private async getAnalytics(params: any) {
    const response = await this.axiosInstance.get('/analytics', { params });
    return response.data;
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Frontapp MCP server running on stdio');
  }
}

// Main execution
const apiToken = process.env.FRONTAPP_API_TOKEN;

if (!apiToken) {
  console.error('Error: FRONTAPP_API_TOKEN environment variable is required');
  process.exit(1);
}

const server = new FrontappMCPServer(apiToken);
server.run().catch(console.error);
