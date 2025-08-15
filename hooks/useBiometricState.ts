import { BiometricStorage } from "@/utils/biometricStorage";
import { useEffect, useState } from "react";

export function useBiometricState() {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBiometricState();
  }, []);

  const loadBiometricState = async () => {
    try {
      setIsLoading(true);
      const enabled = await BiometricStorage.getBiometricEnabled();
      setIsBiometricEnabled(enabled);
    } catch (error) {
      console.error("Error loading biometric state:", error);
      setIsBiometricEnabled(false);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshBiometricState = () => {
    loadBiometricState();
  };

  return {
    isBiometricEnabled,
    isLoading,
    refreshBiometricState,
  };
}
