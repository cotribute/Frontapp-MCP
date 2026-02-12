import { AxiosInstance } from "axios";

export function createHandlers(
  axiosInstance: AxiosInstance
): Record<string, (args: any) => Promise<any>> {
  return {
    // Conversation operations
    list_conversations: async (args) => {
      const response = await axiosInstance.get("/conversations", {
        params: args,
      });
      return response.data;
    },
    get_conversation: async (args) => {
      const response = await axiosInstance.get(
        `/conversations/${args.conversation_id}`
      );
      return response.data;
    },
    search_conversations: async (args) => {
      const response = await axiosInstance.get("/conversations/search", {
        params: { q: args.query, limit: args.limit },
      });
      return response.data;
    },
    update_conversation: async (args) => {
      const { conversation_id, ...data } = args;
      const response = await axiosInstance.patch(
        `/conversations/${conversation_id}`,
        data
      );
      return response.data;
    },

    // Message operations
    list_conversation_messages: async (args) => {
      const { conversation_id, ...queryParams } = args;
      const response = await axiosInstance.get(
        `/conversations/${conversation_id}/messages`,
        { params: queryParams }
      );
      return response.data;
    },
    get_message: async (args) => {
      const response = await axiosInstance.get(`/messages/${args.message_id}`);
      return response.data;
    },
    send_message: async (args) => {
      const { channel_id, ...data } = args;
      const response = await axiosInstance.post(
        `/channels/${channel_id}/messages`,
        data
      );
      return response.data;
    },
    reply_to_conversation: async (args) => {
      const { conversation_id, type, ...data } = args;
      const endpoint = type === "comment" ? "comments" : "messages";
      const response = await axiosInstance.post(
        `/conversations/${conversation_id}/${endpoint}`,
        data
      );
      return response.data;
    },

    // Contact operations
    list_contacts: async (args) => {
      const response = await axiosInstance.get("/contacts", { params: args });
      return response.data;
    },
    get_contact: async (args) => {
      const response = await axiosInstance.get(`/contacts/${args.contact_id}`);
      return response.data;
    },
    create_contact: async (args) => {
      const response = await axiosInstance.post("/contacts", args);
      return response.data;
    },
    update_contact: async (args) => {
      const { contact_id, ...data } = args;
      const response = await axiosInstance.patch(
        `/contacts/${contact_id}`,
        data
      );
      return response.data;
    },

    // Teammate operations
    list_teammates: async (args) => {
      const response = await axiosInstance.get("/teammates", { params: args });
      return response.data;
    },
    get_teammate: async (args) => {
      const response = await axiosInstance.get(
        `/teammates/${args.teammate_id}`
      );
      return response.data;
    },

    // Tag operations
    list_tags: async (args) => {
      const response = await axiosInstance.get("/tags", { params: args });
      return response.data;
    },
    create_tag: async (args) => {
      const response = await axiosInstance.post("/tags", args);
      return response.data;
    },

    // Inbox operations
    list_inboxes: async (args) => {
      const response = await axiosInstance.get("/inboxes", { params: args });
      return response.data;
    },
    get_inbox: async (args) => {
      const response = await axiosInstance.get(`/inboxes/${args.inbox_id}`);
      return response.data;
    },

    // Comment operations
    list_conversation_comments: async (args) => {
      const response = await axiosInstance.get(
        `/conversations/${args.conversation_id}/comments`
      );
      return response.data;
    },
    add_comment: async (args) => {
      const { conversation_id, ...data } = args;
      const response = await axiosInstance.post(
        `/conversations/${conversation_id}/comments`,
        data
      );
      return response.data;
    },

    // Analytics
    get_analytics: async (args) => {
      const response = await axiosInstance.get("/analytics", { params: args });
      return response.data;
    },

    // Account operations
    list_accounts: async (args) => {
      const response = await axiosInstance.get("/accounts", { params: args });
      return response.data;
    },
    create_account: async (args) => {
      const response = await axiosInstance.post("/accounts", args);
      return response.data;
    },
    get_account: async (args) => {
      const response = await axiosInstance.get(`/accounts/${args.account_id}`);
      return response.data;
    },
    update_account: async (args) => {
      const { account_id, ...data } = args;
      const response = await axiosInstance.patch(
        `/accounts/${account_id}`,
        data
      );
      return response.data;
    },
    delete_account: async (args) => {
      const response = await axiosInstance.delete(
        `/accounts/${args.account_id}`
      );
      return response.data;
    },
    list_account_contacts: async (args) => {
      const { account_id, ...queryParams } = args;
      const response = await axiosInstance.get(
        `/accounts/${account_id}/contacts`,
        { params: queryParams }
      );
      return response.data;
    },
    add_contact_to_account: async (args) => {
      const { account_id, contact_ids } = args;
      const response = await axiosInstance.post(
        `/accounts/${account_id}/contacts`,
        { contact_ids }
      );
      return response.data;
    },
    remove_contact_from_account: async (args) => {
      const { account_id, contact_ids } = args;
      const response = await axiosInstance.delete(
        `/accounts/${account_id}/contacts`,
        { data: { contact_ids } }
      );
      return response.data;
    },

    // Additional Contact operations
    delete_contact: async (args) => {
      const response = await axiosInstance.delete(
        `/contacts/${args.contact_id}`
      );
      return response.data;
    },
    merge_contacts: async (args) => {
      const { source_contact_id, target_contact_id } = args;
      const response = await axiosInstance.post("/contacts/merge", {
        source_contact_id,
        target_contact_id,
      });
      return response.data;
    },
    list_contact_conversations: async (args) => {
      const { contact_id, ...queryParams } = args;
      const response = await axiosInstance.get(
        `/contacts/${contact_id}/conversations`,
        { params: queryParams }
      );
      return response.data;
    },
    list_contact_notes: async (args) => {
      const response = await axiosInstance.get(
        `/contacts/${args.contact_id}/notes`
      );
      return response.data;
    },
    add_contact_note: async (args) => {
      const { contact_id, ...data } = args;
      const response = await axiosInstance.post(
        `/contacts/${contact_id}/notes`,
        data
      );
      return response.data;
    },
    add_contact_handle: async (args) => {
      const { contact_id, handle, source } = args;
      const response = await axiosInstance.post(
        `/contacts/${contact_id}/handles`,
        { handle, source }
      );
      return response.data;
    },
    delete_contact_handle: async (args) => {
      const { contact_id, handle, source } = args;
      const response = await axiosInstance.delete(
        `/contacts/${contact_id}/handles`,
        {
          data: { handle, source },
        }
      );
      return response.data;
    },
    list_teammate_contacts: async (args) => {
      const { teammate_id, ...queryParams } = args;
      const response = await axiosInstance.get(
        `/teammates/${teammate_id}/contacts`,
        { params: queryParams }
      );
      return response.data;
    },
    create_teammate_contact: async (args) => {
      const { teammate_id, ...data } = args;
      const response = await axiosInstance.post(
        `/teammates/${teammate_id}/contacts`,
        data
      );
      return response.data;
    },
    list_team_contacts: async (args) => {
      const { team_id, ...queryParams } = args;
      const response = await axiosInstance.get(`/teams/${team_id}/contacts`, {
        params: queryParams,
      });
      return response.data;
    },

    // Channel operations
    list_channels: async (args) => {
      const response = await axiosInstance.get("/channels", { params: args });
      return response.data;
    },
    create_channel: async (args) => {
      const response = await axiosInstance.post("/channels", args);
      return response.data;
    },
    get_channel: async (args) => {
      const response = await axiosInstance.get(`/channels/${args.channel_id}`);
      return response.data;
    },
    update_channel: async (args) => {
      const { channel_id, ...data } = args;
      const response = await axiosInstance.patch(
        `/channels/${channel_id}`,
        data
      );
      return response.data;
    },
    validate_channel: async (args) => {
      const response = await axiosInstance.post(
        `/channels/${args.channel_id}/validate`
      );
      return response.data;
    },
    list_teammate_channels: async (args) => {
      const response = await axiosInstance.get(
        `/teammates/${args.teammate_id}/channels`
      );
      return response.data;
    },
    list_team_channels: async (args) => {
      const response = await axiosInstance.get(
        `/teams/${args.team_id}/channels`
      );
      return response.data;
    },
    sync_inbound_message: async (args) => {
      const { channel_id, ...data } = args;
      const response = await axiosInstance.post(
        `/channels/${channel_id}/inbound_messages`,
        data
      );
      return response.data;
    },
    sync_outbound_message: async (args) => {
      const { channel_id, ...data } = args;
      const response = await axiosInstance.post(
        `/channels/${channel_id}/outbound_messages`,
        data
      );
      return response.data;
    },
    update_external_message_status: async (args) => {
      const { channel_id, message_id, status } = args;
      const response = await axiosInstance.put(
        `/channels/${channel_id}/messages/${message_id}/status`,
        { status }
      );
      return response.data;
    },
    sync_application_message_template: async (args) => {
      const { channel_id, template } = args;
      const response = await axiosInstance.put(
        `/channels/${channel_id}/application_message_templates`,
        template
      );
      return response.data;
    },

    // Additional Comment operations
    get_comment: async (args) => {
      const response = await axiosInstance.get(`/comments/${args.comment_id}`);
      return response.data;
    },
    update_comment: async (args) => {
      const { comment_id, body } = args;
      const response = await axiosInstance.patch(`/comments/${comment_id}`, {
        body,
      });
      return response.data;
    },
    list_comment_mentions: async (args) => {
      const response = await axiosInstance.get(
        `/comments/${args.comment_id}/mentions`
      );
      return response.data;
    },
    add_comment_reply: async (args) => {
      const { comment_id, ...data } = args;
      const response = await axiosInstance.post(
        `/comments/${comment_id}/replies`,
        data
      );
      return response.data;
    },

    // Contact Group operations (deprecated)
    list_contact_groups: async (args) => {
      const response = await axiosInstance.get("/contact_groups", {
        params: args,
      });
      return response.data;
    },
    create_contact_group: async (args) => {
      const response = await axiosInstance.post("/contact_groups", args);
      return response.data;
    },
    delete_contact_group: async (args) => {
      const response = await axiosInstance.delete(
        `/contact_groups/${args.group_id}`
      );
      return response.data;
    },
    list_group_contacts: async (args) => {
      const response = await axiosInstance.get(
        `/contact_groups/${args.group_id}/contacts`
      );
      return response.data;
    },
    add_contacts_to_group: async (args) => {
      const { group_id, contact_ids } = args;
      const response = await axiosInstance.post(
        `/contact_groups/${group_id}/contacts`,
        { contact_ids }
      );
      return response.data;
    },
    remove_contacts_from_group: async (args) => {
      const { group_id, contact_ids } = args;
      const response = await axiosInstance.delete(
        `/contact_groups/${group_id}/contacts`,
        {
          data: { contact_ids },
        }
      );
      return response.data;
    },
    list_teammate_groups: async (args) => {
      const response = await axiosInstance.get(
        `/teammates/${args.teammate_id}/contact_groups`
      );
      return response.data;
    },
    create_teammate_group: async (args) => {
      const { teammate_id, ...data } = args;
      const response = await axiosInstance.post(
        `/teammates/${teammate_id}/contact_groups`,
        data
      );
      return response.data;
    },
    list_team_groups: async (args) => {
      const response = await axiosInstance.get(
        `/teams/${args.team_id}/contact_groups`
      );
      return response.data;
    },
    create_team_group: async (args) => {
      const { team_id, ...data } = args;
      const response = await axiosInstance.post(
        `/teams/${team_id}/contact_groups`,
        data
      );
      return response.data;
    },

    // Contact List operations
    list_contact_lists: async (args) => {
      const response = await axiosInstance.get("/contact_lists", {
        params: args,
      });
      return response.data;
    },
    create_contact_list: async (args) => {
      const response = await axiosInstance.post("/contact_lists", args);
      return response.data;
    },
    delete_contact_list: async (args) => {
      const response = await axiosInstance.delete(
        `/contact_lists/${args.list_id}`
      );
      return response.data;
    },
    list_contact_list_contacts: async (args) => {
      const { list_id, ...queryParams } = args;
      const response = await axiosInstance.get(
        `/contact_lists/${list_id}/contacts`,
        { params: queryParams }
      );
      return response.data;
    },
    add_contacts_to_list: async (args) => {
      const { list_id, contact_ids } = args;
      const response = await axiosInstance.post(
        `/contact_lists/${list_id}/contacts`,
        { contact_ids }
      );
      return response.data;
    },
    remove_contacts_from_list: async (args) => {
      const { list_id, contact_ids } = args;
      const response = await axiosInstance.delete(
        `/contact_lists/${list_id}/contacts`,
        {
          data: { contact_ids },
        }
      );
      return response.data;
    },
    list_teammate_contact_lists: async (args) => {
      const response = await axiosInstance.get(
        `/teammates/${args.teammate_id}/contact_lists`
      );
      return response.data;
    },
    create_teammate_contact_list: async (args) => {
      const { teammate_id, ...data } = args;
      const response = await axiosInstance.post(
        `/teammates/${teammate_id}/contact_lists`,
        data
      );
      return response.data;
    },
    list_team_contact_lists: async (args) => {
      const response = await axiosInstance.get(
        `/teams/${args.team_id}/contact_lists`
      );
      return response.data;
    },
    create_team_contact_list: async (args) => {
      const { team_id, ...data } = args;
      const response = await axiosInstance.post(
        `/teams/${team_id}/contact_lists`,
        data
      );
      return response.data;
    },

    // Additional Conversation operations
    create_discussion_conversation: async (args) => {
      const response = await axiosInstance.post("/conversations", args);
      return response.data;
    },
    update_conversation_assignee: async (args) => {
      const { conversation_id, assignee_id } = args;
      const response = await axiosInstance.put(
        `/conversations/${conversation_id}/assignee`,
        {
          assignee_id,
        }
      );
      return response.data;
    },
    list_conversation_events: async (args) => {
      const { conversation_id, ...queryParams } = args;
      const response = await axiosInstance.get(
        `/conversations/${conversation_id}/events`,
        {
          params: queryParams,
        }
      );
      return response.data;
    },
    list_conversation_followers: async (args) => {
      const response = await axiosInstance.get(
        `/conversations/${args.conversation_id}/followers`
      );
      return response.data;
    },
    add_conversation_followers: async (args) => {
      const { conversation_id, teammate_ids } = args;
      const response = await axiosInstance.post(
        `/conversations/${conversation_id}/followers`,
        {
          teammate_ids,
        }
      );
      return response.data;
    },
    delete_conversation_followers: async (args) => {
      const { conversation_id, teammate_ids } = args;
      const response = await axiosInstance.delete(
        `/conversations/${conversation_id}/followers`,
        {
          data: { teammate_ids },
        }
      );
      return response.data;
    },
    list_conversation_inboxes: async (args) => {
      const response = await axiosInstance.get(
        `/conversations/${args.conversation_id}/inboxes`
      );
      return response.data;
    },
    add_conversation_link: async (args) => {
      const { conversation_id, link_ids } = args;
      const response = await axiosInstance.post(
        `/conversations/${conversation_id}/links`,
        { link_ids }
      );
      return response.data;
    },
    remove_conversation_links: async (args) => {
      const { conversation_id, link_ids } = args;
      const response = await axiosInstance.delete(
        `/conversations/${conversation_id}/links`,
        {
          data: { link_ids },
        }
      );
      return response.data;
    },
    update_conversation_reminders: async (args) => {
      const { conversation_id, ...data } = args;
      const response = await axiosInstance.patch(
        `/conversations/${conversation_id}/reminders`,
        data
      );
      return response.data;
    },
    add_conversation_tag: async (args) => {
      const { conversation_id, tag_ids } = args;
      const response = await axiosInstance.post(
        `/conversations/${conversation_id}/tags`,
        { tag_ids }
      );
      return response.data;
    },
    remove_conversation_tag: async (args) => {
      const { conversation_id, tag_ids } = args;
      const response = await axiosInstance.delete(
        `/conversations/${conversation_id}/tags`,
        {
          data: { tag_ids },
        }
      );
      return response.data;
    },

    // Custom Fields operations
    list_account_custom_fields: async () => {
      const response = await axiosInstance.get("/accounts/custom_fields");
      return response.data;
    },
    list_contact_custom_fields: async () => {
      const response = await axiosInstance.get("/contacts/custom_fields");
      return response.data;
    },
    list_conversation_custom_fields: async () => {
      const response = await axiosInstance.get("/conversations/custom_fields");
      return response.data;
    },
    list_custom_fields: async () => {
      const response = await axiosInstance.get("/custom_fields");
      return response.data;
    },
    list_inbox_custom_fields: async () => {
      const response = await axiosInstance.get("/inboxes/custom_fields");
      return response.data;
    },
    list_link_custom_fields: async () => {
      const response = await axiosInstance.get("/links/custom_fields");
      return response.data;
    },
    list_teammate_custom_fields: async () => {
      const response = await axiosInstance.get("/teammates/custom_fields");
      return response.data;
    },

    // Draft operations
    create_draft: async (args) => {
      const response = await axiosInstance.post("/drafts", args);
      return response.data;
    },
    list_conversation_drafts: async (args) => {
      const response = await axiosInstance.get(
        `/conversations/${args.conversation_id}/drafts`
      );
      return response.data;
    },
    create_draft_reply: async (args) => {
      const { channel_id, ...data } = args;
      const response = await axiosInstance.post(
        `/channels/${channel_id}/drafts`,
        data
      );
      return response.data;
    },
    delete_draft: async (args) => {
      const { draft_id, version } = args;
      const response = await axiosInstance.delete(`/drafts/${draft_id}`, {
        data: { version },
      });
      return response.data;
    },
    edit_draft: async (args) => {
      const { draft_id, version, ...data } = args;
      const response = await axiosInstance.patch(`/drafts/${draft_id}`, {
        version,
        ...data,
      });
      return response.data;
    },

    // Event operations
    list_events: async (args) => {
      const response = await axiosInstance.get("/events", { params: args });
      return response.data;
    },
    get_event: async (args) => {
      const response = await axiosInstance.get(`/events/${args.event_id}`);
      return response.data;
    },

    // Additional Inbox operations
    create_inbox: async (args) => {
      const response = await axiosInstance.post("/inboxes", args);
      return response.data;
    },
    list_inbox_channels: async (args) => {
      const response = await axiosInstance.get(
        `/inboxes/${args.inbox_id}/channels`
      );
      return response.data;
    },
    list_inbox_conversations: async (args) => {
      const { inbox_id, ...queryParams } = args;
      const response = await axiosInstance.get(
        `/inboxes/${inbox_id}/conversations`,
        {
          params: queryParams,
        }
      );
      return response.data;
    },
    list_inbox_access: async (args) => {
      const response = await axiosInstance.get(
        `/inboxes/${args.inbox_id}/access`
      );
      return response.data;
    },
    add_inbox_access: async (args) => {
      const { inbox_id, teammate_ids } = args;
      const response = await axiosInstance.post(`/inboxes/${inbox_id}/access`, {
        teammate_ids,
      });
      return response.data;
    },
    remove_inbox_access: async (args) => {
      const { inbox_id, teammate_ids } = args;
      const response = await axiosInstance.delete(
        `/inboxes/${inbox_id}/access`,
        {
          data: { teammate_ids },
        }
      );
      return response.data;
    },
    list_team_inboxes: async (args) => {
      const response = await axiosInstance.get(
        `/teams/${args.team_id}/inboxes`
      );
      return response.data;
    },
    create_team_inbox: async (args) => {
      const { team_id, ...data } = args;
      const response = await axiosInstance.post(
        `/teams/${team_id}/inboxes`,
        data
      );
      return response.data;
    },

    // Additional Message operations
    receive_custom_message: async (args) => {
      const { channel_id, ...data } = args;
      const response = await axiosInstance.post(
        `/channels/${channel_id}/incoming_messages`,
        data
      );
      return response.data;
    },
    import_message: async (args) => {
      const { channel_id, ...data } = args;
      const response = await axiosInstance.post(
        `/channels/${channel_id}/import`,
        data
      );
      return response.data;
    },
    get_message_seen_status: async (args) => {
      const response = await axiosInstance.get(
        `/messages/${args.message_id}/seen`
      );
      return response.data;
    },
    mark_message_seen: async (args) => {
      const response = await axiosInstance.post(
        `/messages/${args.message_id}/seen`
      );
      return response.data;
    },

    // Message Template Folder operations
    list_message_template_folders: async (args) => {
      const response = await axiosInstance.get("/message_template_folders", {
        params: args,
      });
      return response.data;
    },
    create_message_template_folder: async (args) => {
      const response = await axiosInstance.post(
        "/message_template_folders",
        args
      );
      return response.data;
    },
    get_message_template_folder: async (args) => {
      const response = await axiosInstance.get(
        `/message_template_folders/${args.folder_id}`
      );
      return response.data;
    },
    update_message_template_folder: async (args) => {
      const { folder_id, ...data } = args;
      const response = await axiosInstance.patch(
        `/message_template_folders/${folder_id}`,
        data
      );
      return response.data;
    },
    delete_message_template_folder: async (args) => {
      const response = await axiosInstance.delete(
        `/message_template_folders/${args.folder_id}`
      );
      return response.data;
    },
    list_child_folders: async (args) => {
      const response = await axiosInstance.get(
        `/message_template_folders/${args.folder_id}/children`
      );
      return response.data;
    },
    create_child_folder: async (args) => {
      const { folder_id, ...data } = args;
      const response = await axiosInstance.post(
        `/message_template_folders/${folder_id}/children`,
        data
      );
      return response.data;
    },
    list_teammate_folders: async (args) => {
      const response = await axiosInstance.get(
        `/teammates/${args.teammate_id}/message_template_folders`
      );
      return response.data;
    },
    create_teammate_folder: async (args) => {
      const { teammate_id, ...data } = args;
      const response = await axiosInstance.post(
        `/teammates/${teammate_id}/message_template_folders`,
        data
      );
      return response.data;
    },
    list_team_folders: async (args) => {
      const response = await axiosInstance.get(
        `/teams/${args.team_id}/message_template_folders`
      );
      return response.data;
    },

    // Message Template operations
    list_message_templates: async (args) => {
      const response = await axiosInstance.get("/message_templates", {
        params: args,
      });
      return response.data;
    },
    create_message_template: async (args) => {
      const response = await axiosInstance.post("/message_templates", args);
      return response.data;
    },
    get_message_template: async (args) => {
      const response = await axiosInstance.get(
        `/message_templates/${args.template_id}`
      );
      return response.data;
    },
    update_message_template: async (args) => {
      const { template_id, ...data } = args;
      const response = await axiosInstance.patch(
        `/message_templates/${template_id}`,
        data
      );
      return response.data;
    },
    delete_message_template: async (args) => {
      const response = await axiosInstance.delete(
        `/message_templates/${args.template_id}`
      );
      return response.data;
    },
    list_child_templates: async (args) => {
      const response = await axiosInstance.get(
        `/message_templates/${args.template_id}/children`
      );
      return response.data;
    },
    create_child_template: async (args) => {
      const { template_id, ...data } = args;
      const response = await axiosInstance.post(
        `/message_templates/${template_id}/children`,
        data
      );
      return response.data;
    },

    // Additional Tag operations
    get_tag: async (args) => {
      const response = await axiosInstance.get(`/tags/${args.tag_id}`);
      return response.data;
    },
    update_tag: async (args) => {
      const { tag_id, ...data } = args;
      const response = await axiosInstance.patch(`/tags/${tag_id}`, data);
      return response.data;
    },
    delete_tag: async (args) => {
      const response = await axiosInstance.delete(`/tags/${args.tag_id}`);
      return response.data;
    },
    list_tag_children: async (args) => {
      const response = await axiosInstance.get(`/tags/${args.tag_id}/children`);
      return response.data;
    },
    create_child_tag: async (args) => {
      const { tag_id, ...data } = args;
      const response = await axiosInstance.post(
        `/tags/${tag_id}/children`,
        data
      );
      return response.data;
    },
    list_tagged_conversations: async (args) => {
      const { tag_id, ...queryParams } = args;
      const response = await axiosInstance.get(
        `/tags/${tag_id}/conversations`,
        { params: queryParams }
      );
      return response.data;
    },
    list_teammate_tags: async (args) => {
      const response = await axiosInstance.get(
        `/teammates/${args.teammate_id}/tags`
      );
      return response.data;
    },
    create_teammate_tag: async (args) => {
      const { teammate_id, ...data } = args;
      const response = await axiosInstance.post(
        `/teammates/${teammate_id}/tags`,
        data
      );
      return response.data;
    },
    list_team_tags: async (args) => {
      const response = await axiosInstance.get(`/teams/${args.team_id}/tags`);
      return response.data;
    },
    create_team_tag: async (args) => {
      const { team_id, ...data } = args;
      const response = await axiosInstance.post(`/teams/${team_id}/tags`, data);
      return response.data;
    },

    // Additional Teammate operations
    update_teammate: async (args) => {
      const { teammate_id, ...data } = args;
      const response = await axiosInstance.patch(
        `/teammates/${teammate_id}`,
        data
      );
      return response.data;
    },
    list_teammate_conversations: async (args) => {
      const { teammate_id, ...queryParams } = args;
      const response = await axiosInstance.get(
        `/teammates/${teammate_id}/conversations`,
        {
          params: queryParams,
        }
      );
      return response.data;
    },
    list_teammate_inboxes: async (args) => {
      const response = await axiosInstance.get(
        `/teammates/${args.teammate_id}/inboxes`
      );
      return response.data;
    },
  };
}
