import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
        animation: "slide_from_bottom",
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Autenticação",
        }}
      />
    </Stack>
  );
}
