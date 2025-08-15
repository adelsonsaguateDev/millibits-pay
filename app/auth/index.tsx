import { MilleBitLogo } from "@/components/MilleBitLogo";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AuthColors } from "@/constants/Colors";
import { router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function AuthIntroScreen() {
  const handleEntrar = () => {
    router.push("/auth/login");
  };

  const handleRegistrar = () => {
    router.push("/auth/register");
  };

  return (
    <ThemedView style={styles.container}>
      {/* Banner rosa no topo com logo Mille-bit */}
      <View style={styles.topBanner}>
        <MilleBitLogo width={40} />
        <ThemedText style={styles.logoText}>BitPay</ThemedText>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.mainContent}>
        {/* Ícone de usuário circular */}
        <View style={styles.userIconContainer}>
          <Image
            source={require("../../assets/images/undraw_wallet_diag.png")}
            style={{ width: 320, height: 237 }}
          />
        </View>

        {/* Título de boas-vindas */}
        <View style={styles.welcomeContainer}>
          <ThemedText style={styles.welcomeTitle}>
            Bem-vindo ao BitPay!
          </ThemedText>
          <ThemedText style={styles.welcomeDescription}>
            Escolha uma opção para continuar
          </ThemedText>
        </View>

        {/* Botões de ação */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleEntrar}>
            <ThemedText style={styles.primaryButtonText}>Entrar</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleRegistrar}
          >
            <ThemedText style={styles.secondaryButtonText}>
              Registrar
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topBanner: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 40,
    alignItems: "center",
    gap: 8,
  },
  logoText: {
    fontSize: 24,
    marginTop: 5,
    fontWeight: "bold",
    color: "#E31C79",
  },
  mainContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  userIconContainer: {
    marginBottom: 40,
    marginTop: 40,
  },
  welcomeContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 28,
    lineHeight: 32,
    textAlign: "center",
    fontWeight: "bold",
    color: AuthColors.primary,
    marginBottom: 10,
  },
  welcomeDescription: {
    fontSize: 16,
    color: "#6C757D",
    textAlign: "center",
    lineHeight: 22,
  },
  buttonContainer: {
    width: "100%",
    gap: 20,
  },
  primaryButton: {
    backgroundColor: AuthColors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: "center",
    shadowColor: AuthColors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: AuthColors.white,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: "center",
    borderWidth: 2,
    borderColor: AuthColors.primary,
    shadowColor: AuthColors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButtonText: {
    color: AuthColors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
});
