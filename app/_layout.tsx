import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTranslation } from "@/hooks/useTranslation";
import { CustomBackButton } from "@/components/GoBackBtn";
import useSettingsStore from "@/store/settingsStore";
import { useColorScheme, View } from "react-native";
import { getStoredItem, LanguageKey, themeKey } from "@/store/asyncStore";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { theme, setTheme, setLanguage } = useSettingsStore();
  const deviceTheme = useColorScheme() || "light";
  const { t } = useTranslation();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
    RobotoLight: require("../assets/fonts/Roboto-Light.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const checkStoredSettings = async () => {
    try {
      const themePromise = getStoredItem(themeKey);
      const languagePromise = getStoredItem(LanguageKey);
      const [savedTheme, savedLanguage] = await Promise.all([
        themePromise,
        languagePromise,
      ]);
      if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);

      if (
        savedLanguage === "ua" ||
        savedLanguage === "sp" ||
        savedLanguage === "en"
      )
        setLanguage(savedLanguage);
    } catch (err) {}
  };
  useEffect(() => {
    checkStoredSettings();
  }, []);

  useEffect(() => {
    if (deviceTheme && deviceTheme !== theme) setTheme(deviceTheme);
  }, [deviceTheme]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <GestureHandlerRootView>
        <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="user/[userId]"
              options={{
                headerShown: true,
                title: "",
                headerLeft: () => <CustomBackButton />,
              }}
            />
            <Stack.Screen
              name="post/[postId]"
              options={{
                headerShown: true,
                title: "",
                headerLeft: () => <CustomBackButton />,
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
