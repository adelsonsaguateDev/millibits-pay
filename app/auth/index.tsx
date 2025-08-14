import { Ionicons } from "@expo/vector-icons";
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
  const { signIn } = useAuth();
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
    // Navegar para tela de código de acesso
    console.log("Navegar para código de acesso");
    // TODO: Implementar navegação para tela de código de acesso
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

  return (
    <ThemedView style={styles.container}>
      {/* Banner rosa no topo com logo Mille-bit */}
      <View style={styles.topBanner}>
        <MilleBitLogo width={60} height={55} color="white" />
      </View>

      {/* Conteúdo principal */}
      <View style={styles.mainContent}>
        {/* Ícone de usuário circular */}
        <View style={styles.userIconContainer}>
          <View style={styles.userIcon}>
            <Ionicons name="person" size={60} color="white" />
          </View>
        </View>

        {/* Status da biometria */}
        {isBiometricAvailable !== null && (
          <View style={styles.biometricStatus}>
            <ThemedText style={styles.biometricStatusText}>
              {isBiometricAvailable
                ? `✅ ${biometricType} disponível`
                : "❌ Biometria não disponível"}
            </ThemedText>
          </View>
        )}

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
    backgroundColor: AuthColors.primary,
    height: 120,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 30,
    paddingTop: 40,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
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
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
  },
  biometricStatusText: {
    fontSize: 14,
    color: "#6C757D",
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
    borderRadius: 12,
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
    backgroundColor: "#E9ECEF",
    shadowOpacity: 0,
    elevation: 0,
  },
  biometricButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButtonText: {
    color: "#6C757D",
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
    borderRadius: 12,
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
    color: "#6C757D",
    textAlign: "center",
    lineHeight: 20,
  },
});
