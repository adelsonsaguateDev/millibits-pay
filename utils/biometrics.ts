import * as LocalAuthentication from "expo-local-authentication";

export interface BiometricResult {
  success: boolean;
  error?: string;
  biometricType?: string;
}

export class BiometricService {
  /**
   * Check if biometric authentication is available on the device
   */
  static async isBiometricAvailable(): Promise<boolean> {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      return hasHardware && isEnrolled;
    } catch (error) {
      console.error("Error checking biometric availability:", error);
      return false;
    }
  }

  /**
   * Get available biometric types
   */
  static async getBiometricTypes(): Promise<string[]> {
    try {
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      const typeNames = supportedTypes.map((type) => {
        switch (type) {
          case LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION:
            return "Face ID";
          case LocalAuthentication.AuthenticationType.FINGERPRINT:
            return "Touch ID";
          case LocalAuthentication.AuthenticationType.IRIS:
            return "Iris";
          default:
            return "Biometric";
        }
      });

      return typeNames;
    } catch (error) {
      console.error("Error getting biometric types:", error);
      return [];
    }
  }

  /**
   * Authenticate using biometrics
   */
  static async authenticate(
    reason: string = "Please authenticate to continue"
  ): Promise<BiometricResult> {
    try {
      // Check if biometrics are available
      const isAvailable = await this.isBiometricAvailable();
      if (!isAvailable) {
        return {
          success: false,
          error: "Biometric authentication is not available on this device",
        };
      }

      // Get biometric types for better user feedback
      const biometricTypes = await this.getBiometricTypes();
      const biometricType = biometricTypes[0] || "Biometric";

      // Attempt authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: reason,
        fallbackLabel: "Use passcode",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (result.success) {
        return {
          success: true,
          biometricType,
        };
      } else {
        return {
          success: false,
          error: result.error || "Authentication failed",
        };
      }
    } catch (error) {
      console.error("Biometric authentication error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  /**
   * Check if device supports biometrics without requiring enrollment
   */
  static async supportsBiometrics(): Promise<boolean> {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      return hasHardware;
    } catch (error) {
      console.error("Error checking biometric support:", error);
      return false;
    }
  }
}
