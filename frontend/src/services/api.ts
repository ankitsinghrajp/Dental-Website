const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  tags?: string[];
}

interface AuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  // Product endpoints
  async getProducts(): Promise<Product[]> {
    return this.request<Product[]>('/products');
  }

  async addProduct(productData: Omit<Product, '_id'>): Promise<Product> {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price.toString());
    
    if (productData.category) {
      formData.append('category', productData.category);
    }
    
    if (productData.tags) {
      formData.append('tags', JSON.stringify(productData.tags));
    }

    // Handle image upload if provided
    if (productData.image && typeof productData.image === 'string') {
      // If it's a file path, we'll handle it differently
      formData.append('image', productData.image);
    }

    const token = localStorage.getItem('token');
    
    const response = await fetch(`${this.baseURL}/products`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async addProductWithImage(productData: Omit<Product, '_id'>, imageFile: File): Promise<Product> {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price.toString());
    formData.append('image', imageFile);
    
    if (productData.category) {
      formData.append('category', productData.category);
    }
    
    if (productData.tags) {
      formData.append('tags', JSON.stringify(productData.tags));
    }

    const token = localStorage.getItem('token');
    
    const response = await fetch(`${this.baseURL}/products`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const apiService = new ApiService();
export type { Product, AuthResponse };
