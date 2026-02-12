import { AxiosInstance } from "axios";

export function createHandlers(
  axiosInstance: AxiosInstance
): Record<string, (args: any) => Promise<any>> {
  return {
    // ==================== Deals ====================
    list_deals: async (args) => {
      const response = await axiosInstance.get("/deals", { params: args });
      return response.data;
    },
    get_deal: async (args) => {
      const response = await axiosInstance.get(`/deals/${args.id}`);
      return response.data;
    },
    search_deals: async (args) => {
      const response = await axiosInstance.get("/deals/search", {
        params: args,
      });
      return response.data;
    },
    create_deal: async (args) => {
      const response = await axiosInstance.post("/deals", args);
      return response.data;
    },
    update_deal: async (args) => {
      const { id, ...data } = args;
      const response = await axiosInstance.put(`/deals/${id}`, data);
      return response.data;
    },
    delete_deal: async (args) => {
      const response = await axiosInstance.delete(`/deals/${args.id}`);
      return response.data;
    },
    get_deal_activities: async (args) => {
      const { id, ...params } = args;
      const response = await axiosInstance.get(`/deals/${id}/activities`, {
        params,
      });
      return response.data;
    },
    get_deal_participants: async (args) => {
      const { id, ...params } = args;
      const response = await axiosInstance.get(`/deals/${id}/participants`, {
        params,
      });
      return response.data;
    },
    get_deal_products: async (args) => {
      const { id, ...params } = args;
      const response = await axiosInstance.get(`/deals/${id}/products`, {
        params,
      });
      return response.data;
    },

    // ==================== Persons ====================
    list_persons: async (args) => {
      const response = await axiosInstance.get("/persons", { params: args });
      return response.data;
    },
    get_person: async (args) => {
      const response = await axiosInstance.get(`/persons/${args.id}`);
      return response.data;
    },
    search_persons: async (args) => {
      const response = await axiosInstance.get("/persons/search", {
        params: args,
      });
      return response.data;
    },
    create_person: async (args) => {
      const response = await axiosInstance.post("/persons", args);
      return response.data;
    },
    update_person: async (args) => {
      const { id, ...data } = args;
      const response = await axiosInstance.put(`/persons/${id}`, data);
      return response.data;
    },
    delete_person: async (args) => {
      const response = await axiosInstance.delete(`/persons/${args.id}`);
      return response.data;
    },
    get_person_deals: async (args) => {
      const { id, ...params } = args;
      const response = await axiosInstance.get(`/persons/${id}/deals`, {
        params,
      });
      return response.data;
    },

    // ==================== Organizations ====================
    list_organizations: async (args) => {
      const response = await axiosInstance.get("/organizations", {
        params: args,
      });
      return response.data;
    },
    get_organization: async (args) => {
      const response = await axiosInstance.get(`/organizations/${args.id}`);
      return response.data;
    },
    search_organizations: async (args) => {
      const response = await axiosInstance.get("/organizations/search", {
        params: args,
      });
      return response.data;
    },
    create_organization: async (args) => {
      const response = await axiosInstance.post("/organizations", args);
      return response.data;
    },
    update_organization: async (args) => {
      const { id, ...data } = args;
      const response = await axiosInstance.put(`/organizations/${id}`, data);
      return response.data;
    },
    delete_organization: async (args) => {
      const response = await axiosInstance.delete(`/organizations/${args.id}`);
      return response.data;
    },
    get_organization_deals: async (args) => {
      const { id, ...params } = args;
      const response = await axiosInstance.get(`/organizations/${id}/deals`, {
        params,
      });
      return response.data;
    },
    get_organization_persons: async (args) => {
      const { id, ...params } = args;
      const response = await axiosInstance.get(`/organizations/${id}/persons`, {
        params,
      });
      return response.data;
    },

    // ==================== Activities ====================
    list_activities: async (args) => {
      const response = await axiosInstance.get("/activities", { params: args });
      return response.data;
    },
    get_activity: async (args) => {
      const response = await axiosInstance.get(`/activities/${args.id}`);
      return response.data;
    },
    create_activity: async (args) => {
      const response = await axiosInstance.post("/activities", args);
      return response.data;
    },
    update_activity: async (args) => {
      const { id, ...data } = args;
      const response = await axiosInstance.put(`/activities/${id}`, data);
      return response.data;
    },
    delete_activity: async (args) => {
      const response = await axiosInstance.delete(`/activities/${args.id}`);
      return response.data;
    },

    // ==================== Notes ====================
    list_notes: async (args) => {
      const response = await axiosInstance.get("/notes", { params: args });
      return response.data;
    },
    get_note: async (args) => {
      const response = await axiosInstance.get(`/notes/${args.id}`);
      return response.data;
    },
    create_note: async (args) => {
      const response = await axiosInstance.post("/notes", args);
      return response.data;
    },
    update_note: async (args) => {
      const { id, ...data } = args;
      const response = await axiosInstance.put(`/notes/${id}`, data);
      return response.data;
    },
    delete_note: async (args) => {
      const response = await axiosInstance.delete(`/notes/${args.id}`);
      return response.data;
    },

    // ==================== Pipelines ====================
    list_pipelines: async (args) => {
      const response = await axiosInstance.get("/pipelines", { params: args });
      return response.data;
    },
    get_pipeline: async (args) => {
      const response = await axiosInstance.get(`/pipelines/${args.id}`);
      return response.data;
    },
    get_pipeline_deals: async (args) => {
      const { id, ...params } = args;
      const response = await axiosInstance.get(`/pipelines/${id}/deals`, {
        params,
      });
      return response.data;
    },

    // ==================== Stages ====================
    list_stages: async (args) => {
      const response = await axiosInstance.get("/stages", { params: args });
      return response.data;
    },
    get_stage: async (args) => {
      const response = await axiosInstance.get(`/stages/${args.id}`);
      return response.data;
    },
    get_stage_deals: async (args) => {
      const { id, ...params } = args;
      const response = await axiosInstance.get(`/stages/${id}/deals`, {
        params,
      });
      return response.data;
    },

    // ==================== Products ====================
    list_products: async (args) => {
      const response = await axiosInstance.get("/products", { params: args });
      return response.data;
    },
    get_product: async (args) => {
      const response = await axiosInstance.get(`/products/${args.id}`);
      return response.data;
    },
    search_products: async (args) => {
      const response = await axiosInstance.get("/products/search", {
        params: args,
      });
      return response.data;
    },
    create_product: async (args) => {
      const response = await axiosInstance.post("/products", args);
      return response.data;
    },
    update_product: async (args) => {
      const { id, ...data } = args;
      const response = await axiosInstance.put(`/products/${id}`, data);
      return response.data;
    },
    delete_product: async (args) => {
      const response = await axiosInstance.delete(`/products/${args.id}`);
      return response.data;
    },

    // ==================== Leads ====================
    list_leads: async (args) => {
      const response = await axiosInstance.get("/leads", { params: args });
      return response.data;
    },
    get_lead: async (args) => {
      const response = await axiosInstance.get(`/leads/${args.id}`);
      return response.data;
    },
    create_lead: async (args) => {
      const response = await axiosInstance.post("/leads", args);
      return response.data;
    },
    update_lead: async (args) => {
      const { id, ...data } = args;
      const response = await axiosInstance.patch(`/leads/${id}`, data);
      return response.data;
    },
    delete_lead: async (args) => {
      const response = await axiosInstance.delete(`/leads/${args.id}`);
      return response.data;
    },
    search_leads: async (args) => {
      const response = await axiosInstance.get("/leads/search", {
        params: args,
      });
      return response.data;
    },

    // ==================== Fields ====================
    list_deal_fields: async (args) => {
      const response = await axiosInstance.get("/dealFields", { params: args });
      return response.data;
    },
    list_person_fields: async (args) => {
      const response = await axiosInstance.get("/personFields", {
        params: args,
      });
      return response.data;
    },
    list_organization_fields: async (args) => {
      const response = await axiosInstance.get("/organizationFields", {
        params: args,
      });
      return response.data;
    },
  };
}
