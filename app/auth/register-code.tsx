import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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

const ACCESS_CODE_LENGTH = 6;

export default function RegisterCodeScreen() {
  const { setAccessCode } = useAuth();
  const [firstCode, setFirstCode] = useState<string[]>(
    new Array(ACCESS_CODE_LENGTH).fill("")
  );
  const [secondCode, setSecondCode] = useState<string[]>(
    new Array(ACCESS_CODE_LENGTH).fill("")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<"first" | "second">("first");
  const firstInputRefs = useRef<TextInput[]>([]);
  const secondInputRefs = useRef<TextInput[]>([]);

  const handleFirstCodeChange = (text: string, index: number) => {
    const newCode = [...firstCode];
    newCode[index] = text;
    setFirstCode(newCode);

    // Mover para o próximo campo se houver texto
    if (text && index < ACCESS_CODE_LENGTH - 1) {
      firstInputRefs.current[index + 1]?.focus();
    }
  };

  const handleSecondCodeChange = (text: string, index: number) => {
    const newCode = [...secondCode];
    newCode[index] = text;
    setSecondCode(newCode);

    // Mover para o próximo campo se houver texto
    if (text && index < ACCESS_CODE_LENGTH - 1) {
      secondInputRefs.current[index + 1]?.focus();
    }
  };

  const handleFirstKeyPress = (e: any, index: number) => {
    // Voltar para o campo anterior se pressionar backspace e o campo estiver vazio
    if (e.nativeEvent.key === "Backspace" && !firstCode[index] && index > 0) {
      firstInputRefs.current[index - 1]?.focus();
    }
  };

  const handleSecondKeyPress = (e: any, index: number) => {
    // Voltar para o campo anterior se pressionar backspace e o campo estiver vazio
    if (e.nativeEvent.key === "Backspace" && !secondCode[index] && index > 0) {
      secondInputRefs.current[index - 1]?.focus();
    }
  };

  const handleFirstCodeComplete = () => {
    const code = firstCode.join("");
    if (code.length === ACCESS_CODE_LENGTH) {
      setCurrentStep("second");
      // Focar no primeiro campo do segundo código
      setTimeout(() => {
        secondInputRefs.current[0]?.focus();
      }, 100);
    }
  };

  const handleSubmit = async () => {
    const firstCodeStr = firstCode.join("");
    const secondCodeStr = secondCode.join("");

    if (
      firstCodeStr.length !== ACCESS_CODE_LENGTH ||
      secondCodeStr.length !== ACCESS_CODE_LENGTH
    ) {
      Alert.alert(
        "Erro",
        "Por favor, preencha ambos os códigos completamente."
      );
      return;
    }

    if (firstCodeStr !== secondCodeStr) {
      Alert.alert("Erro", "Os códigos não coincidem. Tente novamente.");
      // Limpar o segundo código e focar nele
      setSecondCode(new Array(ACCESS_CODE_LENGTH).fill(""));
      setCurrentStep("second");
      secondInputRefs.current[0]?.focus();
      return;
    }

    setIsLoading(true);

    try {
      // Configurar o código de acesso
      const success = await setAccessCode(firstCodeStr);

      if (success) {
        Alert.alert("Sucesso!", "Código de acesso configurado com sucesso!", [
          {
            text: "OK",
            onPress: () => {
              // Redirecionar para a tela principal
              router.replace("/(tabs)");
            },
          },
        ]);
      } else {
        Alert.alert(
          "Erro",
          "Não foi possível configurar o código. Tente novamente."
        );
      }
    } catch (error) {
      console.error("❌ Erro ao configurar código:", error);
      Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep === "second") {
      setCurrentStep("first");
      setSecondCode(new Array(ACCESS_CODE_LENGTH).fill(""));
    } else {
      router.back();
    }
  };

  const isFirstCodeComplete = firstCode.every((digit) => digit !== "");
  const isSecondCodeComplete = secondCode.every((digit) => digit !== "");
  const canSubmit = isFirstCodeComplete && isSecondCodeComplete;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        {/* Banner rosa no topo com logo Mille-bit */}
        <View style={styles.topBanner}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <MilleBitLogo width={60} height={55} color="white" />
        </View>

        {/* Conteúdo principal */}
        <View style={styles.mainContent}>
          {/* Título e descrição */}
          <View style={styles.textContainer}>
            <ThemedText style={styles.title}>
              {currentStep === "first"
                ? "Configure seu código"
                : "Confirme o código"}
            </ThemedText>
            <ThemedText style={styles.description}>
              {currentStep === "first"
                ? "Digite um código de 6 dígitos para acessar sua conta"
                : "Digite novamente o mesmo código para confirmar"}
            </ThemedText>
          </View>

          {/* Primeiro código */}
          {currentStep === "first" && (
            <View style={styles.codeSection}>
              <ThemedText style={styles.codeLabel}>Digite o código:</ThemedText>
              <View style={styles.codeContainer}>
                {firstCode.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      if (ref) firstInputRefs.current[index] = ref;
                    }}
                    style={styles.codeInput}
                    value={digit}
                    onChangeText={(text) => handleFirstCodeChange(text, index)}
                    onKeyPress={(e) => handleFirstKeyPress(e, index)}
                    onEndEditing={handleFirstCodeComplete}
                    keyboardType="numeric"
                    maxLength={1}
                    selectTextOnFocus
                    selectionColor={AuthColors.primary}
                    placeholder="•"
                    placeholderTextColor="#D1D5DB"
                  />
                ))}
              </View>
            </View>
          )}

          {/* Segundo código */}
          {currentStep === "second" && (
            <View style={styles.codeSection}>
              <ThemedText style={styles.codeLabel}>
                Confirme o código:
              </ThemedText>
              <View style={styles.codeContainer}>
                {secondCode.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      if (ref) secondInputRefs.current[index] = ref;
                    }}
                    style={styles.codeInput}
                    value={digit}
                    onChangeText={(text) => handleSecondCodeChange(text, index)}
                    onKeyPress={(e) => handleSecondKeyPress(e, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    selectTextOnFocus
                    selectionColor={AuthColors.primary}
                    placeholder="•"
                    placeholderTextColor="#D1D5DB"
                  />
                ))}
              </View>
            </View>
          )}

          {/* Botão de envio */}
          {currentStep === "second" && (
            <TouchableOpacity
              style={[styles.submitButton, !canSubmit && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={!canSubmit || isLoading}
            >
              <ThemedText style={styles.submitButtonText}>
                {isLoading ? "Configurando..." : "Configurar código"}
              </ThemedText>
            </TouchableOpacity>
          )}

          {/* Informações adicionais */}
          <View style={styles.infoContainer}>
            <ThemedText style={styles.infoText}>
              {currentStep === "first"
                ? "Escolha um código que você possa lembrar facilmente"
                : "Certifique-se de que ambos os códigos são idênticos"}
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
    color: "#11181C",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#6C757D",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  codeSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  codeLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#11181C",
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  codeInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#11181C",
    backgroundColor: "#F9FAFB",
  },
  submitButton: {
    backgroundColor: AuthColors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
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
    backgroundColor: "#E9ECEF",
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
    color: "#6C757D",
    textAlign: "center",
    lineHeight: 20,
  },
});
