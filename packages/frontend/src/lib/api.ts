
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method?: RequestMethod;
  body?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  requireAuth?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const {
    method = 'GET',
    body,
    requireAuth = false,
  } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add auth token if required
  if (requireAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    headers['Authorization'] = `Bearer ${token}`;
  }

  const requestOptions: RequestInit = {
    method,
    headers,
  };

  if (body && (method === 'POST' || method === 'PUT')) {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${path}`, requestOptions);
  
  if (!response.ok) {
    // Handle API error responses
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `${response.status}: ${response.statusText}`);
  }

  // For 204 No Content responses
  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}