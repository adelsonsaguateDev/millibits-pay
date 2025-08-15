import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ContactlessPaymentScreen() {
  const router = useRouter();
  const { cardId } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for the phone
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    // Scanning animation for the circles
    const scanAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();
    scanAnimation.start();

    return () => {
      pulseAnimation.stop();
      scanAnimation.stop();
    };
  }, [pulseAnim, scanAnim]);

  const handlePaymentComplete = () => {
    // TODO: Implement payment completion logic
    console.log("Contactless payment completed for card:", cardId);
    // Navigate to payment confirmation or back to payment method
    router.push({
      pathname: "/(home)/payment-confirmation",
      params: { cardId, paymentMethod: "contactless" },
    });
  };

  return (
    <LinearGradient
      colors={[Colors.light.tint, Colors.light.background]}
      locations={[0, 0.3]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>
          Pagamento Contactless
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.mainContent}>
        {/* Card Scanner Illustration */}
        <View style={styles.cardScannerContainer}>
          {/* Scanning circles */}
          <Animated.View
            style={[
              styles.scanCircle1,
              {
                opacity: scanAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.8],
                }),
                transform: [
                  {
                    scale: scanAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1.2],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.scanCircle2,
              {
                opacity: scanAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.2, 0.6],
                }),
                transform: [
                  {
                    scale: scanAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1.4],
                    }),
                  },
                ],
              },
            ]}
          />

          {/* Phone outline */}
          <Animated.View
            style={[
              styles.phoneOutline,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <View style={styles.phoneCamera} />
          </Animated.View>

          {/* EMV Card */}
          <View style={styles.emvCard}>
            <View style={styles.cardChip} />
            <View style={styles.cardStrip} />
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <ThemedText style={styles.scanningText}>Processando...</ThemedText>
          <ThemedText style={styles.instructionText}>
            Coloque e mova lentamente o cartão de crédito ou débito na parte de
            trás do seu telemóvel para realizar o pagamento.
          </ThemedText>
        </View>

        {/* Status indicator */}
        <View style={styles.statusContainer}>
          <View style={styles.statusDot} />
          <ThemedText style={styles.statusText}>
            À espera do cartão...
          </ThemedText>
        </View>
      </View>
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
  backArrow: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  headerSpacer: {
    width: 40,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  cardScannerContainer: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  scanCircle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.light.tint,
    backgroundColor: "transparent",
  },
  scanCircle2: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: Colors.light.tint,
    backgroundColor: "transparent",
  },
  phoneOutline: {
    width: 110,
    height: 200,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.light.tint,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  phoneScreen: {
    width: 94,
    height: 180,
    borderRadius: 15,
  },
  phoneCamera: {
    position: "absolute",
    top: 6,
    width: 30,
    height: 8,
    borderRadius: 6,
    backgroundColor: Colors.light.tint,
  },
  emvCard: {
    position: "absolute",
    left: 20,
    width: 60,
    height: 40,
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardChip: {
    width: 16,
    height: 12,
    backgroundColor: "#ffd700",
    borderRadius: 2,
  },
  cardStrip: {
    position: "absolute",
    bottom: 8,
    width: 40,
    height: 3,
    backgroundColor: "#333",
    borderRadius: 1.5,
  },
  instructionsContainer: {
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  scanningText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  instructionText: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 20,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffc107",
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: "#666",
  },
  bottomActions: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  paymentButton: {
    width: 280,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
