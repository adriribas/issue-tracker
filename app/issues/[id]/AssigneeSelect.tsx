'use client';

import { useRouter } from 'next/navigation';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import type { Issue } from '@prisma/client';
import toast, { Toaster } from 'react-hot-toast';

import { Skeleton } from '@/app/components';
import { useUsers } from '@/app/hooks';

type Props = {
  issue: Issue;
};

const unassignedValue = 'UNASSIGNED';

const AssigneeSelect: React.FC<Props> = ({ issue }) => {
  const { data: users, isLoading, isError } = useUsers();
  const router = useRouter();

  if (isLoading) {
    return <Skeleton height='2rem' />;
  }

  if (isError) {
    return null;
  }

  const handleValueChange = async (value: string) => {
    try {
      const userId = value === unassignedValue ? null : value;
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId,
      });
      toast.success('Assignee updated successfuly');
      router.refresh();
    } catch (e) {
      toast.error('Changes could not be saved', { duration: 5000 });
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || unassignedValue}
        onValueChange={handleValueChange}>
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Assign to a user</Select.Label>
            <Select.Item value={unassignedValue}>Unassigned</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
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
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
