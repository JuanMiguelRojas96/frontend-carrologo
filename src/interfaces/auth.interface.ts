export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  expiresIn: string;
}

export interface AuthError {
  message: string;
}
