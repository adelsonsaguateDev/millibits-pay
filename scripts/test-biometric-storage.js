const { BiometricStorage } = require("../utils/biometricStorage");

async function testBiometricStorage() {
  console.log("🧪 Testing Biometric Storage...");

  try {
    // Test setting biometric enabled
    console.log("Setting biometric enabled to true...");
    await BiometricStorage.setBiometricEnabled(true);

    // Test getting the value
    console.log("Getting biometric state...");
    const enabled = await BiometricStorage.getBiometricEnabled();
    console.log("Biometric enabled:", enabled);

    // Test setting to false
    console.log("Setting biometric enabled to false...");
    await BiometricStorage.setBiometricEnabled(false);

    // Test getting again
    const disabled = await BiometricStorage.getBiometricEnabled();
    console.log("Biometric enabled:", disabled);

    // Test clearing
    console.log("Clearing biometric state...");
    await BiometricStorage.clearBiometricState();

    const cleared = await BiometricStorage.getBiometricEnabled();
    console.log("After clearing:", cleared);

    console.log("✅ All tests passed!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

testBiometricStorage();
