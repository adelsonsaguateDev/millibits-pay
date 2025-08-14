import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const EMAIL_KEY = "@millebits:email";
const PASSWORD_KEY = "@millebits:password";
const USERNAME_KEY = "@millebits:username";
const IS_FIRST_TIME_KEY = "@millebits:is_first_time";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCredentials, setHasCredentials] = useState<boolean | null>(null);
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  console.log("🔑 useAuth render:", {
    isAuthenticated,
    isLoading,
    hasCredentials,
    isFirstTime,
  });

  useEffect(() => {
    // Verificar se o usuário já está autenticado e se tem credenciais
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Verificar se é a primeira vez do usuário
      const firstTimeValue = await AsyncStorage.getItem(IS_FIRST_TIME_KEY);
      const isFirstTimeUser = firstTimeValue === null;
      setIsFirstTime(isFirstTimeUser);

      // Verificar se já tem credenciais configuradas
      const email = await AsyncStorage.getItem(EMAIL_KEY);
      const password = await AsyncStorage.getItem(PASSWORD_KEY);
      const hasCreds = email !== null && password !== null;
      setHasCredentials(hasCreds);

      console.log("🔑 checkAuthStatus executado:", {
        isFirstTimeUser,
        hasCreds,
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

  const setCredentials = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await AsyncStorage.setItem(USERNAME_KEY, username);
      await AsyncStorage.setItem(EMAIL_KEY, email);
      await AsyncStorage.setItem(PASSWORD_KEY, password);
      await AsyncStorage.setItem(IS_FIRST_TIME_KEY, "false");
      setHasCredentials(true);
      setIsFirstTime(false);
      console.log("🔑 Credenciais configuradas com sucesso");
      return true;
    } catch (error) {
      console.error("Erro ao configurar credenciais:", error);
      return false;
    }
  };

  const verifyCredentials = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const storedEmail = await AsyncStorage.getItem(EMAIL_KEY);
      const storedPassword = await AsyncStorage.getItem(PASSWORD_KEY);
      return storedEmail === email && storedPassword === password;
    } catch (error) {
      console.error("Erro ao verificar credenciais:", error);
      return false;
    }
  };

  const clearCredentials = async () => {
    try {
      await AsyncStorage.removeItem(USERNAME_KEY);
      await AsyncStorage.removeItem(EMAIL_KEY);
      await AsyncStorage.removeItem(PASSWORD_KEY);
      await AsyncStorage.removeItem(IS_FIRST_TIME_KEY);
      setHasCredentials(false);
      setIsFirstTime(true);
      console.log("🔑 Credenciais removidas");
    } catch (error) {
      console.error("Erro ao remover credenciais:", error);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    hasCredentials,
    isFirstTime,
    signIn,
    signOut,
    setCredentials,
    verifyCredentials,
    clearCredentials,
  };
}
