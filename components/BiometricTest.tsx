import { useBiometrics } from "@/hooks/useBiometrics";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

export function BiometricTest() {
  const {
    isBiometricAvailable,
    biometricType,
    isAuthenticating,
    authenticate,
    supportsBiometrics,
  } = useBiometrics();

  const handleTestAuth = async () => {
    try {
      const result = await authenticate("Test authentication");

      if (result.success) {
        Alert.alert(
          "✅ Success",
          `Biometric authentication successful!\nType: ${result.biometricType}`
        );
      } else {
        Alert.alert("❌ Failed", `Authentication failed: ${result.error}`);
      }
    } catch (error) {
      Alert.alert("❌ Error", `Unexpected error: ${error}`);
    }
  };

  const handleCheckAvailability = async () => {
    Alert.alert(
      "📱 Biometric Status",
      `Available: ${isBiometricAvailable}\n` +
        `Type: ${biometricType}\n` +
        `Supports: ${supportsBiometrics}\n` +
        `Authenticating: ${isAuthenticating}`
    );
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Biometric Test Component</ThemedText>

      <View style={styles.statusContainer}>
        <ThemedText style={styles.statusText}>
          Status:{" "}
          {isBiometricAvailable === null
            ? "Checking..."
            : isBiometricAvailable
            ? "✅ Available"
            : "❌ Not Available"}
        </ThemedText>

        {biometricType && (
          <ThemedText style={styles.typeText}>Type: {biometricType}</ThemedText>
        )}

        <ThemedText style={styles.supportText}>
          Hardware Support:{" "}
          {supportsBiometrics === null
            ? "Checking..."
            : supportsBiometrics
            ? "✅ Yes"
            : "❌ No"}
        </ThemedText>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleTestAuth}
          disabled={!isBiometricAvailable || isAuthenticating}
        >
          <ThemedText style={styles.buttonText}>
            {isAuthenticating ? "Authenticating..." : "Test Authentication"}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleCheckAvailability}
        >
          <ThemedText style={styles.buttonText}>Check Status</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <ThemedText style={styles.infoText}>
          This component is for testing biometric functionality during
          development. Remove it before production deployment.
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    margin: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  statusContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  typeText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#666",
  },
  supportText: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#28acac",
  },
  secondaryButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  infoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff3cd",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#ffc107",
  },
  infoText: {
    fontSize: 12,
    color: "#856404",
    textAlign: "center",
    lineHeight: 18,
  },
});
