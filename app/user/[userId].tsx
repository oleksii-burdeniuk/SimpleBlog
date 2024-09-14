import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTranslation } from "@/hooks/useTranslation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { usePosts } from "@/hooks/usePosts";
import { useUsers } from "@/hooks/useUsers";
import UserItem from "@/components/UserItem";
import { useCallback, useRef } from "react";
import { PostItemInterface } from "@/types/posts";
import PostItem from "@/components/PostItem";
import { useComments } from "@/hooks/useComments";
import { ListFooterComponent } from "@/components/ListFooterComponent";

export default function UserDetailsScreen() {
  const { userId } = useLocalSearchParams();
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { getUsersPostByUserId, refetchPosts } = usePosts();
  const { getUserById, isFetching, refetchUsers } = useUsers();
  const { comments, refetchComments } = useComments();
  const user = getUserById(+userId || userId[0]);
  const posts = getUsersPostByUserId(+userId || userId[0]);

  const renderItem = useCallback(
    ({ item }: { item: PostItemInterface }) => {
      return <PostItem key={item.id} item={item} disabled={true} />;
    },
    [user, comments],
  );

  const scrollToTop = () => {
    if (flatListRef.current)
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  const renderListEmptyComponent = useCallback(
    () => (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText type={"title"}>{t("noItems")}</ThemedText>
      </ThemedView>
    ),
    [],
  );
  const renderListFooterComponent = useCallback(
    () =>
      !posts.length ? <></> : <ListFooterComponent onPress={scrollToTop} />,
    [posts],
  );

  const renderHeaderComponent = useCallback(
    () =>
      !user ? <></> : <UserItem item={user} posts={posts} disabled={true} />,
    [user],
  );

  const handleRefetch = useCallback(() => {
    refetchPosts();
    refetchUsers();
    refetchComments();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <FlatList
        removeClippedSubviews={true}
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        windowSize={10}
        maxToRenderPerBatch={20}
        ListHeaderComponent={renderHeaderComponent}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={handleRefetch} />
        }
        data={posts}
        contentContainerStyle={styles.content}
        keyExtractor={(item) => item.id.toString()}
        style={{
          flex: 1,
          marginBottom: insets.bottom,
        }}
        renderItem={renderItem}
        ListEmptyComponent={renderListEmptyComponent}
        ListFooterComponent={renderListFooterComponent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  content: {
    alignItems: "stretch",
    width: "100%",
  },
  emptyContainer: {
    alignContent: "center",
  },
  lastItemContainer: {
    alignItems: "center",
    paddingTop: 20,
    gap: 16,
  },
});
