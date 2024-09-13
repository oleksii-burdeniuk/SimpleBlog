import { getAllPosts } from "@/utils/http";
import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "./useTranslation";
import usePostsStore from "@/store/postsStore";

export function usePosts() {
  const { t } = useTranslation();
  const { posts, setPosts } = usePostsStore();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const timeoutRef = useRef(0);

  useEffect(() => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    if (error) {
      timeoutRef.current = +setTimeout(() => {
        setError("");
      }, 3000);
      console.log("i", timeoutRef.current);
    }
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [error]);

  useEffect(() => {
    if (!posts.length) refetchPosts();
  }, []);

  const refetchPosts = useCallback(async () => {
    setIsFetching(true);
    const data = await getAllPosts();
    if (data?.data) {
      setPosts(data.data);
    } else {
      setError(t("postsError"));
    }
    setIsFetching(false);
  }, []);

  return {
    error,
    posts,
    isFetching,
    refetchPosts,
  };
}
