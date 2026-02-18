export const tools = [
  // ==================== Campaign Analytics ====================
  {
    name: "get_instantly_campaign_analytics",
    description:
      "Get analytics for one or all Instantly campaigns. Returns sent, opens, unique opens, replies, unique replies, bounced, unsubscribed, completed, link clicks, and total leads.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description:
            "Campaign ID. Leave empty to get analytics for all campaigns.",
        },
        start_date: {
          type: "string",
          description: "Start date for the analytics period (YYYY-MM-DD).",
        },
        end_date: {
          type: "string",
          description: "End date for the analytics period (YYYY-MM-DD).",
        },
        exclude_total_leads_count: {
          type: "boolean",
          description:
            "Exclude total leads count from result. Setting to true considerably decreases response time.",
        },
      },
    },
  },
  {
    name: "get_instantly_campaign_analytics_daily",
    description:
      "Get daily campaign analytics from Instantly broken down by date. Returns sent, contacted, new_leads_contacted, opened, unique_opened, replies, unique_replies, clicks, unique_clicks, opportunities per day.",
    inputSchema: {
      type: "object",
      properties: {
        campaign_id: {
          type: "string",
          description:
            "Campaign ID. Leave empty to get daily analytics for all campaigns.",
        },
        campaign_status: {
          type: "number",
          description: "Filter by campaign status.",
        },
        start_date: {
          type: "string",
          description: "Start date (YYYY-MM-DD).",
        },
        end_date: {
          type: "string",
          description: "End date (YYYY-MM-DD).",
        },
      },
    },
  },
  {
    name: "get_instantly_campaign_analytics_overview",
    description:
      "Get campaign analytics overview from Instantly. Includes interest status totals: interested, meeting booked, meeting completed, closed.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Campaign ID. Leave empty for all campaigns.",
        },
        start_date: {
          type: "string",
          description: "Start date (YYYY-MM-DD).",
        },
        end_date: {
          type: "string",
          description: "End date (YYYY-MM-DD).",
        },
        campaign_status: {
          type: "number",
          description: "Filter by campaign status.",
        },
        expand_crm_events: {
          type: "boolean",
          description:
            "When true, calculates totals for all lead interest status events instead of only the first per contact.",
        },
      },
    },
  },
  {
    name: "get_instantly_campaign_analytics_steps",
    description:
      "Get campaign analytics broken down by step and variant from Instantly. Shows per-step metrics: opens, clicks, replies, bounced, unsubscribed, completed, and emails sent.",
    inputSchema: {
      type: "object",
      properties: {
        campaign_id: {
          type: "string",
          description: "Campaign ID. Leave empty for all campaigns.",
        },
        start_date: {
          type: "string",
          description: "Start date (YYYY-MM-DD).",
        },
        end_date: {
          type: "string",
          description: "End date (YYYY-MM-DD).",
        },
        include_opportunities_count: {
          type: "boolean",
          description:
            "When true, includes opportunities and unique_opportunities fields in the response.",
        },
      },
    },
  },

  // ==================== Account Analytics ====================
  {
    name: "get_instantly_account_analytics_daily",
    description:
      "Get daily account analytics from Instantly showing the number of emails sent and bounced per day for each email account.",
    inputSchema: {
      type: "object",
      properties: {
        start_date: {
          type: "string",
          description:
            "Start date (YYYY-MM-DD). Defaults to last 30 days if not provided.",
        },
        end_date: {
          type: "string",
          description:
            "End date (YYYY-MM-DD). Defaults to current date if not provided.",
        },
        emails: {
          type: "string",
          description:
            "Comma-separated email addresses to filter by. Leave empty for all accounts.",
        },
      },
    },
  },
  {
    name: "get_instantly_warmup_analytics",
    description:
      "Get warmup analytics for email accounts from Instantly. Returns inbox/spam placement data and health scores.",
    inputSchema: {
      type: "object",
      properties: {
        emails: {
          type: "array",
          description:
            "Array of email addresses to get warmup analytics for (1-100 items).",
          items: { type: "string" },
        },
      },
      required: ["emails"],
    },
  },

  // ==================== Campaigns ====================
  {
    name: "list_instantly_campaigns",
    description:
      "List campaigns from Instantly with optional filtering by status, tags, or search term. Uses cursor-based pagination.",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of results to return.",
        },
        status: {
          type: "number",
          description: "Filter by campaign status.",
        },
        search: {
          type: "string",
          description: "Search campaigns by name.",
        },
        starting_after: {
          type: "string",
          description:
            "Cursor for pagination. UUID of the item after which to fetch results.",
        },
        tag_ids: {
          type: "string",
          description: "Comma-separated list of tag IDs to filter by.",
        },
      },
    },
  },
  {
    name: "get_instantly_campaign",
    description:
      "Get details of a specific Instantly campaign by its ID, including sequences, schedule, and configuration.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "The ID of the campaign." },
      },
      required: ["id"],
    },
  },
  {
    name: "create_instantly_campaign",
    description: "Create a new campaign in Instantly.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "The name of the campaign." },
        sequences: {
          type: "array",
          description:
            "Array of sequence objects containing email steps. Only the first element is used.",
          items: {
            type: "object",
            properties: {
              steps: {
                type: "array",
                description: "Array of step objects for the sequence.",
                items: {
                  type: "object",
                  properties: {
                    subject: {
                      type: "string",
                      description: "Email subject line.",
                    },
                    body: {
                      type: "string",
                      description: "Email body (HTML).",
                    },
                  },
                },
              },
            },
          },
        },
      },
      required: ["name"],
    },
  },
  {
    name: "delete_instantly_campaign",
    description: "Delete a campaign from Instantly.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the campaign to delete.",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "search_instantly_campaigns_by_lead",
    description:
      "Search Instantly campaigns associated with a specific lead email address.",
    inputSchema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "The lead email address to search for.",
        },
      },
      required: ["email"],
    },
  },

  // ==================== Leads ====================
  {
    name: "list_instantly_leads",
    description:
      "List leads from Instantly with filtering by campaign, list, email, or interest status. Uses POST due to complex filter arguments. Cursor-based pagination via starting_after.",
    inputSchema: {
      type: "object",
      properties: {
        campaign_id: {
          type: "string",
          description: "Filter leads by campaign ID.",
        },
        list_id: {
          type: "string",
          description: "Filter leads by lead list ID.",
        },
        email: {
          type: "string",
          description: "Filter by lead email address.",
        },
        limit: {
          type: "number",
          description: "Maximum number of results to return.",
        },
        starting_after: {
          type: "string",
          description:
            "Cursor for pagination. Use the id from the last lead of the previous page.",
        },
        interest_status: {
          type: "string",
          description: "Filter by lead interest status.",
        },
      },
    },
  },
  {
    name: "get_instantly_lead",
    description: "Get details of a specific lead by ID from Instantly.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "The ID of the lead." },
      },
      required: ["id"],
    },
  },
  {
    name: "create_instantly_leads",
    description:
      "Create one or more leads in Instantly, assigning them to a campaign or lead list. Supports custom variables and deduplication.",
    inputSchema: {
      type: "object",
      properties: {
        campaign_id: {
          type: "string",
          description: "Campaign ID to add leads to.",
        },
        list_id: {
          type: "string",
          description:
            "Lead list ID to add leads to. When using list_id, email is optional.",
        },
        leads: {
          type: "array",
          description: "Array of lead objects to create.",
          items: {
            type: "object",
            properties: {
              email: { type: "string", description: "Lead email address." },
              first_name: { type: "string", description: "First name." },
              last_name: { type: "string", description: "Last name." },
              company_name: { type: "string", description: "Company name." },
              website: { type: "string", description: "Website URL." },
              phone: { type: "string", description: "Phone number." },
              personalization: {
                type: "string",
                description: "Personalization text.",
              },
              custom_variables: {
                type: "object",
                description:
                  "Custom key-value pairs (values must be string, number, boolean, or null).",
              },
            },
          },
        },
        skip_if_in_workspace: {
          type: "boolean",
          description: "Skip if lead already exists in workspace.",
        },
        skip_if_in_campaign: {
          type: "boolean",
          description: "Skip if lead already exists in the campaign.",
        },
      },
      required: ["leads"],
    },
  },
  {
    name: "update_instantly_lead",
    description:
      "Update an existing lead in Instantly. Can update custom variables and interest status.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the lead to update.",
        },
        lt_interest_status: {
          type: "string",
          description: "Lead interest status value.",
        },
        custom_variables: {
          type: "object",
          description:
            "Custom key-value pairs to update (values must be string, number, boolean, or null).",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "delete_instantly_lead",
    description: "Delete a lead from Instantly by ID.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the lead to delete.",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "move_instantly_leads",
    description:
      "Move leads to a different campaign or lead list in Instantly.",
    inputSchema: {
      type: "object",
      properties: {
        lead_ids: {
          type: "array",
          description: "Array of lead IDs to move.",
          items: { type: "string" },
        },
        to_campaign_id: {
          type: "string",
          description: "Destination campaign ID.",
        },
        to_list_id: {
          type: "string",
          description: "Destination lead list ID.",
        },
      },
      required: ["lead_ids"],
    },
  },

  // ==================== Lead Lists ====================
  {
    name: "list_instantly_lead_lists",
    description:
      "List lead lists from Instantly. Lead lists are containers for organizing leads.",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of results to return.",
        },
        search: {
          type: "string",
          description: "Search lead lists by name.",
        },
        starting_after: {
          type: "string",
          description: "Cursor for pagination.",
        },
      },
    },
  },
  {
    name: "create_instantly_lead_list",
    description: "Create a new lead list in Instantly.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Name of the lead list." },
      },
      required: ["name"],
    },
  },
  {
    name: "update_instantly_lead_list",
    description: "Update an existing lead list in Instantly.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the lead list to update.",
        },
        name: {
          type: "string",
          description: "New name for the lead list.",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "delete_instantly_lead_list",
    description: "Delete a lead list from Instantly.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the lead list to delete.",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "get_instantly_lead_list_verification_stats",
    description:
      "Get verification statistics for a lead list from Instantly. Returns counts of verified, invalid, risky, catch_all, and pending leads.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "The ID of the lead list." },
      },
      required: ["id"],
    },
  },

  // ==================== Emails ====================
  {
    name: "list_instantly_emails",
    description:
      "List emails from Instantly with filtering by campaign, lead, account, type, and read status. Useful for analyzing sent/received email activity.",
    inputSchema: {
      type: "object",
      properties: {
        campaign_id: {
          type: "string",
          description: "Filter by campaign ID.",
        },
        lead: {
          type: "string",
          description: "Filter by lead email address.",
        },
        eaccount: {
          type: "string",
          description:
            "Filter by sending email account. Comma-separated for multiple.",
        },
        email_type: {
          type: "string",
          description: "Filter by email type.",
        },
        is_unread: {
          type: "boolean",
          description: "Filter by read/unread status.",
        },
        limit: {
          type: "number",
          description: "Number of results to return.",
        },
        starting_after: {
          type: "string",
          description: "Cursor for pagination.",
        },
      },
    },
  },

  // ==================== Email Accounts ====================
  {
    name: "list_instantly_accounts",
    description:
      "List email accounts from Instantly that are used for sending campaigns.",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of results to return.",
        },
        starting_after: {
          type: "string",
          description: "Cursor for pagination.",
        },
      },
    },
  },
  {
    name: "get_instantly_account",
    description:
      "Get details of a specific email account by email address from Instantly.",
    inputSchema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "The email address of the account.",
        },
      },
      required: ["email"],
    },
  },
];
