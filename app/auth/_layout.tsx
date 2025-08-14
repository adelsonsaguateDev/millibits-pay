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
        name="login"
        options={{
          title: "Entrar",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Criar Conta",
        }}
      />
    </Stack>
  );
}
