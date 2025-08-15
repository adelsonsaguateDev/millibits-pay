import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useBiometrics } from "@/hooks/useBiometrics";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";

export default function SecurityScreen() {
  const router = useRouter();
  const { isBiometricAvailable } = useBiometrics();
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  const toggleBiometrics = () => {
    setIsBiometricEnabled(!isBiometricEnabled);
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
          {renderSecurityItem(
            "finger-print",
            "Ativar Biometria",
            "Use sua impressão digital ou Face ID para entrar no app",
            <Switch
              value={isBiometricEnabled}
              onValueChange={toggleBiometrics}
              trackColor={{ false: "#e0e0e0", true: Colors.light.tint }}
              thumbColor="white"
              ios_backgroundColor="#e0e0e0"
            />
          )}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Privacidade</ThemedText>
          {renderSecurityItem(
            "eye-off",
            "Ocultar Saldo",
            "Oculta o saldo dos cartões na tela inicial"
          )}
          {renderSecurityItem(
            "lock-closed",
            "Bloquear App",
            "Bloqueia o app quando não estiver em uso"
          )}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Notificações</ThemedText>
          {renderSecurityItem(
            "notifications",
            "Alertas de Segurança",
            "Receba notificações sobre atividades suspeitas"
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
    marginHorizontal: 20,
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
});
