export type UserRole =
  | "admin"
  | "solicitante"
  | "engenheiro"
  | "suprimento"
  | "diretor";

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  cnpj?: string;
  createdAt: Date;
  lastLoginAt: Date;
  role?: UserRole;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  displayName: string;
  phone: string;
  cpf: string;
  role: UserRole;
}

export interface AuthError {
  code: string;
  message: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: AuthError;
}
