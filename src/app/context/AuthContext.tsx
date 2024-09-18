// context/AuthContext.tsx
"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../services/firebase"; // Importe l'auth depuis le fichier firebase
import { loginWithUsername } from "../services/signIn"; // Importe la fonction de connexion

// Interface du contexte
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Créer le contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fonction de connexion
  // Fonction de connexion avec levée de l'erreur
  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      await loginWithUsername(username, password);
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error; // Relancer l'erreur pour que le composant puisse la capter
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
}
