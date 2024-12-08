export interface User {
  id: number;
  email: string;
  name: string;
  role: 'marketer' | 'admin';
  bankAccount?: string;
  paypalEmail?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}