import { getAllUsers } from "@/utils/http";
import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "./useTranslation";
import useUsersStore from "@/store/usersStore";

export function useUsers() {
  const { users, setUser } = useUsersStore();
  const { t } = useTranslation();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const timeoutRef = useRef(0);

  useEffect(() => {
    if (error) {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
      timeoutRef.current = +setTimeout(() => {
        setError("");
      }, 3000);
    }
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [error]);

  useEffect(() => {
    if (!users.length) refetchUsers();
  }, []);

  const getUserById = useCallback(
    (id: string | number) => {
      return users.find((i) => i.id === id);
    },
    [users],
  );

  const refetchUsers = useCallback(async () => {
    setIsFetching(true);
    const data = await getAllUsers();
    if (data?.data) {
      setUser(data.data);
    } else {
      setError(t("postsError"));
    }
    setIsFetching(false);
  }, []);

  return {
    error,
    users,
    isFetching,
    refetchUsers,
    getUserById,
  };
}
