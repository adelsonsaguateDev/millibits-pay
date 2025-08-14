import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Autenticação",
        }}
      />
      <Stack.Screen
        name="access-code"
        options={{
          title: "Código de Acesso",
        }}
      />
      <Stack.Screen
        name="register-code"
        options={{
          title: "Registrar Código",
        }}
      />
    </Stack>
  );
}
