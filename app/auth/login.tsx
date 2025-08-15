import { MilleBitLogo } from "@/components/MilleBitLogo";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AuthColors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const { signIn, verifyCredentials } = useAuth();
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

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header com botão voltar */}
      <View style={styles.topBanner}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <MilleBitLogo width={40} color="white" />
          <ThemedText style={styles.logoText}>BitPay</ThemedText>
        </View>
      </View>

      {/* Conteúdo principal com KeyboardAvoidingView */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
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
                placeholder="senha123"
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
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topBanner: {
    backgroundColor: AuthColors.primary,
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    position: "relative",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    position: "absolute",
    left: 24,
    top: 64,
    zIndex: 1,
  },
  headerTitle: {
    flex: 1,
    alignItems: "center",
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 40,
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
    alignSelf: "center",
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
