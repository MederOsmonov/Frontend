import { createContext, useState, useEffect } from "react";
import { login as apiLogin, register as apiRegister, logout as apiLogout, getCurrentUser } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Проверяем токен при загрузке приложения
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token && !user) {
        try {
          setLoading(true);
          const userData = await getCurrentUser();
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } catch (error) {
          console.error('Error checking auth:', error);
          // Если токен недействителен, очищаем данные
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
        } finally {
          setLoading(false);
        }
      }
    };

    checkAuth();
  }, [user]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiLogin(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.response?.data?.message || 'Ошибка входа');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiRegister(userData);
      // После регистрации можно автоматически войти
      const loginResponse = await apiLogin({
        username: userData.username,
        password: userData.password
      });
      setUser(loginResponse.user);
      return loginResponse;
    } catch (error) {
      setError(error.response?.data?.message || 'Ошибка регистрации');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading, 
      error, 
      clearError,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};