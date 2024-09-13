import { getAllComments } from "@/utils/http";
import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "./useTranslation";
import { CommentsInterface } from "@/types/comments";

export function useComments() {
  const { t } = useTranslation();
  const [comments, setAllComments] = useState<CommentsInterface[]>([]);
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
    refetchComments();
  }, []);

  const refetchComments = useCallback(async () => {
    setIsFetching(true);
    const data = await getAllComments();
    if (data?.data) {
      setAllComments(data.data);
    } else {
      setError(t("commentsError"));
    }
    setIsFetching(false);
  }, []);

  const getPostCommentsById = useCallback(
    (id: string | number) => {
      return comments.filter((c) => c.postId === id);
    },
    [comments],
  );
  const getPostCommentsCountById = useCallback(
    (id: string | number) => {
      return comments.filter((c) => c.postId === id).length || "0";
    },
    [comments],
  );

  return {
    error,
    comments,
    isFetching,
    refetchComments,
    getPostCommentsById,
    getPostCommentsCountById,
  };
}
