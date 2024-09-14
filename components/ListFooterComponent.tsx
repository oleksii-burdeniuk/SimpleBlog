import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useTranslation } from "@/hooks/useTranslation";
import { StyleSheet } from "react-native";
import { memo } from "react";

type ListFooterComponent = {
  onPress: () => void;
};
export const ListFooterComponent = memo(({ onPress }: ListFooterComponent) => {
  const { t } = useTranslation();
  return (
    <ThemedView style={styles.lastItemContainer}>
      <ThemedText type={"title"}>{t("noMoreItems")}</ThemedText>
      <TouchableOpacity onPress={onPress}>
        <ThemedText type={"link"}>{t("goToTop")}</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
});

const styles = StyleSheet.create({
  lastItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
});
