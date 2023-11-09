'use client';

import { useQuery } from '@tanstack/react-query';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import type { User } from '@prisma/client';

import { Skeleton } from '@/app/components';

const AssigneeSelect: React.FC = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<Array<User>>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    retry: 3,
    staleTime: 60 * 1000,
  });

  if (isLoading) {
    return <Skeleton height='2rem' />;
  }

  if (error) {
    return null;
  }

  return (
    <Select.Root>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => {
            const { id, name } = user;
            return (
              <Select.Item key={id} value={id}>
                {name}
              </Select.Item>
            );
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
