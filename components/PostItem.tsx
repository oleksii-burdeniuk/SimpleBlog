import { Share, StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { PostItemInterface } from "@/types/posts";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { memo, useCallback, useEffect } from "react";
import { capitalizeFirstLetter } from "@/utils/functions";
import CommentsIcon from "./Icons/CommentsIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import ShareIcon from "./Icons/ShareIcon";
import { router } from "expo-router";
import { useUsers } from "@/hooks/useUsers";
import { useComments } from "@/hooks/useComments";

export default memo(function PostItem({ item }: { item: PostItemInterface }) {
  const borderColor = useThemeColor({}, "borderItem");
  const backgroundColor = useThemeColor({}, "backgroundSecondary");
  const iconColor = useThemeColor({}, "iconSecondary");
  const { getUserById } = useUsers();
  const { getPostCommentsCountById } = useComments();
  const user = getUserById(item.userId);

  const commentsCount = getPostCommentsCountById(item.userId);
  const handleShare = useCallback(async () => {
    try {
      const result = await Share.share({
        message: `Look what ${user?.name} say on simpleBlog! \n${capitalizeFirstLetter(item.title)}. \n${capitalizeFirstLetter(item.body)}. \n
        `,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          console.log("Content Shared!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {}
  }, []);

  const handlePressComments = useCallback(async () => {
    try {
      router.push(`/post/${item.id}`);
    } catch (error) {}
  }, []);

  const handlePressUser = useCallback(async () => {
    try {
      router.push(`/user/${user?.id}`);
    } catch (error) {}
  }, []);

  return (
    <ThemedView style={[styles.container, { borderColor: borderColor }]}>
      {user && (
        <View style={styles.nameContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={handlePressUser}
            activeOpacity={0.5}
          >
            <Ionicons name="person-circle" size={32} color={iconColor} />
            <ThemedText type={"subtitle"}>
              {capitalizeFirstLetter(user?.name)}
            </ThemedText>
          </TouchableOpacity>
          <Ionicons name="location-sharp" size={18} color={iconColor} />
          <ThemedText type={"small"}>
            {capitalizeFirstLetter(user?.address?.city)}
          </ThemedText>
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handlePressComments}
        style={[styles.info, { backgroundColor: backgroundColor }]}
      >
        <ThemedText type={"subtitle"}>
          {capitalizeFirstLetter(item.title)}
        </ThemedText>
        <ThemedText type={"default"}>
          {capitalizeFirstLetter(item.body)}
        </ThemedText>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.btn} onPress={handlePressComments}>
          <CommentsIcon color={iconColor} />
          <ThemedText>{commentsCount}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleShare}>
          <ShareIcon color={iconColor} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
});

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 8,
  },
  nameContainer: {
    padding: 8,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingLeft: 0,
  },
  infoContainer: {
    flexDirection: "row",
    gap: 8,
    paddingTop: 8,
    justifyContent: "space-between",
  },
  btn: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginRight: 16,
  },
  info: {
    padding: 16,
    borderRadius: 8,
  },
});
