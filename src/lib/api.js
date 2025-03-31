//FastAPI Configuration

const API_BASE_URL = 'http://localhost:8000';

async function fetchAPI(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    };

    try {
        const response = await fetch(url, { ...defaultOptions, ...options });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `API error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

export const locationsAPI = {
    getLocations: async (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.skip) queryParams.append('skip', params.skip);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.name) queryParams.append('name', params.name);
        if (params.country) queryParams.append('country', params.country);
        if (params.state) queryParams.append('state', params.state);

        const queryString = queryParams.toString();
        return fetchAPI(`/api/v1/locations/${queryString ? `?${queryString}` : ''}`);
    },

    getLocationCounts: async (params = {}) => {
        return fetchAPI('/api/v1/locations/counts');
    }
}
