'use client';

import { useState } from 'react';
import type { Issue } from '@prisma/client';
import { Select, Text } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { statuses, statusMap } from '@/app/util/statuses';

type Props = {
  issue: Issue;
};

const StatusSelect: React.FC<Props> = ({ issue }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleValueChange = async (value: string) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/issues/${issue.id}`, { status: value });
      router.refresh();
      toast.success('Status updated successfuly');
    } catch (e) {
      toast.error('Changes could not be saved', { duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Select.Root
      disabled={isLoading}
      defaultValue={issue.status}
      onValueChange={handleValueChange}>
      <Select.Trigger
        placeholder='Status...'
        variant='soft'
        color={statusMap[issue.status].color}
      />
      <Select.Content>
        <Select.Group>
          <Select.Label>Change the status</Select.Label>
          {statuses.map((status) => {
            const { label, value } = status;
            return (
              <Select.Item key={value} value={value}>
                <Text>{label}</Text>
              </Select.Item>
            );
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusSelect;
