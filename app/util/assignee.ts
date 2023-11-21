import { useQuery } from '@tanstack/react-query';
import type { User } from '@prisma/client';
import axios from 'axios';

export const useUsers = () => {
  return useQuery<Array<User>>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    retry: 3,
    staleTime: 60 * 60 * 1000, // 1h
  });
};

export const ASSIGNEE_ALL = 'ALL' as const;
export const ASSIGNEE_UNASSIGNED = 'UNASSIGNED' as const;
