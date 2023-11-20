'use client';

import type { Issue, Status } from '@prisma/client';
import { Select, Text } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = {
  issue: Issue;
};

const StatusSelect: React.FC<Props> = ({ issue }) => {
  const router = useRouter();

  const statuses: Array<{
    label: string;
    value: Status;
  }> = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ];

  const handleValueChange = async (value: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, { status: value });
      router.refresh();
      toast.success('Status updated successfuly');
    } catch (e) {
      toast.error('Changes could not be saved', { duration: 5000 });
    }
  };

  return (
    <Select.Root defaultValue={issue.status} onValueChange={handleValueChange}>
      <Select.Trigger placeholder='Status...' />
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
