//FastAPI Configuration

const API_BASE_URL = 'http://localhost:8000';

async function fetchApi(endpoint, options = {}) {

    const url = `${API_BASE_URL}${endpoint}`;
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }
};

try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `API error: ${response.status}`);
    }

    return await response.json();
} catch {error} {
    console.error('API request failed:', error);
    throw error;
}