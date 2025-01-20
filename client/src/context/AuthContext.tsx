import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../utils/api';
import { LoginCredentials, SignupCredentials, User } from '../../../shared/types/auth';
import { handleApiError } from '../utils/errorHandler';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials: LoginCredentials) => {
    try {
      const userData = await api.auth.login(credentials);
      setUser(userData);
      setIsAuthenticated(true);
      console.info('User logged in successfully');
    } catch (error) {
      const appError = handleApiError(error);
      console.error('Login failed:', appError);
      throw appError;
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    try {
      const userData = await api.auth.signup(credentials);
      setUser(userData);
      setIsAuthenticated(true);
      console.info('User signed up successfully');
    } catch (error) {
      const appError = handleApiError(error);
      console.error('Signup failed:', appError);
      throw appError;
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
      setUser(null);
      setIsAuthenticated(false);
      console.info('User logged out successfully');
    } catch (error) {
      const appError = handleApiError(error);
      console.error('Logout failed:', appError);
      throw appError;
    }
  };

  useEffect(() => {
    api.auth.verify()
      .then(userData => {
        setUser(userData);
        setIsAuthenticated(true);
        console.info('User session verified');
      })
      .catch(error => {
        console.warn('Session verification failed:', error);
        setUser(null);
        setIsAuthenticated(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 