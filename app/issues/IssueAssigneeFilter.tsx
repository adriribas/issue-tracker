'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Avatar, Flex, Select } from '@radix-ui/themes';

import { Skeleton } from '@/app/components';
import {
  useUsers,
  ASSIGNEE_ALL,
  ASSIGNEE_UNASSIGNED,
} from '@/app/util/assignee';

const IssueAssigneeFilter: React.FC = () => {
  const { data: users, isLoading, isError } = useUsers();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentAssignee = !searchParams.get('assignee')
    ? ASSIGNEE_ALL
    : searchParams.get('assignee')!;

  if (isLoading) {
    return <Skeleton height='2rem' />;
  }

  if (isError) {
    return null;
  }

  const handleChangeFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === ASSIGNEE_ALL) {
      params.delete('assignee');
    } else {
      params.set('assignee', value);
    }
    params.delete('page');

    router.push(`?${params.toString()}`);
  };

  return (
    <Select.Root
      defaultValue={currentAssignee}
      onValueChange={handleChangeFilter}>
      <Select.Trigger placeholder='Filter by assignee...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Filter by assignee</Select.Label>
          <Select.Item value={ASSIGNEE_ALL}>All</Select.Item>
          <Select.Item value={ASSIGNEE_UNASSIGNED}>Unassigned</Select.Item>
        </Select.Group>
        <Select.Group>
          <Select.Separator />
          {users?.map((user) => {
            const { id, name, image } = user;
            return (
              <Select.Item key={id} value={id}>
                <Flex align='center' gap='2'>
                  <Avatar src={image!} fallback='?' size='1' radius='full' />
                  {name}
                </Flex>
              </Select.Item>
            );
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueAssigneeFilter;
