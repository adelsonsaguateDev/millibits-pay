import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const ACCESS_CODE_KEY = "@millebits:access_code";
const IS_FIRST_TIME_KEY = "@millebits:is_first_time";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccessCode, setHasAccessCode] = useState<boolean | null>(null);
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  console.log("🔑 useAuth render:", {
    isAuthenticated,
    isLoading,
    hasAccessCode,
    isFirstTime,
  });

  useEffect(() => {
    // Verificar se o usuário já está autenticado e se tem código de acesso
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Verificar se é a primeira vez do usuário
      const firstTimeValue = await AsyncStorage.getItem(IS_FIRST_TIME_KEY);
      const isFirstTimeUser = firstTimeValue === null;
      setIsFirstTime(isFirstTimeUser);

      // Verificar se já tem código de acesso configurado
      const accessCode = await AsyncStorage.getItem(ACCESS_CODE_KEY);
      const hasCode = accessCode !== null;
      setHasAccessCode(hasCode);

      console.log("🔑 checkAuthStatus executado:", {
        isFirstTimeUser,
        hasCode,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao verificar status de autenticação:", error);
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    try {
      // Implementar lógica de login
      router.replace("/(home)");
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

  const setAccessCode = async (code: string) => {
    try {
      await AsyncStorage.setItem(ACCESS_CODE_KEY, code);
      await AsyncStorage.setItem(IS_FIRST_TIME_KEY, "false");
      setHasAccessCode(true);
      setIsFirstTime(false);
      console.log("🔑 Código de acesso configurado com sucesso");
      return true;
    } catch (error) {
      console.error("Erro ao configurar código de acesso:", error);
      return false;
    }
  };

  const verifyAccessCode = async (code: string): Promise<boolean> => {
    try {
      const storedCode = await AsyncStorage.getItem(ACCESS_CODE_KEY);
      return storedCode === code;
    } catch (error) {
      console.error("Erro ao verificar código de acesso:", error);
      return false;
    }
  };

  const clearAccessCode = async () => {
    try {
      await AsyncStorage.removeItem(ACCESS_CODE_KEY);
      await AsyncStorage.removeItem(IS_FIRST_TIME_KEY);
      setHasAccessCode(false);
      setIsFirstTime(true);
      console.log("🔑 Código de acesso removido");
    } catch (error) {
      console.error("Erro ao remover código de acesso:", error);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    hasAccessCode,
    isFirstTime,
    signIn,
    signOut,
    setAccessCode,
    verifyAccessCode,
    clearAccessCode,
  };
}
