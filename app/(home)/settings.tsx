import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    console.log("🧹 Clearing all cached data for testing...");
    signOut();
  };

  const goBack = () => {
    router.back();
  };

  const renderSettingItem = (
    icon: keyof typeof Ionicons.glyphMap,
    title: string,
    subtitle?: string,
    onPress?: () => void,
    showArrow: boolean = true
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingItemLeft}>
        <View style={styles.settingIcon}>
          <Ionicons name={icon} size={20} color={Colors.light.tint} />
        </View>
        <View style={styles.settingText}>
          <ThemedText style={styles.settingTitle}>{title}</ThemedText>
          {subtitle && (
            <ThemedText style={styles.settingSubtitle}>{subtitle}</ThemedText>
          )}
        </View>
      </View>
      {showArrow && onPress && (
        <Ionicons name="chevron-forward" size={20} color={Colors.light.tint} />
      )}
    </TouchableOpacity>
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
        <ThemedText style={styles.headerTitle}>Configurações</ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      {/* Settings Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Conta</ThemedText>
          {renderSettingItem(
            "person",
            "Perfil",
            "Gerencie suas informações pessoais"
          )}
          {renderSettingItem(
            "card",
            "Cartões",
            "Gerencie seus cartões cadastrados"
          )}
          {renderSettingItem(
            "shield-checkmark",
            "Segurança",
            "Configurações de segurança",
            () => router.push("/(home)/security" as any)
          )}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Preferências</ThemedText>
          {renderSettingItem(
            "notifications",
            "Notificações",
            "Configure suas notificações"
          )}
          {renderSettingItem("moon", "Tema", "Escolha o tema do app")}
          {renderSettingItem("language", "Idioma", "Português (Brasil)")}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Suporte</ThemedText>
          {renderSettingItem("help-circle", "Ajuda", "Central de ajuda")}
          {renderSettingItem(
            "document-text",
            "Termos de Uso",
            "Leia nossos termos"
          )}
          {renderSettingItem("information-circle", "Sobre", "Versão 1.0.0")}
        </View>

        {/* Sign Out Button */}
        <View style={styles.signOutSection}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={20} color="white" />
            <ThemedText style={styles.signOutText}>Sair da Conta</ThemedText>
          </TouchableOpacity>
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
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 1,
    borderRadius: 12,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  signOutSection: {
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 999,
    gap: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
