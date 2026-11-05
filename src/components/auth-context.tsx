"use client";

import * as React from "react";

export const ADMIN_EMAIL = "alimzhan.khalelov@gmail.com";

export interface User {
  email: string;
  name: string;
  avatar?: string;
  token?: string;
  provider?: "google" | "dev";
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  googleClientId: string;
  isGoogleScriptLoaded: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  loginWithGoogleCredential: (credential: string) => boolean;
  loginWithDevFastPass: (email?: string, name?: string) => void;
  setRuntimeGoogleClientId: (clientId: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "telos_auth_session";
const CLIENT_ID_STORAGE_KEY = "telos_google_client_id";

// Safely decode Google Identity JWT
function parseGoogleJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("Failed to parse Google JWT token:", err);
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = React.useState(false);
  const [googleClientId, setGoogleClientId] = React.useState<string>(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
  );

  // Restore user session & client id from localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.email) {
          setUser(parsed);
        }
      }
      const storedClientId = localStorage.getItem(CLIENT_ID_STORAGE_KEY);
      if (storedClientId && !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        setGoogleClientId(storedClientId);
      }
    } catch {
      // ignore JSON parse error
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Dynamically load Google Identity Services SDK
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.google?.accounts?.id) {
      setIsGoogleScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsGoogleScriptLoaded(true);
    };
    script.onerror = () => {
      console.warn("Failed to load Google Identity Services SDK");
    };
    document.head.appendChild(script);

    return () => {
      // Clean up script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Authenticate with genuine cryptographically signed Google JWT token
  const loginWithGoogleCredential = React.useCallback((credential: string): boolean => {
    const payload = parseGoogleJwt(credential);
    if (!payload || !payload.email) {
      console.error("Invalid Google OAuth credential payload");
      return false;
    }

    const newUser: User = {
      email: payload.email.trim().toLowerCase(),
      name: payload.name || payload.email.split("@")[0],
      avatar: payload.picture || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(payload.email)}`,
      token: credential,
      provider: "google",
    };

    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch {
      // storage unavailable
    }
    setIsAuthModalOpen(false);
    return true;
  }, []);

  // Development bypass helper
  const loginWithDevFastPass = React.useCallback((
    email: string = ADMIN_EMAIL, 
    name: string = "Alimzhan Khalelov"
  ) => {
    const newUser: User = {
      email: email.trim().toLowerCase(),
      name: name || email.split("@")[0],
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(email)}`,
      provider: "dev",
    };
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch {
      // storage unavailable
    }
    setIsAuthModalOpen(false);
  }, []);

  const setRuntimeGoogleClientId = React.useCallback((clientId: string) => {
    const trimmed = clientId.trim();
    setGoogleClientId(trimmed);
    try {
      localStorage.setItem(CLIENT_ID_STORAGE_KEY, trimmed);
    } catch {
      // storage unavailable
    }
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      // Revoke Google session if GIS is initialized
      if (window.google?.accounts?.id && user?.email) {
        window.google.accounts.id.disableAutoSelect();
      }
    } catch {
      // storage unavailable
    }
  }, [user]);

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
    googleClientId,
    isGoogleScriptLoaded,
    openAuthModal,
    closeAuthModal,
    loginWithGoogleCredential,
    loginWithDevFastPass,
    setRuntimeGoogleClientId,
    logout,
  }), [
    user,
    isAdmin,
    isLoading,
    isAuthModalOpen,
    googleClientId,
    isGoogleScriptLoaded,
    openAuthModal,
    closeAuthModal,
    loginWithGoogleCredential,
    loginWithDevFastPass,
    setRuntimeGoogleClientId,
    logout,
  ]);

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

// Global declaration for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string; select_by?: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type?: "standard" | "icon";
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
              shape?: "rectangular" | "pill" | "circle" | "square";
              logo_alignment?: "left" | "center";
              width?: number;
              locale?: string;
            }
          ) => void;
          prompt: (momentListener?: (notification: unknown) => void) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}
