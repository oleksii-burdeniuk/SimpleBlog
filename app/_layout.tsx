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

import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTranslation } from "@/hooks/useTranslation";
import { CustomBackButton } from "@/components/GoBackBtn";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="user/[userId]"
              options={{
                headerShown: true,
                title: t("userScreenTitle"),
                headerLeft: () => <CustomBackButton />,
              }}
            />
            <Stack.Screen
              name="post/[postId]"
              options={{
                headerShown: true,
                title: t("postScreenTitle"),
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
// options={{
//   title: t('posts'),
//   tabBarIcon: ({ color, focused }) => (
//     <TabBarIcon
//       name={focused ? 'list' : 'list-outline'}
//       color={color}
//     />
//   ),
// }}
