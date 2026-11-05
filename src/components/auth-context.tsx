"use client";

import * as React from "react";

export const ADMIN_EMAIL = "alimzhan.khalelov@gmail.com";

export interface User {
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  loginWithGoogle: (email?: string, name?: string, avatar?: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "telos_auth_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  // Restore user session from localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.email) {
          setUser(parsed);
        }
      }
    } catch {
      // ignore JSON parse error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithGoogle = React.useCallback((
    email: string = ADMIN_EMAIL, 
    name: string = "Alimzhan Khalelov",
    avatar?: string
  ) => {
    const newUser: User = {
      email: email.trim().toLowerCase(),
      name: name || email.split("@")[0],
      avatar: avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(email)}`,
    };
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch {
      // storage unavailable
    }
    setIsAuthModalOpen(false);
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // storage unavailable
    }
  }, []);

  const openAuthModal = React.useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = React.useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const isAdmin = Boolean(user?.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());

  const value = React.useMemo<AuthContextType>(() => ({
    user,
    isAdmin,
    isLoading,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    loginWithGoogle,
    logout,
  }), [user, isAdmin, isLoading, isAuthModalOpen, openAuthModal, closeAuthModal, loginWithGoogle, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
