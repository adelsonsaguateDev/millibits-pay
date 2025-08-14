import { BiometricResult, BiometricService } from "@/utils/biometrics";
import { useCallback, useEffect, useState } from "react";

export interface UseBiometricsReturn {
  isBiometricAvailable: boolean | null;
  biometricType: string;
  isAuthenticating: boolean;
  authenticate: (reason?: string) => Promise<BiometricResult>;
  checkAvailability: () => Promise<void>;
  supportsBiometrics: boolean | null;
}

export function useBiometrics(): UseBiometricsReturn {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState<
    boolean | null
  >(null);
  const [supportsBiometrics, setSupportsBiometrics] = useState<boolean | null>(
    null
  );
  const [biometricType, setBiometricType] = useState<string>("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const checkAvailability = useCallback(async () => {
    try {
      const [available, types, supports] = await Promise.all([
        BiometricService.isBiometricAvailable(),
        BiometricService.getBiometricTypes(),
        BiometricService.supportsBiometrics(),
      ]);

      setIsBiometricAvailable(available);
      setSupportsBiometrics(supports);
      setBiometricType(types[0] || "");

      console.log("🔑 Biometric availability checked:", {
        available,
        types,
        supports,
      });
    } catch (error) {
      console.error("Error checking biometric availability:", error);
      setIsBiometricAvailable(false);
      setSupportsBiometrics(false);
    }
  }, []);

  const authenticate = useCallback(
    async (
      reason: string = "Please authenticate to continue"
    ): Promise<BiometricResult> => {
      if (!isBiometricAvailable || isAuthenticating) {
        return {
          success: false,
          error:
            "Biometric authentication is not available or already in progress",
        };
      }

      setIsAuthenticating(true);

      try {
        const result = await BiometricService.authenticate(reason);
        return result;
      } finally {
        setIsAuthenticating(false);
      }
    },
    [isBiometricAvailable, isAuthenticating]
  );

  useEffect(() => {
    checkAvailability();
  }, [checkAvailability]);

  return {
    isBiometricAvailable,
    biometricType,
    isAuthenticating,
    authenticate,
    checkAvailability,
    supportsBiometrics,
  };
}
