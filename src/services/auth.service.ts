import { doPost, setToken } from "../core/api/api";
import { LoginRequest, LoginResponse } from "../interfaces/auth.interface";

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await doPost<LoginResponse, LoginRequest>(
      '/auth/login',
      credentials,
      'auth'
    );
    
    // Guardar el token en sessionStorage
    if (response.data.token) {
      setToken(response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logout = (): void => {
  sessionStorage.removeItem('authToken');
  window.location.href = '/';
};
