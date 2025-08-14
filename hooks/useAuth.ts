import { router } from "expo-router";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log("🔑 useAuth render:", { isAuthenticated, isLoading });

  useEffect(() => {
    // Verificar se o usuário já está autenticado
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Aqui você pode implementar a lógica para verificar se o usuário está autenticado
      // Por exemplo, verificar um token no AsyncStorage, etc.
      console.log("🔑 checkAuthStatus executado");
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao verificar status de autenticação:", error);
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    try {
      // Implementar lógica de login
      router.replace("/(tabs)");
      setIsAuthenticated(true);
      // Removido router.replace para evitar conflito com o useEffect no _layout.tsx
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const signOut = async () => {
    try {
      // Implementar lógica de logout
      router.replace("/auth");
      setIsAuthenticated(false);
      console.log("🔑 useAuth: signOut executado");
      // Removido router.replace para evitar conflito com o useEffect no _layout.tsx
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
  };
}
