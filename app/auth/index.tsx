import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { MilleBitLogo } from "@/components/MilleBitLogo";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AuthColors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";

export default function AuthScreen() {
  const { signIn, hasCredentials, isFirstTime, verifyCredentials } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    setIsLoading(true);

    try {
      // Validar as credenciais usando a função do hook
      const isValid = await verifyCredentials(email.trim(), password);

      if (isValid) {
        await signIn();
        console.log("🔑 Login realizado com sucesso!");
      } else {
        Alert.alert("Erro", "Email ou senha incorretos. Tente novamente.");
        setPassword("");
      }
    } catch (error) {
      console.error("❌ Erro no login:", error);
      Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentials = () => {
    // Se é a primeira vez ou não tem credenciais configuradas, vai para registro
    if (isFirstTime || !hasCredentials) {
      router.push("/auth/register" as any);
    } else {
      // Se já tem credenciais, vai para login
      router.push("/auth/login");
    }
  };

  // Se é a primeira vez, mostrar apenas o botão de credenciais
  if (isFirstTime) {
    return (
      <ThemedView style={styles.container}>
        {/* Banner rosa no topo com logo Mille-bit */}
        <View style={styles.topBanner}>
          <ThemedText style={styles.logoText}>BitPay</ThemedText>
          <MilleBitLogo width={60} height={55} color="white" variant="text" />
        </View>

        {/* Conteúdo principal */}
        <View style={styles.mainContent}>
          {/* Ícone de usuário circular */}
          <View style={styles.userIconContainer}>
            <View style={styles.userIcon}>
              <Ionicons name="person" size={60} color="white" />
            </View>
          </View>

          {/* Título de boas-vindas */}
          <View style={styles.welcomeContainer}>
            <ThemedText style={styles.welcomeTitle}>
              Bem-vindo ao MilleBits Pay!
            </ThemedText>
            <ThemedText style={styles.welcomeDescription}>
              Configure seu email e senha para começar a usar o app
            </ThemedText>
          </View>

          {/* Botão de credenciais */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.accessCodeButton}
              onPress={handleCredentials}
            >
              <ThemedText style={styles.accessCodeButtonText}>
                Configurar email e senha
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    );
  }

  // Tela normal com campos de login
  return (
    <ThemedView style={styles.container}>
      {/* Banner rosa no topo com logo Mille-bit */}
      <View style={styles.topBanner}>
        <ThemedText style={styles.logoText}>BitPay</ThemedText>
        <MilleBitLogo width={40} color="white" />
      </View>

      {/* Conteúdo principal */}
      <View style={styles.mainContent}>
        {/* Ícone de usuário circular */}
        <View style={styles.userIconContainer}>
          <View style={styles.userIcon}>
            <Ionicons name="person" size={60} color="white" />
          </View>
        </View>

        {/* Título */}
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>Entrar</ThemedText>
          <ThemedText style={styles.description}>
            Digite seu email e senha para acessar sua conta
          </ThemedText>
        </View>

        {/* Campo de email */}
        <View style={styles.inputContainer}>
          <ThemedText style={styles.inputLabel}>Email</ThemedText>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            placeholderTextColor="#D1D5DB"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            selectionColor={AuthColors.primary}
          />
        </View>

        {/* Campo de senha */}
        <View style={styles.inputContainer}>
          <ThemedText style={styles.inputLabel}>Senha</ThemedText>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Sua senha"
              placeholderTextColor="#D1D5DB"
              secureTextEntry={!showPassword}
              selectionColor={AuthColors.primary}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#666666"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão de login */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!email.trim() || !password.trim()) && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!email.trim() || !password.trim() || isLoading}
        >
          <ThemedText style={styles.submitButtonText}>
            {isLoading ? "Entrando..." : "Entrar"}
          </ThemedText>
        </TouchableOpacity>

        {/* Texto para usuários sem conta */}
        <View style={styles.noAccountContainer}>
          <ThemedText style={styles.noAccountText}>
            Não tem uma conta?{" "}
            <ThemedText
              style={styles.linkText}
              onPress={() => router.push("/auth/register" as any)}
            >
              Criar conta
            </ThemedText>
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topBanner: {
    flexDirection: "row",
    backgroundColor: AuthColors.primary,
    height: 120,
    paddingLeft: 30,
    paddingTop: 40,
    alignItems: "center",
    gap: 4,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  mainContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  userIconContainer: {
    marginBottom: 40,
  },
  userIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: AuthColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 20,
  },
  accessCodeButton: {
    backgroundColor: AuthColors.white,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: "center",
    borderWidth: 2,
    borderColor: AuthColors.primary,
    shadowColor: AuthColors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  accessCodeButtonText: {
    color: AuthColors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  welcomeContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 28,
    lineHeight: 32,
    textAlign: "center",
    fontWeight: "bold",
    color: AuthColors.primary,
    marginBottom: 10,
  },
  welcomeDescription: {
    fontSize: 16,
    color: "#6C757D",
    textAlign: "center",
    lineHeight: 22,
  },
  textContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    lineHeight: 28,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#6C757D",
    textAlign: "center",
    lineHeight: 22,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  textInput: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#1a1a1a",
    backgroundColor: "#f9fafb",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingRight: 48,
    fontSize: 16,
    color: "#1a1a1a",
    backgroundColor: "#f9fafb",
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    top: 14,
    padding: 4,
  },
  submitButton: {
    backgroundColor: AuthColors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: "center",
    shadowColor: AuthColors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 200,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#e0e0e0",
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  noAccountContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  noAccountText: {
    fontSize: 14,
    color: "#666666",
  },
  linkText: {
    color: AuthColors.primary,
    fontWeight: "bold",
  },
});
