import { StyleSheet, FlatList, RefreshControl, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { usePosts } from "@/hooks/usePosts";
import { ErrorComponent } from "@/components/ErrorComponent";
import { useTranslation } from "@/hooks/useTranslation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostItem from "@/components/PostItem";
import { useCallback, useRef } from "react";
import { PostItemInterface } from "@/types/posts";
import { useUsers } from "@/hooks/useUsers";
import { useComments } from "@/hooks/useComments";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function PostScreen() {
  const { error, posts, isFetching, refetchPosts } = usePosts();
  const { users, refetchUsers } = useUsers();
  const { comments, refetchComments } = useComments();
  const flatListRef = useRef<FlatList>(null);

  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const renderItem = useCallback(
    ({ item }: { item: PostItemInterface }) => {
      return <PostItem key={item.id} item={item} />;
    },
    [users, comments],
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
      !posts.length ? (
        <></>
      ) : (
        <ThemedView style={styles.lastItemContainer}>
          <ThemedText type={"title"}>{t("noMoreItems")}</ThemedText>
          <TouchableOpacity onPress={scrollToTop}>
            <ThemedText type={"link"}>{t("goToTop")}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ),
    [posts],
  );

  const handleRefetch = useCallback(() => {
    refetchPosts();
    refetchUsers();
    refetchComments();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ErrorComponent
        errorMessage={error}
        isActive={!!error}
        onClose={() => {}}
      />
      <FlatList
        removeClippedSubviews={true}
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        windowSize={10}
        maxToRenderPerBatch={20}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={handleRefetch} />
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
        ListFooterComponent={renderListFooterComponent}
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
  lastItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  content: {
    gap: 16,
  },
});
