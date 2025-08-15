import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { MilleBitLogo } from "@/components/MilleBitLogo";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AuthColors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterScreen() {
  const { setCredentials } = useAuth();
  const [username, setUsername] = useState("millebit");
  const [email, setEmail] = useState("millebit@exemplo.com");
  const [password, setPassword] = useState("admin123");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim() || !email.trim() || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    // Validação de senha
    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      // Configurar as credenciais
      const success = await setCredentials(
        username.trim(),
        email.trim(),
        password
      );

      if (success) {
        Alert.alert("Sucesso!", "Conta criada com sucesso!", [
          {
            text: "OK",
            onPress: () => {
              // Redirecionar para a tela principal
              router.replace("/(home)");
            },
          },
        ]);
      } else {
        Alert.alert("Erro", "Não foi possível criar a conta. Tente novamente.");
      }
    } catch (error) {
      console.error("❌ Erro ao criar conta:", error);
      Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const canSubmit = username.trim() && email.trim() && password;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        {/* Banner rosa no topo com logo Mille-bit */}
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
            {/* Título e descrição */}
            <View style={styles.textContainer}>
              <ThemedText style={styles.title}>Criar conta</ThemedText>
              <ThemedText style={styles.description}>
                Configure seu email e senha para começar a usar o app
              </ThemedText>
            </View>

            {/* Campo de username */}
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Nome de usuário</ThemedText>
              <TextInput
                style={styles.textInput}
                value={username}
                onChangeText={setUsername}
                placeholder="Seu nome de usuário"
                placeholderTextColor="#D1D5DB"
                autoCapitalize="words"
                autoCorrect={false}
                selectionColor={AuthColors.primary}
              />
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
                  placeholder="Sua senha (mín. 6 caracteres)"
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

            {/* Botão de envio */}
            <TouchableOpacity
              style={[styles.submitButton, !canSubmit && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={!canSubmit || isLoading}
            >
              <ThemedText style={styles.submitButtonText}>
                {isLoading ? "Criando conta..." : "Criar conta"}
              </ThemedText>
            </TouchableOpacity>

            {/* Link para login */}
            <View style={styles.loginLinkContainer}>
              <ThemedText style={styles.loginLinkText}>
                Já tem conta?{" "}
              </ThemedText>
              <TouchableOpacity onPress={() => router.push("/auth/login")}>
                <ThemedText style={styles.loginLinkButton}>Entrar</ThemedText>
              </TouchableOpacity>
            </View>

            {/* Informações adicionais */}
            <View style={styles.infoContainer}>
              <ThemedText style={styles.infoText}>
                Suas informações estão seguras e não serão compartilhadas.
              </ThemedText>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    </TouchableWithoutFeedback>
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
  backButton: {
    position: "absolute",
    left: 24,
    top: 64,
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 40,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
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
    top: 11,
    padding: 4,
  },
  logoText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  submitButton: {
    backgroundColor: AuthColors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
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
  infoContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  loginLinkText: {
    fontSize: 14,
    color: "#666666",
  },
  loginLinkButton: {
    fontSize: 14,
    color: AuthColors.primary,
    fontWeight: "600",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
