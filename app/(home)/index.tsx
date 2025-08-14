import { MilleBitLogo } from "@/components/MilleBitLogo";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { signOut } = useAuth();

  return (
    <LinearGradient
      colors={[Colors.light.tint, Colors.light.background]}
      locations={[0, 0.5]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <ThemedText style={styles.logoText}>BitPay</ThemedText>
          <MilleBitLogo width={40} color="white" />
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={signOut}>
          <View style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Card Placeholder */}
        <View style={styles.cardPlaceholder}>
          <View style={styles.cardHeader}>
            <View style={styles.cardLogo}>
              <ThemedText style={styles.cardLogoText}>MB</ThemedText>
            </View>
            <View style={styles.cardChip} />
          </View>

          <View style={styles.cardNumberContainer}>
            <View style={styles.cardNumberGroup}>
              <View style={styles.cardNumberDot} />
              <View style={styles.cardNumberDot} />
              <View style={styles.cardNumberDot} />
              <View style={styles.cardNumberDot} />
            </View>
            <View style={styles.cardNumberGroup}>
              <View style={styles.cardNumberDot} />
              <View style={styles.cardNumberDot} />
              <View style={styles.cardNumberDot} />
              <View style={styles.cardNumberDot} />
            </View>
            <View style={styles.cardNumberGroup}>
              <View style={styles.cardNumberDot} />
              <View style={styles.cardNumberDot} />
              <View style={styles.cardNumberDot} />
              <View style={styles.cardNumberDot} />
            </View>
            <View style={styles.cardNumberGroup}>
              <View style={styles.cardNumberDot} />
              <View style={styles.cardNumberDot} />
              <View style={styles.cardNumberDot} />
              <View style={styles.cardNumberDot} />
            </View>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.cardHolderInfo}>
              <ThemedText style={styles.cardHolderLabel}>
                CARD HOLDER
              </ThemedText>
              <View style={styles.cardHolderName}>
                <View style={styles.cardHolderDot} />
                <View style={styles.cardHolderDot} />
                <View style={styles.cardHolderDot} />
                <View style={styles.cardHolderDot} />
                <View style={styles.cardHolderDot} />
                <View style={styles.cardHolderDot} />
                <View style={styles.cardHolderDot} />
                <View style={styles.cardHolderDot} />
              </View>
            </View>
            <View style={styles.cardExpiryInfo}>
              <ThemedText style={styles.cardExpiryLabel}>EXPIRES</ThemedText>
              <View style={styles.cardExpiryDate}>
                <View style={styles.cardExpiryDot} />
                <View style={styles.cardExpiryDot} />
                <View style={styles.cardExpiryDot} />
                <View style={styles.cardExpiryDot} />
                <View style={styles.cardExpiryDot} />
              </View>
            </View>
          </View>
        </View>

        {/* Add Card Hint */}
        <View style={styles.addCardHint}>
          <ThemedText style={styles.hintText}>
            Toque no botão flutuante para adicionar seu primeiro cartão
          </ThemedText>
        </View>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <View style={styles.floatingButtonContent}>
          <ThemedText style={styles.floatingButtonLabel}>
            Associar cartão à carteira
          </ThemedText>
          <View style={styles.floatingButtonIcon}>
            <ThemedText style={styles.floatingButtonArrow}>↑</ThemedText>
          </View>
        </View>
      </TouchableOpacity>
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
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
  },
  profileIcon: {
    width: 20,
    height: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 20,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "relative",
  },
  cardPlaceholder: {
    width: 320,
    height: 200,
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLogo: {
    width: 40,
    height: 24,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  cardLogoText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666666",
  },
  cardChip: {
    width: 32,
    height: 24,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  cardNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  cardNumberGroup: {
    flexDirection: "row",
    gap: 8,
  },
  cardNumberDot: {
    width: 8,
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
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
    color: "#666666",
    fontWeight: "600",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  cardHolderName: {
    flexDirection: "row",
    gap: 4,
  },
  cardHolderDot: {
    width: 6,
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
  },
  cardExpiryInfo: {
    alignItems: "flex-end",
  },
  cardExpiryLabel: {
    fontSize: 10,
    color: "#6c757d",
    fontWeight: "600",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  cardExpiryDate: {
    flexDirection: "row",
    gap: 4,
  },
  cardExpiryDot: {
    width: 6,
    height: 6,
    backgroundColor: "#dee2e6",
    borderRadius: 3,
  },
  addCardHint: {
    marginTop: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  hintText: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 20,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    zIndex: 10,
  },
  floatingButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.tint,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  floatingButtonLabel: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
    marginRight: 12,
  },
  floatingButtonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonArrow: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
