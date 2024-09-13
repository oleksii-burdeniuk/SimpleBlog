import { StyleSheet, FlatList, RefreshControl } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { usePosts } from "@/hooks/usePosts";
import { ErrorComponent } from "@/components/ErrorComponent";
import { useTranslation } from "@/hooks/useTranslation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostItem from "@/components/PostItem";
import { useCallback } from "react";
import { PostItemInterface } from "@/types/posts";
import { useUsers } from "@/hooks/useUsers";
import { UserInterfaceIdiom } from "@/types/users";

export default function PostScreen() {
  const { error, posts, isFetching, refetchPosts } = usePosts();
  const {
    error: errorUser,
    users,
    isFetching: isFetchingUsers,
    refetchUsers,
  } = useUsers();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const renderItem = useCallback(
    ({ item }: { item: PostItemInterface; user: UserInterfaceIdiom }) => {
      const userWritten = users.find((i) => i.id === item.userId);
      if (!userWritten) return;
      return <PostItem item={item} user={userWritten} />;
    },
    [users],
  );

  const renderListEmptyComponent = useCallback(
    () => (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText type={"title"}>{t("noItems")}</ThemedText>
      </ThemedView>
    ),
    [],
  );

  return (
    <ThemedView style={styles.container}>
      <ErrorComponent
        errorMessage={error}
        isActive={!!error}
        onClose={() => {}}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={10}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetchPosts} />
        }
        data={posts}
        contentContainerStyle={styles.content}
        keyExtractor={(item) => item.id.toString()}
        style={{
          flex: 1,
          marginTop: insets.top,
        }}
        renderItem={renderItem}
        ListEmptyComponent={renderListEmptyComponent}
      />
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
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
  emptyContainer: {
    flex: 1,
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    gap: 16,
  },
});
