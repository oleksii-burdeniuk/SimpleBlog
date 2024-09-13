import { getAllUsers } from '@/utils/http';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from './useTranslation';
import { UserInterfaceIdiom } from '@/types/users';

export function useUsers() {
  const { t } = useTranslation();
  const [users, setAllUsers] = useState<UserInterfaceIdiom[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');
  const timeoutRef = useRef(0);

  useEffect(() => {
    if (error) {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
      timeoutRef.current = +setTimeout(() => {
        setError('');
      }, 3000);
    }
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [error]);

  useEffect(() => {
    refetchUsers();
  }, []);

  const refetchUsers = useCallback(async () => {
    setIsFetching(true);
    const data = await getAllUsers();
    if (data?.data) {
      setAllUsers(data.data);
    } else {
      setError(t('getPostsError'));
    }
    setIsFetching(false);
  }, []);

  return {
    error,
    users,
    isFetching,
    refetchUsers,
  };
}
