import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

interface MilleBitLogoProps {
  width?: number;
  height?: number;
  color?: string;
  variant?: "svg" | "text";
}

export const MilleBitLogo: React.FC<MilleBitLogoProps> = ({
  width = 76,
  height = 70,
  color = Colors.light.tint,
  variant = "svg",
}) => {
  if (variant === "text") {
    return (
      <View style={styles.textContainer}>
        <Text style={[styles.logoText, { color }]}>MILLE-BIT</Text>
      </View>
    );
  }

  return (
    <View>
      <Image
        source={require("../assets/images/millebits-icon.png")}
        style={{ width, height, tintColor: color }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
