import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useBiometrics } from "@/hooks/useBiometrics";
import { useBiometricState } from "@/hooks/useBiometricState";
import { BiometricStorage } from "@/utils/biometricStorage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";

export default function SecurityScreen() {
  const router = useRouter();
  const { isBiometricAvailable, authenticate, isAuthenticating } =
    useBiometrics();
  const { isBiometricEnabled, refreshBiometricState } = useBiometricState();

  const toggleBiometrics = async () => {
    if (isBiometricEnabled) {
      // If currently enabled, just disable it
      try {
        await BiometricStorage.setBiometricEnabled(false);
        refreshBiometricState();
        Alert.alert(
          "Biometria Desativada",
          "A autenticação biométrica foi desativada."
        );
      } catch (error) {
        console.error("Error disabling biometrics:", error);
        Alert.alert("Erro", "Não foi possível desativar a biometria.");
      }
    } else {
      // If currently disabled, authenticate and enable it
      try {
        const result = await authenticate(
          "Confirme sua identidade para ativar a biometria"
        );

        if (result.success) {
          await BiometricStorage.setBiometricEnabled(true);
          refreshBiometricState();
          Alert.alert(
            "Biometria Ativada",
            "A autenticação biométrica foi ativada com sucesso!"
          );
        } else {
          Alert.alert(
            "Falha na Autenticação",
            result.error || "Não foi possível verificar sua identidade."
          );
        }
      } catch (error) {
        console.error("Error enabling biometrics:", error);
        Alert.alert("Erro", "Ocorreu um erro ao ativar a biometria.");
      }
    }
  };

  const goBack = () => {
    router.back();
  };

  const renderSecurityItem = (
    icon: keyof typeof Ionicons.glyphMap,
    title: string,
    subtitle?: string,
    rightElement?: React.ReactNode
  ) => (
    <View style={styles.securityItem}>
      <View style={styles.securityItemLeft}>
        <View style={styles.securityIcon}>
          <Ionicons name={icon} size={20} color={Colors.light.tint} />
        </View>
        <View style={styles.securityText}>
          <ThemedText style={styles.securityTitle}>{title}</ThemedText>
          {subtitle && (
            <ThemedText style={styles.securitySubtitle}>{subtitle}</ThemedText>
          )}
        </View>
      </View>
      {rightElement && (
        <View style={styles.securityItemRight}>{rightElement}</View>
      )}
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.light.tint, Colors.light.background]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Segurança</ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      {/* Security Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Autenticação</ThemedText>
          {isBiometricAvailable
            ? renderSecurityItem(
                "finger-print",
                "Ativar Biometria",
                "Use a sua impressão digital ou Face ID para entrar na aplicação",
                isAuthenticating ? (
                  <View style={styles.loadingSwitch}>
                    <Ionicons name="sync" size={20} color={Colors.light.tint} />
                  </View>
                ) : (
                  <Switch
                    value={isBiometricEnabled}
                    onValueChange={toggleBiometrics}
                    disabled={isAuthenticating}
                    trackColor={{ false: "#e0e0e0", true: Colors.light.tint }}
                    thumbColor="white"
                    ios_backgroundColor="#e0e0e0"
                  />
                )
              )
            : renderSecurityItem(
                "finger-print",
                "Ativar Biometria",
                "Biometria não disponível neste dispositivo",
                <View style={styles.disabledSwitch}>
                  <Ionicons name="close-circle" size={24} color="#999" />
                </View>
              )}
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
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  securityItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "white",
    marginBottom: 1,
    borderRadius: 12,
  },
  securityItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  securityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  securityText: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.text,
    marginBottom: 2,
  },
  securitySubtitle: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  securityItemRight: {
    marginLeft: 16,
  },
  disabledSwitch: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingSwitch: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
