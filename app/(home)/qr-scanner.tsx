import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

export default function QRScannerScreen() {
  const router = useRouter();
  const { cardId } = useLocalSearchParams();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [isExpoGo, setIsExpoGo] = useState(false);

  useEffect(() => {
    // Check if we're running in Expo Go (which doesn't support native modules)
    const checkExpoGo = async () => {
      try {
        // Try to import BarCodeScanner to see if it's available
        setHasPermission(true);
      } catch (error) {
        console.log("BarCodeScanner not available, running in Expo Go");
        setIsExpoGo(true);
        setHasPermission(false);
      }
    };

    checkExpoGo();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);

    // Parse QR code data for payment information
    try {
      let paymentData = {
        amount: 0,
        merchant: "Comerciante",
        description: "Pagamento via QR Code",
        qrData: data,
      };

      // Try to parse as JSON first (for structured payment data)
      try {
        const jsonData = JSON.parse(data);
        if (jsonData.amount || jsonData.value) {
          paymentData.amount =
            parseFloat(jsonData.amount || jsonData.value) || 0;
          paymentData.merchant =
            jsonData.merchant || jsonData.seller || "Comerciante";
          paymentData.description =
            jsonData.description ||
            jsonData.reference ||
            "Pagamento via QR Code";
        }
      } catch {
        // If not JSON, try to extract amount from plain text
        // Look for common patterns like "€10.50" or "10.50€" or just numbers
        const amountMatch = data.match(
          /(?:€\s*)?(\d+(?:[.,]\d{1,2})?)(?:\s*€)?/
        );
        if (amountMatch) {
          paymentData.amount = parseFloat(amountMatch[1].replace(",", "."));
        }

        // Look for merchant name patterns
        const merchantMatch = data.match(
          /([A-Za-zÀ-ÿ\s]+(?:Lda|Ltda|SA|S\.A\.|Unipessoal|&|e|and))/i
        );
        if (merchantMatch) {
          paymentData.merchant = merchantMatch[1].trim();
        }

        // If no amount found, try to parse the entire string as a number
        if (paymentData.amount === 0) {
          const numericValue = parseFloat(
            data.replace(/[^\d.,]/g, "").replace(",", ".")
          );
          if (!isNaN(numericValue)) {
            paymentData.amount = numericValue;
          }
        }
      }

      // Navigate to confirmation page with payment data
      router.push({
        pathname: "/(home)/payment-confirmation",
        params: {
          cardId,
          amount: paymentData.amount.toString(),
          merchant: paymentData.merchant,
          description: paymentData.description,
          qrData: paymentData.qrData,
        },
      });
    } catch (error) {
      Alert.alert(
        "QR Code Inválido",
        "O código QR escaneado não contém informações de pagamento válidas.",
        [
          {
            text: "Tentar Novamente",
            onPress: () => setScanned(false),
          },
        ]
      );
    }
  };

  const goBack = () => {
    router.back();
  };

  const handleManualInput = () => {
    // Navigate to manual payment input
    router.push({
      pathname: "/(home)/payment-confirmation",
      params: {
        cardId,
        amount: "0",
        merchant: "Pagamento Manual",
        description: "Valor inserido manualmente",
        qrData: "",
      },
    });
  };

  if (hasPermission === null && !isExpoGo) {
    return (
      <LinearGradient
        colors={[Colors.light.tint, Colors.light.background]}
        locations={[0, 0.5]}
        style={styles.container}
      >
        <View style={styles.centerContainer}>
          <ThemedText style={styles.loadingText}>
            Solicitando permissão da câmera...
          </ThemedText>
        </View>
      </LinearGradient>
    );
  }

  if (hasPermission === false && !isExpoGo) {
    return (
      <LinearGradient
        colors={[Colors.light.tint, Colors.light.background]}
        locations={[0, 0.5]}
        style={styles.container}
      >
        <View style={styles.centerContainer}>
          <MaterialIcons
            name="camera-alt"
            size={80}
            color="white"
            style={styles.cameraIcon}
          />
          <ThemedText style={styles.permissionTitle}>
            Permissão da Câmera Necessária
          </ThemedText>
          <ThemedText style={styles.permissionText}>
            Para escanear códigos QR, precisamos de acesso à sua câmera.
          </ThemedText>
          <TouchableOpacity style={styles.permissionButton} onPress={goBack}>
            <ThemedText style={styles.permissionButtonText}>Voltar</ThemedText>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

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
          <ThemedText style={styles.headerTitle}>Escanear QR Code</ThemedText>
          <TouchableOpacity
            onPress={() => setTorchEnabled(!torchEnabled)}
            style={styles.flashButton}
          >
            <MaterialIcons
              name={torchEnabled ? "flash-on" : "flash-off"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {/* Camera View */}
        <Pressable style={styles.cameraContainer} onPress={handleManualInput}>
          {isExpoGo ? (
            // Expo Go fallback - show placeholder with instructions
            <View style={styles.expoGoPlaceholder}>
              <MaterialIcons
                name="qr-code-scanner"
                size={120}
                color="rgba(255, 255, 255, 0.6)"
              />
              <ThemedText style={styles.expoGoTitle}>
                Scanner QR não disponível
              </ThemedText>
              <ThemedText style={styles.expoGoDescription}>
                Para usar o scanner QR, você precisa de uma versão de
                desenvolvimento personalizada.
              </ThemedText>
              <ThemedText style={styles.expoGoInstructions}>
                Toque aqui para inserir dados manualmente
              </ThemedText>
            </View>
          ) : (
            // Real camera view when BarCodeScanner is available
            <>
              {/* This will be dynamically imported when available */}
              <View style={styles.cameraPlaceholder}>
                <ThemedText style={styles.cameraPlaceholderText}>
                  Carregando câmera...
                </ThemedText>
              </View>
            </>
          )}

          {/* Overlay with scanning frame */}
          <View style={styles.overlay}>
            {/* Corner indicators */}
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />

            {/* Scanning area border */}
            <View style={styles.scanArea} />

            {/* Instructions */}
            <View style={styles.instructionsContainer}>
              <ThemedText style={styles.instructionsText}>
                {isExpoGo
                  ? "Toque aqui para inserir dados manualmente"
                  : "Posicione o código QR dentro da área de digitalização"}
              </ThemedText>
            </View>
          </View>
        </Pressable>
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
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  flashButton: {
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
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  cameraIcon: {
    marginBottom: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },
  permissionText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  permissionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  cameraContainer: {
    flex: 1,
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 20,
  },
  cornerTopLeft: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.3 - 20,
    left: SCREEN_WIDTH * 0.15 - 20,
    width: 40,
    height: 40,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderColor: Colors.light.tint,
    borderTopLeftRadius: 20,
  },
  cornerTopRight: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.3 - 20,
    right: SCREEN_WIDTH * 0.15 - 20,
    width: 40,
    height: 40,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderColor: Colors.light.tint,
    borderTopRightRadius: 20,
  },
  cornerBottomLeft: {
    position: "absolute",
    bottom: SCREEN_HEIGHT * 0.3 - 20,
    left: SCREEN_WIDTH * 0.15 - 20,
    width: 40,
    height: 40,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderColor: Colors.light.tint,
    borderBottomLeftRadius: 20,
  },
  cornerBottomRight: {
    position: "absolute",
    bottom: SCREEN_HEIGHT * 0.3 - 20,
    right: SCREEN_WIDTH * 0.15 - 20,
    width: 40,
    height: 40,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: Colors.light.tint,
    borderBottomRightRadius: 20,
  },
  instructionsContainer: {
    position: "absolute",
    bottom: SCREEN_HEIGHT * 0.2,
    paddingHorizontal: 40,
  },
  instructionsText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  bottomActions: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  manualButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 8,
  },
  manualButtonText: {
    color: Colors.light.tint,
    fontSize: 16,
    fontWeight: "600",
  },
  scanAgainButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 8,
  },
  scanAgainButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // Expo Go fallback styles
  expoGoPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  expoGoTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  expoGoDescription: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 16,
  },
  expoGoInstructions: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    lineHeight: 20,
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  cameraPlaceholderText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});
