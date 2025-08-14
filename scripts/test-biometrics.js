#!/usr/bin/env node

/**
 * Biometric Authentication Test Script
 *
 * This script helps verify that the biometric authentication setup is correct.
 * Run it with: node scripts/test-biometrics.js
 */

const fs = require("fs");
const path = require("path");

console.log("🔐 Biometric Authentication Setup Verification\n");

// Check if we're in the right directory
const packageJsonPath = path.join(__dirname, "..", "package.json");
if (!fs.existsSync(packageJsonPath)) {
  console.error(
    "❌ Error: package.json not found. Make sure you're in the project root."
  );
  process.exit(1);
}

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

console.log("📦 Checking dependencies...");

// Check for required dependencies
const requiredDeps = [
  "expo-local-authentication",
  "@react-native-async-storage/async-storage",
];

let allDepsPresent = true;
requiredDeps.forEach((dep) => {
  if (packageJson.dependencies[dep]) {
    console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
  } else {
    console.log(`❌ ${dep}: Missing`);
    allDepsPresent = false;
  }
});

// Check for required files
console.log("\n📁 Checking required files...");

const requiredFiles = [
  "utils/biometrics.ts",
  "hooks/useBiometrics.ts",
  "app/auth/index.tsx",
  "components/BiometricTest.tsx",
];

let allFilesPresent = true;
requiredFiles.forEach((file) => {
  const filePath = path.join(__dirname, "..", file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file}: Missing`);
    allFilesPresent = false;
  }
});

// Check app.json configuration
console.log("\n⚙️  Checking configuration...");

const appJsonPath = path.join(__dirname, "..", "app.json");
if (fs.existsSync(appJsonPath)) {
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf8"));

  if (
    appJson.expo.plugins &&
    appJson.expo.plugins.includes("expo-local-authentication")
  ) {
    console.log("✅ expo-local-authentication plugin configured");
  } else {
    console.log(
      "❌ expo-local-authentication plugin not configured in app.json"
    );
    allFilesPresent = false;
  }
} else {
  console.log("❌ app.json not found");
  allFilesPresent = false;
}

// Summary
console.log("\n📋 Summary:");
if (allDepsPresent && allFilesPresent) {
  console.log(
    "🎉 All checks passed! Biometric authentication should work correctly."
  );
  console.log("\nNext steps:");
  console.log("1. Run: npm start or expo start");
  console.log("2. Navigate to the Explore tab to test biometrics");
  console.log(
    "3. Test on a device with biometric hardware (Face ID, Touch ID, fingerprint)"
  );
  console.log(
    "4. For simulator testing, use Face ID simulation in iOS Simulator"
  );
} else {
  console.log(
    "⚠️  Some issues found. Please fix them before testing biometrics."
  );
  console.log("\nCommon fixes:");
  console.log("1. Run: npm install");
  console.log("2. Ensure expo-local-authentication is in app.json plugins");
  console.log("3. Check that all required files exist");
}

console.log("\n📚 For more information, see BIOMETRICS_README.md");
