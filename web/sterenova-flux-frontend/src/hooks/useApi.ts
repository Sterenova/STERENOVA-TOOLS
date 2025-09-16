import { getToken } from '@/services/keycloak';

interface ApiOptions extends RequestInit {
  requireAuth?: boolean;
}

export const useApi = () => {

  const apiCall = async (url: string, options: ApiOptions = {}) => {
    const { requireAuth = true, ...fetchOptions } = options;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers as Record<string, string>),
    };

    if (requireAuth) {
      const token = getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid, redirect to login
        window.location.href = '/login';
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  };

  const get = (url: string, options: ApiOptions = {}) => 
    apiCall(url, { ...options, method: 'GET' });

  const post = (url: string, data?: any, options: ApiOptions = {}) => 
    apiCall(url, { 
      ...options, 
      method: 'POST', 
      body: data ? JSON.stringify(data) : null 
    });

  const put = (url: string, data?: any, options: ApiOptions = {}) => 
    apiCall(url, { 
      ...options, 
      method: 'PUT', 
      body: data ? JSON.stringify(data) : null 
    });

  const del = (url: string, options: ApiOptions = {}) => 
    apiCall(url, { ...options, method: 'DELETE' });

  return {
    apiCall,
    get,
    post,
    put,
    delete: del,
  };
};
