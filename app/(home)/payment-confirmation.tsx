import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function PaymentConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const cardId = Array.isArray(params.cardId)
    ? params.cardId[0]
    : params.cardId;
  const amount = Array.isArray(params.amount)
    ? params.amount[0]
    : params.amount;
  const merchant = Array.isArray(params.merchant)
    ? params.merchant[0]
    : params.merchant;
  const description = Array.isArray(params.description)
    ? params.description[0]
    : params.description;

  const [isProcessing, setIsProcessing] = useState(false);

  // Mock transaction details
  const transactionDate = new Date().toLocaleDateString("pt-BR");
  const transactionTime = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const transactionRef = `TXN${Date.now().toString().slice(-8)}`;
  const paymentMethod = "Cartão de Crédito";
  const cardType = "Visa";
  const cardLast4 = cardId?.slice(-4) || "1234";
  const cardHolder = "João Silva";
  const cardExpiry = "12/25";

  const handleConfirmPayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message
      Alert.alert(
        "Pagamento Confirmado!",
        `Pagamento de €${parseFloat(amount || "0").toFixed(
          2
        )} realizado com sucesso para ${merchant || "Comerciante"}.`,
        [
          {
            text: "OK",
            onPress: () => {
              // Navigate back to payment method screen
              router.push("/(home)/payment-method");
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
            onPress: () => setIsProcessing(false),
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
          onPress: () => router.back(),
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
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>
            Confirmar Pagamento
          </ThemedText>
          <View style={styles.placeholder} />
        </View>

        {/* Main Content */}
        <ScrollView
          style={styles.mainContent}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Payment Summary Card */}
          <View style={styles.summaryCard}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.9)"]}
              style={styles.summaryCardGradient}
            >
              <View style={styles.summaryHeader}>
                <MaterialIcons
                  name="receipt"
                  size={32}
                  color={Colors.light.tint}
                />
                <ThemedText style={styles.summaryTitle}>
                  Resumo do Pagamento
                </ThemedText>
              </View>

              <View style={styles.summaryContent}>
                <View style={styles.summaryRow}>
                  <ThemedText style={styles.summaryLabel}>
                    Comerciante:
                  </ThemedText>
                  <ThemedText style={styles.summaryValue}>
                    {merchant || "Comerciante"}
                  </ThemedText>
                </View>

                <View style={styles.summaryRow}>
                  <ThemedText style={styles.summaryLabel}>Valor:</ThemedText>
                  <View style={styles.amountContainer}>
                    <ThemedText style={styles.currencySymbol}>€</ThemedText>
                    <ThemedText style={styles.amountValue}>
                      {parseFloat(amount || "0").toFixed(2)}
                    </ThemedText>
                  </View>
                </View>

                {description && (
                  <View style={styles.summaryRow}>
                    <ThemedText style={styles.summaryLabel}>
                      Descrição:
                    </ThemedText>
                    <ThemedText style={styles.summaryValue}>
                      {description}
                    </ThemedText>
                  </View>
                )}

                <View style={styles.summaryRow}>
                  <ThemedText style={styles.summaryLabel}>Data:</ThemedText>
                  <ThemedText style={styles.summaryValue}>
                    {transactionDate}
                  </ThemedText>
                </View>

                <View style={styles.summaryRow}>
                  <ThemedText style={styles.summaryLabel}>Hora:</ThemedText>
                  <ThemedText style={styles.summaryValue}>
                    {transactionTime}
                  </ThemedText>
                </View>

                <View style={styles.summaryRow}>
                  <ThemedText style={styles.summaryLabel}>
                    Referência:
                  </ThemedText>
                  <ThemedText style={styles.summaryValue}>
                    {transactionRef}
                  </ThemedText>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Card Information */}
          <View style={styles.cardInfoCard}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.9)"]}
              style={styles.cardInfoGradient}
            >
              <View style={styles.cardInfoHeader}>
                <MaterialIcons
                  name="credit-card"
                  size={24}
                  color={Colors.light.tint}
                />
                <ThemedText style={styles.cardInfoTitle}>
                  Informações do Cartão
                </ThemedText>
              </View>

              <View style={styles.cardInfoContent}>
                <View style={styles.cardInfoRow}>
                  <ThemedText style={styles.cardInfoLabel}>Tipo:</ThemedText>
                  <ThemedText style={styles.cardInfoValue}>
                    {cardType}
                  </ThemedText>
                </View>

                <View style={styles.cardInfoRow}>
                  <ThemedText style={styles.cardInfoLabel}>Número:</ThemedText>
                  <ThemedText style={styles.cardInfoValue}>
                    •••• •••• •••• {cardLast4}
                  </ThemedText>
                </View>

                <View style={styles.cardInfoRow}>
                  <ThemedText style={styles.cardInfoLabel}>Titular:</ThemedText>
                  <ThemedText style={styles.cardInfoValue}>
                    {cardHolder}
                  </ThemedText>
                </View>

                <View style={styles.cardInfoRow}>
                  <ThemedText style={styles.cardInfoLabel}>
                    Validade:
                  </ThemedText>
                  <ThemedText style={styles.cardInfoValue}>
                    {cardExpiry}
                  </ThemedText>
                </View>

                <View style={styles.cardInfoRow}>
                  <ThemedText style={styles.cardInfoLabel}>Método:</ThemedText>
                  <ThemedText style={styles.cardInfoValue}>
                    {paymentMethod}
                  </ThemedText>
                </View>
              </View>
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
            {isProcessing ? (
              <View style={styles.processingContainer}>
                <MaterialIcons name="hourglass-empty" size={20} color="white" />
                <ThemedText style={styles.confirmButtonText}>
                  Processando...
                </ThemedText>
              </View>
            ) : (
              <View style={styles.confirmContainer}>
                <MaterialIcons name="check-circle" size={20} color="white" />
                <ThemedText style={styles.confirmButtonText}>
                  Confirmar Pagamento
                </ThemedText>
              </View>
            )}
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
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

  // Card Info Card Styles
  cardInfoCard: {
    marginBottom: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardInfoGradient: {
    borderRadius: 20,
    padding: 24,
  },
  cardInfoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  cardInfoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  cardInfoContent: {
    gap: 16,
  },
  cardInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardInfoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    minWidth: 100,
  },
  cardInfoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "right",
    flex: 1,
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
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButton: {
    flex: 2,
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
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
  processingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  confirmContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
