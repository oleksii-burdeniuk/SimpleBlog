import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useTranslation } from "@/hooks/useTranslation";
import { PostItemInterface } from "@/types/posts";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { UserInterfaceIdiom } from "@/types/users";
import { memo, useCallback } from "react";
import { capitalizeFirstLetter } from "@/utils/functions";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
export default memo(function UserItem({
  item,
  posts,
}: {
  item: UserInterfaceIdiom;
  posts: PostItemInterface[];
}) {
  const { t } = useTranslation();
  const iconColor = useThemeColor({}, "iconSecondary");
  const backgroundColor = useThemeColor({}, "backgroundSecondary");
  const borderColor = useThemeColor({}, "borderItem");

  const handlePressUser = useCallback(async () => {
    try {
      router.push(`/user/${item.id}`);
    } catch (error) {}
  }, []);

  return (
    <ThemedView style={[styles.container, { borderColor: borderColor }]}>
      <TouchableOpacity
        style={styles.nameContainer}
        onPress={handlePressUser}
        activeOpacity={0.5}
      >
        <Ionicons name="person-circle" size={42} color={iconColor} />
        <ThemedText type={"title"}>
          {capitalizeFirstLetter(item.name)}
        </ThemedText>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: backgroundColor,
          padding: 16,
          borderRadius: 8,
          gap: 8,
        }}
      >
        {item.address.city && (
          <View style={styles.infoContainer}>
            <ThemedText type={"default"}>{t("location")}:</ThemedText>
            <Ionicons name="location-sharp" size={18} color={iconColor} />
            <ThemedText type={"small"}>
              {capitalizeFirstLetter(item.address.city)}
            </ThemedText>
          </View>
        )}
        {item.email && (
          <View style={styles.infoContainer}>
            <ThemedText>{t("email")}:</ThemedText>
            <ThemedText type={"small"} selectable={true}>
              {item.email}
            </ThemedText>
          </View>
        )}

        {item.phone && (
          <View style={styles.infoContainer}>
            <ThemedText>{t("phone")}:</ThemedText>
            <ThemedText type={"small"} selectable={true}>
              {item.phone}
            </ThemedText>
          </View>
        )}

        {item.company && (
          <View style={styles.infoContainer}>
            <ThemedText selectable={true}>{t("company")}:</ThemedText>
            <ThemedText type={"small"} selectable={true}>
              {item.company.name}
            </ThemedText>
          </View>
        )}
        <View style={styles.infoContainer}>
          <ThemedText>{t("posts")}:</ThemedText>
          <ThemedText type={"small"}>{posts?.length || "0"}</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
});

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  nameContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-end",
  },
});
