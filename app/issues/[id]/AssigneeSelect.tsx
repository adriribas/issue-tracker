'use client';

import { useQuery } from '@tanstack/react-query';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import type { Issue, User } from '@prisma/client';

import { Skeleton } from '@/app/components';

type Props = {
  issue: Issue;
};

const unassignedSelectValue = 'unassigned';

const AssigneeSelect: React.FC<Props> = ({ issue }) => {
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
    <Select.Root
      defaultValue={issue.assignedToUserId || unassignedSelectValue}
      onValueChange={(value) => {
        const userId = value === unassignedSelectValue ? null : value;
        axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserId: userId,
        });
      }}>
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value={unassignedSelectValue}>Unassigned</Select.Item>
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
