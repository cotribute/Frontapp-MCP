import { AxiosInstance } from "axios";

export function createHandlers(
  axiosInstance: AxiosInstance
): Record<string, (args: any) => Promise<any>> {
  return {
    // ==================== Campaign Analytics ====================
    get_instantly_campaign_analytics: async (args) => {
      const response = await axiosInstance.get("/campaigns/analytics", {
        params: args,
      });
      return response.data;
    },
    get_instantly_campaign_analytics_daily: async (args) => {
      const response = await axiosInstance.get("/campaigns/analytics/daily", {
        params: args,
      });
      return response.data;
    },
    get_instantly_campaign_analytics_overview: async (args) => {
      const response = await axiosInstance.get(
        "/campaigns/analytics/overview",
        {
          params: args,
        }
      );
      return response.data;
    },
    get_instantly_campaign_analytics_steps: async (args) => {
      const response = await axiosInstance.get("/campaigns/analytics/steps", {
        params: args,
      });
      return response.data;
    },

    // ==================== Account Analytics ====================
    get_instantly_account_analytics_daily: async (args) => {
      const response = await axiosInstance.get("/accounts/analytics/daily", {
        params: args,
      });
      return response.data;
    },
    get_instantly_warmup_analytics: async (args) => {
      // POST endpoint — expects JSON body with emails array
      const response = await axiosInstance.post(
        "/accounts/warmup-analytics",
        args
      );
      return response.data;
    },

    // ==================== Campaigns ====================
    list_instantly_campaigns: async (args) => {
      const response = await axiosInstance.get("/campaigns", { params: args });
      return response.data;
    },
    get_instantly_campaign: async (args) => {
      const response = await axiosInstance.get(`/campaigns/${args.id}`);
      return response.data;
    },
    create_instantly_campaign: async (args) => {
      const response = await axiosInstance.post("/campaigns", args);
      return response.data;
    },
    delete_instantly_campaign: async (args) => {
      const response = await axiosInstance.delete(`/campaigns/${args.id}`);
      return response.data;
    },
    search_instantly_campaigns_by_lead: async (args) => {
      const response = await axiosInstance.get("/campaigns/search-by-contact", {
        params: args,
      });
      return response.data;
    },

    // ==================== Leads ====================
    list_instantly_leads: async (args) => {
      // POST endpoint (not GET) due to complex filter arguments
      const response = await axiosInstance.post("/leads/list", args);
      return response.data;
    },
    get_instantly_lead: async (args) => {
      const response = await axiosInstance.get(`/leads/${args.id}`);
      return response.data;
    },
    create_instantly_leads: async (args) => {
      const response = await axiosInstance.post("/leads", args);
      return response.data;
    },
    update_instantly_lead: async (args) => {
      const { id, ...data } = args;
      const response = await axiosInstance.patch(`/leads/${id}`, data);
      return response.data;
    },
    delete_instantly_lead: async (args) => {
      const response = await axiosInstance.delete(`/leads/${args.id}`);
      return response.data;
    },
    move_instantly_leads: async (args) => {
      const response = await axiosInstance.post("/leads/move", args);
      return response.data;
    },

    // ==================== Lead Lists ====================
    list_instantly_lead_lists: async (args) => {
      const response = await axiosInstance.get("/lead-lists", { params: args });
      return response.data;
    },
    create_instantly_lead_list: async (args) => {
      const response = await axiosInstance.post("/lead-lists", args);
      return response.data;
    },
    update_instantly_lead_list: async (args) => {
      const { id, ...data } = args;
      const response = await axiosInstance.patch(`/lead-lists/${id}`, data);
      return response.data;
    },
    delete_instantly_lead_list: async (args) => {
      const response = await axiosInstance.delete(`/lead-lists/${args.id}`);
      return response.data;
    },
    get_instantly_lead_list_verification_stats: async (args) => {
      const response = await axiosInstance.get(
        `/lead-lists/${args.id}/verification-stats`
      );
      return response.data;
    },

    // ==================== Emails ====================
    list_instantly_emails: async (args) => {
      const response = await axiosInstance.get("/emails", { params: args });
      return response.data;
    },

    // ==================== Email Accounts ====================
    list_instantly_accounts: async (args) => {
      const response = await axiosInstance.get("/accounts", { params: args });
      return response.data;
    },
    get_instantly_account: async (args) => {
      const response = await axiosInstance.get(`/accounts/${args.email}`);
      return response.data;
    },
  };
}
