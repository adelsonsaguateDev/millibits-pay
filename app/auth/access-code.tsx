import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
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

const ACCESS_CODE_LENGTH = 6;

export default function AccessCodeScreen() {
  const { signIn, verifyAccessCode } = useAuth();
  const [accessCode, setAccessCode] = useState<string[]>(
    new Array(ACCESS_CODE_LENGTH).fill("")
  );
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...accessCode];
    newCode[index] = text;
    setAccessCode(newCode);

    // Mover para o próximo campo se houver texto
    if (text && index < ACCESS_CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Voltar para o campo anterior se pressionar backspace e o campo estiver vazio
    if (e.nativeEvent.key === "Backspace" && !accessCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = accessCode.join("");

    if (code.length !== ACCESS_CODE_LENGTH) {
      Alert.alert("Erro", "Por favor, insira o código completo de 6 dígitos.");
      return;
    }

    setIsLoading(true);

    try {
      // Validar o código usando a função do hook
      const isValid = await verifyAccessCode(code);

      if (isValid) {
        await signIn();
        console.log("🔑 Código de acesso válido!");
      } else {
        Alert.alert("Erro", "Código de acesso inválido. Tente novamente.");
        setAccessCode(new Array(ACCESS_CODE_LENGTH).fill(""));
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error("❌ Erro na validação do código:", error);
      Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const isCodeComplete = accessCode.every((digit) => digit !== "");

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
            <ThemedText style={styles.title}>Código de Acesso</ThemedText>
            <ThemedText style={styles.description}>
              Digite o código de 6 dígitos para acessar sua conta
            </ThemedText>
          </View>

          {/* Campos de entrada do código */}
          <View style={styles.codeContainer}>
            {accessCode.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                style={styles.codeInput}
                value={digit ? "•" : ""}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
                selectionColor={AuthColors.primary}
                placeholder="•"
                placeholderTextColor="#D1D5DB"
              />
            ))}
          </View>

          {/* Botão de envio */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              !isCodeComplete && styles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={!isCodeComplete || isLoading}
          >
            <ThemedText style={styles.submitButtonText}>
              {isLoading ? "Verificando..." : "Acessar"}
            </ThemedText>
          </TouchableOpacity>

          {/* Informações adicionais */}
          <View style={styles.infoContainer}>
            <ThemedText style={styles.infoText}>
              Esqueceu o código? Entre em contato com o suporte.
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
  lockIconContainer: {
    marginBottom: 40,
  },
  lockIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: AuthColors.primary,
    justifyContent: "center",
    alignItems: "center",
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
  codeContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 40,
  },
  codeInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    backgroundColor: "#f9fafb",
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
