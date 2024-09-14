import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { memo } from "react";

export const CustomBackButton = memo(() => {
  const router = useRouter();
  const { t } = useTranslation();
  const iconLink = useThemeColor({}, "iconLink");

  return (
    <TouchableOpacity onPress={() => router.back()} style={styles.container}>
      <Ionicons name="chevron-back" color={iconLink} size={22} />
      <ThemedText type="subtitleLink">{t("goBack")}</ThemedText>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});
