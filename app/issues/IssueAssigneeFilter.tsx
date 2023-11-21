'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select } from '@radix-ui/themes';

import { Skeleton } from '@/app/components';
import { useUsers } from '@/app/hooks';

const IssueAssigneeFilter: React.FC = () => {
  const { data: users, isLoading, isError } = useUsers();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (isLoading) {
    return <Skeleton height='2rem' />;
  }

  if (isError) {
    return null;
  }

  const handleChangeFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === allValue) {
      params.delete('assignee');
    } else {
      params.set('assignee', value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Select.Root defaultValue={allValue} onValueChange={handleChangeFilter}>
      <Select.Trigger placeholder='Filter by assignee...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Filter by assignee</Select.Label>
          <Select.Item value={allValue}>All</Select.Item>
          <Select.Item value={unassignedValue}>Unassigned</Select.Item>
        </Select.Group>
        <Select.Group>
          <Select.Separator />
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

export default IssueAssigneeFilter;

export const allValue = 'ALL';
export const unassignedValue = 'UNASSIGNED';
