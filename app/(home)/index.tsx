import { MilleBitLogo } from "@/components/MilleBitLogo";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useCards } from "@/hooks/useCards";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const { cards, loading } = useCards();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const renderCard = (card: any) => (
    <TouchableOpacity
      key={card.id}
      style={styles.card}
      onPress={() =>
        router.push(`/(home)/payment-method?cardId=${card.id}` as any)
      }
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardLogo}>
          <ThemedText style={styles.cardLogoText}>MB</ThemedText>
        </View>
        <View style={styles.cardChip} />
      </View>

      <View style={styles.cardNumberContainer}>
        <ThemedText style={styles.cardNumberText}>
          {card.maskedNumber}
        </ThemedText>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.cardHolderInfo}>
          <ThemedText style={styles.cardHolderLabel}>TITULAR</ThemedText>
          <ThemedText style={styles.cardHolderNameText}>
            {card.cardholderName}
          </ThemedText>
        </View>
        <View style={styles.cardExpiryInfo}>
          <ThemedText style={styles.cardExpiryLabel}>EXPIRA EM</ThemedText>
          <ThemedText style={styles.cardExpiryDateText}>
            {card.expiryMonth}/{card.expiryYear}
          </ThemedText>
        </View>
        <View style={styles.tapIndicator}>
          <MaterialIcons
            name="touch-app"
            size={16}
            color="rgba(255, 255, 255, 0.6)"
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCardPlaceholder = () => (
    <View style={styles.cardPlaceholder}>
      <View style={styles.cardHeader}>
        <View style={styles.cardLogoPlaceholder}>
          <ThemedText style={styles.cardLogoTextPlaceholder}>MB</ThemedText>
        </View>
        <View style={styles.cardChipPlaceholder} />
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
          <ThemedText style={styles.cardHolderLabelPlaceholder}>
            TITULAR
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
          <ThemedText style={styles.cardExpiryLabelPlaceholder}>
            EXPIRA EM
          </ThemedText>
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
  );

  return (
    <LinearGradient
      colors={[Colors.light.tint, Colors.light.background]}
      locations={[0, 0.5]}
      style={styles.container}
    >
      {Platform.OS === "android" ? (
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <MilleBitLogo width={40} color="white" />
              <ThemedText style={styles.logoText}>BitPay</ThemedText>
            </View>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => router.push("/(home)/history" as any)}
                accessibilityLabel="Open transaction history"
              >
                <MaterialIcons name="history" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => router.push("/(home)/settings" as any)}
                accessibilityLabel="Open settings"
              >
                <MaterialIcons name="settings" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Content Area */}
          <View style={styles.mainContent}>
            {!loading && cards.length > 0 ? (
              <ScrollView
                style={styles.cardsContainer}
                contentContainerStyle={styles.cardsContent}
                showsVerticalScrollIndicator={false}
              >
                {cards.map(renderCard)}
              </ScrollView>
            ) : (
              <>
                {renderCardPlaceholder()}
                {/* Add Card Hint */}
                <View style={styles.addCardHint}>
                  <ThemedText style={styles.hintText}>
                    Toque no botão flutuante para adicionar o seu primeiro
                    cartão
                  </ThemedText>
                </View>
              </>
            )}
          </View>

          {/* Floating Action Button */}
          <TouchableOpacity
            style={[styles.floatingButton, { bottom: insets.bottom }]}
            onPress={() => router.push("/(home)/add-card" as any)}
          >
            <View style={styles.floatingButtonContent}>
              <ThemedText style={styles.floatingButtonLabel}>
                {cards.length > 0
                  ? "Adicionar outro cartão"
                  : "Associar cartão à carteira"}
              </ThemedText>
              <View style={styles.floatingButtonIcon}>
                <ThemedText style={styles.floatingButtonArrow}>+</ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
        <>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <MilleBitLogo width={40} color="white" />
              <ThemedText style={styles.logoText}>BitPay</ThemedText>
            </View>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => router.push("/(home)/history" as any)}
                accessibilityLabel="Open transaction history"
              >
                <MaterialIcons name="history" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => router.push("/(home)/settings" as any)}
                accessibilityLabel="Open settings"
              >
                <MaterialIcons name="settings" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Content Area */}
          <View style={styles.mainContent}>
            {!loading && cards.length > 0 ? (
              <ScrollView
                style={styles.cardsContainer}
                contentContainerStyle={styles.cardsContent}
                showsVerticalScrollIndicator={false}
              >
                {cards.map(renderCard)}
              </ScrollView>
            ) : (
              <>
                {renderCardPlaceholder()}
                {/* Add Card Hint */}
                <View style={styles.addCardHint}>
                  <ThemedText style={styles.hintText}>
                    Toque no botão flutuante para adicionar o seu primeiro
                    cartão
                  </ThemedText>
                </View>
              </>
            )}
          </View>

          {/* Floating Action Button */}
          <TouchableOpacity
            style={[styles.floatingButton, { bottom: insets.bottom }]}
            onPress={() => router.push("/(home)/add-card" as any)}
          >
            <View style={styles.floatingButtonContent}>
              <ThemedText style={styles.floatingButtonLabel}>
                {cards.length > 0
                  ? "Adicionar outro cartão"
                  : "Associar cartão à carteira"}
              </ThemedText>
              <View style={styles.floatingButtonIcon}>
                <ThemedText style={styles.floatingButtonArrow}>+</ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        </>
      )}
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
    gap: 8,
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
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
    position: "relative",
  },
  cardsContainer: {
    width: "100%",
  },
  cardsContent: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.light.tint,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    // Add subtle border to indicate interactivity
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
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
  cardLogoPlaceholder: {
    width: 40,
    height: 24,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  cardLogoTextPlaceholder: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#6c757d",
  },
  cardChipPlaceholder: {
    width: 32,
    height: 24,
    backgroundColor: "#dee2e6",
    borderRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLogo: {
    width: 40,
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  cardLogoText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  cardChip: {
    width: 32,
    height: 24,
    backgroundColor: "#ffd700",
    borderRadius: 4,
  },
  cardNumberContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  cardNumberText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  cardNumberGroup: {
    flexDirection: "row",
    gap: 8,
  },
  cardNumberDot: {
    width: 8,
    height: 8,
    backgroundColor: "#adb5bd",
    borderRadius: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    position: "relative",
  },
  cardHolderInfo: {
    alignItems: "flex-start",
  },
  cardHolderLabel: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "600",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  cardHolderName: {
    flexDirection: "row",
    gap: 4,
  },
  cardHolderNameText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  cardHolderDot: {
    width: 6,
    height: 6,
    backgroundColor: "#adb5bd",
    borderRadius: 3,
  },
  cardExpiryInfo: {
    alignItems: "flex-end",
  },
  cardExpiryLabel: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "600",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  cardExpiryDate: {
    flexDirection: "row",
    gap: 4,
  },
  cardExpiryDateText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  cardExpiryDot: {
    width: 6,
    height: 6,
    backgroundColor: "#adb5bd",
    borderRadius: 3,
  },
  tapIndicator: {
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: 8,
  },
  cardHolderLabelPlaceholder: {
    fontSize: 10,
    color: "#6c757d",
    fontWeight: "600",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  cardExpiryLabelPlaceholder: {
    fontSize: 10,
    color: "#6c757d",
    fontWeight: "600",
    marginBottom: 6,
    letterSpacing: 0.5,
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
  testLabel: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
});
