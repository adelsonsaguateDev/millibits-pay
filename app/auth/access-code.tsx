import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
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
import { router } from "expo-router";

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

  const canSubmit = email.trim() && password.trim();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        {/* Banner rosa no topo com logo Mille-bit */}
        <View style={styles.topBanner}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <ThemedText style={styles.logoText}>BitPay</ThemedText>
          <MilleBitLogo width={40} color="white" />
        </View>

        {/* Conteúdo principal */}
        <View style={styles.mainContent}>
          {/* Título e descrição */}
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

          {/* Botão de envio */}
          <TouchableOpacity
            style={[styles.submitButton, !canSubmit && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!canSubmit || isLoading}
          >
            <ThemedText style={styles.submitButtonText}>
              {isLoading ? "Entrando..." : "Entrar"}
            </ThemedText>
          </TouchableOpacity>

          {/* Informações adicionais */}
          <View style={styles.infoContainer}>
            <ThemedText style={styles.infoText}>
              Esqueceu sua senha? Entre em contato com o suporte.
            </ThemedText>
          </View>
        </View>
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
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  backButton: {
    position: "absolute",
    left: 24,
    top: 64,
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
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
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  textInput: {
    width: "100%",
    height: 56,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 16,
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
    height: 56,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingRight: 56,
    fontSize: 16,
    color: "#1a1a1a",
    backgroundColor: "#f9fafb",
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    top: 12,
    padding: 4,
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
});
