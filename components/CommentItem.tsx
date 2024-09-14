import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useTranslation } from "@/hooks/useTranslation";
import { useThemeColor } from "@/hooks/useThemeColor";
import { memo } from "react";
import { CommentsInterface } from "@/types/comments";
import { ThemedText } from "./ThemedText";
import { capitalizeFirstLetter } from "@/utils/functions";
import CommentsIcon from "./Icons/CommentsIcon";
export default memo(function CommentItem({
  comment,
}: {
  comment: CommentsInterface;
}) {
  const borderColor = useThemeColor({}, "borderItem");
  const iconColor = useThemeColor({}, "iconSecondary");

  return (
    <ThemedView style={[styles.container, { borderColor: borderColor }]}>
      <>
        <View style={styles.row}>
          <CommentsIcon color={iconColor} />
          <ThemedText type="link" selectable={true}>
            {capitalizeFirstLetter(comment.email)}
          </ThemedText>
        </View>
        <ThemedText type="subtitle">
          {capitalizeFirstLetter(comment.name)}
        </ThemedText>
        <ThemedText>{capitalizeFirstLetter(comment.body)}</ThemedText>
      </>
    </ThemedView>
  );
});

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
    borderRadius: 16,
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
  row: {
    flexDirection: "row",
    gap: 16,
  },
});
