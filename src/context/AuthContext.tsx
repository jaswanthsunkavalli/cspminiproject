import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

export interface UserProfile {
  id: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  role: 'resident' | 'volunteer' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserProfile>;
  register: (data: any) => Promise<UserProfile>;
  logout: () => Promise<void>;
  updateUser: (updatedData: Partial<UserProfile>) => void;
  isAdmin: boolean;
  isVolunteer: boolean;
  isResident: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('kuntamukkala_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('kuntamukkala_token');
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/auth/me');
        if (res.data.user) {
          const userData = {
            id: res.data.user._id || res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
            phone: res.data.user.phone,
            role: res.data.user.role,
            avatar: res.data.user.avatar,
          };
          setUser(userData);
          localStorage.setItem('kuntamukkala_user', JSON.stringify(userData));
        }
      } catch (err) {
        console.error('Session check failed:', err);
        setToken(null);
        setUser(null);
        localStorage.removeItem('kuntamukkala_token');
        localStorage.removeItem('kuntamukkala_user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  const login = async (email: string, password: string): Promise<UserProfile> => {
    const res = await api.post('/auth/login', { email, password });
    const { token: newToken, user: userData } = res.data;
    
    const formattedUser: UserProfile = {
      id: userData.id || userData._id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      avatar: userData.avatar,
    };

    setToken(newToken);
    setUser(formattedUser);
    localStorage.setItem('kuntamukkala_token', newToken);
    localStorage.setItem('kuntamukkala_user', JSON.stringify(formattedUser));

    return formattedUser;
  };

  const register = async (data: any): Promise<UserProfile> => {
    const res = await api.post('/auth/register', data);
    const { token: newToken, user: userData } = res.data;

    const formattedUser: UserProfile = {
      id: userData.id || userData._id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      avatar: userData.avatar,
    };

    setToken(newToken);
    setUser(formattedUser);
    localStorage.setItem('kuntamukkala_token', newToken);
    localStorage.setItem('kuntamukkala_user', JSON.stringify(formattedUser));

    return formattedUser;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // Ignore network errors on logout
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('kuntamukkala_token');
    localStorage.removeItem('kuntamukkala_user');
  };

  const updateUser = (updatedData: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      const nextUser = { ...prev, ...updatedData };
      localStorage.setItem('kuntamukkala_user', JSON.stringify(nextUser));
      return nextUser;
    });
  };

  const isAdmin = user?.role === 'admin';
  const isVolunteer = user?.role === 'volunteer' || user?.role === 'admin';
  const isResident = user?.role === 'resident';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAdmin,
        isVolunteer,
        isResident,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
