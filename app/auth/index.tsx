import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { MilleBitLogo } from "@/components/MilleBitLogo";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AuthColors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useBiometrics } from "@/hooks/useBiometrics";

export default function AuthScreen() {
  const { signIn, hasAccessCode, isFirstTime } = useAuth();
  const {
    isBiometricAvailable,
    biometricType,
    isAuthenticating,
    authenticate,
  } = useBiometrics();

  const handleBiometricAuth = async () => {
    if (!isBiometricAvailable || isAuthenticating) {
      return;
    }

    try {
      console.log("🔑 Iniciando autenticação biométrica...");

      const result = await authenticate(
        "Autentique-se para acessar o MilleBits Pay"
      );

      if (result.success) {
        console.log("🔑 Autenticação biométrica bem-sucedida!");
        console.log("🔑 Chamando signIn...");
        await signIn();
        console.log("🔑 signIn concluído!");
      } else {
        console.error("❌ Falha na autenticação biométrica:", result.error);

        // Show user-friendly error message
        let errorMessage = "Falha na autenticação biométrica.";

        if (result.error) {
          if (result.error.includes("UserCancel")) {
            errorMessage = "Autenticação cancelada pelo usuário.";
          } else if (result.error.includes("UserFallback")) {
            errorMessage = "Usuário escolheu usar código de acesso.";
          } else if (result.error.includes("SystemCancel")) {
            errorMessage = "Autenticação cancelada pelo sistema.";
          } else if (result.error.includes("AuthenticationFailed")) {
            errorMessage = "Autenticação falhou. Tente novamente.";
          } else if (result.error.includes("NotEnrolled")) {
            errorMessage = "Biometria não configurada neste dispositivo.";
          } else if (result.error.includes("NotAvailable")) {
            errorMessage = "Biometria não disponível neste dispositivo.";
          }
        }

        Alert.alert("Erro de Autenticação", errorMessage);
      }
    } catch (error) {
      console.error("❌ Erro na autenticação biométrica:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro inesperado durante a autenticação. Tente novamente."
      );
    }
  };

  const handleAccessCode = () => {
    // Se é a primeira vez ou não tem código configurado, vai para registro
    if (isFirstTime || !hasAccessCode) {
      router.push("/auth/register-code" as any);
    } else {
      // Se já tem código, vai para login
      router.push("/auth/access-code");
    }
  };

  const getBiometricButtonText = () => {
    if (isAuthenticating) {
      return "Autenticando...";
    }

    if (isBiometricAvailable === null) {
      return "Verificando...";
    }

    if (isBiometricAvailable) {
      return `Iniciar com ${biometricType}`;
    }

    return "Biometria não disponível";
  };

  const getBiometricButtonStyle = () => {
    if (isBiometricAvailable === false) {
      return [styles.biometricButton, styles.disabledButton];
    }
    return styles.biometricButton;
  };

  const getBiometricButtonTextStyle = () => {
    if (isBiometricAvailable === false) {
      return [styles.biometricButtonText, styles.disabledButtonText];
    }
    return styles.biometricButtonText;
  };

  // Se é a primeira vez, mostrar apenas o botão de código de acesso
  if (isFirstTime) {
    return (
      <ThemedView style={styles.container}>
        {/* Banner rosa no topo com logo Mille-bit */}
        <View style={styles.topBanner}>
          <ThemedText style={styles.logoText}>BitPay</ThemedText>
          <MilleBitLogo width={60} height={55} color="white" variant="text" />
        </View>

        {/* Conteúdo principal */}
        <View style={styles.mainContent}>
          {/* Ícone de usuário circular */}
          <View style={styles.userIconContainer}>
            <View style={styles.userIcon}>
              <Ionicons name="person" size={60} color="white" />
            </View>
          </View>

          {/* Título de boas-vindas */}
          <View style={styles.welcomeContainer}>
            <ThemedText style={styles.welcomeTitle}>
              Bem-vindo ao MilleBits Pay!
            </ThemedText>
            <ThemedText style={styles.welcomeDescription}>
              Configure seu código de acesso para começar a usar o app
            </ThemedText>
          </View>

          {/* Botão de código de acesso */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.accessCodeButton}
              onPress={handleAccessCode}
            >
              <ThemedText style={styles.accessCodeButtonText}>
                Configurar código de acesso
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    );
  }

  // Tela normal com biometria e código de acesso
  return (
    <ThemedView style={styles.container}>
      {/* Banner rosa no topo com logo Mille-bit */}
      <View style={styles.topBanner}>
        <ThemedText style={styles.logoText}>BitPay</ThemedText>
        <MilleBitLogo width={40} color="white" />
      </View>

      {/* Conteúdo principal */}
      <View style={styles.mainContent}>
        {/* Ícone de usuário circular */}
        <View style={styles.userIconContainer}>
          <View style={styles.userIcon}>
            <Ionicons name="person" size={60} color="white" />
          </View>
        </View>

        {/* Botões de autenticação */}
        <View style={styles.buttonContainer}>
          {/* Botão de biometria */}
          <TouchableOpacity
            style={getBiometricButtonStyle()}
            onPress={handleBiometricAuth}
            disabled={!isBiometricAvailable || isAuthenticating}
          >
            {isAuthenticating ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="white" size="small" />
                <ThemedText
                  style={[getBiometricButtonTextStyle(), styles.loadingText]}
                >
                  {getBiometricButtonText()}
                </ThemedText>
              </View>
            ) : (
              <ThemedText style={getBiometricButtonTextStyle()}>
                {getBiometricButtonText()}
              </ThemedText>
            )}
          </TouchableOpacity>

          {/* Botão de código de acesso */}
          <TouchableOpacity
            style={styles.accessCodeButton}
            onPress={handleAccessCode}
          >
            <ThemedText style={styles.accessCodeButtonText}>
              Código de acesso
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Informações adicionais */}
        {isBiometricAvailable === false && (
          <View style={styles.infoContainer}>
            <ThemedText style={styles.infoText}>
              Para usar a biometria, configure o Face ID, Touch ID ou PIN no seu
              dispositivo.
            </ThemedText>
          </View>
        )}
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
    backgroundColor: AuthColors.primary,
    height: 120,
    paddingLeft: 30,
    paddingTop: 40,
    alignItems: "center",
    gap: 4,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  mainContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  userIconContainer: {
    marginBottom: 40,
  },
  userIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: AuthColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  biometricStatus: {
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  biometricStatusText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 20,
  },
  biometricButton: {
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
  disabledButton: {
    backgroundColor: "#e0e0e0",
    shadowOpacity: 0,
    elevation: 0,
  },
  biometricButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButtonText: {
    color: "#666666",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loadingText: {
    marginLeft: 10,
  },
  accessCodeButton: {
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
  accessCodeButtonText: {
    color: AuthColors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  infoContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
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
});
