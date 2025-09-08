import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { User } from './types';

interface AuthContextType {
  user: User | null;
  isEditMode: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('edit') === 'true') {
      setIsEditMode(true);
      try {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse user from sessionStorage", error);
        sessionStorage.removeItem('user');
      }
    } else {
        setIsEditMode(false);
        setUser(null);
        sessionStorage.removeItem('user');
    }
  }, []);

  const login = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
    sessionStorage.setItem('user', JSON.stringify(loggedInUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('user');
    setIsEditMode(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('edit');
    window.history.pushState({}, '', url.toString());
    window.location.reload(); // Reload to clear state
  }, []);

  return (
    <AuthContext.Provider value={{ user, isEditMode, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
