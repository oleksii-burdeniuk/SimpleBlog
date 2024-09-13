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

  return {
    error,
    comments,
    isFetching,
    refetchComments,
  };
}
