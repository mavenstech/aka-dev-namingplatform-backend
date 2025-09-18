// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

// API utility function for making requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
//   console.log('API Request URL:', url); // Debug log
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
  };

  try {
    const response = await fetch(url, config);    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Search Names API functions
export const searchNamesAPI = {
  // Search for names with optional filters
  searchNames: async (filters = {}) => {
    return await apiRequest('/search/searchnames', {
      method: 'POST',
      body: JSON.stringify(filters),
    });
  },
};

// Name Manager API functions
export const nameManagerAPI = {
  // Create a new name
  createName: async (nameData) => {
    return await apiRequest('/names/createname', {
      method: 'POST',
      body: JSON.stringify(nameData),
    });
  },

  // Update an existing name
  updateName: async (nameData) => {
    return await apiRequest('/names/updatename', {
      method: 'POST',
      body: JSON.stringify(nameData),
    });
  },

  // Delete a name (if needed in the future)
  deleteName: async (nameId) => {
    return await apiRequest('/names/deletename', {
      method: 'POST',
      body: JSON.stringify({ nameid: nameId }),
    });
  },
};

// Export both APIs as a single object for convenience
export const api = {
  search: searchNamesAPI,
  names: nameManagerAPI,
};

export default api;