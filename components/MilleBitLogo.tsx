import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
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
      <Svg width={width} height={height} viewBox="0 0 76 70" fill="none">
        <G clipPath="url(#clip0_11_71)">
          <Path
            d="M69.16 19.0781C68.97 17.1673 68.78 13.9189 68.78 13.9189H57.38V14.0145C57.2977 15.8279 56.879 17.61 56.1453 19.2694L42.2753 54.7137L26.6 17.7405C21.7547 6.37415 14.9147 1.78534 9.5 0.447718C6.35633 -0.0306013 3.16662 -0.126708 0 0.16148C2.91381 0.311425 5.7487 1.16346 8.26465 2.64544C12.35 5.32069 14.9147 11.6262 13.7747 20.0332L8.74 57.007C8.07465 61.4974 6.74535 68.9493 6.74535 68.9493H13.87C13.87 68.9493 14.3447 63.2169 15.01 58.1534L19.76 22.1352L35.6247 59.8729C36.9568 63.9281 39.5133 67.4673 42.94 70L61.56 22.0396L66.31 62.3568C66.5947 65.2227 66.7853 68.8537 66.7853 68.8537H76C76 68.8537 75.1447 63.9814 74.67 60.0642L69.16 19.0781Z"
            fill={color}
          />
        </G>
        <Defs>
          <ClipPath id="clip0_11_71">
            <Rect width="76" height="70" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
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
