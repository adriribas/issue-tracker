'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select } from '@radix-ui/themes';
import type { Status } from '@prisma/client';

const statuses: Array<{ label: string; value: Status | 'ALL' }> = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChangeFilter = (value: Status | 'ALL') => {
    const params = new URLSearchParams(searchParams);

    if (value === 'ALL') {
      params.delete('status');
    } else {
      params.set('status', value);
    }
    params.delete('page');

    router.push(`?${params.toString()}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || 'ALL'}
      onValueChange={handleChangeFilter}>
      <Select.Trigger placeholder='Filter by status...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Filter by status</Select.Label>
          {statuses.map((status) => {
            const { label, value } = status;
            return (
              <Select.Item key={value} value={value}>
                {label}
              </Select.Item>
            );
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
