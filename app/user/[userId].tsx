import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTranslation } from "@/hooks/useTranslation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

export default function UserDetailsScreen() {
  const { userId } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <ThemedText>User Details component</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
