import AsyncStorage from "@react-native-async-storage/async-storage";

const BIOMETRIC_ENABLED_KEY = "@millibits_pay_biometric_enabled";

export class BiometricStorage {
  /**
   * Save biometric activation state
   */
  static async setBiometricEnabled(enabled: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        BIOMETRIC_ENABLED_KEY,
        JSON.stringify(enabled)
      );
      console.log("🔐 Biometric state saved:", enabled);
    } catch (error) {
      console.error("Error saving biometric state:", error);
      throw new Error("Failed to save biometric state");
    }
  }

  /**
   * Get biometric activation state
   */
  static async getBiometricEnabled(): Promise<boolean> {
    try {
      const enabled = await AsyncStorage.getItem(BIOMETRIC_ENABLED_KEY);
      if (enabled === null) return false;
      return JSON.parse(enabled);
    } catch (error) {
      console.error("Error getting biometric state:", error);
      return false;
    }
  }

  /**
   * Clear biometric activation state
   */
  static async clearBiometricState(): Promise<void> {
    try {
      await AsyncStorage.removeItem(BIOMETRIC_ENABLED_KEY);
      console.log("🔐 Biometric state cleared");
    } catch (error) {
      console.error("Error clearing biometric state:", error);
    }
  }
}
