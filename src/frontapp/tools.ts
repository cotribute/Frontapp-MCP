export const tools = [
  // Conversation tools
  {
    name: "list_conversations",
    description:
      "List conversations in Front. Returns conversations in reverse chronological order (most recently updated first). Supports pagination and filtering via query parameter.",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of results (max 100, default 50)",
        },
        page_token: {
          type: "string",
          description: "Pagination token from previous response",
        },
        q: {
          type: "string",
          description: 'Query string for filtering (e.g., "status:archived")',
        },
      },
    },
  },
  {
    name: "get_conversation",
    description: "Get details of a specific conversation by ID",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: {
          type: "string",
          description: "Conversation ID (e.g., cnv_abc123)",
        },
      },
      required: ["conversation_id"],
    },
  },
  {
    name: "search_conversations",
    description:
      "Search for conversations using Front search syntax. Supports complex queries with status, tags, assignees, etc.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: 'Search query (e.g., "tag:urgent status:open")',
        },
        limit: {
          type: "number",
          description: "Number of results (max 100, default 50)",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "update_conversation",
    description: "Update conversation properties like assignee, tags, status",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
        assignee_id: { type: "string", description: "Teammate ID to assign" },
        status: {
          type: "string",
          enum: ["archived", "deleted", "open"],
          description: "Conversation status",
        },
        tag_ids: {
          type: "array",
          items: { type: "string" },
          description: "Array of tag IDs",
        },
      },
      required: ["conversation_id"],
    },
  },

  // Message tools
  {
    name: "list_conversation_messages",
    description:
      "List all messages in a conversation in reverse chronological order (newest first)",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
        limit: {
          type: "number",
          description: "Number of results (max 100, default 50)",
        },
        page_token: { type: "string", description: "Pagination token" },
      },
      required: ["conversation_id"],
    },
  },
  {
    name: "get_message",
    description: "Get details of a specific message by ID",
    inputSchema: {
      type: "object",
      properties: {
        message_id: {
          type: "string",
          description: "Message ID (e.g., msg_abc123)",
        },
      },
      required: ["message_id"],
    },
  },
  {
    name: "send_message",
    description: "Send a new message to a channel (creates a new conversation)",
    inputSchema: {
      type: "object",
      properties: {
        channel_id: { type: "string", description: "Channel ID to send from" },
        to: {
          type: "array",
          items: { type: "string" },
          description: "Recipient email addresses or handles",
        },
        subject: { type: "string", description: "Message subject" },
        body: { type: "string", description: "Message body (text or HTML)" },
        text: { type: "string", description: "Plain text version of body" },
        cc: {
          type: "array",
          items: { type: "string" },
          description: "CC recipients",
        },
        bcc: {
          type: "array",
          items: { type: "string" },
          description: "BCC recipients",
        },
        tag_ids: {
          type: "array",
          items: { type: "string" },
          description: "Tags to apply",
        },
      },
      required: ["channel_id", "to", "body"],
    },
  },
  {
    name: "reply_to_conversation",
    description: "Send a reply to an existing conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: {
          type: "string",
          description: "Conversation ID to reply to",
        },
        type: {
          type: "string",
          enum: ["comment", "reply"],
          description: "Type of reply",
        },
        body: { type: "string", description: "Reply body" },
        text: { type: "string", description: "Plain text version" },
        author_id: {
          type: "string",
          description: "Teammate ID sending the reply",
        },
        channel_id: {
          type: "string",
          description: "Channel to send from (required for reply type)",
        },
      },
      required: ["conversation_id", "type", "body"],
    },
  },

  // Contact tools
  {
    name: "list_contacts",
    description: "List contacts in Front with pagination support",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of results (max 100, default 50)",
        },
        page_token: { type: "string", description: "Pagination token" },
        sort_by: { type: "string", description: "Sort field" },
        sort_order: {
          type: "string",
          enum: ["asc", "desc"],
          description: "Sort order",
        },
      },
    },
  },
  {
    name: "get_contact",
    description: "Get details of a specific contact by ID",
    inputSchema: {
      type: "object",
      properties: {
        contact_id: {
          type: "string",
          description: "Contact ID (e.g., crd_abc123)",
        },
      },
      required: ["contact_id"],
    },
  },
  {
    name: "create_contact",
    description: "Create a new contact in Front",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Contact name" },
        description: { type: "string", description: "Contact description" },
        handles: {
          type: "array",
          items: {
            type: "object",
            properties: {
              handle: {
                type: "string",
                description: "Email, phone, or social handle",
              },
              source: {
                type: "string",
                description: "Source type (email, phone, twitter, etc.)",
              },
            },
          },
          description: "Contact handles (email, phone, etc.)",
        },
        custom_fields: {
          type: "object",
          description: "Custom field key-value pairs",
        },
      },
      required: ["handles"],
    },
  },
  {
    name: "update_contact",
    description: "Update an existing contact",
    inputSchema: {
      type: "object",
      properties: {
        contact_id: { type: "string", description: "Contact ID" },
        name: { type: "string", description: "Updated name" },
        description: { type: "string", description: "Updated description" },
        handles: {
          type: "array",
          items: { type: "object" },
          description: "Updated handles",
        },
        custom_fields: { type: "object", description: "Updated custom fields" },
      },
      required: ["contact_id"],
    },
  },

  // Teammate tools
  {
    name: "list_teammates",
    description: "List all teammates in the Front account",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
    },
  },
  {
    name: "get_teammate",
    description: "Get details of a specific teammate by ID",
    inputSchema: {
      type: "object",
      properties: {
        teammate_id: {
          type: "string",
          description: "Teammate ID (e.g., tea_abc123)",
        },
      },
      required: ["teammate_id"],
    },
  },

  // Tag tools
  {
    name: "list_tags",
    description: "List all tags in the Front account",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
    },
  },
  {
    name: "create_tag",
    description: "Create a new tag",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Tag name" },
        highlight: {
          type: "string",
          enum: [
            "grey",
            "pink",
            "red",
            "orange",
            "yellow",
            "green",
            "light-blue",
            "blue",
            "purple",
          ],
          description: "Tag color",
        },
        is_private: { type: "boolean", description: "Whether tag is private" },
      },
      required: ["name"],
    },
  },

  // Inbox tools
  {
    name: "list_inboxes",
    description: "List all inboxes accessible to the API token",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
    },
  },
  {
    name: "get_inbox",
    description: "Get details of a specific inbox by ID",
    inputSchema: {
      type: "object",
      properties: {
        inbox_id: {
          type: "string",
          description: "Inbox ID (e.g., inb_abc123)",
        },
      },
      required: ["inbox_id"],
    },
  },

  // Comment tools
  {
    name: "list_conversation_comments",
    description: "List all comments (internal discussions) in a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
      },
      required: ["conversation_id"],
    },
  },
  {
    name: "add_comment",
    description: "Add an internal comment to a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
        body: { type: "string", description: "Comment body" },
        author_id: {
          type: "string",
          description: "Teammate ID posting the comment",
        },
      },
      required: ["conversation_id", "body"],
    },
  },

  // Analytics tools
  {
    name: "get_analytics",
    description: "Get analytics data for conversations, messages, or teammates",
    inputSchema: {
      type: "object",
      properties: {
        start: { type: "number", description: "Start timestamp (Unix time)" },
        end: { type: "number", description: "End timestamp (Unix time)" },
        metrics: {
          type: "array",
          items: { type: "string" },
          description: "Metrics to retrieve (e.g., avg_first_response_time)",
        },
        filters: { type: "object", description: "Filters to apply" },
      },
      required: ["start", "end"],
    },
  },

  // Account tools
  {
    name: "list_accounts",
    description: "List all accounts in Front",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of results (max 100, default 50)",
        },
        page_token: { type: "string", description: "Pagination token" },
      },
    },
  },
  {
    name: "create_account",
    description: "Create a new account",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Account name" },
        description: { type: "string", description: "Account description" },
        domains: {
          type: "array",
          items: { type: "string" },
          description: "Account domains",
        },
        custom_fields: {
          type: "object",
          description: "Custom field key-value pairs",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "get_account",
    description: "Get details of a specific account by ID",
    inputSchema: {
      type: "object",
      properties: {
        account_id: { type: "string", description: "Account ID" },
      },
      required: ["account_id"],
    },
  },
  {
    name: "update_account",
    description: "Update an existing account",
    inputSchema: {
      type: "object",
      properties: {
        account_id: { type: "string", description: "Account ID" },
        name: { type: "string", description: "Updated name" },
        description: { type: "string", description: "Updated description" },
        domains: {
          type: "array",
          items: { type: "string" },
          description: "Updated domains",
        },
        custom_fields: { type: "object", description: "Updated custom fields" },
      },
      required: ["account_id"],
    },
  },
  {
    name: "delete_account",
    description: "Delete an account",
    inputSchema: {
      type: "object",
      properties: {
        account_id: { type: "string", description: "Account ID" },
      },
      required: ["account_id"],
    },
  },
  {
    name: "list_account_contacts",
    description: "List all contacts associated with an account",
    inputSchema: {
      type: "object",
      properties: {
        account_id: { type: "string", description: "Account ID" },
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
      required: ["account_id"],
    },
  },
  {
    name: "add_contact_to_account",
    description: "Add a contact to an account",
    inputSchema: {
      type: "object",
      properties: {
        account_id: { type: "string", description: "Account ID" },
        contact_ids: {
          type: "array",
          items: { type: "string" },
          description: "Contact IDs to add",
        },
      },
      required: ["account_id", "contact_ids"],
    },
  },
  {
    name: "remove_contact_from_account",
    description: "Remove a contact from an account",
    inputSchema: {
      type: "object",
      properties: {
        account_id: { type: "string", description: "Account ID" },
        contact_ids: {
          type: "array",
          items: { type: "string" },
          description: "Contact IDs to remove",
        },
      },
      required: ["account_id", "contact_ids"],
    },
  },

  // Additional Contact tools
  {
    name: "delete_contact",
    description: "Delete a contact",
    inputSchema: {
      type: "object",
      properties: {
        contact_id: { type: "string", description: "Contact ID" },
      },
      required: ["contact_id"],
    },
  },
  {
    name: "merge_contacts",
    description: "Merge two contacts into one",
    inputSchema: {
      type: "object",
      properties: {
        source_contact_id: {
          type: "string",
          description: "Contact ID to merge from (will be deleted)",
        },
        target_contact_id: {
          type: "string",
          description: "Contact ID to merge into (will be kept)",
        },
      },
      required: ["source_contact_id", "target_contact_id"],
    },
  },
  {
    name: "list_contact_conversations",
    description: "List all conversations for a contact",
    inputSchema: {
      type: "object",
      properties: {
        contact_id: { type: "string", description: "Contact ID" },
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
      required: ["contact_id"],
    },
  },
  {
    name: "list_contact_notes",
    description: "List all notes for a contact",
    inputSchema: {
      type: "object",
      properties: {
        contact_id: { type: "string", description: "Contact ID" },
      },
      required: ["contact_id"],
    },
  },
  {
    name: "add_contact_note",
    description: "Add a note to a contact",
    inputSchema: {
      type: "object",
      properties: {
        contact_id: { type: "string", description: "Contact ID" },
        body: { type: "string", description: "Note content" },
        author_id: {
          type: "string",
          description: "Teammate ID creating the note",
        },
      },
      required: ["contact_id", "body"],
    },
  },
  {
    name: "add_contact_handle",
    description: "Add a handle (email, phone, etc.) to a contact",
    inputSchema: {
      type: "object",
      properties: {
        contact_id: { type: "string", description: "Contact ID" },
        handle: {
          type: "string",
          description: "Handle value (email, phone, etc.)",
        },
        source: {
          type: "string",
          description: "Handle source type (email, phone, twitter, etc.)",
        },
      },
      required: ["contact_id", "handle", "source"],
    },
  },
  {
    name: "delete_contact_handle",
    description: "Delete a handle from a contact",
    inputSchema: {
      type: "object",
      properties: {
        contact_id: { type: "string", description: "Contact ID" },
        handle: { type: "string", description: "Handle to remove" },
        source: { type: "string", description: "Handle source type" },
      },
      required: ["contact_id", "handle", "source"],
    },
  },
  {
    name: "list_teammate_contacts",
    description: "List contacts for a specific teammate",
    inputSchema: {
      type: "object",
      properties: {
        teammate_id: { type: "string", description: "Teammate ID" },
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
      required: ["teammate_id"],
    },
  },
  {
    name: "create_teammate_contact",
    description: "Create a contact scoped to a teammate",
    inputSchema: {
      type: "object",
      properties: {
        teammate_id: { type: "string", description: "Teammate ID" },
        name: { type: "string", description: "Contact name" },
        handles: {
          type: "array",
          items: { type: "object" },
          description: "Contact handles",
        },
      },
      required: ["teammate_id", "handles"],
    },
  },
  {
    name: "list_team_contacts",
    description: "List contacts for a specific team",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Team ID" },
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
      required: ["team_id"],
    },
  },

  // Channel tools
  {
    name: "list_channels",
    description: "List all channels",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
    },
  },
  {
    name: "create_channel",
    description: "Create a new channel",
    inputSchema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          description: "Channel type (smtp, imap, twilio, custom, etc.)",
        },
        settings: { type: "object", description: "Channel-specific settings" },
        inbox_id: { type: "string", description: "Inbox ID to associate with" },
      },
      required: ["type", "settings"],
    },
  },
  {
    name: "get_channel",
    description: "Get details of a specific channel",
    inputSchema: {
      type: "object",
      properties: {
        channel_id: { type: "string", description: "Channel ID" },
      },
      required: ["channel_id"],
    },
  },
  {
    name: "update_channel",
    description: "Update a channel",
    inputSchema: {
      type: "object",
      properties: {
        channel_id: { type: "string", description: "Channel ID" },
        settings: { type: "object", description: "Updated channel settings" },
      },
      required: ["channel_id"],
    },
  },
  {
    name: "validate_channel",
    description: "Validate channel configuration",
    inputSchema: {
      type: "object",
      properties: {
        channel_id: { type: "string", description: "Channel ID" },
      },
      required: ["channel_id"],
    },
  },
  {
    name: "list_teammate_channels",
    description: "List channels for a specific teammate",
    inputSchema: {
      type: "object",
      properties: {
        teammate_id: { type: "string", description: "Teammate ID" },
      },
      required: ["teammate_id"],
    },
  },
  {
    name: "list_team_channels",
    description: "List channels for a specific team",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Team ID" },
      },
      required: ["team_id"],
    },
  },
  {
    name: "sync_inbound_message",
    description: "Sync an inbound message to a custom channel",
    inputSchema: {
      type: "object",
      properties: {
        channel_id: { type: "string", description: "Channel ID" },
        sender: { type: "object", description: "Sender information" },
        subject: { type: "string", description: "Message subject" },
        body: { type: "string", description: "Message body" },
        body_format: {
          type: "string",
          enum: ["html", "markdown"],
          description: "Body format",
        },
        metadata: { type: "object", description: "Message metadata" },
      },
      required: ["channel_id", "sender", "body"],
    },
  },
  {
    name: "sync_outbound_message",
    description: "Sync an outbound message to a custom channel",
    inputSchema: {
      type: "object",
      properties: {
        channel_id: { type: "string", description: "Channel ID" },
        to: {
          type: "array",
          items: { type: "string" },
          description: "Recipients",
        },
        subject: { type: "string", description: "Message subject" },
        body: { type: "string", description: "Message body" },
        metadata: { type: "object", description: "Message metadata" },
      },
      required: ["channel_id", "to", "body"],
    },
  },
  {
    name: "update_external_message_status",
    description: "Update the status of an external message",
    inputSchema: {
      type: "object",
      properties: {
        channel_id: { type: "string", description: "Channel ID" },
        message_id: { type: "string", description: "Message ID" },
        status: {
          type: "string",
          enum: ["delivered", "bounced", "opened"],
          description: "Message status",
        },
      },
      required: ["channel_id", "message_id", "status"],
    },
  },
  {
    name: "sync_application_message_template",
    description: "Sync an application message template",
    inputSchema: {
      type: "object",
      properties: {
        channel_id: { type: "string", description: "Channel ID" },
        template: { type: "object", description: "Template data" },
      },
      required: ["channel_id", "template"],
    },
  },

  // Additional Comment tools
  {
    name: "get_comment",
    description: "Get a specific comment by ID",
    inputSchema: {
      type: "object",
      properties: {
        comment_id: { type: "string", description: "Comment ID" },
      },
      required: ["comment_id"],
    },
  },
  {
    name: "update_comment",
    description: "Update a comment",
    inputSchema: {
      type: "object",
      properties: {
        comment_id: { type: "string", description: "Comment ID" },
        body: { type: "string", description: "Updated comment body" },
      },
      required: ["comment_id", "body"],
    },
  },
  {
    name: "list_comment_mentions",
    description: "List all mentions in a comment",
    inputSchema: {
      type: "object",
      properties: {
        comment_id: { type: "string", description: "Comment ID" },
      },
      required: ["comment_id"],
    },
  },
  {
    name: "add_comment_reply",
    description: "Add a reply to a comment",
    inputSchema: {
      type: "object",
      properties: {
        comment_id: { type: "string", description: "Comment ID to reply to" },
        body: { type: "string", description: "Reply body" },
        author_id: {
          type: "string",
          description: "Teammate ID posting the reply",
        },
      },
      required: ["comment_id", "body"],
    },
  },

  // Contact Group tools (deprecated)
  {
    name: "list_contact_groups",
    description: "List all contact groups (deprecated - use contact lists)",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
    },
  },
  {
    name: "create_contact_group",
    description: "Create a new contact group (deprecated - use contact lists)",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Group name" },
      },
      required: ["name"],
    },
  },
  {
    name: "delete_contact_group",
    description: "Delete a contact group",
    inputSchema: {
      type: "object",
      properties: {
        group_id: { type: "string", description: "Group ID" },
      },
      required: ["group_id"],
    },
  },
  {
    name: "list_group_contacts",
    description: "List contacts in a contact group",
    inputSchema: {
      type: "object",
      properties: {
        group_id: { type: "string", description: "Group ID" },
      },
      required: ["group_id"],
    },
  },
  {
    name: "add_contacts_to_group",
    description: "Add contacts to a contact group",
    inputSchema: {
      type: "object",
      properties: {
        group_id: { type: "string", description: "Group ID" },
        contact_ids: {
          type: "array",
          items: { type: "string" },
          description: "Contact IDs to add",
        },
      },
      required: ["group_id", "contact_ids"],
    },
  },
  {
    name: "remove_contacts_from_group",
    description: "Remove contacts from a contact group",
    inputSchema: {
      type: "object",
      properties: {
        group_id: { type: "string", description: "Group ID" },
        contact_ids: {
          type: "array",
          items: { type: "string" },
          description: "Contact IDs to remove",
        },
      },
      required: ["group_id", "contact_ids"],
    },
  },
  {
    name: "list_teammate_groups",
    description: "List contact groups for a teammate",
    inputSchema: {
      type: "object",
      properties: {
        teammate_id: { type: "string", description: "Teammate ID" },
      },
      required: ["teammate_id"],
    },
  },
  {
    name: "create_teammate_group",
    description: "Create a contact group for a teammate",
    inputSchema: {
      type: "object",
      properties: {
        teammate_id: { type: "string", description: "Teammate ID" },
        name: { type: "string", description: "Group name" },
      },
      required: ["teammate_id", "name"],
    },
  },
  {
    name: "list_team_groups",
    description: "List contact groups for a team",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Team ID" },
      },
      required: ["team_id"],
    },
  },
  {
    name: "create_team_group",
    description: "Create a contact group for a team",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Team ID" },
        name: { type: "string", description: "Group name" },
      },
      required: ["team_id", "name"],
    },
  },

  // Contact List tools
  {
    name: "list_contact_lists",
    description: "List all contact lists",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
    },
  },
  {
    name: "create_contact_list",
    description: "Create a new contact list",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "List name" },
        is_private: { type: "boolean", description: "Whether list is private" },
      },
      required: ["name"],
    },
  },
  {
    name: "delete_contact_list",
    description: "Delete a contact list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string", description: "List ID" },
      },
      required: ["list_id"],
    },
  },
  {
    name: "list_contact_list_contacts",
    description: "List contacts in a contact list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string", description: "List ID" },
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
      required: ["list_id"],
    },
  },
  {
    name: "add_contacts_to_list",
    description: "Add contacts to a contact list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string", description: "List ID" },
        contact_ids: {
          type: "array",
          items: { type: "string" },
          description: "Contact IDs to add",
        },
      },
      required: ["list_id", "contact_ids"],
    },
  },
  {
    name: "remove_contacts_from_list",
    description: "Remove contacts from a contact list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string", description: "List ID" },
        contact_ids: {
          type: "array",
          items: { type: "string" },
          description: "Contact IDs to remove",
        },
      },
      required: ["list_id", "contact_ids"],
    },
  },
  {
    name: "list_teammate_contact_lists",
    description: "List contact lists for a teammate",
    inputSchema: {
      type: "object",
      properties: {
        teammate_id: { type: "string", description: "Teammate ID" },
      },
      required: ["teammate_id"],
    },
  },
  {
    name: "create_teammate_contact_list",
    description: "Create a contact list for a teammate",
    inputSchema: {
      type: "object",
      properties: {
        teammate_id: { type: "string", description: "Teammate ID" },
        name: { type: "string", description: "List name" },
      },
      required: ["teammate_id", "name"],
    },
  },
  {
    name: "list_team_contact_lists",
    description: "List contact lists for a team",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Team ID" },
      },
      required: ["team_id"],
    },
  },
  {
    name: "create_team_contact_list",
    description: "Create a contact list for a team",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Team ID" },
        name: { type: "string", description: "List name" },
      },
      required: ["team_id", "name"],
    },
  },

  // Additional Conversation tools
  {
    name: "create_discussion_conversation",
    description: "Create a new discussion conversation",
    inputSchema: {
      type: "object",
      properties: {
        teammate_ids: {
          type: "array",
          items: { type: "string" },
          description: "Teammate IDs to include",
        },
        subject: { type: "string", description: "Discussion subject" },
        comment_body: { type: "string", description: "Initial comment body" },
      },
      required: ["teammate_ids", "comment_body"],
    },
  },
  {
    name: "update_conversation_assignee",
    description: "Update the assignee of a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
        assignee_id: {
          type: "string",
          description: "Teammate ID to assign (null to unassign)",
        },
      },
      required: ["conversation_id", "assignee_id"],
    },
  },
  {
    name: "list_conversation_events",
    description: "List all events for a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
      required: ["conversation_id"],
    },
  },
  {
    name: "list_conversation_followers",
    description: "List all followers of a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
      },
      required: ["conversation_id"],
    },
  },
  {
    name: "add_conversation_followers",
    description: "Add followers to a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
        teammate_ids: {
          type: "array",
          items: { type: "string" },
          description: "Teammate IDs to add as followers",
        },
      },
      required: ["conversation_id", "teammate_ids"],
    },
  },
  {
    name: "delete_conversation_followers",
    description: "Remove followers from a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
        teammate_ids: {
          type: "array",
          items: { type: "string" },
          description: "Teammate IDs to remove",
        },
      },
      required: ["conversation_id", "teammate_ids"],
    },
  },
  {
    name: "list_conversation_inboxes",
    description: "List all inboxes associated with a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
      },
      required: ["conversation_id"],
    },
  },
  {
    name: "add_conversation_link",
    description: "Add a link to a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
        link_ids: {
          type: "array",
          items: { type: "string" },
          description: "Link IDs to add",
        },
      },
      required: ["conversation_id", "link_ids"],
    },
  },
  {
    name: "remove_conversation_links",
    description: "Remove links from a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
        link_ids: {
          type: "array",
          items: { type: "string" },
          description: "Link IDs to remove",
        },
      },
      required: ["conversation_id", "link_ids"],
    },
  },
  {
    name: "update_conversation_reminders",
    description: "Update reminders for a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
        scheduled_at: {
          type: "number",
          description: "Unix timestamp for reminder",
        },
      },
      required: ["conversation_id"],
    },
  },
  {
    name: "add_conversation_tag",
    description: "Add a tag to a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
        tag_ids: {
          type: "array",
          items: { type: "string" },
          description: "Tag IDs to add",
        },
      },
      required: ["conversation_id", "tag_ids"],
    },
  },
  {
    name: "remove_conversation_tag",
    description: "Remove a tag from a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
        tag_ids: {
          type: "array",
          items: { type: "string" },
          description: "Tag IDs to remove",
        },
      },
      required: ["conversation_id", "tag_ids"],
    },
  },

  // Custom Fields tools
  {
    name: "list_account_custom_fields",
    description: "List all custom fields for accounts",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_contact_custom_fields",
    description: "List all custom fields for contacts",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_conversation_custom_fields",
    description: "List all custom fields for conversations",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_custom_fields",
    description: "List all custom fields",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_inbox_custom_fields",
    description: "List all custom fields for inboxes",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_link_custom_fields",
    description: "List all custom fields for links",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_teammate_custom_fields",
    description: "List all custom fields for teammates",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },

  // Draft tools
  {
    name: "create_draft",
    description: "Create a new draft message",
    inputSchema: {
      type: "object",
      properties: {
        author_id: {
          type: "string",
          description: "Teammate ID creating the draft",
        },
        to: {
          type: "array",
          items: { type: "string" },
          description: "Recipients",
        },
        subject: { type: "string", description: "Draft subject" },
        body: { type: "string", description: "Draft body" },
        channel_id: { type: "string", description: "Channel ID" },
      },
      required: ["author_id", "body"],
    },
  },
  {
    name: "list_conversation_drafts",
    description: "List all drafts for a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Conversation ID" },
      },
      required: ["conversation_id"],
    },
  },
  {
    name: "create_draft_reply",
    description: "Create a draft reply to a conversation",
    inputSchema: {
      type: "object",
      properties: {
        channel_id: { type: "string", description: "Channel ID" },
        conversation_id: { type: "string", description: "Conversation ID" },
        author_id: { type: "string", description: "Teammate ID" },
        body: { type: "string", description: "Draft body" },
      },
      required: ["channel_id", "author_id", "body"],
    },
  },
  {
    name: "delete_draft",
    description: "Delete a draft",
    inputSchema: {
      type: "object",
      properties: {
        draft_id: { type: "string", description: "Draft ID" },
        version: {
          type: "string",
          description: "Draft version for conflict prevention",
        },
      },
      required: ["draft_id", "version"],
    },
  },
  {
    name: "edit_draft",
    description: "Edit an existing draft",
    inputSchema: {
      type: "object",
      properties: {
        draft_id: { type: "string", description: "Draft ID" },
        version: {
          type: "string",
          description: "Draft version for conflict prevention",
        },
        body: { type: "string", description: "Updated draft body" },
        subject: { type: "string", description: "Updated subject" },
      },
      required: ["draft_id", "version"],
    },
  },

  // Event tools
  {
    name: "list_events",
    description:
      "List events with optional filtering by type, date range, and inbox",
    inputSchema: {
      type: "object",
      properties: {
        q: { type: "string", description: "Query string for filtering events" },
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
    },
  },
  {
    name: "get_event",
    description: "Get details of a specific event",
    inputSchema: {
      type: "object",
      properties: {
        event_id: { type: "string", description: "Event ID" },
      },
      required: ["event_id"],
    },
  },

  // Additional Inbox tools
  {
    name: "create_inbox",
    description: "Create a new inbox",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Inbox name" },
        teammate_ids: {
          type: "array",
          items: { type: "string" },
          description: "Teammate IDs with access",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "list_inbox_channels",
    description: "List all channels for an inbox",
    inputSchema: {
      type: "object",
      properties: {
        inbox_id: { type: "string", description: "Inbox ID" },
      },
      required: ["inbox_id"],
    },
  },
  {
    name: "list_inbox_conversations",
    description: "List all conversations in an inbox",
    inputSchema: {
      type: "object",
      properties: {
        inbox_id: { type: "string", description: "Inbox ID" },
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
      required: ["inbox_id"],
    },
  },
  {
    name: "list_inbox_access",
    description: "List all teammates with access to an inbox",
    inputSchema: {
      type: "object",
      properties: {
        inbox_id: { type: "string", description: "Inbox ID" },
      },
      required: ["inbox_id"],
    },
  },
  {
    name: "add_inbox_access",
    description: "Grant teammates access to an inbox",
    inputSchema: {
      type: "object",
      properties: {
        inbox_id: { type: "string", description: "Inbox ID" },
        teammate_ids: {
          type: "array",
          items: { type: "string" },
          description: "Teammate IDs to grant access",
        },
      },
      required: ["inbox_id", "teammate_ids"],
    },
  },
  {
    name: "remove_inbox_access",
    description: "Remove teammates access from an inbox",
    inputSchema: {
      type: "object",
      properties: {
        inbox_id: { type: "string", description: "Inbox ID" },
        teammate_ids: {
          type: "array",
          items: { type: "string" },
          description: "Teammate IDs to remove",
        },
      },
      required: ["inbox_id", "teammate_ids"],
    },
  },
  {
    name: "list_team_inboxes",
    description: "List all inboxes for a team",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Team ID" },
      },
      required: ["team_id"],
    },
  },
  {
    name: "create_team_inbox",
    description: "Create an inbox for a team",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Team ID" },
        name: { type: "string", description: "Inbox name" },
      },
      required: ["team_id", "name"],
    },
  },

  // Additional Message tools
  {
    name: "receive_custom_message",
    description: "Receive a custom message on a channel",
    inputSchema: {
      type: "object",
      properties: {
        channel_id: { type: "string", description: "Channel ID" },
        sender: { type: "object", description: "Sender information" },
        body: { type: "string", description: "Message body" },
        subject: { type: "string", description: "Message subject" },
        metadata: { type: "object", description: "Message metadata" },
      },
      required: ["channel_id", "sender", "body"],
    },
  },
  {
    name: "import_message",
    description: "Import a historical message to an inbox",
    inputSchema: {
      type: "object",
      properties: {
        channel_id: { type: "string", description: "Channel ID" },
        sender: { type: "object", description: "Sender information" },
        to: {
          type: "array",
          items: { type: "string" },
          description: "Recipients",
        },
        body: { type: "string", description: "Message body" },
        subject: { type: "string", description: "Message subject" },
        created_at: {
          type: "number",
          description: "Unix timestamp of original message",
        },
        metadata: { type: "object", description: "Message metadata" },
      },
      required: ["channel_id", "sender", "to", "body", "created_at"],
    },
  },
  {
    name: "get_message_seen_status",
    description: "Get the seen status of a message",
    inputSchema: {
      type: "object",
      properties: {
        message_id: { type: "string", description: "Message ID" },
      },
      required: ["message_id"],
    },
  },
  {
    name: "mark_message_seen",
    description: "Mark a message as seen by a teammate",
    inputSchema: {
      type: "object",
      properties: {
        message_id: { type: "string", description: "Message ID" },
      },
      required: ["message_id"],
    },
  },

  // Message Template Folder tools
  {
    name: "list_message_template_folders",
    description: "List all message template folders",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
    },
  },
  {
    name: "create_message_template_folder",
    description: "Create a new message template folder",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Folder name" },
        parent_folder_id: {
          type: "string",
          description: "Parent folder ID (optional)",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "get_message_template_folder",
    description: "Get details of a message template folder",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: { type: "string", description: "Folder ID" },
      },
      required: ["folder_id"],
    },
  },
  {
    name: "update_message_template_folder",
    description: "Update a message template folder",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: { type: "string", description: "Folder ID" },
        name: { type: "string", description: "Updated folder name" },
      },
      required: ["folder_id", "name"],
    },
  },
  {
    name: "delete_message_template_folder",
    description: "Delete a message template folder",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: { type: "string", description: "Folder ID" },
      },
      required: ["folder_id"],
    },
  },
  {
    name: "list_child_folders",
    description: "List child folders of a message template folder",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: { type: "string", description: "Folder ID" },
      },
      required: ["folder_id"],
    },
  },
  {
    name: "create_child_folder",
    description: "Create a child folder within a message template folder",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: { type: "string", description: "Parent folder ID" },
        name: { type: "string", description: "Child folder name" },
      },
      required: ["folder_id", "name"],
    },
  },
  {
    name: "list_teammate_folders",
    description: "List message template folders for a teammate",
    inputSchema: {
      type: "object",
      properties: {
        teammate_id: { type: "string", description: "Teammate ID" },
      },
      required: ["teammate_id"],
    },
  },
  {
    name: "create_teammate_folder",
    description: "Create a message template folder for a teammate",
    inputSchema: {
      type: "object",
      properties: {
        teammate_id: { type: "string", description: "Teammate ID" },
        name: { type: "string", description: "Folder name" },
      },
      required: ["teammate_id", "name"],
    },
  },
  {
    name: "list_team_folders",
    description: "List message template folders for a team",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Team ID" },
      },
      required: ["team_id"],
    },
  },

  // Message Template tools
  {
    name: "list_message_templates",
    description: "List all message templates",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
    },
  },
  {
    name: "create_message_template",
    description: "Create a new message template",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Template name" },
        subject: { type: "string", description: "Template subject" },
        body: { type: "string", description: "Template body" },
        folder_id: { type: "string", description: "Folder ID (optional)" },
      },
      required: ["name", "body"],
    },
  },
  {
    name: "get_message_template",
    description: "Get details of a message template",
    inputSchema: {
      type: "object",
      properties: {
        template_id: { type: "string", description: "Template ID" },
      },
      required: ["template_id"],
    },
  },
  {
    name: "update_message_template",
    description: "Update a message template",
    inputSchema: {
      type: "object",
      properties: {
        template_id: { type: "string", description: "Template ID" },
        name: { type: "string", description: "Updated name" },
        subject: { type: "string", description: "Updated subject" },
        body: { type: "string", description: "Updated body" },
      },
      required: ["template_id"],
    },
  },
  {
    name: "delete_message_template",
    description: "Delete a message template",
    inputSchema: {
      type: "object",
      properties: {
        template_id: { type: "string", description: "Template ID" },
      },
      required: ["template_id"],
    },
  },
  {
    name: "list_child_templates",
    description: "List child templates of a message template",
    inputSchema: {
      type: "object",
      properties: {
        template_id: { type: "string", description: "Template ID" },
      },
      required: ["template_id"],
    },
  },
  {
    name: "create_child_template",
    description: "Create a child template within a message template",
    inputSchema: {
      type: "object",
      properties: {
        template_id: { type: "string", description: "Parent template ID" },
        name: { type: "string", description: "Child template name" },
        body: { type: "string", description: "Template body" },
      },
      required: ["template_id", "name", "body"],
    },
  },

  // Additional Tag tools
  {
    name: "get_tag",
    description: "Get details of a specific tag",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: { type: "string", description: "Tag ID" },
      },
      required: ["tag_id"],
    },
  },
  {
    name: "update_tag",
    description: "Update a tag",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: { type: "string", description: "Tag ID" },
        name: { type: "string", description: "Updated tag name" },
        highlight: { type: "string", description: "Updated tag color" },
      },
      required: ["tag_id"],
    },
  },
  {
    name: "delete_tag",
    description: "Delete a tag",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: { type: "string", description: "Tag ID" },
      },
      required: ["tag_id"],
    },
  },
  {
    name: "list_tag_children",
    description: "List child tags of a tag",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: { type: "string", description: "Tag ID" },
      },
      required: ["tag_id"],
    },
  },
  {
    name: "create_child_tag",
    description: "Create a child tag",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: { type: "string", description: "Parent tag ID" },
        name: { type: "string", description: "Child tag name" },
        highlight: { type: "string", description: "Tag color" },
      },
      required: ["tag_id", "name"],
    },
  },
  {
    name: "list_tagged_conversations",
    description: "List all conversations with a specific tag",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: { type: "string", description: "Tag ID" },
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
      required: ["tag_id"],
    },
  },
  {
    name: "list_teammate_tags",
    description: "List tags for a specific teammate",
    inputSchema: {
      type: "object",
      properties: {
        teammate_id: { type: "string", description: "Teammate ID" },
      },
      required: ["teammate_id"],
    },
  },
  {
    name: "create_teammate_tag",
    description: "Create a tag for a teammate",
    inputSchema: {
      type: "object",
      properties: {
        teammate_id: { type: "string", description: "Teammate ID" },
        name: { type: "string", description: "Tag name" },
        highlight: { type: "string", description: "Tag color" },
      },
      required: ["teammate_id", "name"],
    },
  },
  {
    name: "list_team_tags",
    description: "List tags for a specific team",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Team ID" },
      },
      required: ["team_id"],
    },
  },
  {
    name: "create_team_tag",
    description: "Create a tag for a team",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Team ID" },
        name: { type: "string", description: "Tag name" },
        highlight: { type: "string", description: "Tag color" },
      },
      required: ["team_id", "name"],
    },
  },

  // Additional Teammate tools
  {
    name: "update_teammate",
    description: "Update a teammate",
    inputSchema: {
      type: "object",
      properties: {
        teammate_id: { type: "string", description: "Teammate ID" },
        username: { type: "string", description: "Updated username" },
        first_name: { type: "string", description: "Updated first name" },
        last_name: { type: "string", description: "Updated last name" },
        is_available: {
          type: "boolean",
          description: "Updated availability status",
        },
      },
      required: ["teammate_id"],
    },
  },
  {
    name: "list_teammate_conversations",
    description: "List conversations assigned to a teammate",
    inputSchema: {
      type: "object",
      properties: {
        teammate_id: { type: "string", description: "Teammate ID" },
        limit: { type: "number", description: "Number of results" },
        page_token: { type: "string", description: "Pagination token" },
      },
      required: ["teammate_id"],
    },
  },
  {
    name: "list_teammate_inboxes",
    description: "List inboxes accessible to a teammate",
    inputSchema: {
      type: "object",
      properties: {
        teammate_id: { type: "string", description: "Teammate ID" },
      },
      required: ["teammate_id"],
    },
  },
];
