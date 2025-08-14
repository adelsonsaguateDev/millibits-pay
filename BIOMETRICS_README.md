# Biometric Authentication Implementation

This document describes the biometric authentication implementation for the MilleBits Pay app using Expo's Local Authentication module.

## Overview

The biometric authentication system provides secure access to the app using:

- **Face ID** (iOS devices with TrueDepth camera)
- **Touch ID** (iOS devices with fingerprint sensor)
- **Fingerprint** (Android devices with fingerprint sensor)
- **Iris scanning** (devices with iris recognition)

## Architecture

### 1. BiometricService (`utils/biometrics.ts`)

Core service class that handles all biometric operations:

- `isBiometricAvailable()` - Checks if biometrics are available and enrolled
- `getBiometricTypes()` - Returns available biometric types
- `authenticate()` - Performs biometric authentication
- `supportsBiometrics()` - Checks if device supports biometrics

### 2. useBiometrics Hook (`hooks/useBiometrics.ts`)

React hook that provides biometric functionality to components:

- Manages biometric state (availability, type, authentication status)
- Provides authentication method
- Handles availability checking

### 3. Auth Screen (`app/auth/index.tsx`)

Main authentication screen that integrates biometric authentication:

- Shows biometric availability status
- Provides biometric authentication button
- Handles authentication results and errors
- Shows user-friendly error messages

## Features

### ✅ Available Features

- **Automatic Detection**: Automatically detects available biometric types
- **Real-time Status**: Shows current biometric availability status
- **User Feedback**: Provides clear feedback during authentication
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Fallback Support**: Graceful fallback when biometrics are unavailable
- **Loading States**: Visual feedback during authentication process
- **Accessibility**: Proper button states and disabled handling

### 🔒 Security Features

- **Hardware Verification**: Ensures biometric hardware is present
- **Enrollment Check**: Verifies biometrics are properly configured
- **Secure Authentication**: Uses native biometric authentication
- **Fallback Prevention**: Configurable device fallback options

## Usage

### Basic Implementation

```tsx
import { useBiometrics } from "@/hooks/useBiometrics";

function MyComponent() {
  const {
    isBiometricAvailable,
    biometricType,
    isAuthenticating,
    authenticate,
  } = useBiometrics();

  const handleAuth = async () => {
    const result = await authenticate("Please authenticate to continue");

    if (result.success) {
      // Authentication successful
      console.log(`Authenticated with ${result.biometricType}`);
    } else {
      // Handle error
      console.error("Authentication failed:", result.error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleAuth}
      disabled={!isBiometricAvailable || isAuthenticating}
    >
      <Text>
        {isAuthenticating ? "Authenticating..." : `Use ${biometricType}`}
      </Text>
    </TouchableOpacity>
  );
}
```

### Advanced Implementation

```tsx
import { BiometricService } from "@/utils/biometrics";

// Check availability manually
const checkAvailability = async () => {
  const available = await BiometricService.isBiometricAvailable();
  const types = await BiometricService.getBiometricTypes();
  const supports = await BiometricService.supportsBiometrics();

  console.log({ available, types, supports });
};

// Custom authentication with specific options
const authenticate = async () => {
  const result = await BiometricService.authenticate(
    "Custom authentication message"
  );

  return result;
};
```

## Error Handling

The system provides comprehensive error handling for various scenarios:

| Error Type             | Description                     | User Message                                   |
| ---------------------- | ------------------------------- | ---------------------------------------------- |
| `UserCancel`           | User cancelled authentication   | "Autenticação cancelada pelo usuário."         |
| `UserFallback`         | User chose fallback method      | "Usuário escolheu usar código de acesso."      |
| `SystemCancel`         | System cancelled authentication | "Autenticação cancelada pelo sistema."         |
| `AuthenticationFailed` | Authentication failed           | "Autenticação falhou. Tente novamente."        |
| `NotEnrolled`          | Biometrics not configured       | "Biometria não configurada neste dispositivo." |
| `NotAvailable`         | Biometrics not available        | "Biometria não disponível neste dispositivo."  |

## Setup Requirements

### iOS Setup

1. **Info.plist** - Add biometric usage description:

   ```xml
   <key>NSFaceIDUsageDescription</key>
   <string>This app uses Face ID to securely authenticate you.</string>
   ```

2. **Capabilities** - Enable Face ID in Xcode project capabilities

### Android Setup

1. **AndroidManifest.xml** - Add biometric permission:

   ```xml
   <uses-permission android:name="android.permission.USE_BIOMETRIC" />
   <uses-permission android:name="android.permission.USE_FINGERPRINT" />
   ```

2. **Target SDK** - Ensure target SDK supports biometric authentication (API 23+)

### Expo Configuration

The `expo-local-authentication` package is already included in dependencies:

```json
{
  "dependencies": {
    "expo-local-authentication": "^16.0.5"
  }
}
```

## Testing

### Simulator Testing

- **iOS Simulator**: Face ID simulation available in Device menu
- **Android Emulator**: Fingerprint simulation in Extended Controls

### Device Testing

- **iOS**: Test with Face ID and Touch ID on physical devices
- **Android**: Test with fingerprint sensors and other biometric methods

## Troubleshooting

### Common Issues

1. **"Biometrics not available"**

   - Check if device has biometric hardware
   - Verify biometrics are properly configured
   - Ensure proper permissions are set

2. **"Authentication failed"**

   - Check biometric enrollment
   - Verify user has set up Face ID/Touch ID/fingerprint
   - Test with device settings

3. **"Permission denied"**
   - Check app permissions
   - Verify Info.plist/AndroidManifest.xml configuration
   - Ensure proper Expo configuration

### Debug Information

Enable debug logging by checking console output:

```
🔑 Biometric availability: { available: true, types: ["Face ID"], supports: true }
🔑 Iniciando autenticação biométrica...
🔑 Autenticação biométrica bem-sucedida!
```

## Best Practices

1. **Always check availability** before attempting authentication
2. **Provide clear user feedback** during authentication process
3. **Handle errors gracefully** with user-friendly messages
4. **Offer fallback options** when biometrics are unavailable
5. **Test on multiple devices** to ensure compatibility
6. **Follow platform guidelines** for biometric implementation

## Future Enhancements

- [ ] **Biometric Preferences**: Allow users to enable/disable biometrics
- [ ] **Multiple Biometric Types**: Support for multiple authentication methods
- [ ] **Biometric Security Levels**: Different security levels for different actions
- [ ] **Offline Authentication**: Support for offline biometric verification
- [ ] **Biometric Analytics**: Track authentication success/failure rates

## Support

For issues or questions regarding biometric authentication:

1. Check this documentation
2. Review console logs for error details
3. Test on different devices/simulators
4. Verify platform-specific configuration
5. Check Expo documentation for updates
