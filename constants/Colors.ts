/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#E31C79";
const tintColorDark = "#E31C79";

export const Colors = {
  light: {
    text: "#1a1a1a",
    background: "#ffffff",
    tint: tintColorLight,
    icon: "#666666",
    tabIconDefault: "#999999",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ffffff",
    background: "#0a0a0a",
    tint: tintColorDark,
    icon: "#cccccc",
    tabIconDefault: "#666666",
    tabIconSelected: tintColorDark,
  },
};

// Cores específicas para a tela de autenticação
export const AuthColors = {
  primary: "#E31C79", // Teal primary color
  white: "#FFFFFF",
  shadow: "#000000",
};
