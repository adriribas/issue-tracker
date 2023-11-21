'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select } from '@radix-ui/themes';

import {
  statusMap,
  statuses,
  type Status,
  STATUS_ALL,
} from '@/app/util/statuses';

const IssueStatusFilter: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('status') as Status | null;
  const currentStatusColor = currentStatus
    ? statusMap[currentStatus]?.color
    : undefined;

  const handleChangeFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === STATUS_ALL) {
      params.delete('status');
    } else {
      params.set('status', value);
    }
    params.delete('page');

    router.push(`?${params.toString()}`);
  };

  return (
    <Select.Root
      defaultValue={currentStatus || STATUS_ALL}
      onValueChange={handleChangeFilter}>
      <Select.Trigger
        placeholder='Filter by status...'
        color={currentStatusColor}
        variant={currentStatusColor && 'soft'}
      />
      <Select.Content>
        <Select.Group>
          <Select.Label>Filter by status</Select.Label>
          <Select.Item value={STATUS_ALL}>All</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
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
