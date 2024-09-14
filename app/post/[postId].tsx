import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTranslation } from "@/hooks/useTranslation";
import { router, useLocalSearchParams } from "expo-router";
import { usePosts } from "@/hooks/usePosts";
import { useUsers } from "@/hooks/useUsers";
import { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { capitalizeFirstLetter } from "@/utils/functions";
import { useComments } from "@/hooks/useComments";
import CommentItem from "@/components/CommentItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PostDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { postId } = useLocalSearchParams();
  const { getPostById } = usePosts();
  const { getUserById } = useUsers();
  const { getPostCommentsById } = useComments();
  const iconColor = useThemeColor({}, "iconSecondary");
  const borderColor = useThemeColor({}, "borderItem");
  const post = getPostById(typeof postId == "string" ? postId : postId[0]);
  const user = getUserById(post.userId);
  const comments = getPostCommentsById(post.id);

  console.log(comments);
  const handlePressUser = useCallback(async () => {
    try {
      router.push(`/user/${user?.id}`);
    } catch (error) {}
  }, []);

  return (
    <ScrollView
      style={{ height: "100%" }}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={[styles.container, { paddingBottom: insets.bottom }]}>
        {user && (
          <View style={styles.nameContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={handlePressUser}
              activeOpacity={0.5}
            >
              <Ionicons name="person-circle" size={52} color={iconColor} />
              <ThemedText type={"title"}>
                {capitalizeFirstLetter(user?.name)}
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}
        <View style={[styles.info, { borderColor }]}>
          <ThemedText type={"title"}>
            {capitalizeFirstLetter(post.title)}
          </ThemedText>
          <ThemedText type={"subtitle"}>
            {capitalizeFirstLetter(post.body)}
          </ThemedText>
        </View>
        {!!comments.length &&
          comments.map((comment) => {
            return <CommentItem key={comment.id} comment={comment} />;
          })}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    gap: 8,
    paddingHorizontal: 16,
  },
  nameContainer: {
    padding: 8,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingLeft: 0,
  },
  btn: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginRight: 16,
  },
  info: {
    gap: 16,
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
});
