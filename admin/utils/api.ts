export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    // Use relative URL to leverage the Next.js proxy
    // Make sure endpoint starts with /api
    const url = endpoint.startsWith('/api') 
      ? endpoint 
      : `/api${endpoint}`;

    // Force POST requests to include proper headers and body handling
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    const finalOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...(options.headers || {}),
      },
    };

    // If sending FormData, delete the Content-Type header
    if (options.body instanceof FormData) {
      delete finalOptions.headers['Content-Type'];
    }

    console.log('Request URL:', url); // Debug log
    console.log('Request Method:', finalOptions.method); // Debug log

    const response = await fetch(url, finalOptions);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error ?? 'Something went wrong',
      };
    }

    return data;
  } catch (error: any) {
    console.error('API Request Error:', error); // Debug log
    return {
      success: false,
      error: error.message ?? 'Something went wrong',
    };
  }
}
