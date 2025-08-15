import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
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

export default function PaymentPasswordConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const cardId = Array.isArray(params.cardId)
    ? params.cardId[0]
    : params.cardId;
  const amount = Array.isArray(params.amount)
    ? params.amount[0]
    : params.amount;
  const description = Array.isArray(params.description)
    ? params.description[0]
    : params.description;

  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Ref for password input to enable auto-focus
  const passwordInputRef = useRef<TextInput>(null);

  // Auto-focus password input when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Mock transaction details
  const transactionDate = new Date().toLocaleDateString("pt-BR");
  const transactionTime = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const transactionRef = `TXN${Date.now().toString().slice(-8)}`;
  const cardType = "Visa";
  const cardLast4 = cardId?.slice(-4) || "1234";

  const handleConfirmPayment = async () => {
    if (!password.trim()) {
      Alert.alert("Erro", "Por favor, insira sua senha de aplicação.");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate password verification and payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message
      Alert.alert(
        "Pagamento Confirmado!",
        `Pagamento de 500 MZN realizado com sucesso.`,
        [
          {
            text: "OK",
            onPress: () => {
              router.push("/(home)");
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Erro no Pagamento",
        "Ocorreu um erro ao processar o pagamento. Tente novamente.",
        [
          {
            text: "Tentar Novamente",
            onPress: () => {
              router.push("/(home)");
            },
          },
        ]
      );
    }
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancelar Pagamento",
      "Tem certeza que deseja cancelar este pagamento?",
      [
        {
          text: "Continuar",
          style: "cancel",
        },
        {
          text: "Cancelar",
          style: "destructive",
          onPress: () => router.push("/(home)"),
        },
      ]
    );
  };

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.light.tint, Colors.light.background]}
        locations={[0, 0.5]}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Confirmar Senha</ThemedText>
        </View>

        {/* Main Content */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            style={styles.mainContent}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Password Input Card */}
            <View style={styles.passwordCard}>
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.95)",
                  "rgba(255, 255, 255, 0.9)",
                ]}
                style={styles.passwordCardGradient}
              >
                <View style={styles.passwordHeader}>
                  <MaterialIcons
                    name="lock"
                    size={24}
                    color={Colors.light.tint}
                  />
                  <ThemedText style={styles.passwordTitle}>
                    Senha de Aplicação
                  </ThemedText>
                </View>

                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Digite sua senha de aplicação"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    ref={passwordInputRef}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <MaterialIcons
                      name={showPassword ? "visibility" : "visibility-off"}
                      size={24}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>

                <ThemedText style={styles.passwordHint}>
                  Digite sua senha de aplicação para confirmar o pagamento
                </ThemedText>
              </LinearGradient>
            </View>

            {/* Security Notice */}
            <View style={styles.securityNotice}>
              <MaterialIcons
                name="security"
                size={20}
                color={Colors.light.tint}
              />
              <ThemedText style={styles.securityText}>
                Este pagamento é seguro e protegido pela nossa tecnologia de
                criptografia avançada.
              </ThemedText>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            disabled={isProcessing}
          >
            <ThemedText style={styles.cancelButtonText}>Cancelar</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.confirmButton,
              isProcessing && styles.confirmButtonDisabled,
            ]}
            onPress={handleConfirmPayment}
            disabled={isProcessing}
          >
            <ThemedText style={styles.confirmButtonText}>
              {isProcessing ? "Processando..." : "Confirmar Pagamento"}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    flex: 1,
  },
  placeholder: {
    width: 40,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },

  // Summary Card Styles
  summaryCard: {
    marginBottom: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  summaryCardGradient: {
    borderRadius: 20,
    padding: 24,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  summaryContent: {
    gap: 16,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    minWidth: 100,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "right",
    flex: 1,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  amountValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "right",
    minWidth: 80,
  },

  // Password Card Styles
  passwordCard: {
    marginBottom: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  passwordCardGradient: {
    borderRadius: 20,
    padding: 24,
  },
  passwordHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  passwordTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  passwordInputContainer: {
    position: "relative",
    marginBottom: 12,
  },
  passwordInput: {
    height: 56,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingRight: 60,
    fontSize: 16,
    color: "#1a1a1a",
    backgroundColor: "white",
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    top: 12,
    padding: 4,
  },
  passwordHint: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    textAlign: "center",
  },

  // Security Notice
  securityNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  securityText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },

  // Bottom Actions
  bottomActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
    justifyContent: "center",
  },
  cancelButton: {
    height: 50,
    paddingHorizontal: 24,
    borderRadius: 999,
    minWidth: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonDisabled: {
    backgroundColor: "rgba(227, 28, 121, 0.6)",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
