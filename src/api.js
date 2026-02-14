/**
 * Production-ready API client using native fetch
 * Features:
 * - Automatic Token injection
 * - Centralized Error handling
 * - FormData (File upload) support
 * - JSON body handling
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://techtantra-454332459962.asia-southeast1.run.app/api/';

async function request(endpoint, options = {}) {
    if (!BASE_URL) {
        console.error('API Error: VITE_API_BASE_URL is not defined. Check your .env file or build arguments.');
    }
    const token = localStorage.getItem('token');

    // Default headers
    const headers = {
        ...options.headers,
    };

    // Inject Auth Token if exists
    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }

    // Prepare config
    const config = {
        ...options,
        headers,
    };

    // Handle Body: If it's not FormData, stringify it and set Content-Type
    if (config.body && !(config.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
        config.body = JSON.stringify(config.body);
    }

    try {
        // Ensure single slash between BASE_URL and endpoint
        const cleanBase = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const url = `${cleanBase}${cleanEndpoint}`;

        console.log(`API Request: ${options.method} ${url}`);
        const response = await fetch(url, config);

        // Handle 204 No Content
        if (response.status === 204) return null;

        // Custom response parsers (e.g., for blobs)
        if (options.responseType === 'blob') {
            if (!response.ok) throw new Error('Download failed');
            return await response.blob();
        }

        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        let data = null;

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        }

        if (!response.ok) {
            // If it's HTML being returned (like a 404/500 page), use statusText
            if (!data) {
                throw new Error(`Server Error: ${response.status} ${response.statusText}`);
            }

            // Extract the most descriptive error message possible
            let message = data.detail || data.message;

            if (!message && data.non_field_errors) {
                message = Array.isArray(data.non_field_errors) ? data.non_field_errors[0] : data.non_field_errors;
            }

            if (!message && typeof data === 'object') {
                // Get the first error message from any field
                const firstKey = Object.keys(data)[0];
                const firstVal = data[firstKey];
                message = `${firstKey}: ${Array.isArray(firstVal) ? firstVal[0] : firstVal}`;
            }

            const error = new Error(message || 'Something went wrong');
            error.status = response.status;
            error.data = data;
            throw error;
        }

        return data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

const api = {
    get: (url, options) => request(url, { ...options, method: 'GET' }),
    post: (url, body, options) => request(url, { ...options, method: 'POST', body }),
    put: (url, body, options) => request(url, { ...options, method: 'PUT', body }),
    patch: (url, body, options) => request(url, { ...options, method: 'PATCH', body }),
    delete: (url, options) => request(url, { ...options, method: 'DELETE' }),

    // Specifically for File Uploads
    upload: (url, formData, options) => {
        return request(url, {
            ...options,
            method: 'POST',
            body: formData,
            // Header: Browser automatically sets Content-Type with Boundary for FormData
        });
    }
};

export default api;
