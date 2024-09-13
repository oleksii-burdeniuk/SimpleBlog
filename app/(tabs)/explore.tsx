import { StyleSheet, FlatList, RefreshControl } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTranslation } from "@/hooks/useTranslation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUsers } from "@/hooks/useUsers";
import UserItem from "@/components/UserItem";
import { useCallback } from "react";
import { UserInterfaceIdiom } from "@/types/users";
import { usePosts } from "@/hooks/usePosts";

export default function UsersScreen() {
  const { users, isFetching, refetchUsers } = useUsers();
  const { posts, refetchPosts } = usePosts();

  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const renderItem = useCallback(
    ({ item }: { item: UserInterfaceIdiom }) => {
      return (
        <UserItem
          item={item}
          posts={posts.filter((p) => p.userId == item.id)}
        />
      );
    },
    [posts],
  );

  const renderListEmptyComponent = useCallback(
    () => (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText type={"title"}>{t("noUsers")}</ThemedText>
      </ThemedView>
    ),
    [],
  );
  const handleRefetch = useCallback(() => {
    refetchUsers();
    refetchPosts();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={handleRefetch} />
        }
        maxToRenderPerBatch={10}
        data={users}
        contentContainerStyle={[styles.content]}
        keyExtractor={(item) => item.id.toString()}
        style={[styles.listContainer, { marginTop: insets.top }]}
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
  listContainer: {
    flex: 1,
    width: "100%",
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
    width: "100%",
  },
});
