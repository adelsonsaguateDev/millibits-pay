import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function PaymentMethodScreen() {
  const router = useRouter();
  const { cardId } = useLocalSearchParams();

  const handleContactlessPayment = () => {
    // Navigate to contactless payment screen
    router.push({
      pathname: "/(home)/contactless-payment",
      params: { cardId },
    });
  };

  const handleQRPayment = () => {
    // Navigate to QR scanner screen
    router.push({
      pathname: "/(home)/qr-scanner",
      params: { cardId },
    });
  };

  const goBack = () => {
    router.back();
  };

  return (
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
        <ThemedText style={styles.headerTitle}>Método de Pagamento</ThemedText>
        <View style={styles.placeholder} />
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.mainContent}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Enhanced Card Preview */}
        <View style={styles.cardPreviewContainer}>
          <View style={styles.cardPreview}>
            <LinearGradient
              colors={[Colors.light.tint, "#C41E6B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardLogo}>
                  <ThemedText style={styles.cardLogoText}>MB</ThemedText>
                </View>
                <View style={styles.cardChip} />
              </View>

              <View style={styles.cardNumberContainer}>
                <ThemedText style={styles.cardNumberText}>
                  •••• •••• •••• {cardId?.slice(-4) || "1234"}
                </ThemedText>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.cardHolderInfo}>
                  <ThemedText style={styles.cardHolderLabel}>
                    TITULAR
                  </ThemedText>
                  <ThemedText style={styles.cardHolderName}>CARTÃO</ThemedText>
                </View>
                <View style={styles.cardExpiryInfo}>
                  <ThemedText style={styles.cardExpiryLabel}>
                    VÁLIDO ATÉ
                  </ThemedText>
                  <ThemedText style={styles.cardExpiryDate}>12/25</ThemedText>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Payment Methods Section */}
        <View style={styles.methodsContainer}>
          <ThemedText style={styles.methodsTitle}>
            Selecione o método de pagamento
          </ThemedText>

          {/* Contactless Payment Option - Enhanced Card */}
          <TouchableOpacity
            style={styles.methodCard}
            onPress={handleContactlessPayment}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.9)"]}
              style={styles.methodCardGradient}
            >
              <View style={styles.methodCardHeader}>
                <View style={styles.methodIconContainer}>
                  <MaterialIcons
                    name="contactless"
                    size={28}
                    color={Colors.light.tint}
                  />
                </View>
                <View style={styles.methodCardContent}>
                  <ThemedText style={styles.methodCardTitle}>
                    Pagamento Contactless
                  </ThemedText>
                  <ThemedText style={styles.methodCardDescription}>
                    Aproxime o seu cartão do dispositivo para pagar de forma
                    rápida e segura
                  </ThemedText>
                </View>
                <View style={styles.methodCardArrow}>
                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color={Colors.light.tint}
                  />
                </View>
              </View>

              <View style={styles.methodCardFooter}>
                <View style={styles.methodCardBadge}>
                  <ThemedText style={styles.methodCardBadgeText}>
                    RÁPIDO
                  </ThemedText>
                </View>
                <View style={styles.methodCardStatus}>
                  <View style={styles.statusIndicator} />
                  <ThemedText style={styles.statusText}>Disponível</ThemedText>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* QR Code Payment Option - Enhanced Card */}
          <TouchableOpacity
            style={styles.methodCard}
            onPress={handleQRPayment}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.9)"]}
              style={styles.methodCardGradient}
            >
              <View style={styles.methodCardHeader}>
                <View style={styles.methodIconContainer}>
                  <MaterialIcons
                    name="qr-code"
                    size={28}
                    color={Colors.light.tint}
                  />
                </View>
                <View style={styles.methodCardContent}>
                  <ThemedText style={styles.methodCardTitle}>
                    Código QR
                  </ThemedText>
                  <ThemedText style={styles.methodCardDescription}>
                    Digitalize o código QR para pagar em qualquer lugar
                  </ThemedText>
                </View>
                <View style={styles.methodCardArrow}>
                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color={Colors.light.tint}
                  />
                </View>
              </View>

              <View style={styles.methodCardFooter}>
                <View style={styles.methodCardBadge}>
                  <ThemedText style={styles.methodCardBadgeText}>
                    UNIVERSAL
                  </ThemedText>
                </View>
                <View style={styles.methodCardStatus}>
                  <View style={styles.statusIndicator} />
                  <ThemedText style={styles.statusText}>Disponível</ThemedText>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Additional Payment Method Placeholder */}
          <View style={styles.methodCardPlaceholder}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.2)"]}
              style={styles.methodCardGradient}
            >
              <View style={styles.methodCardHeader}>
                <View style={styles.methodIconContainerPlaceholder}>
                  <MaterialIcons
                    name="add"
                    size={28}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                </View>
                <View style={styles.methodCardContent}>
                  <ThemedText style={styles.methodCardTitlePlaceholder}>
                    Mais métodos em breve
                  </ThemedText>
                  <ThemedText style={styles.methodCardDescriptionPlaceholder}>
                    Novas formas de pagamento serão adicionadas
                  </ThemedText>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
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
  },

  // Enhanced Card Preview Styles
  cardPreviewContainer: {
    marginBottom: 30,
  },
  cardPreviewTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 15,
    textAlign: "center",
  },
  cardPreview: {
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  cardGradient: {
    borderRadius: 20,
    padding: 24,
    minHeight: 180,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLogo: {
    width: 48,
    height: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cardLogoText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  cardChip: {
    width: 40,
    height: 32,
    backgroundColor: "#ffd700",
    borderRadius: 6,
  },
  cardNumberContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  cardNumberText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 3,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardHolderInfo: {
    alignItems: "flex-start",
  },
  cardHolderLabel: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "600",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  cardHolderName: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  cardExpiryInfo: {
    alignItems: "flex-end",
  },
  cardExpiryLabel: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "600",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  cardExpiryDate: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  // Enhanced Payment Methods Styles
  methodsContainer: {
    flex: 1,
  },
  methodsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    marginBottom: 24,
    textAlign: "center",
  },

  // Enhanced Method Cards
  methodCard: {
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  methodCardGradient: {
    borderRadius: 20,
    padding: 24,
    minHeight: 120,
    justifyContent: "space-between",
  },
  methodCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  methodIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(227, 28, 121, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  methodCardContent: {
    flex: 1,
  },
  methodCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  methodCardDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  methodCardArrow: {
    marginLeft: 8,
  },
  methodCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  methodCardBadge: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  methodCardBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "white",
    letterSpacing: 0.5,
  },
  methodCardStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
  },

  // Placeholder Method Card
  methodCardPlaceholder: {
    marginBottom: 20,
    borderRadius: 20,
    opacity: 0.7,
  },
  methodIconContainerPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  methodCardTitlePlaceholder: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 6,
  },
  methodCardDescriptionPlaceholder: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.6)",
    lineHeight: 18,
  },
});
