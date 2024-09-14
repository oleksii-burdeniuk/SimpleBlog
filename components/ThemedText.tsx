import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "small";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "small" ? styles.small : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    fontFamily: "RobotoLight",
  },
  default: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "RobotoRegular",
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "RobotoBold",
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "RobotoBold",
    letterSpacing: 0.8,
  },
  link: {
    lineHeight: 22,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
