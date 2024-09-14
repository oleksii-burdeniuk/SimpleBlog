import React, { useState } from "react";
import { StyleSheet, Alert, View, Switch, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "@/hooks/useTranslation";
import useSettingsStore from "@/store/settingsStore";
import { capitalizeFirstLetter } from "@/utils/functions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LanguageKey, saveItemToStore, themeKey } from "@/store/asyncStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { t, language, changeLanguage } = useTranslation();
  const { theme, setTheme } = useSettingsStore();
  const [isDarkTheme, setIsDarkTheme] = useState(theme === "dark");
  const borderColor = useThemeColor({}, "borderItem");

  const handleLanguageChange = () => {
    Alert.alert(
      "Select Language",
      "",
      [
        {
          text: "Українська",
          onPress: () => {
            saveItemToStore(LanguageKey, "ua");
            changeLanguage("ua");
          },
        },
        {
          text: "Spanish",
          onPress: () => {
            saveItemToStore(LanguageKey, "es");
            changeLanguage("es");
          },
        },
        {
          text: "English",
          onPress: () => {
            saveItemToStore(LanguageKey, "en");
            changeLanguage("en");
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true },
    );
  };

  const toggleTheme = (value: boolean) => {
    setIsDarkTheme(value);
    saveItemToStore(themeKey, !value ? "light" : "dark");
    setTheme(!value ? "light" : "dark");
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + 40 }]}>
      <TouchableOpacity
        onPress={handleLanguageChange}
        style={[styles.settingItem, { borderColor }]}
      >
        <ThemedText type="subtitleLink" style={styles.settingText}>
          {t("language")}
        </ThemedText>
        <ThemedText type="subtitleLink" style={styles.settingText}>
          {capitalizeFirstLetter(language)}
        </ThemedText>
      </TouchableOpacity>

      <View style={[styles.settingItem, { borderColor }]}>
        <ThemedText type="subtitle" style={styles.settingText}>
          {t("darkMode")}
        </ThemedText>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 16,
    borderWidth: 1,
    padding: 8,
    borderRadius: 16,
  },
  settingText: {
    letterSpacing: 1,
  },
});
