export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}
