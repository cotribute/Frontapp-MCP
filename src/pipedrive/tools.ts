export const tools = [
  // ==================== Deals ====================
  {
    name: "list_deals",
    description:
      "List deals from Pipedrive with optional filtering by status, user, stage, pipeline, or custom filter.",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of results to return. Default is 100.",
        },
        start: { type: "number", description: "Pagination start offset." },
        status: {
          type: "string",
          description: "Filter by deal status.",
          enum: ["open", "won", "lost", "deleted"],
        },
        sort: {
          type: "string",
          description: 'Field and order to sort by (e.g. "update_time DESC").',
        },
        filter_id: { type: "number", description: "ID of the filter to use." },
        user_id: { type: "number", description: "Filter deals by user ID." },
        stage_id: { type: "number", description: "Filter deals by stage ID." },
        pipeline_id: {
          type: "number",
          description: "Filter deals by pipeline ID.",
        },
      },
    },
  },
  {
    name: "get_deal",
    description: "Get a specific deal by its ID from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the deal." },
      },
      required: ["id"],
    },
  },
  {
    name: "search_deals",
    description: "Search deals in Pipedrive by a search term.",
    inputSchema: {
      type: "object",
      properties: {
        term: { type: "string", description: "The search term to look for." },
        fields: {
          type: "string",
          description: "Fields to search in.",
          enum: ["custom_fields", "notes", "title"],
        },
        exact_match: {
          type: "boolean",
          description: "When true, only exact matches are returned.",
        },
        status: { type: "string", description: "Filter by deal status." },
        limit: { type: "number", description: "Number of results to return." },
        start: { type: "number", description: "Pagination start offset." },
      },
      required: ["term"],
    },
  },
  {
    name: "create_deal",
    description: "Create a new deal in Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string", description: "The title of the deal." },
        value: { type: "string", description: "The value of the deal." },
        currency: {
          type: "string",
          description:
            "The currency of the deal value (3-letter code, e.g. USD).",
        },
        user_id: {
          type: "number",
          description: "ID of the user who owns the deal.",
        },
        person_id: {
          type: "number",
          description: "ID of the person associated with the deal.",
        },
        org_id: {
          type: "number",
          description: "ID of the organization associated with the deal.",
        },
        pipeline_id: {
          type: "number",
          description: "ID of the pipeline the deal is in.",
        },
        stage_id: {
          type: "number",
          description: "ID of the stage the deal is in.",
        },
        status: {
          type: "string",
          description: "Status of the deal.",
          enum: ["open", "won", "lost", "deleted"],
        },
        expected_close_date: {
          type: "string",
          description: "Expected close date (YYYY-MM-DD).",
        },
        probability: {
          type: "number",
          description: "Deal success probability percentage.",
        },
        visible_to: {
          type: "number",
          description: "Visibility of the deal (1=owner, 3=entire company).",
        },
      },
      required: ["title"],
    },
  },
  {
    name: "update_deal",
    description: "Update an existing deal in Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the deal to update." },
        title: { type: "string", description: "The title of the deal." },
        value: { type: "string", description: "The value of the deal." },
        currency: {
          type: "string",
          description: "The currency of the deal value.",
        },
        user_id: {
          type: "number",
          description: "ID of the user who owns the deal.",
        },
        person_id: {
          type: "number",
          description: "ID of the person associated with the deal.",
        },
        org_id: {
          type: "number",
          description: "ID of the organization associated with the deal.",
        },
        pipeline_id: {
          type: "number",
          description: "ID of the pipeline the deal is in.",
        },
        stage_id: {
          type: "number",
          description: "ID of the stage the deal is in.",
        },
        status: {
          type: "string",
          description: "Status of the deal.",
          enum: ["open", "won", "lost", "deleted"],
        },
        expected_close_date: {
          type: "string",
          description: "Expected close date (YYYY-MM-DD).",
        },
        probability: {
          type: "number",
          description: "Deal success probability percentage.",
        },
        visible_to: { type: "number", description: "Visibility of the deal." },
      },
      required: ["id"],
    },
  },
  {
    name: "delete_deal",
    description: "Delete a deal from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the deal to delete." },
      },
      required: ["id"],
    },
  },
  {
    name: "get_deal_activities",
    description: "Get activities associated with a specific deal.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the deal." },
        start: { type: "number", description: "Pagination start offset." },
        limit: { type: "number", description: "Number of results to return." },
        done: {
          type: "number",
          description: "Filter by done status (0 = not done, 1 = done).",
          enum: [0, 1],
        },
      },
      required: ["id"],
    },
  },
  {
    name: "get_deal_participants",
    description: "Get participants of a specific deal.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the deal." },
        start: { type: "number", description: "Pagination start offset." },
        limit: { type: "number", description: "Number of results to return." },
      },
      required: ["id"],
    },
  },
  {
    name: "get_deal_products",
    description: "Get products attached to a specific deal.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the deal." },
        start: { type: "number", description: "Pagination start offset." },
        limit: { type: "number", description: "Number of results to return." },
      },
      required: ["id"],
    },
  },

  // ==================== Persons ====================
  {
    name: "list_persons",
    description: "List persons from Pipedrive with optional filtering.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Number of results to return." },
        start: { type: "number", description: "Pagination start offset." },
        sort: { type: "string", description: "Field and order to sort by." },
        filter_id: { type: "number", description: "ID of the filter to use." },
        user_id: { type: "number", description: "Filter by user ID." },
      },
    },
  },
  {
    name: "get_person",
    description: "Get a specific person by ID from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the person." },
      },
      required: ["id"],
    },
  },
  {
    name: "search_persons",
    description: "Search persons in Pipedrive by a search term.",
    inputSchema: {
      type: "object",
      properties: {
        term: { type: "string", description: "The search term to look for." },
        fields: {
          type: "string",
          description: "Fields to search in.",
          enum: ["custom_fields", "notes", "name", "email", "phone"],
        },
        exact_match: {
          type: "boolean",
          description: "When true, only exact matches are returned.",
        },
        limit: { type: "number", description: "Number of results to return." },
        start: { type: "number", description: "Pagination start offset." },
      },
      required: ["term"],
    },
  },
  {
    name: "create_person",
    description: "Create a new person in Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "The name of the person." },
        email: {
          type: "array",
          description: "Email addresses of the person.",
          items: {
            type: "object",
            properties: {
              value: { type: "string", description: "The email address." },
              primary: {
                type: "boolean",
                description: "Whether this is the primary email.",
              },
              label: {
                type: "string",
                description: "Label for this email (e.g. work, home).",
              },
            },
          },
        },
        phone: {
          type: "array",
          description: "Phone numbers of the person.",
          items: {
            type: "object",
            properties: {
              value: { type: "string", description: "The phone number." },
              primary: {
                type: "boolean",
                description: "Whether this is the primary phone.",
              },
              label: {
                type: "string",
                description: "Label for this phone (e.g. work, home).",
              },
            },
          },
        },
        org_id: {
          type: "number",
          description: "ID of the organization this person belongs to.",
        },
        visible_to: {
          type: "number",
          description: "Visibility of the person.",
        },
        owner_id: {
          type: "number",
          description: "ID of the user who owns the person.",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "update_person",
    description: "Update an existing person in Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the person to update." },
        name: { type: "string", description: "The name of the person." },
        email: {
          type: "array",
          description: "Email addresses of the person.",
          items: {
            type: "object",
            properties: {
              value: { type: "string" },
              primary: { type: "boolean" },
              label: { type: "string" },
            },
          },
        },
        phone: {
          type: "array",
          description: "Phone numbers of the person.",
          items: {
            type: "object",
            properties: {
              value: { type: "string" },
              primary: { type: "boolean" },
              label: { type: "string" },
            },
          },
        },
        org_id: {
          type: "number",
          description: "ID of the organization this person belongs to.",
        },
        visible_to: {
          type: "number",
          description: "Visibility of the person.",
        },
        owner_id: {
          type: "number",
          description: "ID of the user who owns the person.",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "delete_person",
    description: "Delete a person from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the person to delete." },
      },
      required: ["id"],
    },
  },
  {
    name: "get_person_deals",
    description: "Get deals associated with a specific person.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the person." },
        start: { type: "number", description: "Pagination start offset." },
        limit: { type: "number", description: "Number of results to return." },
        status: { type: "string", description: "Filter by deal status." },
      },
      required: ["id"],
    },
  },

  // ==================== Organizations ====================
  {
    name: "list_organizations",
    description: "List organizations from Pipedrive with optional filtering.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Number of results to return." },
        start: { type: "number", description: "Pagination start offset." },
        sort: { type: "string", description: "Field and order to sort by." },
        filter_id: { type: "number", description: "ID of the filter to use." },
        user_id: { type: "number", description: "Filter by user ID." },
      },
    },
  },
  {
    name: "get_organization",
    description: "Get a specific organization by ID from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the organization." },
      },
      required: ["id"],
    },
  },
  {
    name: "search_organizations",
    description: "Search organizations in Pipedrive by a search term.",
    inputSchema: {
      type: "object",
      properties: {
        term: { type: "string", description: "The search term to look for." },
        fields: {
          type: "string",
          description: "Fields to search in.",
          enum: ["custom_fields", "notes", "name", "address"],
        },
        exact_match: {
          type: "boolean",
          description: "When true, only exact matches are returned.",
        },
        limit: { type: "number", description: "Number of results to return." },
        start: { type: "number", description: "Pagination start offset." },
      },
      required: ["term"],
    },
  },
  {
    name: "create_organization",
    description: "Create a new organization in Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "The name of the organization." },
        owner_id: {
          type: "number",
          description: "ID of the user who owns the organization.",
        },
        visible_to: {
          type: "number",
          description: "Visibility of the organization.",
        },
        add_time: {
          type: "string",
          description: "Creation timestamp (YYYY-MM-DD HH:MM:SS).",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "update_organization",
    description: "Update an existing organization in Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "number",
          description: "The ID of the organization to update.",
        },
        name: { type: "string", description: "The name of the organization." },
        owner_id: {
          type: "number",
          description: "ID of the user who owns the organization.",
        },
        visible_to: {
          type: "number",
          description: "Visibility of the organization.",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "delete_organization",
    description: "Delete an organization from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "number",
          description: "The ID of the organization to delete.",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "get_organization_deals",
    description: "Get deals associated with a specific organization.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the organization." },
        start: { type: "number", description: "Pagination start offset." },
        limit: { type: "number", description: "Number of results to return." },
        status: { type: "string", description: "Filter by deal status." },
      },
      required: ["id"],
    },
  },
  {
    name: "get_organization_persons",
    description: "Get persons associated with a specific organization.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the organization." },
        start: { type: "number", description: "Pagination start offset." },
        limit: { type: "number", description: "Number of results to return." },
      },
      required: ["id"],
    },
  },

  // ==================== Activities ====================
  {
    name: "list_activities",
    description: "List activities from Pipedrive with optional filtering.",
    inputSchema: {
      type: "object",
      properties: {
        user_id: { type: "number", description: "Filter by user ID." },
        filter_id: { type: "number", description: "ID of the filter to use." },
        type: {
          type: "string",
          description:
            "Filter by activity type (e.g. call, meeting, task, deadline, email).",
        },
        start: { type: "number", description: "Pagination start offset." },
        limit: { type: "number", description: "Number of results to return." },
        done: {
          type: "number",
          description: "Filter by done status (0 = not done, 1 = done).",
          enum: [0, 1],
        },
        start_date: {
          type: "string",
          description: "Start date for filtering (YYYY-MM-DD).",
        },
        end_date: {
          type: "string",
          description: "End date for filtering (YYYY-MM-DD).",
        },
      },
    },
  },
  {
    name: "get_activity",
    description: "Get a specific activity by ID from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the activity." },
      },
      required: ["id"],
    },
  },
  {
    name: "create_activity",
    description: "Create a new activity in Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        subject: {
          type: "string",
          description: "The subject/title of the activity.",
        },
        type: {
          type: "string",
          description:
            "The type of the activity (e.g. call, meeting, task, deadline, email).",
        },
        due_date: {
          type: "string",
          description: "Due date of the activity (YYYY-MM-DD).",
        },
        due_time: {
          type: "string",
          description: "Due time of the activity (HH:MM).",
        },
        duration: {
          type: "string",
          description: "Duration of the activity (HH:MM).",
        },
        deal_id: {
          type: "number",
          description: "ID of the deal this activity is linked to.",
        },
        person_id: {
          type: "number",
          description: "ID of the person this activity is linked to.",
        },
        org_id: {
          type: "number",
          description: "ID of the organization this activity is linked to.",
        },
        note: {
          type: "string",
          description: "Note/description of the activity.",
        },
        user_id: {
          type: "number",
          description: "ID of the user assigned to this activity.",
        },
        done: {
          type: "number",
          description: "Whether the activity is done (0 = not done, 1 = done).",
          enum: [0, 1],
        },
        busy_flag: {
          type: "boolean",
          description: "Whether the activity is marked as busy.",
        },
      },
      required: ["subject", "type"],
    },
  },
  {
    name: "update_activity",
    description: "Update an existing activity in Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "number",
          description: "The ID of the activity to update.",
        },
        subject: {
          type: "string",
          description: "The subject/title of the activity.",
        },
        type: { type: "string", description: "The type of the activity." },
        due_date: {
          type: "string",
          description: "Due date of the activity (YYYY-MM-DD).",
        },
        due_time: {
          type: "string",
          description: "Due time of the activity (HH:MM).",
        },
        duration: {
          type: "string",
          description: "Duration of the activity (HH:MM).",
        },
        deal_id: {
          type: "number",
          description: "ID of the deal this activity is linked to.",
        },
        person_id: {
          type: "number",
          description: "ID of the person this activity is linked to.",
        },
        org_id: {
          type: "number",
          description: "ID of the organization this activity is linked to.",
        },
        note: {
          type: "string",
          description: "Note/description of the activity.",
        },
        user_id: {
          type: "number",
          description: "ID of the user assigned to this activity.",
        },
        done: {
          type: "number",
          description: "Whether the activity is done (0 = not done, 1 = done).",
          enum: [0, 1],
        },
        busy_flag: {
          type: "boolean",
          description: "Whether the activity is marked as busy.",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "delete_activity",
    description: "Delete an activity from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "number",
          description: "The ID of the activity to delete.",
        },
      },
      required: ["id"],
    },
  },

  // ==================== Notes ====================
  {
    name: "list_notes",
    description: "List notes from Pipedrive with optional filtering.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Number of results to return." },
        start: { type: "number", description: "Pagination start offset." },
        sort: { type: "string", description: "Field and order to sort by." },
        user_id: { type: "number", description: "Filter by user ID." },
        deal_id: { type: "number", description: "Filter by deal ID." },
        person_id: { type: "number", description: "Filter by person ID." },
        org_id: { type: "number", description: "Filter by organization ID." },
        lead_id: { type: "string", description: "Filter by lead ID (UUID)." },
        start_date: {
          type: "string",
          description: "Start date for filtering (YYYY-MM-DD).",
        },
        end_date: {
          type: "string",
          description: "End date for filtering (YYYY-MM-DD).",
        },
        pinned_to_deal_flag: {
          type: "number",
          description: "Filter by pinned to deal (0 or 1).",
          enum: [0, 1],
        },
        pinned_to_person_flag: {
          type: "number",
          description: "Filter by pinned to person (0 or 1).",
          enum: [0, 1],
        },
        pinned_to_organization_flag: {
          type: "number",
          description: "Filter by pinned to organization (0 or 1).",
          enum: [0, 1],
        },
      },
    },
  },
  {
    name: "get_note",
    description: "Get a specific note by ID from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the note." },
      },
      required: ["id"],
    },
  },
  {
    name: "create_note",
    description: "Create a new note in Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description: "The content of the note (supports HTML).",
        },
        deal_id: {
          type: "number",
          description: "ID of the deal to attach the note to.",
        },
        person_id: {
          type: "number",
          description: "ID of the person to attach the note to.",
        },
        org_id: {
          type: "number",
          description: "ID of the organization to attach the note to.",
        },
        lead_id: {
          type: "string",
          description: "ID of the lead to attach the note to (UUID).",
        },
        pinned_to_deal_flag: {
          type: "number",
          description: "Pin note to deal (0 or 1).",
          enum: [0, 1],
        },
        pinned_to_person_flag: {
          type: "number",
          description: "Pin note to person (0 or 1).",
          enum: [0, 1],
        },
        pinned_to_organization_flag: {
          type: "number",
          description: "Pin note to organization (0 or 1).",
          enum: [0, 1],
        },
        user_id: {
          type: "number",
          description: "ID of the user who creates the note.",
        },
      },
      required: ["content"],
    },
  },
  {
    name: "update_note",
    description: "Update an existing note in Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the note to update." },
        content: {
          type: "string",
          description: "The content of the note (supports HTML).",
        },
        deal_id: {
          type: "number",
          description: "ID of the deal to attach the note to.",
        },
        person_id: {
          type: "number",
          description: "ID of the person to attach the note to.",
        },
        org_id: {
          type: "number",
          description: "ID of the organization to attach the note to.",
        },
        lead_id: {
          type: "string",
          description: "ID of the lead to attach the note to (UUID).",
        },
        pinned_to_deal_flag: {
          type: "number",
          description: "Pin note to deal (0 or 1).",
          enum: [0, 1],
        },
        pinned_to_person_flag: {
          type: "number",
          description: "Pin note to person (0 or 1).",
          enum: [0, 1],
        },
        pinned_to_organization_flag: {
          type: "number",
          description: "Pin note to organization (0 or 1).",
          enum: [0, 1],
        },
        user_id: { type: "number", description: "ID of the user." },
      },
      required: ["id", "content"],
    },
  },
  {
    name: "delete_note",
    description: "Delete a note from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the note to delete." },
      },
      required: ["id"],
    },
  },

  // ==================== Pipelines ====================
  {
    name: "list_pipelines",
    description: "List all pipelines from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_pipeline",
    description: "Get a specific pipeline by ID from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the pipeline." },
      },
      required: ["id"],
    },
  },
  {
    name: "get_pipeline_deals",
    description: "Get deals in a specific pipeline.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the pipeline." },
        filter_id: { type: "number", description: "ID of the filter to use." },
        user_id: { type: "number", description: "Filter by user ID." },
        everyone: {
          type: "number",
          description: "Include deals from all users (0 or 1).",
          enum: [0, 1],
        },
        stage_id: { type: "number", description: "Filter by stage ID." },
        start: { type: "number", description: "Pagination start offset." },
        limit: { type: "number", description: "Number of results to return." },
        get_summary: {
          type: "number",
          description: "Include summary data (0 or 1).",
          enum: [0, 1],
        },
        totals_convert_currency: {
          type: "string",
          description: "Currency to convert totals to (3-letter code).",
        },
      },
      required: ["id"],
    },
  },

  // ==================== Stages ====================
  {
    name: "list_stages",
    description:
      "List all stages from Pipedrive, optionally filtered by pipeline.",
    inputSchema: {
      type: "object",
      properties: {
        pipeline_id: {
          type: "number",
          description: "Filter stages by pipeline ID.",
        },
      },
    },
  },
  {
    name: "get_stage",
    description: "Get a specific stage by ID from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the stage." },
      },
      required: ["id"],
    },
  },
  {
    name: "get_stage_deals",
    description: "Get deals in a specific stage.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the stage." },
        filter_id: { type: "number", description: "ID of the filter to use." },
        user_id: { type: "number", description: "Filter by user ID." },
        everyone: {
          type: "number",
          description: "Include deals from all users (0 or 1).",
          enum: [0, 1],
        },
        start: { type: "number", description: "Pagination start offset." },
        limit: { type: "number", description: "Number of results to return." },
      },
      required: ["id"],
    },
  },

  // ==================== Products ====================
  {
    name: "list_products",
    description: "List products from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Number of results to return." },
        start: { type: "number", description: "Pagination start offset." },
        user_id: { type: "number", description: "Filter by user ID." },
      },
    },
  },
  {
    name: "get_product",
    description: "Get a specific product by ID from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the product." },
      },
      required: ["id"],
    },
  },
  {
    name: "search_products",
    description: "Search products in Pipedrive by a search term.",
    inputSchema: {
      type: "object",
      properties: {
        term: { type: "string", description: "The search term to look for." },
        fields: {
          type: "string",
          description: "Fields to search in.",
          enum: ["custom_fields", "name", "code"],
        },
        exact_match: {
          type: "boolean",
          description: "When true, only exact matches are returned.",
        },
        limit: { type: "number", description: "Number of results to return." },
        start: { type: "number", description: "Pagination start offset." },
      },
      required: ["term"],
    },
  },
  {
    name: "create_product",
    description: "Create a new product in Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "The name of the product." },
        code: { type: "string", description: "Product code/SKU." },
        unit: { type: "string", description: "Unit of measurement." },
        tax: { type: "number", description: "Tax percentage." },
        active_flag: {
          type: "boolean",
          description: "Whether the product is active.",
        },
        visible_to: {
          type: "number",
          description: "Visibility of the product.",
        },
        owner_id: {
          type: "number",
          description: "ID of the user who owns the product.",
        },
        prices: {
          type: "array",
          description: "Array of price objects for the product.",
          items: {
            type: "object",
            properties: {
              price: { type: "number", description: "The price value." },
              currency: {
                type: "string",
                description: "Currency code (e.g. USD).",
              },
              cost: { type: "number", description: "Cost of the product." },
              overhead_cost: { type: "number", description: "Overhead cost." },
            },
          },
        },
      },
      required: ["name"],
    },
  },
  {
    name: "update_product",
    description: "Update an existing product in Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the product to update." },
        name: { type: "string", description: "The name of the product." },
        code: { type: "string", description: "Product code/SKU." },
        unit: { type: "string", description: "Unit of measurement." },
        tax: { type: "number", description: "Tax percentage." },
        active_flag: {
          type: "boolean",
          description: "Whether the product is active.",
        },
        visible_to: {
          type: "number",
          description: "Visibility of the product.",
        },
        owner_id: {
          type: "number",
          description: "ID of the user who owns the product.",
        },
        prices: {
          type: "array",
          description: "Array of price objects for the product.",
          items: {
            type: "object",
            properties: {
              price: { type: "number" },
              currency: { type: "string" },
              cost: { type: "number" },
              overhead_cost: { type: "number" },
            },
          },
        },
      },
      required: ["id"],
    },
  },
  {
    name: "delete_product",
    description: "Delete a product from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "The ID of the product to delete." },
      },
      required: ["id"],
    },
  },

  // ==================== Leads ====================
  {
    name: "list_leads",
    description: "List leads from Pipedrive with optional filtering.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Number of results to return." },
        start: { type: "number", description: "Pagination start offset." },
        sort: { type: "string", description: "Field and order to sort by." },
        filter_id: { type: "number", description: "ID of the filter to use." },
        archived_status: {
          type: "string",
          description: "Filter by archived status.",
          enum: ["archived", "not_archived"],
        },
      },
    },
  },
  {
    name: "get_lead",
    description: "Get a specific lead by ID from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "The UUID of the lead." },
      },
      required: ["id"],
    },
  },
  {
    name: "create_lead",
    description: "Create a new lead in Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string", description: "The title of the lead." },
        owner_id: {
          type: "number",
          description: "ID of the user who owns the lead.",
        },
        person_id: {
          type: "number",
          description: "ID of the person associated with the lead.",
        },
        organization_id: {
          type: "number",
          description: "ID of the organization associated with the lead.",
        },
        value: {
          type: "object",
          description: "The value of the lead.",
          properties: {
            amount: { type: "number", description: "The monetary amount." },
            currency: {
              type: "string",
              description: "Currency code (e.g. USD).",
            },
          },
        },
        expected_close_date: {
          type: "string",
          description: "Expected close date (YYYY-MM-DD).",
        },
        visible_to: { type: "number", description: "Visibility of the lead." },
        label_ids: {
          type: "array",
          description: "Array of label UUIDs to assign.",
          items: { type: "string" },
        },
      },
      required: ["title"],
    },
  },
  {
    name: "update_lead",
    description: "Update an existing lead in Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "The UUID of the lead to update." },
        title: { type: "string", description: "The title of the lead." },
        owner_id: {
          type: "number",
          description: "ID of the user who owns the lead.",
        },
        person_id: {
          type: "number",
          description: "ID of the person associated with the lead.",
        },
        organization_id: {
          type: "number",
          description: "ID of the organization associated with the lead.",
        },
        value: {
          type: "object",
          description: "The value of the lead.",
          properties: {
            amount: { type: "number" },
            currency: { type: "string" },
          },
        },
        expected_close_date: {
          type: "string",
          description: "Expected close date (YYYY-MM-DD).",
        },
        visible_to: { type: "number", description: "Visibility of the lead." },
        label_ids: {
          type: "array",
          description: "Array of label UUIDs to assign.",
          items: { type: "string" },
        },
        is_archived: {
          type: "boolean",
          description: "Whether the lead is archived.",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "delete_lead",
    description: "Delete a lead from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "The UUID of the lead to delete." },
      },
      required: ["id"],
    },
  },
  {
    name: "search_leads",
    description: "Search leads in Pipedrive by a search term.",
    inputSchema: {
      type: "object",
      properties: {
        term: { type: "string", description: "The search term to look for." },
        fields: { type: "string", description: "Fields to search in." },
        exact_match: {
          type: "boolean",
          description: "When true, only exact matches are returned.",
        },
        limit: { type: "number", description: "Number of results to return." },
        start: { type: "number", description: "Pagination start offset." },
      },
      required: ["term"],
    },
  },

  // ==================== Fields ====================
  {
    name: "list_deal_fields",
    description:
      "List all deal fields (including custom fields) from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        start: { type: "number", description: "Pagination start offset." },
        limit: { type: "number", description: "Number of results to return." },
      },
    },
  },
  {
    name: "list_person_fields",
    description:
      "List all person fields (including custom fields) from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        start: { type: "number", description: "Pagination start offset." },
        limit: { type: "number", description: "Number of results to return." },
      },
    },
  },
  {
    name: "list_organization_fields",
    description:
      "List all organization fields (including custom fields) from Pipedrive.",
    inputSchema: {
      type: "object",
      properties: {
        start: { type: "number", description: "Pagination start offset." },
        limit: { type: "number", description: "Number of results to return." },
      },
    },
  },
];
