import apiClient from "./apiClient";

const api = {
  get: async (url, config = {}) => {
    const response = await apiClient.get(url, config);
    return response.data;
  },

  post: async (url, data = null, config = {}) => {
    const response = await apiClient.post(url, data, config);
    return response.data;
  },

  put: async (url, data = null, config = {}) => {
    const response = await apiClient.put(url, data, config);
    return response.data;
  },

  patch: async (url, data = null, config = {}) => {
    const response = await apiClient.patch(url, data, config);
    return response.data;
  },

  delete: async (url, config = {}) => {
    const response = await apiClient.delete(url, config);
    return response.data;
  },
};

export default api;
