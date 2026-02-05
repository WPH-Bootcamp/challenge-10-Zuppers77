export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  headline?: string;
  avatarUrl?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}
