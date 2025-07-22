export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // In a real app, this would be hashed
  createdAt: Date;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}
